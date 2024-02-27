from allauth.account.forms import LoginForm, SignupForm
from allauth.account.views import LoginView, SignupView
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse


class LoginView(LoginView):
    template_name = 'accounts/login.html'
    form_class = LoginForm

    def get(self, request):
        # If user is already authenticated, redirect to profile
        if request.user.is_authenticated:
            return redirect('termine:termine')
        return render(request, self.template_name)

    def post(self, request):
        # Process the login form data
        form = self.form_class(request.POST, request.FILES)
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Return success response
            return JsonResponse({'success': True})
        else:
            # Return error response
            errors = form.errors
            return JsonResponse({'errors':errors}, status=400)


class SignupView(SignupView):
    template_name = 'account/signup.html'
    form_class = SignupForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(request=request)
            messages.success(request, f'Welcome {user.username}! Your account has been successfully created.')
            return JsonResponse({'success': True})
        else:
            errors = form.errors
            return JsonResponse({'errors': errors}, status=400)


def direct_logout_view(request):
    logout(request)
    return redirect('home')