import os
from django.conf import settings

def background_images(request):
    media_dir = os.path.join(settings.MEDIA_ROOT, 'site/background/')
    image_files = [f for f in os.listdir(media_dir) if os.path.isfile(os.path.join(media_dir, f))]
    return {'background_images': image_files}

