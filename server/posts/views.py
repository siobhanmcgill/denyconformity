from django.http import HttpResponse, JsonResponse
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from .models import Post, Tag, Comment, Series, SeriesPost, SurveyOption, SurveyVote

import datetime


class TagSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret['text']

    class Meta:
        model = Tag
        fields = ['text']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'time', 'name', 'text']


class CreateCommentSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    class Meta:
        model = Comment
        fields = ['time', 'name', 'text', 'pub', 'ip', 'post']


class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    # comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        lookup_field = 'slug'
        fields = ['id', 'slug', 'time', 'title', 'text',
                  'summary', 'tags', 'markdown', 'survey_description',
                  'survey_expires', 'image', 'survey_open_prompt',
                  'survey_closed_prompt', 'survey_allows_custom_answers']


class SurveyVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyVote
        fields = ['id', 'id', 'text', 'name']


class CreateSurveyVoteSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return SurveyVote.objects.create(**validated_data)

    class Meta:
        model = SurveyVote
        fields = ['time', 'name', 'text', 'ip', 'survey_option']


class SurveyOptionSerializer(serializers.ModelSerializer):
    votes = SurveyVoteSerializer(many=True)

    class Meta:
        model = SurveyOption
        fields = ['id', 'text', 'name', 'time', 'votes', 'custom']


class CreateSurveyOptionSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return SurveyOption.objects.create(**validated_data)

    class Meta:
        model = SurveyOption
        fields = ['time', 'name', 'text', 'ip', 'post', 'custom']


class SeriesPostSerializer(serializers.ModelSerializer):
    post = PostSerializer()

    class Meta:
        model = SeriesPost
        fields = ['label', 'srt', 'post']


class SeriesSerializer(serializers.ModelSerializer):
    posts = SeriesPostSerializer(many=True)

    class Meta:
        model = Series
        fields = ['id', 'slug', 'name', 'time', 'icon', 'description', 'posts']


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'text'
    http_method_names = ['get', 'options']

    @action(detail=True, methods=['get'])
    def randompost(self, request, text=None):
        postQuery = Post.objects.raw('''
          SELECT
          posts.*
          FROM posts_tag
          LEFT JOIN posts_post_tags ON posts_post_tags.tag_id=posts_tag.id
          LEFT JOIN posts_post as posts ON posts.id=posts_post_tags.post_id
          LEFT JOIN posts_seriespost ON posts_seriespost.post_id = posts.id
          WHERE posts_tag.text='{}' AND posts.pub=1
          		AND (posts_seriespost.id IS NULL OR posts_seriespost.series_id NOT IN(18))
          		AND (posts_seriespost.srt IS NULL OR posts_seriespost.srt = 1)
          ORDER BY RAND()
          LIMIT 1
        ''' .format(text))
        serializer = PostSerializer(postQuery, many=True)
        return Response(serializer.data[0])


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.exclude(pub=False)
    serializer_class = PostSerializer
    lookup_field = 'slug'
    http_method_names = ['get', 'options', 'post']

    def get_queryset(self):
        queryset = Post.objects.exclude(pub=False)

        series_slug = self.request.query_params.get('series', None)
        if series_slug is not None:
            queryset = queryset.filter(series__series__slug=series_slug)

        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(pk=id)

        return queryset

    def get_permissions(self):
        if self.action == 'comment' or self.action == 'surveyvote' or self.action == 'surveyoption':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def comment(self, request, slug=None):
        data = JSONParser().parse(request)
        data['ip'] = get_client_ip(request)
        data['post'] = slug
        serializer = CreateCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    @action(detail=True)
    def series(self, request, slug=None):
        try:
            seriesPost = SeriesPost.objects.get(post=slug)
            series = seriesPost.series
            serializer = SeriesSerializer(series)
            return Response(serializer.data)
        except:
            return Response()

    @action(detail=True, methods=['get'])
    def comments(self, request, slug=None):
        try:
            comments = Comment.objects.filter(post=slug, pub=True).all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def surveyoptions(self, request, slug=None):
        try:
            post = Post.objects.get(slug=slug)
            survey_options = SurveyOption.objects.filter(
                post=post.id, pub=True).all()
            serializer = SurveyOptionSerializer(survey_options, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def surveyoption(self, request, slug=None):
        data = JSONParser().parse(request)
        data['ip'] = get_client_ip(request)
        data['time'] = datetime.datetime.now()
        data['custom'] = True
        post = Post.objects.get(slug=slug)
        data['post'] = post.id
        serializer = CreateSurveyOptionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    @action(detail=True, methods=['post'])
    def surveyvote(self, request, slug=None):
        data = JSONParser().parse(request)
        data['ip'] = get_client_ip(request)
        data['time'] = datetime.datetime.now()
        serializer = CreateSurveyVoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    @action(detail=True, methods=['get'])
    def similar(self, request, slug=None):
        # try:
        posts = Post.objects.raw('''
                SELECT posts.id, posts.title, posts.pub FROM
                (
                  SELECT posttags.post_id, COUNT(posttags.tag_id) AS count
                  FROM posts_post_tags AS posttags
                  LEFT JOIN posts_post AS tag_posts ON posttags.post_id = tag_posts.id
                  WHERE tag_id IN (
                    SELECT posttags.tag_id FROM posts_post_tags AS posttags
                    LEFT JOIN posts_post AS posts ON posttags.post_id=posts.id
                    WHERE posts.slug = '{0}'
                  ) AND tag_posts.pub = 1
                  GROUP BY posttags.post_id
                  ORDER BY count DESC
                  LIMIT 6
                ) AS similars
                LEFT JOIN posts_post AS posts
                ON similars.post_id = posts.id
                WHERE posts.slug <> '{0}'
            ''' .format(slug))
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    lookup_field = 'slug'
    http_method_names = ['get', 'options']
