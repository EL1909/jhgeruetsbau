// Change background image to bode::after based on background_image context processor

function changeBackground() {
    var images = {{ background_images|safe }}; // Update with your image filenames
    var randomIndex = Math.floor(Math.random() * images.length);
    var imageUrl = "/media/site/background/" + images[randomIndex]; // Update path to your images
    document.body.style.setProperty('--background-image', "url('" + imageUrl + "')"); // Corrected line
}

// Call the function initially
changeBackground();

// Call the function every 5 seconds (5000 milliseconds)
setInterval(changeBackground, 5000);