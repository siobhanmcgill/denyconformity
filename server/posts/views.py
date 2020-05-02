import logging
logger = logging.getLogger(__name__)

from django.http import HttpResponse
from django.core import serializers
from django.core.serializers.json import Serializer
from django.core.exceptions import ValidationError
import json

from .models import Post, Comment#, Series


class PostListEncoder(Serializer):
    def start_serialization(self):
        logger.info('Options %s', self.options)
        if self.options['next_page']:
            next_page = '\n"next_page": {},'.format(self.options['next_page'])
        else:
            next_page = ''
        self.stream.write('{{\n"count": {},{}\n"posts": ['.format(
            self.options['count'], next_page))
        del self.options['count']
        del self.options['next_page']
        self._init_options()

    def end_serialization(self):
        if self.options.get("indent"):
            self.stream.write("\n")
        self.stream.write("]")
        if self.options.get("indent"):
            self.stream.write("\n")
        self.stream.write('}')
        if self.options.get("indent"):
            self.stream.write("\n")

    def get_dump_object(self, obj):
        self._current['id'] = self._value_from_field(obj, obj._meta.pk)

        comments = obj.comments.all()
        self._current['comments'] = []
        for comment_obj in comments:
            this_comment = {}
            comment_model = comment_obj._meta.concrete_model
            for commentField in comment_model._meta.local_fields:
                this_comment[commentField.name] = self._value_from_field(
                    comment_obj, commentField)
            self._current['comments'].append(this_comment)
        return self._current


def list_posts(request, page=None):
    count = Post.objects.exclude(pub=0).count()
    if not page or page == 0:
        offset = 0
        page = 1
    else:
        offset = (page - 1) * 10
    limit = offset + 10
    if limit < count:
        next_page = page + 1
    else:
        next_page = None
    post_list = Post.objects.exclude(
        pub=0).order_by('-time')[offset:limit].prefetch_related(
            'tags', 'comments')
    data = PostListEncoder().serialize(post_list,
                                       use_natural_foreign_keys=True,
                                       count=count,
                                       next_page=next_page)

    return HttpResponse(data, content_type='application/json')


def fetch_post(request, id=None):
    if not id:
        query = Post.objects.order_by('-time')
    else:
        query = Post.objects.filter(id=id)

    post = query.exclude(pub=0)[0:1].prefetch_related('tags', 'comments')

    if post:
        raw_data = PostListEncoder().serialize(post,
                                               use_natural_foreign_keys=True,
                                               count=0,
                                               next_page=0)

        struct = json.loads(raw_data)
        processed_data = json.dumps(struct['posts'][0])
        return HttpResponse(processed_data,
                            content_type='application/json')

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def generic_serialize(model):
  raw_data = serializers.serialize('json', [model])
  struct = json.loads(raw_data)
  processed_data = struct[0]['fields']
  processed_data['id'] = struct[0]['pk']
  return processed_data


def create_comment(request, id=None):
  if request.method == 'POST':
    request_data = json.loads(request.body)
    name = request_data['name']
    text = request_data['text']
    ip = get_client_ip(request)
    comment = Comment.objects.create_comment(name, text, id, ip)
    try:
      comment.full_clean()
    except ValidationError as e:
      # Handle errors?
      pass
    comment.save()
    processed_data = generic_serialize(comment)
    return HttpResponse(json.dumps(processed_data), content_type='application/json')

  return HttpResponse({}, content_type='application/json')

def get_series(request, post_id=None):
  post = Post.objects.get(pk=post_id)
  # TODO: if post.pub == False
  series_query = post.series.all()
  if len(series_query) == 0:
    return HttpResponse({}, content_type='application/json')

  series = series_query[0]
  posts = series.post_list()

  processed_data = generic_serialize(series)
  processed_data['posts'] = []

  for post in posts:
    this_post = generic_serialize(post)
    this_post['tags'] = []
    tags = post.tags.all()
    for tag in tags:
      this_post['tags'].append(tag.text)

    comments = post.comments.all()
    this_post['comments'] = []
    for comment in comments:
      this_post['comments'].append(generic_serialize(comment))

    processed_data['posts'].append(this_post)

  return HttpResponse(json.dumps(processed_data), content_type='application/json')
