$(document).ready(function() {
    // Hide the h1 initially
    $("#ort").hide();

    // Fade in the h1 with a duration of 1000 milliseconds (adjust as needed)
    $("#ort").fadeIn(2500);

    var ortListDiv = $("#ortlist");
    
    // Hide the ortlist initially
    ortListDiv.hide();
    
    // Array of cities
    var cities = ["München", "Benediktbeuern", "Bichl", "Bad Tölz", "Murnau am Staffelsee", "Kochel am See", "Penzberg", "Jachenau", "Weilheim", "Peißenberg", "Wolfratshausen", "Garmisch-Partenkirchen", "Schongau", "Weilheim in Oberbayern", "Landsberg am Lech", "Holzkirchen", "Krün", "Mittenwald", "Walchensee"];

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

    var footer = $('footer');
    var footerHeight = footer.outerHeight();
    var lastScrollTop = 0;

    // Show/hide footer as the user scrolls
    $(window).scroll(function() {
        var scrolledHeight = $(document).height() - $(window).height() - $(window).scrollTop();
        var st = $(this).scrollTop();
    
        if (st > lastScrollTop || scrolledHeight < footerHeight * 1.5) {
            // Scrolling down or near the bottom of the page
            footer.css('bottom', '0');
        } else {
            // Scrolling up
            if (window.innerWidth <= 768) {
                // For mobile devices, adjust the condition based on your needs
                footer.css('bottom', -footerHeight + 'px');
            }
        }
    
        lastScrollTop = st;
    });

    // Get the modal link element by its id
    var modalLink = document.getElementById("modalLink");

    // Add a click event listener to the link
    modalLink.addEventListener("click", function (event) {
        // Prevent the default behavior of the link (e.g., navigating to another page)
        event.preventDefault();

        // Get the modal element by its id
        var modal = document.getElementById("serviceRequestModal");

        // Use Bootstrap's modal API to show the modal
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });
});

