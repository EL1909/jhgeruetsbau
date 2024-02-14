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

    // Add a click event listener to the link
    loginModalLink.addEventListener("click", function (event) {
        // Prevent the default behavior of the link (e.g., navigating to another page)
        event.preventDefault();
    
        // Get the modal element by its id
        var modal = document.getElementById("loginModal");
    
        // Use Bootstrap's modal API to show the modal
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });

});

