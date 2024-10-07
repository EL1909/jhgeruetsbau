$(document).ready(function () {
    // Get the service request modal link element by its id
    const serviceRequestModalLink = document.getElementById("modalLink");
    const contactModalLink = document.getElementById("ort");
    const loginModalLink = document.getElementById("loginModalLink");

    // Function to show the service request modal
    function showServiceRequestModal(event) {
        event.preventDefault(); // Prevent default behavior of the link
        const modal = document.getElementById("serviceRequestModal");
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    // Add click event listeners to open the service request modal
    if (serviceRequestModalLink) {
        serviceRequestModalLink.addEventListener("click", showServiceRequestModal);
    }
    if (contactModalLink) {
        contactModalLink.addEventListener("click", showServiceRequestModal);
    }

    // Add click event listener to the login modal link
    if (loginModalLink) {
        loginModalLink.addEventListener("click", function (event) {
            event.preventDefault();
            const modal = document.getElementById("loginModal");
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        });
    }

    // Function to handle signup or login errors
    function handleError(errors) {
        let errorMessage = '<ul>';
        Object.keys(errors).forEach(field => {
            errors[field].forEach(err => {
                errorMessage += `<li>${err}</li>`;
            });
        });
        errorMessage += '</ul>';

        $('#modalError').html(errorMessage);
    }

    // Function to handle AJAX error responses
    function handleAjaxError(xhr) {
        let errorMessage = 'Fehler:';
        try {
            const response = JSON.parse(xhr.responseText);
            if (response.errors) {
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
    }

    // Signup Form error handling
    $('#signupForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    $('#modalError')
                        .text('Account created successfully!')
                        .css('background-color', '#09a70e7a')
                        .show();
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 2500);
                } else if (response.errors) {
                    handleError(response.errors);
                }
            },
            error: function (xhr) {
                handleAjaxError(xhr);
            }
        });
    });

    // Login Form error handling
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission 
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    $('#modalError')
                        .text('Logged in successfully!')
                        .css('background-color', '#09a70e7a')
                        .show();
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 2500);
                } else if (response.errors) {
                    handleError(response.errors);
                }
            },
            error: function (xhr) {
                handleAjaxError(xhr);
            }
        });
    });
});
