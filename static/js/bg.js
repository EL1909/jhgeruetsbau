$(document).ready(function() {
    // Change background image to body::after based on background_image context processor
    function changeBackground() {
        if (Array.isArray(images)) {
            var randomIndex = Math.floor(Math.random() * images.length);
            var imageUrl = images[randomIndex]; // Update path to your images
            document.body.style.setProperty('--background-image', "url('" + imageUrl + "')");
        } else {
            console.error("background_images is not an array");
        }
    };

    // Call the function initially
    changeBackground();

    // Call the function every 5 seconds (5000 milliseconds)
    setInterval(changeBackground, 5000);
});