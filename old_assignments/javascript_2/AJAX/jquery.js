// AJAX and Typescript //

// Connecting to API using jQuery //
$.ajax({
    url: "http://www.amiiboapi.com/api/amiibo/?name=mario",
    success: function (result) {
        console.log(result);
    }
});