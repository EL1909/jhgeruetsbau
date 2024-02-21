from django import forms
from django_recaptcha.fields import ReCaptchaField
from .models import Termin


class terminForm(forms.ModelForm):
    # captcha = ReCaptchaField()

    class Meta:
        model = Termin
        fields = '__all__'
        widgets = {
            'notes': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Gebäudegröße zum Beispiel'})
        }

