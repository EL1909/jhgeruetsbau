from django.views import View
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Termin
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
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            termin = form.save()
            data = {'message':f'Ihr neuer Termin ist am {termin.visit_date}'}
            return JsonResponse(data)
        else:
            data = {'error': form.errors}
            return JsonResponse(data, status=400)

