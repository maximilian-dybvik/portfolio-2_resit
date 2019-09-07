// HTML Canvas and Animation //

// Date variables //
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

// The months of the year //
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Todays date concatinated in string form //
let today = months[month] + " " + day + "." + " " + year;

// Find vertical center of window //
let centerV = window.innerHeight / 2;

// Setup canvas context
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

// Make canvas full width and height of browser window //
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let xPos = -150;

function drawDate() {
    // Clear canvas //
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw our text //
    ctx.font = "32px verdana";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#52ce90";
    ctx.strokeText(today, xPos, centerV);

    // Move by this many pixels per frame //
    xPos += 5;

    // Make is start over //
    if (xPos > canvas.width + 150) {
        xPos = -100;
    }
    
    // Our animation callback //
    requestAnimationFrame(drawDate);
}

drawDate();