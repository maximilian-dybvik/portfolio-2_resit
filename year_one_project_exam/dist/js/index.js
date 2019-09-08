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
