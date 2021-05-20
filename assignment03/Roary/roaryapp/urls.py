from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('roars/', views.roars, name='roars'),
    path('favorites/', views.favorites, name='favorites'),
    path('postMessage/', views.postMessage, name='postMessage'),
]