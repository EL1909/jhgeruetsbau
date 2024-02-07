$(document).ready(function() {

    // Hide the h1 initially
    $("#ort").hide();

    // Fade in the h1 with a duration of 1000 milliseconds (adjust as needed)
    $("#ort").fadeIn(2500);

    var leistungenDiv = $("#leistungen");
    
    // Array of leistungen
    var leistungen = ["Fassadengerüste", "Schutzgerüste", "Raumgerüste", "Fahrgerüste", "Trag - & Stützgerüste", "Passantentunnel", "Treppentürmee", "Personenaufzüge", "Sonderkonstruktionen für Kirchtürme", "Fluchttreppen und Kraftwerke"];

    // Create a <ul> element
    var ul = $("<ul>");

    // Iterate through the leistungen array
    leistungen.forEach(function(leistung, index) {
        // Create a <li> element for each leistung
        var li = $("<li>");
        // Create a <span> for the Font Awesome icon
        var icon = $("<span>").addClass("fa fa-wrench"); // Adjust the class for your desired Font Awesome icon
        // Append the icon and text to the <li>
        li.append(icon).append(" " + leistung); // Adjust spacing if needed
        // Append the <li> element to the <ul>
        ul.append(li);

        // Delay each li's fadeIn based on its index
        li.hide().delay(500 * index).fadeIn(800); // Adjust delay and fadeIn speed as needed
    });

    // Append the <ul> to the ortlist div and fadeIn
    leistungenDiv.append(ul).fadeIn(3000); // Adjust the fadeIn speed if needed

    // Function to close navbar when clicking outside of it
    $(document).click(function(event) {
        var navbarNav = $(".navbar-nav");
        // Check if the clicked element is not within the navbar-nav
        if (!navbarNav.is(event.target) && navbarNav.has(event.target).length === 0) {
            // Close the navbar by removing the 'show' class
            navbarNav.removeClass("show");
        }
    });

});

