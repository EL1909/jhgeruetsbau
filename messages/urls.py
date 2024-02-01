from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('termin', views.TerminList.as_view(), name='termine'),
]