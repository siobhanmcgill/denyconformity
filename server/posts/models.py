from django.db import models
from django.utils.html import strip_tags
from django.dispatch import receiver
from django.utils import timezone
import re

# Here are the commands to bootstrap the database:

# python manage.py makemigrations posts
# python manage.py sqlmigrate posts [number]
# python manage.py migrate

# py manage.py loaddata [fixture name]


def auto_format(str):
    str = str.replace('’', '&rsquo;')
    str = str.replace('‘', '&lsquo;')
    str = str.replace('“', '&ldquo;')
    str = str.replace('”', '&rdquo;')
    str = str.replace('<>', '<p>&nbsp;</p>')
    return str


def remove_auto_format(str):
    str = str.replace('&rsquo;', '’')
    str = str.replace('&lsquo;', '‘')
    str = str.replace('&ldquo;', '“')
    str = str.replace('&rdquo;', '”')
    str = str.replace('<p>&nbsp;</p>', '<>')
    return str


class PostTextField(models.TextField):
    def pre_save(self, model_instance, add):
        return auto_format(getattr(model_instance, self.attname))


class PostSummaryField(models.TextField):
    def pre_save(self, model_instance, add):
        val = getattr(model_instance, self.attname)
        if not val or val == 'auto':
            text = remove_auto_format(model_instance.text)
            if len(text) > 275:
                val = text[0:275] + '...'
            else:
                val = text
        return auto_format(val)


class PostSlugField(models.SlugField):
    def pre_save(self, model_instance, add):
        slug = getattr(model_instance, self.attname)
        if not slug or slug == 'auto':
            if hasattr(model_instance, 'title'):
                title = getattr(model_instance, 'title')
            else:
                title = getattr(model_instance, 'name')
            slug = title.replace(' ', '-').lower()
            slug_re = re.compile(r"(&[a-z0-9]+;)|(#[a-z0-9]+;)|[^a-z0-9\-]")
            slug = slug_re.sub("", slug)
            if not slug:
                slug = 'post-' + str(getattr(model_instance, 'id'))
        return slug


class Post(models.Model):
    time = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=200)
    text = PostTextField()
    markdown = models.BooleanField(default=False)
    pub = models.BooleanField()
    summary = PostSummaryField(default='auto')
    tags = models.ManyToManyField('Tag')
    slug = PostSlugField(unique=True, default='auto')
    image = models.CharField(max_length=200, null=True, blank=True)

    survey_expires = models.DateTimeField(blank=True, null=True)
    survey_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-time', )


class CommentManager(models.Manager):
    def create_comment(self, name, text, post_id, ip):
        post = Post.objects.get(pk=post_id)
        text = strip_tags(text)
        comment = self.create(name=name, text=text, post=post, ip=ip, pub=True)
        return comment


class Comment(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)
    text = models.TextField()
    pub = models.BooleanField(default=True)
    ip = models.GenericIPAddressField()
    post = models.ForeignKey(Post,
                             on_delete=models.CASCADE,
                             related_name='comments')

    objects = CommentManager()

    def __str__(self):
        return self.name + ' Re: ' + self.post.title


class Tag(models.Model):
    text = models.CharField(max_length=100, unique=True)

    def natural_key(self):
        return self.text

    def __str__(self):
        return self.text


class Series(models.Model):
    name = models.CharField(max_length=200)
    slug = PostSlugField(unique=True, default='auto')
    icon = models.TextField(blank=True)
    description = models.TextField(blank=True)
    time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Series'
        verbose_name_plural = 'Serieseses'
        ordering = ('-time', )


class SeriesPost(models.Model):
    series = models.ForeignKey(Series,
                               on_delete=models.CASCADE,
                               related_name='posts')
    post = models.ForeignKey(Post,
                             on_delete=models.CASCADE,
                             related_name='series')
    label = models.CharField(max_length=140, blank=True)
    srt = models.IntegerField()

    class Meta:
        ordering = ('srt', )

    def full_post(self):
        return Post.objects.filter(pk=self.post.id).prefetch_related(
            'tags', 'comments').first()


class Question(models.Model):
    survey = models.ForeignKey(Post, related_name='questions',
                               on_delete=models.CASCADE)
    text = models.CharField(max_length=280)
    name = models.CharField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField()


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers',
                                 on_delete=models.CASCADE)
    time = models.DateTimeField()
    ip = models.GenericIPAddressField()
    why = models.TextField(blank=True)
    name = models.TextField(blank=True)
