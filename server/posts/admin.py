from django.contrib import admin
from django import forms

from .models import Post, Comment, Tag, Series, SeriesPost, SurveyOption, SurveyVote


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


class SurveyOptionInline(admin.TabularInline):
    classes = ('collapse',)
    model = SurveyOption
    fields = ['text', 'name', 'pub']
    readonly_fields = ['time', 'ip']


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'time', 'pub')
    date_hierarchy = 'time'
    fieldsets = [
        (None, {'fields': ['title', 'time', 'text', 'image']}),
        ('Other', {
            'classes': ('collapse',),
            'fields': ('markdown', 'pub', 'summary', 'slug')
        }),
        ('Survey', {
            'classes': ('collapse',),
            'fields': ('survey_description', 'survey_expires',
                       'survey_open_prompt', 'survey_closed_prompt',
                       'survey_allows_custom_answers')
        })
    ]
    inlines = [TagInline, PostSeriesInline, SurveyOptionInline]

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


class SurveyVoteAdmin(admin.ModelAdmin):
    list_dislpay = ('survey_option.survey.title',
                    'survey_option.text', 'name', 'time', 'pub', 'ip')
    fields = ['name', 'text', 'pub', 'survey_option']
    readonly_fields = ['time', 'ip']


admin.site.register(SurveyVote, SurveyVoteAdmin)
