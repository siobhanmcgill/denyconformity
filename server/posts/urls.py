from django.urls import include, path
from rest_framework import routers

from .views import PostViewSet, SeriesViewSet, TagViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'series', SeriesViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls'))
]
