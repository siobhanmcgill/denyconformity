from django.contrib import admin
from django import forms

from .models import Post, Comment, Tag, Series, SeriesPost, Question

class PostSeriesInline(admin.TabularInline):
  classes = ('collapse',)
  model = SeriesPost
  max_num = 1

class TagInline(admin.TabularInline):
  classes = ('collapse',)
  model = Post.tags.through
  verbose_name = 'Tag'
  verbose_name_plural = 'Tags'
  min_num = 1

class QuestionInline(admin.TabularInline):
  classes = ('collapse',)
  model = Question
  fields = ['text', 'name']


class PostAdmin(admin.ModelAdmin):
  list_display = ('title', 'id', 'time', 'pub')
  date_hierarchy = 'time'
  fieldsets = [
    (None, {'fields': ['title', 'time', 'text', 'google_doc_id', 'image', 'pub']}),
    ('Other', {
      'classes': ('collapse',),
      'fields': ('markdown', 'summary', 'slug')
    }),
    ('Survey', {
      'classes': ('collapse',),
      'fields': ('survey_description', 'survey_expires')
    })
  ]
  inlines = [TagInline, PostSeriesInline, QuestionInline]

  add_form_template = 'admin/add_edit_post_form.html'
  change_form_template = 'admin/add_edit_post_form.html'

admin.site.register(Post, PostAdmin)

class CommentAdmin(admin.ModelAdmin):
  list_dislpay = ('post.title', 'name', 'time', 'pub', 'ip')
  fields = ['name', 'text', 'pub', 'ip', 'post']

admin.site.register(Comment, CommentAdmin)

admin.site.register(Tag)

class SeriesPostInline(admin.TabularInline):
  model = SeriesPost
  # fields = ['title', 'time']
  ordering = ('srt',)

class SeriesAdmin(admin.ModelAdmin):
  fieldsets = [
    (None, {'fields': ['name', 'description', 'icon', 'slug', 'time']})
  ]
  inlines = [SeriesPostInline]

admin.site.register(Series, SeriesAdmin)
