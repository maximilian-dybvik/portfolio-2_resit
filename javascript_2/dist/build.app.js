// Config variables, change these to play with canvas
var config = {
    minRadius: 1,
    maxRadius: 5,
    growthFactor: 5,
    growthRate: 2,
    interactionRadius: 50,
    minVelocity: 0,
    maxVelocity: 1,
    density: 800,
    // Each shape drawn to canvas gets assigned a random color from this array
    colors: [
        '#02bacf',
        '#fb9100',
        '#dcc9a9',
        '#828282',
        '#4f545b'
    ],
    stroke: false,
    strokeWidth: 2,
    strokeColor: '#fffdfa',
    shape: 'circle' // Defines what shape to draw on canvas (options: circle, square). Defaults to circle on any other input
};
// Each index of this array holds a new instance of Shape
var shapesArray = [];
// Object for storing x and y mouse coordinates whitin the browser window
var mousePosition = {
    x: undefined,
    y: undefined
};
// Setup canvas element and define its size
var canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Define rendering context for out canvas to 2D
var ctx = canvas.getContext('2d');
// Reinitiate and adjust canvas size when browser window is resized
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
// Keep track os mouse position and stores x and y coordinates in mousePosition object
window.addEventListener('mousemove', function (event) {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
});
// Shape constructor used to generate unike shapes based on the config object
var Shape = function (x, y, xv, yv, radius, colors) {
    var _this = this;
    this.radius = radius; // The radius of this shape
    this.minRadius = radius; // The radius which this shape shrinks back to after interaction
    this.maxRadius = radius; // The radius which this shape grows to on interaction
    this.x = x; // The initial x coordinate this shape gets drawn on
    this.y = y; // The initial y coordinate this shape gets drawn on
    this.xv = xv; // This shapes velocity along the x axis
    this.yv = yv; // This shapes velocity along the y axis
    this.color = colors[Math.floor(Math.random() * colors.length)]; // Picks a random color from the colors array
    this.draw = function () {
        ctx.beginPath();
        // Determine what shape to draw on canvas
        if (config.shape === 'square') {
            ctx.rect(_this.x, _this.y, _this.radius * 2, _this.radius * 2);
        }
        else if (config.shape === 'circle') {
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        }
        else {
            var img = document.getElementById('nick');
            ctx.drawImage(img, _this.x, _this.y, _this.radius * 2, _this.radius * 2);
        }
        // Checks config object whether stroke is true or false
        if (config.stroke) {
            ctx.lineWidth = config.strokeWidth;
            ctx.strokeStyle = config.strokeColor;
            ctx.stroke();
        }
        ctx.fillStyle = _this.color;
        ctx.fill();
    };
    this.update = function () {
        // Changes this shapes direction when it hits the right or left edge of the browser window
        if (_this.x + _this.radius > innerWidth || _this.x - _this.radius < 0) {
            _this.xv = -_this.xv;
        }
        // Changes this shapes direction when it hits the top or bottom edge of the browser window
        if (_this.y + _this.radius > innerHeight || _this.y - _this.radius < 0) {
            _this.yv = -_this.yv;
        }
        // As long as this shape is within the browser window continue moving in same direction
        _this.x += _this.xv;
        _this.y += _this.yv;
        // Adds interactivity around mouse position
        if (mousePosition.x - _this.x < config.interactionRadius
            && mousePosition.x - _this.x > -config.interactionRadius
            && mousePosition.y - _this.y < config.interactionRadius
            && mousePosition.y - _this.y > -config.interactionRadius) {
            if (_this.radius < _this.minRadius * config.growthFactor) {
                _this.radius += config.growthRate;
            }
        }
        else if (_this.radius > _this.minRadius) {
            _this.radius -= config.growthRate;
        }
        _this.draw();
    };
};
// Initiate the canvas by instanciating shapes and pushing them to shapesArray
var init = function () {
    shapesArray = [];
    for (var i = 0; i < config.density; i++) {
        // This function returns either 1 or -1, used to set the initial direction of each shape
        var direction = function () { return Math.round(Math.random()) * 2 - 1; };
        var radius = Math.round(Math.random() * (config.maxRadius - config.minRadius) + config.minRadius);
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var xv = (Math.random() * (config.maxVelocity - config.minVelocity) + config.minVelocity) * direction();
        var yv = (Math.random() * (config.maxVelocity - config.minVelocity) + config.minVelocity) * direction();
        shapesArray.push(new Shape(x, y, xv, yv, radius, config.colors));
    }
};
// Request animation frame and draw/update shapes from shapesArray
var animate = function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < shapesArray.length; i++) {
        shapesArray[i].update();
    }
};
// Initial init and animate calls
init();
animate();
// Handle sliders and dynamically change each slider value
var minRadiusSlider = document.getElementById("minRadiusSlider");
var minRadiusValue = document.getElementById("minRadiusValue");
minRadiusValue.innerHTML = minRadiusSlider.value;
minRadiusSlider.oninput = function () {
    minRadiusValue.innerHTML = minRadiusSlider.value;
    config.minRadius = parseInt(minRadiusSlider.value);
    init();
};
var maxRadiusSlider = document.getElementById("maxRadiusSlider");
var maxRadiusValue = document.getElementById("maxRadiusValue");
maxRadiusValue.innerHTML = maxRadiusSlider.value;
maxRadiusSlider.oninput = function () {
    maxRadiusValue.innerHTML = maxRadiusSlider.value;
    config.maxRadius = parseInt(maxRadiusSlider.value);
    init();
};
var growthFactorSlider = document.getElementById("growthFactorSlider");
var growthFactorValue = document.getElementById("growthFactorValue");
growthFactorValue.innerHTML = growthFactorSlider.value;
growthFactorSlider.oninput = function () {
    growthFactorValue.innerHTML = growthFactorSlider.value;
    config.growthFactor = parseInt(growthFactorSlider.value);
    init();
};
var growthRateSlider = document.getElementById("growthRateSlider");
var growthRateValue = document.getElementById("growthRateValue");
growthRateValue.innerHTML = growthRateSlider.value;
growthRateSlider.oninput = function () {
    growthRateValue.innerHTML = growthRateSlider.value;
    config.growthRate = parseInt(growthRateSlider.value);
    init();
};
var interactionRadiusSlider = document.getElementById("interactionRadiusSlider");
var interactionRadiusValue = document.getElementById("interactionRadiusValue");
interactionRadiusValue.innerHTML = interactionRadiusSlider.value;
interactionRadiusSlider.oninput = function () {
    interactionRadiusValue.innerHTML = interactionRadiusSlider.value;
    config.interactionRadius = parseInt(interactionRadiusSlider.value);
    init();
};
var minVelocitySlider = document.getElementById("minVelocitySlider");
var minVelocityValue = document.getElementById("minVelocityValue");
minVelocityValue.innerHTML = minVelocitySlider.value;
minVelocitySlider.oninput = function () {
    minVelocityValue.innerHTML = minVelocitySlider.value;
    config.minVelocity = parseInt(minVelocitySlider.value);
    init();
};
var maxVelocitySlider = document.getElementById("maxVelocitySlider");
var maxVelocityValue = document.getElementById("maxVelocityValue");
maxVelocityValue.innerHTML = maxVelocitySlider.value;
maxVelocitySlider.oninput = function () {
    maxVelocityValue.innerHTML = maxVelocitySlider.value;
    config.maxVelocity = parseInt(maxVelocitySlider.value);
    init();
};
var densitySlider = document.getElementById("densitySlider");
var densityValue = document.getElementById("densityValue");
densityValue.innerHTML = densitySlider.value;
densitySlider.oninput = function () {
    densityValue.innerHTML = densitySlider.value;
    config.density = parseInt(densitySlider.value);
    init();
};
var strokeCheckbox = document.getElementById("strokeCheckbox");
strokeCheckbox.oninput = function () {
    config.stroke = strokeCheckbox.checked;
    init();
};
var strokeWidthSlider = document.getElementById("strokeWidthSlider");
var strokeWidthValue = document.getElementById("strokeWidthValue");
strokeWidthValue.innerHTML = strokeWidthSlider.value;
strokeWidthSlider.oninput = function () {
    strokeWidthValue.innerHTML = strokeWidthSlider.value;
    config.strokeWidth = parseInt(strokeWidthSlider.value);
    init();
};
var strokeColorInput = document.getElementById("strokeColorInput");
strokeColorInput.oninput = function () {
    config.strokeColor = strokeColorInput.value;
    init();
};
var shapeSelect = document.getElementById("shapeSelect");
shapeSelect.oninput = function () {
    config.shape = shapeSelect.value;
    init();
};
// Toggles Config Panel open/closed
var isPanelToggled = false;
var panelToggler = document.getElementById("panelToggler");
panelToggler.addEventListener('click', function () {
    var configPanel = document.getElementById("configPanel");
    if (isPanelToggled) {
        configPanel.classList.remove("config--active");
        isPanelToggled = !isPanelToggled;
    }
    else {
        configPanel.classList.add("config--active");
        isPanelToggled = !isPanelToggled;
    }
});
