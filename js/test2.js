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
        // snap box position to grid
        this.box.x = Math.floor(mouseX / 32) * 32;
        this.box.y = Math.floor(mouseY / 64) * 64;

        // prevent box from moving through walls
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            if (
                this.box.x < wall.x + wall.width &&
                this.box.x + this.box.width > wall.x &&
                this.box.y < wall.y + wall.height &&
                this.box.y + this.box.height > wall.y
            ) {
                // collision detected!
                if (this.box.x < wall.x + wall.width && this.box.x + this.box.width > wall.x) {
                    if (this.box.y < wall.y) {
                        // top collision
                        this.box.y = wall.y - this.box.height;
                    } else {
                        // bottom collision
                        this.box.y = wall.y + wall.height;
                    }
                }
                if (this.box.y < wall.y + wall.height && this.box.y + this.box.height > wall.y) {
                    if (this.box.x < wall.x) {
                        // left collision
                        this.box.x = wall.x - this.box.width;
                    } else {
                        // right collision
                        this.box.x = wall.x + wall.width;
                    }
                }
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

canvas.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    currentLevel.update(mouseX, mouseY);
});

function draw() {
    currentLevel.draw();
}

setInterval(draw, 1000 / 60); // update at 60fps