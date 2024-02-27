# Background Selection using Cloudinary
import cloudinary
from cloudinary import api
from decouple import config

def background_images(request):
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=config('CLOUDINARY_CLOUD_NAME'),
        api_key=config('CLOUDINARY_API_KEY'),
        api_secret=config('CLOUDINARY_API_SECRET')
    )

    # Fetch resources from the specified folder
    folder = 'jhgeruestbau/media/site/background'
    response = api.resources(type="upload", prefix=folder)
    # Extract secure URLs from the response
    cloudinary_urls = [resource['secure_url'] for resource in response['resources']]
    # Return the list of Cloudinary URLs
    return {'background_images': cloudinary_urls}



# Background selection without Cloudinary

# import os
# from django.conf import settings

# def background_images(request):
#     media_dir = os.path.join(settings.MEDIA_ROOT, 'site/background/')
#     image_files = [f for f in os.listdir(media_dir) if os.path.isfile(os.path.join(media_dir, f))]
#     return {'background_images': image_files}

