from django.views import View
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.http import JsonResponse
from .models import Termin, Note
from .forms import TerminForm

class TerminList(View):
    template_name = 'termine/termin.html'

    def get(self, request, *args, **kwargs):
        termins = Termin.objects.all()
        return render(request, self.template_name, {'termins': termins})

class CreateTermin(View):
    template_name = 'home/modal.html'
    form_class = TerminForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        notes_formset = self.notes_formset_class()
        return render(request, self.template_name, {'form': form, 'notes_formset':notes_formset})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid(): 
            termin = form.save(commit=False)
            termin.save()
            messages.success(request, f'Ihr neuer Termin ist am {termin.visit_date}')
            return redirect(reverse('home'))
        else:
            data = {'error': form.errors}
        return JsonResponse(data, status=400)
        


