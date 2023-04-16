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

class Level {
    constructor() {
        this.box = new Box(0, 0);
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
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            wall.draw();
        }
        this.box.draw();
    }
}

var currentLevel = new Level();

canvas.addEventListener("mousedown", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    // check if box was clicked
    if (
        mouseX >= currentLevel.box.x &&
        mouseX <= currentLevel.box.x + currentLevel.box.width &&
        mouseY >= currentLevel.box.y &&
        mouseY <= currentLevel.box.y + currentLevel.box.height
    ) {
        currentLevel.box.isDragging = true; // start dragging box
    }
});

canvas.addEventListener("mouseup", function (event) {
    currentLevel.box.isDragging = false; // stop dragging box
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