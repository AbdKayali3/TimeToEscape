const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
// canvas.height = 705;
canvas.height = 801;

// const FPS = 60;
// const frameRate = 1000 / FPS;


const unit = 32;
const gridSize = unit;

function ClaculateUnit(n) {return n * unit;}

const speed = ClaculateUnit(0.5); // unit per second
const animationSpeed = 4; // animation_frames per second


let ColisionObjects = [];
let ActiveColisionObjects = [];





function SingleCollisionDetection(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y) {

            return true;
        }

        return false;

}

function CollisionDetection(obj1) {
    for (let i = 0; i < ColisionObjects.length; i++) {
        let obj2 = ColisionObjects[i];
        if (SingleCollisionDetection(obj1, obj2)) {
            return obj2;
        }
    }
    return false;
}


class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(color = "red", image = false, src = null) {
        // image instead of color
        // let img = new Image();
        // img.src = "images/box.png";
        // ctx.drawImage(img, this.x, this.y, this.width, this.height);
        if (image) {
            let img = new Image();
            img.src = src;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Box extends GameObject {
    constructor(x, y, width, height) {
        
        super(x, y, width, height);
        this.isDragging = false;
    }

    draw() {
        super.draw("red");
    }
}

class Wall extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw() {
        super.draw("black");
    }
}

class Alarm extends GameObject {
    constructor(x, y, width, height, time) {
        super(x, y, width, height);
        this.time = time;
        this.startTime = Date.now();
        this.alarmFlag = false;
    }

    start() {
        window.requestAnimationFrame(() => this.tick());

        console.log("alarm started");
    }

    tick() {
        let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        if (elapsedTime < this.time) {
            this.time;
            this.draw(this.time - elapsedTime);
            window.requestAnimationFrame(() => this.tick());
        } else {
            this.alarmFlag = true;
            this.draw(0);
        }

        console.log("tick");
    }

    draw(time) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(20, 20, 15, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillText(time, 40, 25);
    }
}

class Level {
    constructor() {

        this.alarmFlag  = false;

        this.boxes = [
            new Box(ClaculateUnit(4), ClaculateUnit(4), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(5), ClaculateUnit(5), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(6), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(10), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(3)),
        ];
        // this.box = new Box(ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1));
        this.walls = [
            new Wall(0, 0, canvas.width, ClaculateUnit(3)), // top section before actual walls
            new Wall(0, ClaculateUnit(3), canvas.width, unit), // top wall
            new Wall(0, canvas.height - unit, canvas.width, unit), // bottom wall
            new Wall(0, ClaculateUnit(3), unit, canvas.height), // left wall
            new Wall(canvas.width - unit, ClaculateUnit(3), unit, canvas.height), // right wall
        ];


        this.alarm = new Alarm(ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(2), ClaculateUnit(1), 10);


        
    }

    start() {

        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            ColisionObjects.push(wall);
        }

        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            ColisionObjects.push(box);
            ActiveColisionObjects.push(box);
        }

        this.alarm.start();

    }

    // events() {

    // }

    update() {


        canvas.addEventListener("mousedown", (event) => {
            let mouseX = event.clientX - canvas.offsetLeft;
            let mouseY = event.clientY - canvas.offsetTop;
            

            // check if any box was clicked
            for (let i = 0; i < this.boxes.length; i++) {
                let box = this.boxes[i];
                if (mouseX >= box.x && mouseX <= box.x + box.width &&
                    mouseY >= box.y && mouseY <= box.y + box.height) {
                    box.isDragging = true; // start dragging box
                }
            }
        });
        
        canvas.addEventListener("mouseup", (event) => {

            for (let i = 0; i < this.boxes.length; i++) {
                let box = this.boxes[i];
                if (box.isDragging) {
                    box.isDragging = false;
                }
            }
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
        // this.box.draw();

        // draw boxes
        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            box.draw();
        }

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

        this.alarmFlag = this.alarm.alarmFlag;
        console.log(this.alarmFlag);
    }

    moveBox(mouseX, mouseY) {
        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            if (box.isDragging) {
                // snap box position to grid
                let snappedX = Math.floor((mouseX - box.width / 2) / gridSize) * gridSize;
                let snappedY = Math.floor((mouseY - box.height / 2) / gridSize) * gridSize;
    
                // prevent box from moving through walls
                let canMoveX = true;
                let canMoveY = true;
    
                for (let i = 0; i < ColisionObjects.length; i++) {
                    let obj1 = box;
                    let obj2 = ColisionObjects[i];
                    if (obj1 !== obj2) {
                        if (snappedX < obj2.x + obj2.width &&
                            snappedX + obj1.width > obj2.x &&
                            snappedY < obj2.y + obj2.height &&
                            snappedY + obj1.height > obj2.y) {
                            if (snappedX < obj2.x + obj2.width && snappedX + box.width > obj2.x) {
                                canMoveY = false;
                            }
                            if (snappedY < obj2.y + obj2.height && snappedY + box.height > obj2.y) {
                                canMoveX = false;
                            }
                        }
                    }
                }
    
                if (canMoveX) {
                    box.x = snappedX;
                }
                if (canMoveY) {
                    box.y = snappedY;
                }
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