from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.list_posts, name='index'),
    path('posts/page/<int:page>', views.list_posts, name='page'),
]
