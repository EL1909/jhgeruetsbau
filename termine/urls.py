from django.contrib import admin
from django.urls import path
from . import views

app_name = 'termine'

urlpatterns = [
    path('termin', views.TerminList.as_view(), name='termine'),
    path('neue_termin', views.CreateTermin.as_view(), name='neue_termin'),
]