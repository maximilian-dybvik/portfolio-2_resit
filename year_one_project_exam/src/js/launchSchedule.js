// Functions for displaying schedule data
// LATEST LAUNCH
fetch("https://api.spacexdata.com/v2/launches/latest")
  .then(response => response.json())
  .then(data => latestLaunch(data))
  .catch(err => console.log(err));

function latestLaunch(data) {
  document.getElementById("latest-number").innerHTML = data.flight_number;
  document.getElementById("latest-name").innerHTML = data.mission_name;
  document.getElementById("latest-rocket").innerHTML = data.rocket.rocket_name;
  document.getElementById("latest-date").innerHTML = data.launch_date_utc.slice(0,10);

  document.getElementById("latest-success").innerHTML = data.launch_success;
  document.getElementById("latest-success").style.textTransform = "uppercase"

  document.getElementById("latest-details").innerHTML = "The satellite will have a dual mission. It will replace the NSS-6 satellite in orbit, providing television broadcasting and telecom infrastructure services from one end of Asia to the other, with beams adapted to six areas of coverage. It will also have a flexible multi-beam processed payload for providing broadband services covering a large expanse from Africa to Russia, Japan and Australia."

  if (data.links.presskit === null) {
    document.getElementById("latest-presskit").style.display = "none";
  } else {
    document.getElementById("latest-presskit").href = data.links.presskit;
  }

  if (data.links.reddit_campaign === null) {
    document.getElementById("latest-reddit").style.display = "none";
  } else {
    document.getElementById("latest-reddit").href = data.links.reddit_campaign;
  }
}

// NEXT LAUNCH
fetch("https://api.spacexdata.com/v2/launches/next")
  .then(response => response.json())
  .then(data => nextLaunch(data))
  .catch(err => console.log(err));

function nextLaunch(data) {
  document.getElementById("next-number").innerHTML = data.flight_number;
  document.getElementById("next-name").innerHTML = data.mission_name;
  document.getElementById("next-rocket").innerHTML = data.rocket.rocket_name;
  document.getElementById("next-date").innerHTML = data.launch_date_utc.slice(0,10);

  if (data.launch_success === null) {
    document.getElementById("next-success").innerHTML = "N/A";
  } else {
    document.getElementById("next-success").innerHTML = data.launch_success;
    document.getElementById("next-success").style.textTransform = "capitalize";
  }

  document.getElementById("next-details").innerHTML = "There are currently no mission details available."

  if (data.links.presskit === null) {
    document.getElementById("next-presskit").style.display = "none";
  } else {
    document.getElementById("next-presskit").href = data.links.presskit;
  }

  if (data.links.reddit_campaign === null) {
    document.getElementById("next-reddit").style.display = "none";
  } else {
    document.getElementById("next-reddit").href = data.links.reddit_campaign;
  }
}
