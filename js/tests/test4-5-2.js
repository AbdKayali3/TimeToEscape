const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
// canvas.height = 705;
canvas.height = 801;

const font = 'VT323';
const gridColor = "#00000030";
const bgColor = "#6A6A84";

const FPS = 60;
const frameRate = 1000 / FPS;


const unit = 32;
const gridSize = unit;

function ClaculateUnit(n) {return n * unit;}

const speed = ClaculateUnit(0.25) / FPS; // unit per second
const animationSpeed = 4; // animation_frames per second


let DragableObjects = [];
let ColisionObjects = [];
let ActiveColisionObjects = [];

let musicOn = true;
let SFXOn = true;
let artOn = true;







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
        this.isReachable = false;
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

class TextOnly extends GameObject {
    constructor(x, y, width, height, txt = "txt", size = ClaculateUnit(1), centerd = true) {
        super(x, y, width, height);
        this.txt = txt;
        this.size = size;
        this.centerd = centerd;
    }

    draw(color = "white", image = false, src = null) {

        if (this.centerd) {
            let fontSize = this.size;
            ctx.font = fontSize + "px "+ font;
            ctx.fillStyle = color;
            let textWidth = ctx.measureText(this.txt).width;
            let textX = this.x + (this.width - textWidth) / 2;
            let textY = this.y + (this.height + fontSize) / 2 - fontSize * 0.2;
            ctx.fillText(this.txt, textX, textY);
        } else {
            let fontSize = this.size;
            ctx.font = fontSize + "px "+ font;
            ctx.fillStyle = color;
            let textX = this.x;
            let textY = this.y + (this.height + fontSize) / 2 - fontSize * 0.2;
            ctx.fillText(this.txt, textX, textY);
        }
    }

}

class Button extends GameObject {
    constructor(x, y, width, height, islvl = true, sceneType = 1, txt = "button", param = null ) {
        super(x, y, width, height);
        this.txt = txt;
        this.islvl = islvl;
        this.param = param;
        this.sceneType = sceneType; // 1 == scene, 2 == level
    }

    draw(color = "#B3C1DC", image = false, src = null) {
        if (image) {
            let img = new Image();
            img.src = src;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        let fontSize = ClaculateUnit(0.9);
        ctx.font = fontSize + "px "+ font;
        ctx.fillStyle = "black";
        // ctx.fillText(this.txt, this.x+ClaculateUnit(0.4), this.y+ClaculateUnit(1));

        let textWidth = ctx.measureText(this.txt).width;
        let textX = this.x + (this.width - textWidth) / 2;
        let textY = this.y + (this.height + (fontSize/2)) / 2;
        ctx.fillText(this.txt, textX, textY);
    }

    clicked() {
        console.log('clicked');
        if(this.islvl) {
            this.changelvl(this.param);
        } else {
            this.callEvent(this.param);
        }
    }

    changelvl(lvl) {
        console.log('changelvl');
        lvlChanger(lvl, this.sceneType);
    }

    callEvent(functionName) {
        window[functionName]();
    }
}

class Box extends GameObject {
    constructor(x, y, width, height) {
        
        super(x, y, width, height);
        this.isDragging = false;
    }

    draw(color = "red", image = false, src = null) {
        super.draw(color, image, src);
    }
}

class Arrow extends GameObject {
    constructor(x, y, width, height, direction) {
        super(x, y, width, height);
        this.isDragging = false;
        this.direction = direction;
        this.isreachable = true;
        this.isarrow = true;
    }

    draw(color = "yellow", image = false, src = null) {
        super.draw(color, image, src);
    }

}

class Switch extends GameObject {
    constructor(x, y, width, height, locked = true) {
        super(x, y, width, height);
        this.locked = locked;
        this.isreachable = true;
        this.isarrow = false;
    }

    draw(color = "orange", image = false, src = null) {
        if(this.locked) {
            if (image) {
                let img = new Image();
                img.src = src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "darkred";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        } else {
            if (image) {
                let img = new Image();
                img.src = src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "darkgreen";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }

}

class Props extends GameObject {
    constructor(x, y, width, height, iscollision = false) {
        
        super(x, y, width, height);
        this.iscollision = iscollision;
    }

    draw(color = "blue", image = false, src = null) {
        super.draw(color, image, src);
    }
}

class Player extends GameObject {
    constructor(x, y, width, height, direction = "up", isMoving = true) {
        super(x, y, width, height);
        this.isMoving = isMoving;
        this.direction = direction;
        this.show = false;
    }

    draw(color = "green", image = false, src = null) {
        if(this.show) {
            super.draw(color, image, src);
        }
    }

    move() {
        if (this.isMoving && this.show) {
            switch (this.direction) {
                case "up":
                    this.y -= speed;
                    break;
                case "down":
                    this.y += speed;
                    break;
                case "left":
                    this.x -= speed;
                    break;
                case "right":
                    this.x += speed;
                    break;
            }
        }
    }

    touch(obj) {
        // check if player is touching door manually not using existing functions
        // console.log(this);
        if (this.show) {
            if ((this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y))
                {
                if (obj.locked) {
                    // console.log("door is locked");
                    return false;
                } else {
                    // console.log("door is unlocked");
                    this.isMoving = false;
                    return true;
                }
            }
        }

        return false;   
    }

}

class Enemy extends Player {
    constructor(x, y, width, height, direction = "up", isMoving = true) {
        super(x, y, width, height, direction, isMoving);
        this.startTime = null;
        this.time = 1;
        // this.show = false;
    }

    draw(color = "white", image = false, src = null) {
        super.draw(color, image, src);
    }

    actiate() {
        this.tick();
    }

    tick(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        let elapsedTime = timestamp - this.startTime;
        // console.log("elapsedTime: " + elapsedTime + " " + this.startTime);
        // console.log("time: " + this.time);
        if (elapsedTime >= this.time * 1000) {
          this.show = true;
        //   console.log("show");
        } else {
        //   console.log("not show");
          window.requestAnimationFrame((timestamp) => this.tick(timestamp));
        }
      }

    move() {
        super.move();
    }

    touch(obj) {
        // check if the enemy is touching the player manually not using existing functions
        if (this.show) {
            if (obj.direction == this.direction) {
                if ((this.x < obj.x + obj.width &&
                    this.x + this.width > obj.x &&
                    this.y < obj.y + obj.height &&
                    this.y + this.height > obj.y))
                    {
                        this.isMoving = false;
                        return true;
                    }
            }

        }

        return false;
    }

}
            

class Doors extends GameObject {
    constructor(x, y, width, height, type = "out", locked = false) {
        super(x, y, width, height);
        this.type = type;
        this.locked = locked;
    }

    // draw(color = "brown", image = false, src = null) {
    //     super.draw(color, image, src);
    // }
    draw(color = "brown", image = false, src = null) {
        if(!this.locked && this.type == "out") {
            if (image) {
                let img = new Image();
                img.src = src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "darkgreen";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        } else {
            if (image) {
                let img = new Image();
                img.src = src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "brown";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}

class Wall extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw(color = "black", image = false, src = null) {
        super.draw(color, image, src);
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

        // console.log("alarm started");
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

        // console.log("tick");
    }

    draw(time) {
        // ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, ClaculateUnit(0.5), 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = ClaculateUnit(1)+"px "+ font;
        ctx.fillText(time, this.x+ClaculateUnit(0.8), this.y+ClaculateUnit(0.35));
    }
}

class Scene {
    constructor() {
        this.buttons = [
            // new Button(ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), true, 2, "play", 0),
            // new Button(ClaculateUnit(6), ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), false, null, "test", "test"),
        ];
    }

    start() {

    }

    events() {
        for (let i = 0; i < this.buttons.length; i++) {

            const btn = this.buttons[i];
            
            // btn.addEventListener("click", function() {
            //     btn.clicked();
            // });
            canvas.addEventListener("click", function(event) {

                var rect = canvas.getBoundingClientRect();
                var mouseX = event.clientX - rect.left;
                var mouseY = event.clientY - rect.top;

                // Check if the click occurred within the bounds of the button
                if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                    mouseY >= btn.y && mouseY <= btn.y + btn.height) {
                        btn.clicked();
                }
            });
        }
    }

    update() {

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        // fill the whoel canvas with a color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw grid
        ctx.strokeStyle = gridColor;
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

        
        

        for (let i = 0; i < this.buttons.length; i++) {
            const btn = this.buttons[i];       
            btn.draw();
        }

    }
}


class Menu extends Scene {
    constructor() {
        super();
        let widthOfBtn = ClaculateUnit(6);
        let middle = canvas.width / 2 - (widthOfBtn/2);

        this.text = [
            new TextOnly(0, ClaculateUnit(2), canvas.width, ClaculateUnit(3), "TIME TO ESCAPE", ClaculateUnit(3)),
            new TextOnly(0, canvas.height - ClaculateUnit(3), canvas.width/3, ClaculateUnit(1), "Made by GeneralSam Games", ClaculateUnit(1)),
        ];

        this.buttons = [
            new Button(middle, ClaculateUnit(7), widthOfBtn, ClaculateUnit(3), true, 2, "play", 0),
            new Button(middle, ClaculateUnit(11), widthOfBtn, ClaculateUnit(3), true, 1, "How to play", 1),
            // new Button(middle, ClaculateUnit(15), widthOfBtn, ClaculateUnit(3), true, 1, "Thank you", 2),
        ];
    }

    start() {
        this.events();
        this.update();
    }

    update() {
        super.update();

        for (let i = 0; i < this.text.length; i++) {
            const txt = this.text[i];
            txt.draw();
        }

    }
}

class HowToPlay extends Scene {
    constructor() {
        super();
        let widthOfBtn = ClaculateUnit(6);
        let middle = canvas.width / 2 - (widthOfBtn/2);

        this.text = [
            new TextOnly(0, ClaculateUnit(2), canvas.width, ClaculateUnit(3), "How to Play?", ClaculateUnit(3), true),
            new TextOnly(ClaculateUnit(4), ClaculateUnit(7), canvas.width/3, ClaculateUnit(1), "- You have limited time to move things around", ClaculateUnit(1), false),
            new TextOnly(ClaculateUnit(4), ClaculateUnit(8.5), canvas.width/3, ClaculateUnit(1), "- The objective is to let the monster escape", ClaculateUnit(1), false),
            new TextOnly(ClaculateUnit(4), ClaculateUnit(10), canvas.width/3, ClaculateUnit(1), "- Arrows change the monster direction", ClaculateUnit(1), false),
            new TextOnly(ClaculateUnit(4), ClaculateUnit(11.5), canvas.width/3, ClaculateUnit(1), "- Step on all Pressure Pads (if exists) to unlock the door", ClaculateUnit(1), false),
        ];

        this.buttons = [
            new Button(middle, ClaculateUnit(15), widthOfBtn, ClaculateUnit(2), true, 1, "Back", 0),
        ];
    }

    start() {
        this.events();
        this.update();
    }

    update() {
        super.update();

        for (let i = 0; i < this.text.length; i++) {
            const txt = this.text[i];
            txt.draw();
        }

    }
}

class ThankYou extends Scene {
    constructor() {
        super();
        let widthOfBtn = ClaculateUnit(6);
        let middle = canvas.width / 2 - (widthOfBtn/2);

        this.text = [
            new TextOnly(0, ClaculateUnit(2), canvas.width, ClaculateUnit(3), "Thank you for playing", ClaculateUnit(3), true),
            new TextOnly(0, ClaculateUnit(7), canvas.width, ClaculateUnit(1), "Feel free to leave a your feedback in the comments section", ClaculateUnit(1), true),
            new TextOnly(0, ClaculateUnit(8.5), canvas.width, ClaculateUnit(1), "I'll be reading all of them", ClaculateUnit(1), true),
        ];

        this.buttons = [
            new Button(middle, ClaculateUnit(13), widthOfBtn, ClaculateUnit(2), true, 1, "Main Menu", 0),
        ];
    }

    start() {
        this.events();
        this.update();
    }

    update() {
        super.update();

        for (let i = 0; i < this.text.length; i++) {
            const txt = this.text[i];
            txt.draw();
        }

    }
}


class Level {
    constructor() {

        this.alarmFlag  = false;
        this.lcoked = false;

        this.walls = [
            new Wall(0, 0, canvas.width, ClaculateUnit(3)), // top section before actual walls
            new Wall(0, ClaculateUnit(3), canvas.width, unit), // top wall
            new Wall(0, canvas.height - unit, canvas.width, unit), // bottom wall
            new Wall(0, ClaculateUnit(3), unit, canvas.height), // left wall
            new Wall(canvas.width - unit, ClaculateUnit(3), unit, canvas.height), // right wall
        ];



        this.alarm = new Alarm((canvas.width/2) - ClaculateUnit(0.5), ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(1), 10);

        this.outDoor = new Doors(ClaculateUnit(30), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", true);
        this.innerDoor = new Doors(ClaculateUnit(30), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            new Props(ClaculateUnit(8), ClaculateUnit(4), ClaculateUnit(12), ClaculateUnit(3), true),
        ];

        this.boxes = [
            new Box(ClaculateUnit(4), ClaculateUnit(4), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(5), ClaculateUnit(5), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(6), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(1)),
            new Box(ClaculateUnit(10), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.arrows = [
            new Arrow(ClaculateUnit(15), ClaculateUnit(15), ClaculateUnit(3), ClaculateUnit(3), "left"),
        ];

        this.switches = [
            new Switch(ClaculateUnit(20), ClaculateUnit(15), ClaculateUnit(3), ClaculateUnit(3), true),
        ];

        this.player = new Player(ClaculateUnit(30), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
        this.enemy = new Enemy(ClaculateUnit(30), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");


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
            DragableObjects.push(box);
        }

        for (let i = 0; i < this.arrows.length; i++) {
            let arrow = this.arrows[i];
            ColisionObjects.push(arrow);
            ActiveColisionObjects.push(arrow);
            DragableObjects.push(arrow);
        }

        for (let i = 0; i < this.switches.length; i++) {
            let switchObj = this.switches[i];
            ColisionObjects.push(switchObj);
        }

        for (let i = 0; i < this.props.length; i++) {
            let prop = this.props[i];
            if (prop.iscollision) {
                ColisionObjects.push(prop);
            }
        }

        this.alarm.start();

        // this.outDoor.lcoked = this.lcoked;

    }

    events() {

        canvas.addEventListener("mousedown", (event) => {
            if (!this.alarmFlag) {
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

                // check if any arrow was clicked
                for (let i = 0; i < this.arrows.length; i++) {
                    let arrow = this.arrows[i];
                    if (mouseX >= arrow.x && mouseX <= arrow.x + arrow.width &&
                        mouseY >= arrow.y && mouseY <= arrow.y + arrow.height) {
                        arrow.isDragging = true; // start dragging arrow
                    }
                }
            }
        });
        
        canvas.addEventListener("mouseup", (event) => {
            if (!this.alarmFlag) {
                for (let i = 0; i < this.boxes.length; i++) {
                    let box = this.boxes[i];
                    if (box.isDragging) {
                        box.isDragging = false;
                    }
                }

                for (let i = 0; i < this.arrows.length; i++) {
                    let arrow = this.arrows[i];
                    if (arrow.isDragging) {
                        arrow.isDragging = false;
                    }
                }
            }
        });
        
        canvas.addEventListener("mousemove", (event) => {
            if (!this.alarmFlag) {
                let mouseX = event.clientX - canvas.offsetLeft;
                let mouseY = event.clientY - canvas.offsetTop;
                // this.moveBox(mouseX, mouseY);
                this.moveObject(mouseX, mouseY);
            }
        });

    }

    update() { // draw each frame

        // console.log(this.outDoor.locked);

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        // zindex 0 zone//
        //////////////////

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




        // zindex 1 zone//
        //////////////////

        
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            wall.draw();
        }

        this.innerDoor.draw();
        this.outDoor.draw();

        for (let i = 0; i < this.props.length; i++) {
            let prop = this.props[i];
            prop.draw();
        }
        // this.box.draw();



        // zindex 2 zone//
        //////////////////

        // draw boxes
        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            box.draw();
        }


        for (let i = 0; i < this.arrows.length; i++) {
            let arrow = this.arrows[i];
            arrow.draw();
        }

        for (let i = 0; i < this.switches.length; i++) {
            let switchObj = this.switches[i];
            switchObj.draw();
        }


        // zindex 3 zone//
        //////////////////
        if (this.player.show) {
            this.player.draw();
            this.playerLogic();
        }

        if (this.enemy.show) {
            this.enemy.draw();
            this.EnemyLogic();
        }
        

        // logic zone//
        ///////////////

        if(this.alarm.alarmFlag && !this.alarmFlag) {
            this.player.show = true;
            this.enemy.actiate();
        }
        this.alarmFlag = this.alarm.alarmFlag;

    }

    moveObject(mouseX, mouseY) {

        for (let i = 0; i < DragableObjects.length; i++) {
            let dragObj = DragableObjects[i];
            if (dragObj.isDragging) {
                // snap dragObj position to grid
                let snappedX = Math.floor((mouseX - dragObj.width / 2) / gridSize) * gridSize;
                let snappedY = Math.floor((mouseY - dragObj.height / 2) / gridSize) * gridSize;
    
                // prevent dragObj from moving through walls
                let canMoveX = true;
                let canMoveY = true;
    
                for (let i = 0; i < ColisionObjects.length; i++) {
                    let obj1 = dragObj;
                    let obj2 = ColisionObjects[i];
                    if (obj1 !== obj2) {
                        if (snappedX < obj2.x + obj2.width &&
                            snappedX + obj1.width > obj2.x &&
                            snappedY < obj2.y + obj2.height &&
                            snappedY + obj1.height > obj2.y) {
                            if (snappedX < obj2.x + obj2.width && snappedX + dragObj.width > obj2.x) {
                                canMoveY = false;
                            }
                            if (snappedY < obj2.y + obj2.height && snappedY + dragObj.height > obj2.y) {
                                canMoveX = false;
                            }
                        }
                    }
                }
    
                if (canMoveX) {
                    dragObj.x = snappedX;
                }
                if (canMoveY) {
                    dragObj.y = snappedY;
                }
            }
        }
    }

    playerLogic() {

        if(this.player.isMoving) {
            this.player.move();
        }

        if (this.player.touch(this.outDoor)) {
            winning();
        }

        //check if the player is touching any element and stop if it is
        // the check should be only for elemts that is in the direction that the box os moving
        // if there is collision, the player should stop moving
        for (let i = 0; i < ColisionObjects.length; i++) {
            let obj = ColisionObjects[i];
            if (this.player.isMoving) {
                if(SingleCollisionDetection(this.player, obj)) {

                    if(obj.isreachable) {

                        if(obj.isarrow) {
                            // console.log("arrow");
                            if(obj.direction != this.player.direction) {
    
                                // if(Math.trunc(this.player.y) == obj.y || Math.trunc(this.player.x) == obj.x) {
                                //     console.log("collision");
                                //     this.player.direction = obj.direction;
                                // }
    
                                if(obj.direction == "left" || obj.direction == "right") {
                                    if(Math.trunc(this.player.y) == obj.y) {
                                        this.player.direction = obj.direction;
                                    }
                                }
        
                                if(obj.direction == "up" || obj.direction == "down") {
                                    if(Math.trunc(this.player.x) == obj.x) {
                                        this.player.direction = obj.direction;
                                    }
                                }
                                
                            }
                        } else {
                            // console.log("Switch");
                            if(obj.locked) {
                                // console.log("locked");
                                obj.locked = false;
                                let allSwitchesUnLocked = true;

                                for (let i = 0; i < this.switches.length; i++) {
                                    let switchObj = this.switches[i];
                                    if(switchObj.locked == true) {
                                        console.log("found a locked switch");
                                        allSwitchesUnLocked = false;
                                    }
                                }

                                if(allSwitchesUnLocked) {
                                    console.log("all switches unlocked");
                                    this.lcoked = false;
                                    this.outDoor.locked = false;
                                }
                            }
                        }


                         
                    } else {
                        if (this.player.direction === "left") {
                            if (this.player.x < obj.x + obj.width) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "right") {
                            if (this.player.x + this.player.width > obj.x) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "up") {
                            if (this.player.y < obj.y + obj.height) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "down") {
                            if (this.player.y + this.player.height > obj.y) {
                                this.player.isMoving = false;
                            }
                        }
                    }

                }
            }
        }

    }

    EnemyLogic() {

        if(this.enemy.isMoving) {
            this.enemy.move();
        }

        if (this.enemy.touch(this.player)) {
            Losing();
        }

        for (let i = 0; i < ColisionObjects.length; i++) {
            let obj = ColisionObjects[i];
            if (this.enemy.isMoving) {

                if(obj.isreachable) {

                    if(SingleCollisionDetection(this.enemy, obj)) {

                        if(obj.direction != this.enemy.direction) {

                            // if(Math.trunc(this.enemy.y) == obj.y || Math.trunc(this.enemy.x) == obj.x) {
                            //     console.log("collision");
                            //     this.enemy.direction = obj.direction;
                            // }
                            
                            if(obj.direction == "left" || obj.direction == "right") {
                                if(Math.trunc(this.enemy.y) == obj.y) {
                                    this.enemy.direction = obj.direction;
                                }
                            }
    
                            if(obj.direction == "up" || obj.direction == "down") {
                                if(Math.trunc(this.enemy.x) == obj.x) {
                                    this.enemy.direction = obj.direction;
                                }
                            }
                            
                        }
                         
                        
                    }
                }
            }
        }

    }

}


let lastlvlPassed = 0;
let currentlvlIndex = 0;
// let currentSceneIndex = 0;

let scenes = [
    // 1 menu
    // 2 how to play
    // 3 losing screen
    // 4 thank you for playing
    new Menu(),
    new HowToPlay(),
    new ThankYou(),
];

let lvls = [
    new Level(),
    new Level(),
    new Level(),
];


let currentScene;
currentScene = new Menu();


function init() {
    currentScene.start();
    currentScene.events();
    draw();
}

function draw() {
    currentScene.update();
    setInterval(draw, frameRate); // update at 60fps
}

function winning() {
    clearEverything();
    lastlvlPassed = currentlvlIndex;
    currentlvlIndex++;
    changelvl(param,2);
}

function Losing() {
    clearEverything();
    lvlChanger(3, 1);
}

function lvlChanger(lvl, sceneType) {
    console.log('lvlChanger');
    clearEverything();
    if(sceneType == 1) {
        currentScene = scenes[lvl];
    } else {
        // currentScene = lvls[lvl];
        if(lvl <= lvls.length - 1) {
        currentScene = lvls[lvl];
        } else {
            currentScene = scenes[3];
        }
    }
    init();
}

function clearEverything() {

    DragableObjects = [];
    ColisionObjects = [];
    ActiveColisionObjects = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();




function test() {
    console.log("test");
}