import logging
logger = logging.getLogger(__name__)

from django.http import HttpResponse
from django.core import serializers
from django.core.serializers.json import Serializer

from .models import Post


class PostEncoder(Serializer):
    def get_dump_object(self, obj):
        self._current['id'] = self._value_from_field(obj, obj._meta.pk)
        self._current.move_to_end('id', last=False)
        comments = obj.comments.all()
        self._current['comments'] = []
        for comment_obj in comments:
            this_comment = {}
            comment_model = comment_obj._meta.concrete_model
            for commentField in comment_model._meta.local_fields:
                this_comment[commentField.name] = self._value_from_field(comment_obj, commentField)
            self._current['comments'].append(this_comment)
        return self._current


def list_posts(request):
    post_list = Post.objects.exclude(pub=0).order_by('-time')[:10].prefetch_related('tags', 'comments')
    data = PostEncoder().serialize(post_list, use_natural_foreign_keys=True)
    return HttpResponse(data, content_type='application/json')