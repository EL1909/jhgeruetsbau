from django import forms
from .models import Termin

class TerminForm(forms.ModelForm):
    # Define a CharField for notes with a Textarea widget
    notes = forms.CharField(widget=forms.Textarea, required=False)

    class Meta:
        model = Termin
        fields = '__all__'

    def clean_rent_timeframe(self):
        rent_timeframe = self.cleaned_data.get('rent_timeframe')

        if not rent_timeframe.isdigit():
            raise forms.ValidationError("Please enter a valid number for rent timeframe.")

        rent_timeframe = int(rent_timeframe)

        if rent_timeframe <= 0:
            raise forms.ValidationError("Rent timeframe must be a positive number.")

        return rent_timeframe