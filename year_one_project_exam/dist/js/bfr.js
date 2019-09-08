// BFR INFORMATION
fetch("https://api.spacexdata.com/v2/rockets/bfr")
  .then(response => response.json())
  .then(data => bfrData(data))
  .catch(err => console.log(err));

// Function for displaying BFR data
function bfrData(data) {

  // Display BFR article
  {
    const article = document.getElementById("bfr-article");

    const h2 = document.createElement("h2");
    h2.textContent = "about:";

    const h3 = document.createElement("h3");
    h3.textContent = data.name;

    const p = document.createElement("p");
    p.innerHTML = "BFR is a privately funded next-generation reusable launch vehicle and spacecraft system developed by SpaceX. It was announced by Elon Musk in September 2017 that the first spacecraft prototype was being manufactured as of March 2018 and will begin testing in early 2019. <br> <br> The overall space vehicle architecture includes both launch vehicles and spacecraft that are intended to completely replace all of SpaceX's existing space hardware by the early 2020s as well as ground infrastructure for rapid launch and relaunch, and zero-gravity propellant transfer technology to be deployed in low Earth orbit (LEO). The large payload to Earth orbit of up to 150,000 kg (330,000 lb) makes BFR a super heavy-lift launch vehicle.";

    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
  }

  // Display BFR specs
  {
    document.getElementById("specs-id").innerHTML = data.id;
    document.getElementById("specs-id").style.textTransform = "uppercase";

    document.getElementById("specs-name").innerHTML = data.name;
    document.getElementById("specs-country").innerHTML = data.country;
    document.getElementById("specs-company").innerHTML = data.company;
    document.getElementById("specs-diameter").innerHTML = data.diameter.meters + " meters = A typical London bus";
    document.getElementById("specs-height").innerHTML = data.height.meters + " meters = 25 Giraffes";

    document.getElementById("specs-mass").innerHTML = data.mass.kg + " kg = 31 Blue whales";
    document.getElementById("specs-leo").innerHTML = data.payload_weights[0].kg + " kg = 65 White Rhinos";
    document.getElementById("specs-cost").innerHTML = "$ " + (data.cost_per_launch / 100000) + " millions = 1,776 Student loans";
  }
};