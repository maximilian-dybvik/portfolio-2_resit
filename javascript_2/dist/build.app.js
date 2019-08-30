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
        console.log(event);
    });
    // let minRadius: number = 3 // Determines the size of the shapes
    // let maxRadius: number = 10 // Determines the size of the shapes
    var radius = 10; // Determines the size of the shapes
    var velocity = 3; // Determines the movement speed of the shapes
    var randomizationRange = 3; // Range of randomization to velocity, adds a random number between negative and positive randonizationRange to velocity
    var density = 100; // Determines the number of shapes drawn to canvas
    var colors = [];
    var Shape = function (x, y, dx, dy, radius) {
        var _this = this;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fill();
        };
        this.update = function () {
            if (_this.x + _this.radius > innerWidth || _this.x - _this.radius < 0) {
                _this.dx = -_this.dx;
            }
            if (_this.y + _this.radius > innerHeight || _this.y - _this.radius < 0) {
                _this.dy = -_this.dy;
            }
            _this.x += _this.dx;
            _this.y += _this.dy;
            // Interactivity around mouse position
            console.log(mousePosition.x);
            _this.draw();
        };
    };
    var shapesArray = [];
    for (var i = 0; i < density; i++) {
        // Determines the initial direction of movement for the x and y axis
        var xDirection = Math.round(Math.random()) * 2 - 1;
        var yDirection = Math.round(Math.random()) * 2 - 1;
        // Determines initial draw position for the x and y axis
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        // Determines the movement speed based on velocity and randomization range
        var dx = (velocity - Math.random() * randomizationRange) * xDirection;
        var dy = (velocity - Math.random() * randomizationRange) * yDirection;
        shapesArray.push(new Shape(x, y, dx, dy, radius));
    }
    var animate = function () {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (var i = 0; i < shapesArray.length; i++) {
            shapesArray[i].update();
        }
    };
    console.log(shapesArray[0]);
    animate();
}, false);
