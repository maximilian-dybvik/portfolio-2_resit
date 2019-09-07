// AJAX and Typescript //

// Connect to the API using a promise //
fetch("http://www.amiiboapi.com/api/amiibo/?name=mario")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));