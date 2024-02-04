from django import forms
from django.forms import inlineformset_factory
from .models import Termin, Note


class TerminForm(forms.ModelForm):
    class Meta:
        model = Termin
        fields = '__all__'
        widgets = {
            'notes': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Gebäudegröße zum Beispiel'})
        }

