// PARTICLES EFFECT
particlesJS.load('particles-js', '/js/vendors/particles.json');

// TYPED ANIMATION
var typed = new Typed("#index-header-typed", {
  stringsElement: "#index-header",
  startDelay: 300,
  typeSpeed: 60,
  backDelay: 500,
  backSpeed: 50,
  showCursor: false,
});

// SMOOTH SCROLL
var scroll = new SmoothScroll('a[href*="#"]');

// FORM VALIDATION
const myForm = document.getElementById("my-form");

function formValidation() {
  let input = document.getElementById("email-input");

  if (!input.checkValidity()) {
    document.getElementById("submit").innerHTML = "Try Again";
  } else {
    document.getElementById("submit").innerHTML = "Thanks!";
  }
};
