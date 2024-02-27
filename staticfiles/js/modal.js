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


    // Function to handle signup or login  errors
    function handleError(errors)  {
        // Construct the error message list
        let errorMessage = '<ul>';
        Object.keys(errors).forEach(field => {
            errors[field].forEach(err => {
                errorMessage += `<li>${err}</li>`;
            });
        });
        errorMessage += '</ul>';

        // Display the error message in the modal
        $('#modalError').html(errorMessage);
    };

    // Function to handle AJAX error responses
    function handleAjaxError(xhr)   {
        var errorMessage = 'Fehler:';
        try {
            var response = JSON.parse(xhr.responseText);
            if (response.errors) {
                // Iterate over all errors in the response
                Object.keys(response.errors).forEach(field => {
                    response.errors[field].forEach(err => {
                        errorMessage += ` ${err}`;
                    });
                });
            } else {
                errorMessage += ' ' + response;
            }
        } catch (e) {
            errorMessage += ' ' + xhr.responseText;
        }
        $('#modalError').html(errorMessage)
                    .css('background-color', '#a7092b7a')
                    .show();
        console.error(xhr.responseText);
    };

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
                    }, 4000); // 4 seconds
                } else if (response.errors) {
                     // Display errors in modal
                handleError(response.errors);
                }
            },
            error: function(xhr, status, error) {
                handleAjaxError(xhr);
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
                        .text('Logged in successfully!')
                        .css('background-color', '#09a70e7a' )
                        .show(); // Show the modal error
                    setTimeout(function() {
                        window.location.href = '/'; // Hide the modal after 2.5 seconds
                    }, 2500); // 
                } else if (response.errors) {
                    // Display errors in modal
                    handleError(response.errors);
                }
            },
            error: function(xhr, status, error) {
                handleAjaxError(xhr);
            }
        });
    });

});

