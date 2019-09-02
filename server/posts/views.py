import logging
logger = logging.getLogger(__name__)

from django.http import HttpResponse
from django.core import serializers
from django.core.serializers.json import Serializer

from .models import Post


class PostEncoder(Serializer):
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
    self._current.move_to_end('id', last=False)
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
    post_list = Post.objects.exclude(pub=0).order_by('-time')[offset:limit].prefetch_related('tags', 'comments')
    data = PostEncoder().serialize(post_list,
      use_natural_foreign_keys=True, count=count, next_page=next_page)

    return HttpResponse(data, content_type='application/json')
