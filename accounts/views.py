from allauth.account.forms import LoginForm
from django.shortcuts import render

def login_view(request):
    form = LoginForm()
    return render(request, 'accounts/login.html', {'form':form})

def logout_view(request):
    return render(request, 'accounts/logout.html')

def signup_view(request):
    return render(request, 'accounts/signup.html')
