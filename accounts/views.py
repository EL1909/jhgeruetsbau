from allauth.account.forms import LoginForm, SignupForm
from allauth.account.views import LoginView, SignupView
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse


class LoginView(LoginView):
    template_name = 'accounts/login.html'

    def get(self, request):
        # If user is already authenticated, redirect to profile
        if request.user.is_authenticated:
            return redirect('termine:termine')
        return render(request, self.template_name)

    def post(self, request):
        # Process the login form data
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to home or some other page after successful login
            return redirect('home')
        else:
            # If authentication fails, render the login page again with error message
            return render(request, self.template_name, {'error_message': 'Invalid username or password'})



class SignupView(SignupView):
    template_name = 'account/signup.html'

    def get(self, request, *args, **kwargs):
        form = SignupForm()
        return render(request, self.template_name, {'form': form})
    
    def post(self, request, *args, **kwargs):
        form = SignupForm(request.POST, request.FILES)
        if form.is_valid():
            user_model = get_user_model()
            new_user = user_model.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password1'],
            )
            messages.success(request, 'Willkommen {{self.username}}')
            return redirect(reverse('home'))
        
        return render(request, self.template_name, {'form': form})
    
    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            messages.error('password2', 'Kennwort Bestätig')
            
        ## Validate Password using Django's built-in password validation
        try:
            password_validation.validate_password(password1, self.instance)
        except ValidationError as e:
            self.add_error('password1', e.messages[0])
        return cleaned_data


def direct_logout_view(request):
    logout(request)
    return redirect('home')