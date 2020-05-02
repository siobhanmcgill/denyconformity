from django.db import models
from django.utils.html import strip_tags

# Here are the commands to bootstrap the database:

# python manage.py makemigrations posts
# python manage.py sqlmigrate posts [number]
# python manage.py migrate

# py manage.py loaddata [fixture name]


class Post(models.Model):
    time = models.DateTimeField()
    title = models.CharField(max_length=200)
    text = models.TextField()
    pub = models.BooleanField()
    summary = models.TextField()
    tags = models.ManyToManyField('Tag')

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
    icon = models.TextField(blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Series'
        verbose_name_plural = 'Serieseses'


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
