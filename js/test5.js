var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;

class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 64;
        this.isDragging = false;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Triangle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 64;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x - this.width / 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }
}

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.speed = 64; // pixels per second
    }

    update(dt) {
        // move circle up
        this.y -= this.speed * dt;

        // prevent circle from moving off screen
        if (this.y - this.radius < 0) {
            this.y = this.radius;
        }
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Level1 {
    constructor() {
        this.box = new Box(64, 64);
        this.triangle = new Triangle(128 + 16, 128);
        this.circle = new Circle(128 + 16, 600);
        this.walls = [
            new Wall(0, 0, canvas.width, 32), // top wall
            new Wall(0, canvas.height - 32, canvas.width, 32), // bottom wall
            new Wall(0, 0, 32, canvas.height), // left wall
            new Wall(canvas.width - 32, 0, 32, canvas.height), // right wall
        ];
    }

    update(mouseX, mouseY) {
        if (this.box.isDragging) {
            // snap box position to grid
            var snappedX = Math.floor(mouseX / 32) * 32;
            var snappedY = Math.floor(mouseY / 64) * 64;

            // prevent box from moving through walls
            var canMoveX = true;
            var canMoveY = true;
            for (var i = 0; i < this.walls.length; i++) {
                var wall = this.walls[i];
                if (
                    snappedX < wall.x + wall.width &&
                    snappedX + this.box.width > wall.x &&
                    snappedY < wall.y + wall.height &&
                    snappedY + this.box.height > wall.y
                ) {
                    // collision detected!
                    if (snappedX < wall.x + wall.width && snappedX + this.box.width > wall.x) {
                        canMoveY = false;
                    }
                    if (snappedY < wall.y + wall.height && snappedY + this.box.height > wall.y) {
                        canMoveX = false;
                    }
                }
            }

            if (canMoveX) {
                this.box.x = snappedX;
            }
            if (canMoveY) {
                this.box.y = snappedY;
            }
        }

        // check for collision between circle and triangle
        var dx =
            (this.circle.x - (this.triangle.x - (this.triangle.width / 2))) *
                (this.circle.x - (this.triangle.x - (this.triangle.width / 2))) +
            (this.circle.x - (this.triangle.x + (this.triangle.width / 2))) *
                (this.circle.x - (this.triangle.x + (this.triangle.width / 2)));
        var dy =
            (this.circle.y - this.triangle.y) * (this.circle.y - this.triangle.y);
        var distance = Math.sqrt(dx + dy);
        if (distance < this.circle.radius) {
            // circle and triangle are touching!
            currentLevel = new Level2();
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            wall.draw();
        }
        this.box.draw();
        this.triangle.draw();
        this.circle.draw();
    }
}

class Level2 {
    constructor() {
        this.boxes = [
            new Box(32, 32),
            new Box(32, 32 + 64 + 32),
            new Box(32, 32 + 64 + 32 + 64 + 32),
        ];
    }

    update(mouseX, mouseY) {
        for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            if (box.isDragging) {
                // snap box position to grid
                var snappedX = Math.floor(mouseX / 32) * 32;
                var snappedY = Math.floor(mouseY / 64) * 64;

                box.x = snappedX;
                box.y = snappedY;
            }
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            box.draw();
        }
    }
}

var currentLevel = new Level1();

canvas.addEventListener("mousedown", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    // check if any box was clicked
    for (var i = 0; i < currentLevel.boxes.length; i++) {
        var box = currentLevel.boxes[i];
        if (
            mouseX >= box.x &&
            mouseX <= box.x + box.width &&
            mouseY >= box.y &&
            mouseY <= box.y + box.height
        ) {
            box.isDragging = true; // start dragging box
            break;
        }
    }
});

canvas.addEventListener("mouseup", function (event) {
    for (var i = 0; i < currentLevel.boxes.length; i++) {
        var box = currentLevel.boxes[i];
        box.isDragging = false; // stop dragging box
    }
});

canvas.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    currentLevel.update(mouseX, mouseY);
});


function draw() {
    currentLevel.draw();
}

setInterval(draw, 1000 / 60); // update at 60fps