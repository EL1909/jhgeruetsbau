$(document).ready(function() {
    // Get the service request modal link element by its id
    var serviceRequestModalLink = document.getElementById("modalLink");

    // Add a click event listener to the link
    serviceRequestModalLink.addEventListener("click", function (event) {
        // Prevent the default behavior of the link (e.g., navigating to another page)
        event.preventDefault();

        // Get the modal element by its id
        var modal = document.getElementById("serviceRequestModal");

        // Use Bootstrap's modal API to show the modal
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });

    // Get the login modal link element by its id
     var loginModalLink = document.getElementById("loginModalLink");

    // Add a click event listener to the link (not working)
    loginModalLink.addEventListener("click", function (event) {
        // Prevent the default behavior of the link (e.g., navigating to another page)
        event.preventDefault();
    
        // Get the modal element by its id
        var modal = document.getElementById("loginModal");
    
        // Use Bootstrap's modal API to show the modal
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });

    // Signup Form error handling
    $('#signupForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    // Display success message in modal
                    $('#modalError')
                        .text('Account created successfully!')
                        .css('background-color', '#09a70e7a' )
                        .show(); // Show the modal error
                    setTimeout(function() {
                        window.location.href = '/'; // Hide the modal after 2 seconds
                    }, 2000); // 2000 milliseconds = 2 seconds
                } else if (response.errors) {
                    // Display errors in modal
                    var errors = '<ul>';
                    $.each(response.errors, function(field, errors) {
                        $.each(errors, function(index, error) {
                            errors += '<li>' + error + '</li>';
                        });
                    });
                    errors += '</ul>';
                    $('#modalError').html(errors);
                }
            },
            error: function(xhr, status, error) {
                $('#modalError')
                    .html('<strong>Error:</strong>' + xhr.responseText)
                    .css('background-color', '#a7092b7a')
                    .show();
                console.error(xhr.responseText);
            }
        });
    });

    // Login Form error handling
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    // Redirect to home page if login successful
                    $('#modalError')
                        .text('{user} Logged in successfully!')
                        .css('background-color', '#09a70e7a' )
                        .show(); // Show the modal error
                    setTimeout(function() {
                        window.location.href = '/'; // Hide the modal after 2.5 seconds
                    }, 2500); // 
                    window.location.href = '/';
                } else if (response.errors) {
                    // Display errors in modal
                    var errors = '<ul>';
                    $.each(response.errors, function(field, errorList) {
                        $.each(errorList, function(index, error) {
                            errors += '<li>' + error + '</li>';
                        });
                    });
                    errors += '</ul>';
                    $('#modalError').html(errors)
                    .css('background-color', '#a7092b7a')
                    .show(); // Show the modal error
                }
            },
            error: function(xhr, status, error) {
                $('#modalError')
                    .html('<strong>Error:</strong>' + xhr.responseText)
                    .css('background-color', '#a7092b7a')
                    .show();
                console.error(xhr.responseText);
            }
        });
    });

});

