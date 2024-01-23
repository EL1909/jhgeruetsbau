$(document).ready(function() {
    // Get the h1 and ortlist elements
    var h1Element = $("#ort h1");
    var ortListDiv = $("#ortlist");

    // Hide the ortlist initially
    ortListDiv.hide();

    // Use fadeIn to show the h1 with a fade-in effect
    h1Element.fadeIn(2000, function() {
        // Callback function: executed after the fadeIn animation is complete

        // Array of cities
        var cities = ["City1", "City2", "City3", "City4"];

        // Create a <ul> element
        var ul = $("<ul>");

        // Iterate through the cities array
        cities.forEach(function(city, index) {
            // Create a <li> element for each city
            var li = $("<li>").text(city);

            // Append the <li> element to the <ul>
            ul.append(li);

            // Delay each li's fadeIn based on its index
            li.hide().delay(300 * index).fadeIn(500); // Adjust delay and fadeIn speed as needed
        });

        // Append the <ul> to the ortlist div and fadeIn
        ortListDiv.append(ul).fadeIn(1000); // Adjust the fadeIn speed if needed
    });
});
