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

class Level {
    constructor() {
        this.box = new Box(0, 0);
    }

    update(mouseX, mouseY) {
        // snap box position to grid
        this.box.x = Math.floor(mouseX / 32) * 32;
        this.box.y = Math.floor(mouseY / 64) * 64;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
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