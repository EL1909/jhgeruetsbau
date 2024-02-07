from allauth.account.forms import LoginForm, SignupForm
from allauth.account.views import LoginView, SignupView
from django.contrib.auth import logout
from django.shortcuts import render, redirect


class LoginView(LoginView):
    template_name = 'accounts/login.html'


class SignupView(SignupView):
    template_name = 'accounts/signup.html'


def direct_logout_view(request):
    logout(request)
    return redirect('home')