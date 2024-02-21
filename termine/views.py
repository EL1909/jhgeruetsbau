from django.views import View
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from django.http import JsonResponse
from django.template.loader import render_to_string
from .models import Termin
from .forms import terminForm
import json


class terminList(View):
    template_name = 'termine/termin.html'

    def get(self, request, *args, **kwargs):
        termins = Termin.objects.filter(is_taken=False)
        takens = Termin.objects.filter(is_taken=True)
        users = get_user_model().objects.all()
        context = {
            'termins': termins, 
            'takens': takens,
            'users': users,
        }
        return render(request, self.template_name, context)

class createTermin(View):
    template_name = 'home/modal.html'
    form_class = terminForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        context = {'form': form, 'RECAPTCHA_PUBLIC_KEY': settings.RECAPTCHA_PUBLIC_KEY}
        print(context['RECAPTCHA_PUBLIC_KEY'])
        return render(request, self.template_name, context)

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


class updateTermin(View):
    def post(self, request, id):
        # Get the termin object or return 404
        print("Received request for termin ID:", id)
        termin = get_object_or_404(Termin, pk=id)
        # Log received data
        print("Received data:", request.POST)


        # Update the termin fields
        is_taken = request.POST.get('is_taken') == 'true'
        if is_taken == True:
            termin.is_taken = True
            termin.taken_date = timezone.now()  # Set taken_date if is_taken is True
        else:
            termin.is_taken = False
            termin.taken_date = None  # Reset taken_date if is_taken is False

        # Update the user field
        username = request.POST.get('user')
        if username:
            try:
                User = get_user_model()
                user = User.objects.get(username=username)
                termin.user = user
            except User.DoesNotExist:
                # Handle the case where the user does not exist
                pass
        # Save the updated termin object
        termin.save()

        # Return a JSON response indicating success
        print("Received data:", request.POST)
        return JsonResponse({'message': 'Termin updated successfully, message from view'})
    


