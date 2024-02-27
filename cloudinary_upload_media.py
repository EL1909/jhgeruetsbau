import os
import cloudinary
from cloudinary.uploader import upload
from decouple import config

# Configure Cloudinary

cloudinary.config(
    cloud_name=config('CLOUDINARY_CLOUD_NAME'),
    api_key=config('CLOUDINARY_API_KEY'),
    api_secret=config('CLOUDINARY_API_SECRET')
)

# Path to local media directory
local_media='./media/site/background/'

# Iterate over files in media directory
for filename in os.listdir(local_media):
    if os.path.isfile(os.path.join(local_media, filename)):
        # Upload the file to cloudinary
        response = upload(os.path.join(local_media, filename), folder='jhgeruestbau/media/site/background')
        print('Uploaded:', response['secure_url'])
