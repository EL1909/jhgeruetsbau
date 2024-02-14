$(document).ready(function() {

    // Add a delay of 0.3 seconds before adding the 'navbar-loaded' class
    setTimeout(function() {
        $(".navbar-brand").addClass("navbar-loaded");
    }, 800); // 0.3 seconds delay
    
    // Hide the h1 initially
    $("#ort").hide();

    // Auto-Hide Expanded Menu
    const navbarContainer = $('.navbar-collapse');

    navbarContainer.on('mouseleave', function() {
        // Hide the navbar when the user leaves its container
        navbarContainer.removeClass('show');
    });

    // Fade in the h1 with a duration of 1000 milliseconds (adjust as needed)
    $("#ort").fadeIn(2500);

    let footer = $('footer');
    let footerHeight = footer.outerHeight();
    let lastScrollTop = 0;

    // Show/hide footer as the user scrolls
    $(window).scroll(function() {
        var scrolledHeight = $(document).height() - $(window).height() - $(window).scrollTop();
        var st = $(this).scrollTop();
    
        if (scrolledHeight == 0) {
            footer.css('bottom', '0');
        } else {
            // Hide the footer if user is not at the bottom of the page
            if (window.innerWidth <= 768) {
                // For mobile devices, adjust the condition based on your needs
                footer.css('bottom', -footerHeight + 'px');
            }
        }
    
        lastScrollTop = st;
    });

    // Leistungen show as tab is clicked behavior
    $('#leistungen-tab').click(function() {
        // Scroll the page to the top position of the second-content div
        $('html, body').animate({
            scrollTop: $('#second-content').offset().top
        }, 500); // Adjust the duration of the animation as needed (in milliseconds)
    });


    // Handling leistungen list's behavior

    var leistungenDiv = $("#leistungen");
    var kontaktLi = $("#loginModalLink");
    
    // Array of leistungen
    var leistungen = ["Fassadengerüste", "Schutzgerüste", "Raumgerüste", "Fahrgerüste", "Trag - & Stützgerüste", "Passantentunnel", "Treppentürme", "Personenaufzüge", "Sonderkonstruktionen für Kirchtürme", "Fluchttreppen", "Kraftwerke"];

    // Create a <ul> element
    var ul = $("<ul>");

    // Iterate through the leistungen array
    leistungen.forEach(function(leistung, index) {
        // Create a <li> element for each leistung
        var li = $("<li>");
        // Create a <span> for the Font Awesome icon
        var icon = $("<span>").addClass("fas fa-wrench");
        // Append the icon and text to the <li>
        li.append(icon).append("  " + leistung); // Adjust spacing if needed
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
