from django.contrib import admin

from .models import Post, Comment, Tag, Series, SeriesPost

class PostSeriesInline(admin.TabularInline):
  model = SeriesPost
  max_num = 1

class TagInline(admin.TabularInline):
  model = Post.tags.through

class PostAdmin(admin.ModelAdmin):
  list_display = ('title', 'time', 'pub')
  date_hierarchy = 'time'
  fieldsets = [
    (None, {'fields': ['title', 'time', 'text', 'summary', 'pub']})
  ]
  inlines = [TagInline, PostSeriesInline]

admin.site.register(Post, PostAdmin)

class CommentAdmin(admin.ModelAdmin):
  list_dislpay = ('post.title', 'name', 'time', 'pub', 'ip')
  fields = ['name', 'text', 'summary', 'pub', 'ip', 'post']

admin.site.register(Comment, CommentAdmin)

admin.site.register(Tag)

class SeriesPostInline(admin.TabularInline):
  model = SeriesPost
  # fields = ['title', 'time']
  ordering = ('srt',)

class SeriesAdmin(admin.ModelAdmin):
  fieldsets = [
    (None, {'fields': ['name', 'description', 'icon']})
  ]
  inlines = [SeriesPostInline]

admin.site.register(Series, SeriesAdmin)
