const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 705;

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

class Level {
    constructor() {
        this.boxes = [
            new Box(ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(4), ClaculateUnit(4), ClaculateUnit(1), ClaculateUnit(1)),
        ];
        this.box = new Box(ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1), ClaculateUnit(1));
        this.walls = [
            new Wall(0, 0, canvas.width, 32), // top wall
            new Wall(0, canvas.height - 32, canvas.width, 32), // bottom wall
            new Wall(0, 0, 32, canvas.height), // left wall
            new Wall(canvas.width - 32, 0, 32, canvas.height), // right wall
        ];
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
                    // console.log("box clicked");
                    // console.log("box clicked");
                }
            }

            // if (
            //     mouseX >= this.box.x &&
            //     mouseX <= this.box.x + this.box.width &&
            //     mouseY >= this.box.y &&
            //     mouseY <= this.box.y + this.box.height
            // ) {
            //     this.box.isDragging = true; // start dragging box
            // }
        });
        
        canvas.addEventListener("mouseup", (event) => {

            for (let i = 0; i < this.boxes.length; i++) {
                let box = this.boxes[i];
                if (box.isDragging) {
                    box.isDragging = false;
                }
            }

            // this.box.isDragging = false; // stop dragging box
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
    }


    moveBox(mouseX, mouseY) {


        
        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            // console.log(box.isDragging);
            
            if (box.isDragging) {
                // snap box position to grid
                let snappedX = Math.floor(mouseX / gridSize) * gridSize;
                let snappedY = Math.floor(mouseY / gridSize) * gridSize;

                // prevent box from moving through walls
                let canMoveX = true;
                let canMoveY = true;


                let colisionObj = CollisionDetection(box);
                if (colisionObj) {
                    if (snappedX < colisionObj.x + colisionObj.width && snappedX + box.width > colisionObj.x) {
                        canMoveY = false;
                    }
                    if (snappedY < colisionObj.y + colisionObj.height && snappedY + box.height > colisionObj.y) {
                        canMoveX = false;
                    }
                }


                // for (let i = 0; i < this.walls.length; i++) {
                //     let wall = this.walls[i];
                //     if (
                //         snappedX < wall.x + wall.width &&
                //         snappedX + box.width > wall.x &&
                //         snappedY < wall.y + wall.height &&
                //         snappedY + box.height > wall.y
                //     ) {
                //         // collision detected!
                //         if (snappedX < wall.x + wall.width && snappedX + box.width > wall.x) {
                //             canMoveY = false;
                //         }
                //         if (snappedY < wall.y + wall.height && snappedY + box.height > wall.y) {
                //             canMoveX = false;
                //         }
                //     }
                // }


                if (canMoveX) {
                    box.x = snappedX;
                }
                if (canMoveY) {
                    box.y = snappedY;
                }

                // if (c[0]) {
                //     console.log("collision detected");
                //     box.x = snappedX;
                //     box.y = snappedY;
                // }
            }
            
        }

        // if (this.box.isDragging) {
        //     // snap box position to grid
        //     let snappedX = Math.floor(mouseX / gridSize) * gridSize;
        //     let snappedY = Math.floor(mouseY / gridSize) * gridSize;

        //     // prevent box from moving through walls
        //     let canMoveX = true;
        //     let canMoveY = true;


        //     for (let i = 0; i < this.walls.length; i++) {
        //         let wall = this.walls[i];
        //         if (
        //             snappedX < wall.x + wall.width &&
        //             snappedX + this.box.width > wall.x &&
        //             snappedY < wall.y + wall.height &&
        //             snappedY + this.box.height > wall.y
        //         ) {
        //             // collision detected!
        //             if (snappedX < wall.x + wall.width && snappedX + this.box.width > wall.x) {
        //                 canMoveY = false;
        //             }
        //             if (snappedY < wall.y + wall.height && snappedY + this.box.height > wall.y) {
        //                 canMoveX = false;
        //             }
        //         }
        //     }



        //     if (canMoveX) {
        //         this.box.x = snappedX;
        //     }
        //     if (canMoveY) {
        //         this.box.y = snappedY;
        //     }
        // }
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