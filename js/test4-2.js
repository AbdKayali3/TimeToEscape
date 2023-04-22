const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 705;
unit = 32;
gridSize = unit;


function ClaculateUnit(n) {
    return n * unit;
}


class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        // image instead of color
        // let img = new Image();
        // img.src = "images/box.png";
        // ctx.drawImage(img, this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
}

class Box extends GameObject {
    constructor(x, y, width, height) {
        
        super(x, y, width, height);
        this.isDragging = false;
    }

    draw() {
        super.draw();
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
        this.box = new Box(unit, unit, unit, unit);
        this.walls = [
            new Wall(0, 0, canvas.width, 32), // top wall
            new Wall(0, canvas.height - 32, canvas.width, 32), // bottom wall
            new Wall(0, 0, 32, canvas.height), // left wall
            new Wall(canvas.width - 32, 0, 32, canvas.height), // right wall
        ];
    }

    start() {

    }

    // events() {

    // }

    update() {
        canvas.addEventListener("mousedown", (event) => {
            let mouseX = event.clientX - canvas.offsetLeft;
            let mouseY = event.clientY - canvas.offsetTop;
        
            // check if box was clicked
            if (
                mouseX >= this.box.x &&
                mouseX <= this.box.x + this.box.width &&
                mouseY >= this.box.y &&
                mouseY <= this.box.y + this.box.height
            ) {
                this.box.isDragging = true; // start dragging box
            }
        });
        
        canvas.addEventListener("mouseup", (event) => {
            this.box.isDragging = false; // stop dragging box
        });
        
        canvas.addEventListener("mousemove", (event) => {
            let mouseX = event.clientX - canvas.offsetLeft;
            let mouseY = event.clientY - canvas.offsetTop;
            this.moveBox(mouseX, mouseY);
        });
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            wall.draw();
        }
        this.box.draw();

        // draw grid
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }


    moveBox(mouseX, mouseY) {
        if (this.box.isDragging) {
            // snap box position to grid
            let snappedX = Math.floor(mouseX / gridSize) * gridSize;
            let snappedY = Math.floor(mouseY / gridSize) * gridSize;

            // prevent box from moving through walls
            let canMoveX = true;
            let canMoveY = true;
            for (let i = 0; i < this.walls.length; i++) {
                let wall = this.walls[i];
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

}

let currentLevel;

function init() {
    currentLevel = new Level();
    currentLevel.start();
    update();
    draw();
}

function update() {
    currentLevel.update();
}

function draw() {
    currentLevel.draw();
    setInterval(draw, 1000 / 60); // update at 60fps
}

init();