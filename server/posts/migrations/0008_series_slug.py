# Generated by Django 3.0.7 on 2020-08-08 20:58

from django.db import migrations
from django.db import models
import django.utils.timezone
import posts.models
import re


def increment_slug(slug, used_slugs, depth=0):
    if depth > 0:
        slug_with_depth = '{}-{}'.format(slug, depth)
    else:
        slug_with_depth = slug
    if slug_with_depth in used_slugs:
        print('slug {} already in list, trying depth {}'.format(
            slug_with_depth, depth + 1))
        return increment_slug(slug, used_slugs, depth + 1)
    else:
        return slug_with_depth


def clean_series(apps, schema_editor):
    Series = apps.get_model('posts', 'Series')
    used_slugs = []
    slug_re = re.compile(r"(&[a-z0-9]+;)|(#[a-z0-9]+;)|[^a-z0-9\-]")
    for series in Series.objects.all():
        # Find the latest post
        post_time = series.posts.first().post.time
        series.time = post_time

        # Generate a slug
        slug = series.name.replace(' ', '-').lower()
        slug = slug_re.sub("", slug)
        if not slug:
            slug = 'series-' + str(series.id)
        series.slug = increment_slug(slug, used_slugs)
        used_slugs.append(series.slug)

        series.save(update_fields=['slug', 'time'])


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_auto_20200726_1616'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='series',
            options={'ordering': ('-time',), 'verbose_name': 'Series', 'verbose_name_plural': 'Serieseses'},
        ),
        migrations.AddField(
            model_name='series',
            name='time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='series',
            name='slug',
            field=posts.models.PostSlugField(default='auto'),
        ),
        migrations.RunPython(
            clean_series, reverse_code=migrations.RunPython.noop),
        migrations.AlterField(
            model_name='series',
            name='slug',
            field=posts.models.PostSlugField(default='auto', unique=True),
        ),
    ]
