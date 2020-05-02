from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.list_posts, name='index'),
    path('posts/page/<int:page>', views.list_posts, name='page'),
    path('posts/<int:id>', views.fetch_post, name='post'),
    path('posts/<int:id>/comment', views.create_comment, name='comment'),
    path('posts/<int:post_id>/series', views.get_series, name='series')
]
