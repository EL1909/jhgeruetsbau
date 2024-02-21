from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    content = models.CharField(max_length=255,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class Termin(models.Model):
    contact_person = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    visit_date = models.DateField()
    rent_timeframe = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    notes = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    is_taken = models.BooleanField(default=False)
    taken_date = models.DateField(blank=True, null=True)


    def __str__(self):
        return f"Appointment for {self.contact_person} on {self.visit_date}"

