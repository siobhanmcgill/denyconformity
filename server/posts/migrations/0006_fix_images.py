from django.db import migrations
import re


def clean_posts(apps, schema_editor):
    Post = apps.get_model('posts', 'Post')
    img_re = re.compile(r'https://storage.cloud.google.com')
    for post in Post.objects.all():
        # Fix image urls to use the public version.
        summary = post.summary
        summary = img_re.sub(
            'https://storage.googleapis.com', summary)
        post.summary = summary

        body = post.text
        body = img_re.sub(
            'https://storage.googleapis.com', body)
        post.text = body

        post.save(update_fields=['summary', 'text'])


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_auto_20200614_1323'),
    ]

    operations = [
        migrations.RunPython(
            clean_posts, reverse_code=migrations.RunPython.noop),
    ]
