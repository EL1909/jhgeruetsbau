# jhgeruetsbau
Josef Hundegger Gerutsbau Website



SERVICE REQUESTS

To implement a feature where all messages received by the modal can be seen by a registered user, you would need to set up a system to store and retrieve these messages. Below is a high-level guide on how you might achieve this:

Backend (Server-side):
Set up a backend server (if you don't have one already). You can use a web framework such as Django, Flask, Express.js, etc., depending on your preferred programming language. -DONE-

Create a database table or collection to store messages. Each message should have attributes like sender, receiver (user who received the message), content, timestamp, etc.

    Create a New Django App:
    Open a terminal and navigate to your Django project directory. Then run the following command to create a new app: python manage.py startapp messages -DONE- 

Define the Message Model:
Open the models.py file inside your newly created messages app and define the message model. For example:
python
Copy code
# messages/models.py

class Appointment(models.Model):
    contact_person = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    visit_date = models.DateField()
    rent_timeframe_weeks = models.PositiveIntegerField()
    address = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    notes = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming you have user authentication

    def __str__(self):
        return f"Appointment for {self.contact_person} on {self.visit_date}"
        
-DONE-


Don't forget to run python manage.py makemigrations and python manage.py migrate to apply the changes to your database.

Create API Endpoints:
Create views for handling message-related operations (sending and retrieving messages) and define corresponding API endpoints.

# messages/views.py

from django.views import View
from django.shortcuts import render
from .models import Message

class TerminList(View):
    template_name = 'messages/termin.html'

    def get(self, request, *args, **kwargs):
        termin = Message.objects.all()
        return render(request, self.template_name, {'messages': messages})


# messages/urls.py
Include these URLs in your project's main urls.py file:
python
Copy code
# project/urls.py
-DONE-

Configure Permissions:
Update your project's settings.py to include necessary permissions for your app.
python
Copy code

# project/settings.py

INSTALLED_APPS = [
    # ...
    'messages',
]
-DONE-


Ensure that you send the user's access token (obtained during authentication) in the Authorization header for authenticated requests.
Authentication:

Install Djando Allauth for user administration

Make sure your users are authenticated before allowing them to send or retrieve messages. Use a token-based authentication system, such as JWT (JSON Web Tokens).
Security:
Implement proper security measures, such as input validation, authentication checks, and secure communication (use HTTPS).
This is a simplified guide, and the actual implementation may vary based on your specific tech stack and requirements. Ensure that your application complies with best practices and security standards.


HUNDEGGER


## 07.02.24

Desired domain:
WWW.GERUESTBAU-HUNDEGGER.DE

users

efrain19091@gmailcom
admin
123455

hundegger.geruestbau@t-online.de
jhundegger
Josep0102

luciano@jh.de
Luciano
Gerustbau1909


- FONTS -

    font-family: "Protest Guerrilla", sans-serif;

    font-family: "Domine", serif;

- COLORS -
background-color: #01060f7e;
color: #f2f1f1;


## 15.02.24
"Account functionallties and alerts working as expected from modal"

Need to:

 - Verify if the form needs to be passed to the context in signupView
 - add is_approved field to allow who can see termins module
 - review all alerts and messages and set them to be translated
 - Add captcha to request service
 - Assure Footer shows in termin page
 - Include Notes for termines
 - Allow select Besucher in termin
 - Divide termin into OPEN | ACTIVE | COMPLETED
 - Hide logo as scroll up o Mobile
 - 
