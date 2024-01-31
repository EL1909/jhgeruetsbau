from django.shortcuts import render

# Create your views here.


def index(request):
    """ A View to return the index page"""

    return render(request, 'home/home.html')

def leistungen(request):
    """ A View to return the leistungen page"""

    return render(request, 'home/leistungen.html')
