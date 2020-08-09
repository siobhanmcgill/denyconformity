from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SeriesPost
import datetime

# Sets the series time to 'now' when adding a new post to it.
@receiver(post_save, sender=SeriesPost)
def update_series_on_post(sender, instance, created, **kwargs):
  series.time = datetime.now()
  series.save(update_fields=['time'])
