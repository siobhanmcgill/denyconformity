from django.db import models

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


class Comment(models.Model):
    time = models.DateTimeField()
    name = models.CharField(max_length=200)
    text = models.TextField()
    pub = models.BooleanField()
    summary = models.TextField()
    ip = models.GenericIPAddressField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    def __str__(self):
        return self.title


class Tag(models.Model):
    text = models.CharField(max_length=100, unique=True)
    
    def natural_key(self):
        return self.text

    def __str__(self):
        return self.text


class Series(models.Model):
    name = models.CharField(max_length=200)
    style = models.TextField()
    posts = models.ManyToManyField(Post, through='SeriesPost')
    def __str__(self):
        return self.name


class SeriesPost(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    srt = models.IntegerField()