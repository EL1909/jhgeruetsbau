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
12345

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
 - Assure Footer shows in termin page
 - Include Notes for termines
 - Allow select Besucher in termin
 - 
 - Hide logo as scroll up o Mobile
 - 


## 20.02.24

 - Add captcha to request service
   
1. Choose a CAPTCHA service: There are several CAPTCHA services available such as Google reCAPTCHA, hCaptcha, and others. Choose one and obtain the necessary credentials (site key and secret key).

Installation
1.1 Sign up for reCAPTCHA.

1.2 Install with pip install django-recaptcha.

1.3 Add 'django_recaptcha' to your INSTALLED_APPS setting.


INSTALLED_APPS = [
    ...,
    'django_recaptcha',
    ...
]

1.4 Add the Google reCAPTCHA keys generated in step 1 to your Django production settings with RECAPTCHA_PUBLIC_KEY and RECAPTCHA_PRIVATE_KEY. Note that omitting these settings will default to a set of test keys refer to Local Development and Functional Testing for more information.
For example:

RECAPTCHA_PUBLIC_KEY = 'MyRecaptchaKey123'
RECAPTCHA_PRIVATE_KEY = 'MyRecaptchaPrivateKey456'


These can also be specified per field by passing the public_key or private_key parameters to ReCaptchaField - see field usage below.

(OPTIONAL) If you require a proxy, add a RECAPTCHA_PROXY setting (dictionary of proxies), for example:
RECAPTCHA_PROXY = {'http': 'http://127.0.0.1:8000', 'https': 'https://127.0.0.1:8000'}
(OPTIONAL) In the event www.google.com is not accessible the RECAPTCHA_DOMAIN setting can be changed to www.recaptcha.net as per the reCAPTCHA FAQ:
RECAPTCHA_DOMAIN = 'www.recaptcha.net'
This will change the Google JavaScript api domain as well as the client side field verification domain.

2. Integrate CAPTCHA into your Django project:

2.1 Install the necessary package for the chosen CAPTCHA service. For example, if you're using Google reCAPTCHA, you might want to use django-recaptcha package.

2.2 Follow the instructions provided by the CAPTCHA service to integrate it with your Django project. Typically, you'll need to include the necessary JavaScript in your HTML templates and handle the verification on the server side.

3. Update your modal template:

3.1 Add the CAPTCHA widget provided by the chosen service to your modal form.

3.2 Ensure that the CAPTCHA widget is included within your <form> tags.

4. Update your Django view:

4.1 In your Django view that handles the form submission, include logic to validate the CAPTCHA response.

4.2 If using Google reCAPTCHA with django-recaptcha, you can use the validate_recaptcha function provided by the package to validate the CAPTCHA response.

5. Handle CAPTCHA verification in the view:
5.1 If the CAPTCHA verification fails, return an error message to the user and do not process the form submission.
5.2 If the CAPTCHA verification succeeds, continue processing the form submission as usual.

CONCLUSION:
    1. As i call the attribute "data-sitekey="" " using {{ RECAPTCHA_PUBLIC_KEY }}, captcha doesn't show, but if i type th value straigth to the attr, it loads the captcha, therefore, i need to verify comunication between setting.py, .env and template being rendered.
    2. If attr is directly feeded with RECAPTCHA_PUBLIC_KEY value, captcha loads, but in submission the form shows an error for missing SSL certificate, wich need to be PURCHASED upon domain registration.

    therefore i will contonue with captcha configuration as website is live.
    
    p.d: in order to load the captcha i need to add this script

    Google reCaptcha
    <script src="https://www.google.com/recaptcha/api.js"></script>

- Divide termin into OPEN | COMPLETED - not needed active


// Send AJAX request to update the termin
        $.ajax({
            url: "/update_termin/" + terminId + "/",
            type: "POST",
            dataType: "json",
            data:: {
                csrfmiddlewaretoken: '{{ csrf_token }}', // Include CSRF token
                is_taken: isTaken,
                user_id: userId
            },
            success: function(response) {
                console.log("Termin updated successfully:", response.message);
                // Perform any necessary actions after successful update
            },
            error: function(xhr, status, error) {
                console.error("Error updating termin:", error);
                // Handle errors appropriately
            }
        });


        // Send AJAX request to update the termin
        $.ajax({
            url: "/update-termin/" + terminId + "/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ is_taken: isTaken, user_id: userId }),
            success: function(response) {
                console.log("Termin updated successfully");
                // Perform any necessary actions after successful update
            },
            error: function(xhr, status, error) {
                console.error("Error updating termin:", error);
                // Handle errors appropriately
            }
        });





        