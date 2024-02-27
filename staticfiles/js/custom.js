$(document).ready(function() {
    // Add a delay of 0.6 seconds before adding the 'navbar-loaded' class
    setTimeout(function() {
        $(".navbar-brand").addClass("navbar-loaded");
    }, 600);

    // Hide the h1 initially
    $("#ort, #termine").hide();

    // Fade in the h1 "Gerústbau im Alpenvorland"
    $("#ort, #termine").fadeIn(1500);

    // Leistungen show as tab is clicked behavior
    $('#leistungen-tab').click(function() {
        // Scroll the page to the top position of the second-content div
        $('html, body').animate({
            scrollTop: $('#second-content').offset().top
        }, 500); // Adjust the duration of the animation as needed (in milliseconds)
    });

    // Handling leistungen list's behavior
    var leistungenDiv = $("#leistungen");
    var leistungen = ["Fassadengerüste", "Schutzgerüste", "Raumgerüste", "Fahrgerüste", "Trag - & Stützgerüste", "Passantentunnel", "Treppentürme", "Personenaufzüge", "Sonderkonstruktionen für Kirchtürme", "Fluchttreppen", "Kraftwerke"];
    var ul = $("<ul>");
    leistungen.forEach(function(leistung, index) {
        var li = $("<li>");
        var icon = $("<span>").addClass("fas fa-wrench");
        li.append(icon).append("  " + leistung);
        ul.append(li);
        li.hide().delay(500 * index).fadeIn(800);
    });
    leistungenDiv.append(ul).fadeIn(3000);

    // Auto-Hide Expanded Menu
    const navbarContainer = $('.navbar-collapse');
    navbarContainer.on('mouseleave', function() {
        // Hide the navbar when the user leaves its container
        navbarContainer.removeClass('show');
    });

    // Listen for clicks on phone number
    $('#phone').click(function() {
    // Get the phone number text
    var phoneNumber = $(this).text().trim();
    // Use tel protocol to initiate the call
    window.location.href = 'tel:' + phoneNumber;
    });

    // Initially hide closed termins
    $("#taken-list").hide();

    // Event listener for clicking on the open tab
    $("#open-tab").click(function() {
    $("#termin-list").show();
    $("#taken-list").hide();
    $(this).addClass("active");
    $("#closed-tab").removeClass("active");
    });

    // Event listener for clicking on the closed tab
    $("#closed-tab").click(function() {
    $("#taken-list").show();
    $("#termin-list").hide();
    $(this).addClass("active");
    $("#open-tab").removeClass("active");
    });
    
    // Listen for clicks on termin items
    $('.termin-item').click(function() {
        // Get data from clicked termin item
        var terminId = $(this).data('termin-id');
        var contactPerson = $(this).data('contact-person');
        var phone = $(this).data('phone');
        var email = $(this).data('email');
        var visitDate = $(this).data('visit-date');
        var rentTimeframe = $(this).data('rent-timeframe');
        var address = $(this).data('address');
        var zipcode = $(this).data('zipcode');
        var city = $(this).data('city');
        var notes = $(this).data('notes');
        var user = $(this).data('user');
        var isTaken = $(this).data('is_taken') === true;

        
        // Update content of selected-termin elements
        $('#contact_person p').text(contactPerson);
        $('#phone p').text(phone);
        $('#email p').text(email);
        $('#visit_date p').text(visitDate);
        $('#rent_timeframe p').text(rentTimeframe + " Wochen");
        $('#address p').text(address);
        $('#zipcode p').text(zipcode);
        $('#city p').text(city);
        $('#notes p').text(notes);
        $('#user p').text(user);
        $('#terminId p').text(terminId);

        // Set the checked attribute of the is_taken switch based on the is_taken value
        $('#is_taken_switch').prop('checked', isTaken);
    });

    // Event listener for clicking on taken items
    $('.taken-item').click(function() {
        // Get data from clicked taken item
        var terminId = $(this).data('termin-id');
        var contactPerson = $(this).data('contact-person');
        var phone = $(this).data('phone');
        var email = $(this).data('email');
        var visitDate = $(this).data('visit-date');
        var rentTimeframe = $(this).data('rent-timeframe');
        var address = $(this).data('address');
        var zipcode = $(this).data('zipcode');
        var city = $(this).data('city');
        var notes = $(this).data('notes');
        var user = $(this).data('user');
        var isTaken = $(this).data('is_taken');

        // Update content of selected-termin elements
        $('#contact_person p').text(contactPerson);
        $('#phone p').text(phone);
        $('#email p').text(email);
        $('#visit_date p').text(visitDate);
        $('#rent_timeframe p').text(rentTimeframe + " Wochen");
        $('#address p').text(address);
        $('#zipcode p').text(zipcode);
        $('#city p').text(city);
        $('#notes p').text(notes);
        $('#user p').text(user);
        $('#terminId p').text(terminId);

        // Set the checked attribute of the is_taken switch based on the is_taken value
        $('#is_taken_switch').prop('checked', isTaken);
        
        // Select the appropriate option in the select element
        $('#userSelect').val(user); // Assuming username matches option values in the select element

    });

    // Add event listener for the "Apply" button
    $("#applyButton").click(function() {
        // Get the selected termin ID
        var terminId = $("#terminId p").text().trim();
        
        // Get the value of is_taken checkbox
        var isTaken = $("#is_taken_switch").prop("checked");
        
        // Get the selected user ID
        var userId = $("#userSelect").val();

        // Get CSRF token value
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
     
        // Send AJAX request to update the termin
        $.ajax({
            url: "/termine/update_termin/" + terminId + "/",
            type: "POST",
            dataType: "json",
            data: {
                csrfmiddlewaretoken: csrfToken, // Include CSRF token
                is_taken: isTaken,
                user: userId
            },
            success: function(response) {
                console.log("Termin updated successfully from js:", response.message);
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error("Error updating termin:", error);
                // Handle errors appropriately
            }
        });
    });
    
});

// Footer Behavior
let footer = $('footer');
let footerHeight = footer.outerHeight();
let lastScrollTop = 0;

// Show/hide footer as the user scrolls
$(window).scroll(function() {
    var scrolledHeight = $(document).height() - $(window).height() - $(window).scrollTop();
    var st = $(this).scrollTop();

    if (st > lastScrollTop) {
        // Scrolling down
        footer.css('bottom', '0');
    } else {
        // Scrolling up
        if (scrolledHeight > 0 && window.innerWidth <= 768) {
            footer.css('bottom', -footerHeight + 'px');
        }
    }
    lastScrollTop = st;
});