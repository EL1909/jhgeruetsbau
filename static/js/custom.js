$(document).ready(function () {
    // Hide the h1 initially
    $("#ort").hide();

    // Fade in the h1 with a duration of 1000 milliseconds (adjust as needed)
    $("#ort").fadeIn(2500);

    var ortListDiv = $("#ortlist");
    
    // Hide the ortlist initially
    ortListDiv.hide();
    
    // Array of cities
    var cities = ["München", "Benediktbeuern", "Bichl", "Bad Tölz", "Murnau am Staffelsee", "Kochel am See", "Penzberg", "Wolfratshausen", "Garmisch-Partenkirchen", "Schongau", "Weilheim in Oberbayern", "Landsberg am Lech", "Holzkirchen", "Krün", "Mittenwald", "Walchensee"  ]
;

        // Create a <ul> element
        var ul = $("<ul>");

        // Iterate through the cities array
        cities.forEach(function(city, index) {
            // Create a <li> element for each city
            var li = $("<li>").text(city);

            // Append the <li> element to the <ul>
            ul.append(li);

            // Delay each li's fadeIn based on its index
            li.hide().delay(500 * index).fadeIn(800); // Adjust delay and fadeIn speed as needed
        });

        // Append the <ul> to the ortlist div and fadeIn
        ortListDiv.append(ul).fadeIn(3000); // Adjust the fadeIn speed if needed
});

