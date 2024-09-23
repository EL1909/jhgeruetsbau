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
 - review all alerts and messages and set them to be translated
 - Include Notes for termines
 - Allow select Besucher in termin
 - Hide logo as scroll up o Mobile
 


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


## 21.02.24

site ready to go LIVE with basic funtionallities such as
    1. Contact and termin generator
    2. Termin assignment to selected users and categorization in open - closed

Post-going live
    1. Fix captcha according SSL certificate
    2. Handle cookies EU policies
    3. Include Impressum page

V.2 potential imporvements
    1. Create profiles for each user and show they termins
    2. add multiple messages and interaction to notes section
    3. Add "reference" section with images of provided services, :hover with data regarding the image
    4. Add captcha to account creation
    5. Create user categories to assign task permission
    6. Add JavaScript validation library (e.g., jQuery Validate) to provide immediate feedback to users before form submission. to improve error rendering



## 27.01.24

Bring it Online

1. Environment Configuration:

Ensure your =production environment= meets the requirements for running Django. 

This includes having Python installed, along with any necessary dependencies specified in your requirements.txt file.

Set up a virtual environment for your project to isolate its dependencies from other projects and the system-wide Python installation.

    1.1 Server Provider Selection
Select a Server Provider: Choose a server provider based on factors such as pricing, features, scalability, geographic location, and ease of use. Each provider offers different services and configurations, so you'll want to research and compare them to find the best fit for your requirements.

    1.1.1 Google Cloud Platform Account created

1.2 Set Up a Server Instance/ Set Up a Virtual Machine Instance:
In the Cloud Console, navigate to the Compute Engine section and click on "VM instances". Click the "Create" button to create a new virtual machine instance.

Configure the instance settings, including the machine type, boot disk (select a Linux distribution like Ubuntu), and any additional options you need. You can also set up SSH access to the instance.

Once you've configured the instance settings, click the "Create" button to provision the virtual machine.


    PRICES ARE TOO HIGH, DECIDED TO KEEP WITH HEROKU AND LOOK FOR A BETTER LONG TERM SOLUTION
        Can not install Heroku via Brew, lacking of space in my current computer


1.3 Deploy Your Django Project: After setting up the server instance, you'll upload your Django project files to the server. This typically involves using tools like Git for version control and SSH for secure file transfer.

    1.3.1 - STATIC FILES will be handled by whitenoise, installed to the project via VS.Code Terminal

    1.3.2 - MEDIA FILES will be handled with Google Cloud Storage due to small amount of data (so far)
        Google Cloud Storage incurr high costs; 
    1.3.3 - MEDIA FILES will be handled by Cloudinary
        - CLOUDINARY SETUP -
        - Sign Up for Cloudinary:
        - Install Cloudinary Python SDK: $ pip install cloudinary
        - Configure Cloudinary in Django project's settings.py file, add the following configuration settings for Cloudinary:

            # settings.py

            import cloudinary
            import cloudinary.uploader
            import cloudinary.api

            # Cloudinary configuration
            cloudinary.config(
                cloud_name='your_cloud_name',
                api_key='your_api_key',
                api_secret='your_api_secret'
            )
                
        - Media Uploads using the Cloudinary Python SDK's upload() method. 
        In this case as i have no upload mage functionallity so far, i only uploaded the BGimages.

        - Integrate Cloudinary URLs in Templates, In this case i have modified the context processor within home to fetch the images from ccloudinary.

        - Handle Media Deletion (Optional).

1.4 Install PostgreSQL:

        1.4.1 - Add PostgreSQL Add-On: Provision a PostgreSQL database add-on for your Heroku app by running:
                - I did not because costs did applied, instead created a free instance in ElephantSQL:
        1.4.2 - Configure Django to Use ElephantSQL Database Locally:
                - Install Required Packages: $ pip install psycopg2-binary
                - Update Django Settings:

                        # settings.py

                        DATABASES = {
                            'default': {
                                'ENGINE': 'django.db.backends.postgresql',
                                'NAME': 'your_database_name',
                                'USER': 'your_database_username',
                                'PASSWORD': 'your_database_password',
                                'HOST': 'your_database_host',
                                'PORT': 'your_database_port',
                            }
                        }

                - Apply Migrations: $ python3 manage.py makemigrations
                                    $ python3 manage.py migrate

                - Test Connection:
                    Database models are created but new database for users need to be prompted.   


1.5 Prepare Django Project for Deployment to Heroku:
    - Install gunicorn: $ pip install gunicorn
                        $ pip freeze > requirements.txt

    - Configure Static and Media Files: -DONE-
    - Deploy Django Project to Heroku:
    - Set Up Environment Variables:
        - DATABASE_URL
        - DEBUG
        - DISABLE_COLLECTSTATIC
        - SECRET_KEY
        - CLOUDINARY_URL
        - PORT 
    
        - EMAIL_BACKEND
        - STATIC_ROOT
        - MEDIA_ROOT
        - ALLOWED_HOSTS

    - Commit your changes to your Git repository.
    - Deploy Your Application to Heroku:



2. Database Setup:
Choose a production-ready database like PostgreSQL, MySQL, or SQLite (not recommended for production).
Update your Django project settings (settings.py) to use the appropriate database settings for your production database.


3. Static and Media Files Handling:
Configure your web server (like Nginx or Apache) to serve static and media files efficiently.
Review Django's static files documentation to ensure you understand how to manage static files in production.

4. Security:
Review Django's security documentation and ensure your project follows best practices, including setting proper security settings, handling user authentication securely, and protecting against common web vulnerabilities like CSRF, XSS, and SQL injection.
Consider using HTTPS to encrypt data transmitted between the client and server.

5. Deployment Strategy:
Choose a deployment strategy that suits your needs, such as using a Platform-as-a-Service (PaaS) provider like Heroku, a dedicated server, or a cloud hosting provider like AWS, Google Cloud, or DigitalOcean.
Familiarize yourself with deployment tools like Fabric, Ansible, or Docker for automating deployment tasks.

6. Web Server Configuration:
Set up and configure a web server (such as Nginx or Apache) to serve your Django application.
Configure the web server to proxy requests to your Django application running on a WSGI server like Gunicorn or uWSGI.

7. Domain Name and DNS Configuration:
Register a domain name for your project if you haven't already done so.
Configure DNS settings to point your domain name to your server's IP address.

8. Monitoring and Logging:
Set up monitoring and logging solutions to track the health and performance of your Django application in production.
Configure logging to capture relevant information for debugging and monitoring purposes.

9. Backup and Disaster Recovery:
Implement backup strategies to regularly back up your database and any other critical data.
Have a disaster recovery plan in place to handle unforeseen issues or outages.

10. Testing:
Before deploying to production, thoroughly test your application in a staging environment to catch any potential issues or bugs.
Consider using automated testing frameworks like Django's built-in testing tools or pytest to automate testing procedures.

11. Scaling:
Consider scalability requirements and plan for future growth by designing your application to scale horizontally or vertically as needed.

12. Documentation:
Document your deployment process, including any custom configurations or setup steps, to make it easier to maintain and troubleshoot your application in the future.
By reviewing and addressing these aspects, you'll be better prepared to take your Django project online and ensure its successful deployment in a production environment.



## First Deliver

The website is ready to use for:

    - Making appoinments
    - Create users
    - Review appointments
    - Assign appointments to a user 
    - Open and close appointments 

Post-going live
    1. Fix captcha according SSL certificate
    2. Handle cookies EU policies
    3. Include Impressum page

V.2 potential imporvements
    1. Create profiles for each user and show they termins
    2. add multiple messages and interaction to notes section
    3. Add "reference" section with images of provided services, :hover with data regarding the image
    4. Add captcha to account creation
    5. Create user categories to assign task permission
    6. Add JavaScript validation library (e.g., jQuery Validate) to provide immediate feedback to users before form submission. to improve error rendering

    Die Absicht, die so schnell online zu stellen, besteht darin, dass Euch navigieren und darüber nachdenken können, was Sie hinzufügen möchten, 
    
    Bevor ich es tatsächlich öffentlich mache, muss ich auch Sicherheitsmaßnahmen zur Website hinzufügen, da diese derzeit nicht vorhanden sind.
    
    Wird derzeit auf einem begrenzten Server gehostet, den ich für kleine Projekte verwende. Ich weiß immer noch nicht genau, wie hoch die Wartungskosten für die Aktivierung der Website sind. Ich muss recherchieren, um die richtigen Informationen anzubieten.

    LG!




# LIVE FROM ESFUERZO VM

    1. Folder created within VM/projects
    2. Fecth project from github using token (esfuerzo)
    3. 