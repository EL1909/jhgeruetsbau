from django import forms
from .models import Termin

class TerminForm(forms.ModelForm):
    class Meta:
        model = Termin
        fields = '__all__'

