document.addEventListener('DOMContentLoaded', function (event) {
    var canvas = document.querySelector('.canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    var mousePosition = {
        x: undefined,
        y: undefined
    };
    window.addEventListener('mousemove', function (event) {
        mousePosition.x = event.x;
        mousePosition.y = event.y;
    });
    var minRadius = 3; // Determines the size of the shapes
    var maxRadius = 15; // Determines the size of the shapes
    var growthFactor = 5;
    var interactionRadius = 60;
    var velocity = 3; // Determines the movement speed of the shapes
    var randomizationRange = 3; // Range of randomization to velocity, adds a random number between negative and positive randonizationRange to velocity
    var density = 300; // Determines the number of shapes drawn to canvas
    var colors = [
        '#02bacf',
        '#fb9100',
        '#dcc9a9',
        '#828282',
        '#4f545b'
    ];
    var Shape = function (x, y, xv, yv, radius, colors) {
        var _this = this;
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = radius;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.fillStyle = _this.color;
            ctx.fill();
        };
        this.update = function () {
            if (_this.x + _this.radius > innerWidth || _this.x - _this.radius < 0) {
                _this.xv = -_this.xv;
            }
            if (_this.y + _this.radius > innerHeight || _this.y - _this.radius < 0) {
                _this.yv = -_this.yv;
            }
            _this.x += _this.xv;
            _this.y += _this.yv;
            if (mousePosition.x - _this.x < interactionRadius
                && mousePosition.x - _this.x > -interactionRadius
                && mousePosition.y - _this.y < interactionRadius
                && mousePosition.y - _this.y > -interactionRadius) {
                if (_this.radius < _this.minRadius * growthFactor) {
                    _this.radius += 1;
                }
            }
            else if (_this.radius > _this.minRadius) {
                _this.radius -= 1;
            }
            _this.draw();
        };
    };
    var shapesArray = [];
    for (var i = 0; i < density; i++) {
        var radius = Math.random() * (maxRadius - minRadius) + minRadius;
        // Determines the initial direction of movement for the x and y axis by returning either -1 or 1
        var direction = function () { return Math.round(Math.random()) * 2 - 1; };
        // Determines initial draw position for the x and y axis
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        // Determines the movement speed based on velocity and randomization range
        var xv = (velocity - Math.random() * randomizationRange) * direction();
        var yv = (velocity - Math.random() * randomizationRange) * direction();
        shapesArray.push(new Shape(x, y, xv, yv, radius, colors));
    }
    var animate = function () {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (var i = 0; i < shapesArray.length; i++) {
            shapesArray[i].update();
        }
    };
    animate();
}, false);
