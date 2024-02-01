from django.db import models
from django.contrib.auth.models import User

class Termin(models.Model):
    contact_person = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    visit_date = models.DateField()
    rent_timeframe = models.IntegerField()
    address = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    notes = models.ManyToManyField(Note, related_name='termin_notes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming you have user authentication

    def __str__(self):
        return f"Appointment for {self.contact_person} on {self.visit_date}"


class Note(models.Model):
    message = models.ForeignKey('Termin', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)