// AJAX and Typescript //

// Connect to API using vanilla Javascript //
function makeRequest(URL, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText);
          if (callback) {
            callback(data);
          }
        }
      }
    };
    httpRequest.open('GET', URL);
    httpRequest.send();
}

makeRequest("http://www.amiiboapi.com/api/amiibo/?name=mario", function(data) {
    console.log(data);
});