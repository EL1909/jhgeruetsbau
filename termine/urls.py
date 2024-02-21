from django.contrib import admin
from django.urls import path
from . import views

app_name = 'termine'

urlpatterns = [
    path('termin', views.terminList.as_view(), name='termine'),
    path('neue_termin', views.createTermin.as_view(), name='neue_termin'),
    path('update_termin/<int:id>/', views.updateTermin.as_view(), name='update_termin'),
]