from django.http import HttpResponse, JsonResponse
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from .models import Post, Tag, Comment, Series, SeriesPost, Question, Answer


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
        fields = ['id', 'time', 'title', 'text',
                  'summary', 'tags', 'markdown', 'survey_description',
                  'survey_expires']


class SeriesPostSerializer(serializers.ModelSerializer):
    post = PostSerializer()

    class Meta:
        model = SeriesPost
        fields = ['label', 'srt', 'post']


class SeriesSerializer(serializers.ModelSerializer):
    posts = SeriesPostSerializer(many=True)

    class Meta:
        model = Series
        fields = ['id', 'name', 'icon', 'description', 'posts']


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.exclude(pub=0).all()
    serializer_class = PostSerializer
    http_method_names = ['get', 'options', 'post']

    def get_permissions(self):
        if self.action == 'comment':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        data = JSONParser().parse(request)
        data['ip'] = get_client_ip(request)
        data['post'] = pk
        serializer = CreateCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    @action(detail=True)
    def series(self, request, pk=None):
        try:
            seriesPost = SeriesPost.objects.get(post=pk)
            series = seriesPost.series
            serializer = SeriesSerializer(series)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        try:
            comments = Comment.objects.filter(post=pk, pub=True).all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)



class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    http_method_names = ['get', 'options']
