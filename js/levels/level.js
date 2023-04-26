class Level {
    constructor() {

        this.alarmFlag  = false;
        this.lcoked = false;
        this.clickHandlers = [];
        this.hasAlarm = true;

        this.walls = [
            // new Wall(0, 0, canvas.width, ClaculateUnit(3)), // top section before actual walls
            new Wall(0, ClaculateUnit(3), canvas.width, unit), // top wall
            new Wall(0, canvas.height - unit, canvas.width, unit), // bottom wall
            new Wall(0, ClaculateUnit(3), unit, canvas.height), // left wall
            new Wall(canvas.width - unit, ClaculateUnit(3), unit, canvas.height), // right wall
        ];

        this.buttons = [
            new Button( canvas.width - ClaculateUnit(4), ClaculateUnit(0.5), ClaculateUnit(3), ClaculateUnit(2), true, 2, "Restart", currentlvlIndex),
        ];

        let crTxt = "Current lvl: " + (currentlvlIndex + 1);

        this.text = [
            new TextOnly(ClaculateUnit(2), ClaculateUnit(1), canvas.width/3, ClaculateUnit(1), crTxt, ClaculateUnit(1), false),
        ];



        this.alarm = new Alarm((canvas.width/2) - ClaculateUnit(0.5), ClaculateUnit(1.5), ClaculateUnit(2), ClaculateUnit(1), 10);

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
            new Switch(ClaculateUnit(30), ClaculateUnit(15), ClaculateUnit(3), ClaculateUnit(3), true),
        ];

        this.player = new Player(ClaculateUnit(30), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
        this.enemy = new Enemy(ClaculateUnit(30), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");


        console.log('lvl created');

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

        console.log('lvl starting');
        this.alarm.start();

        // this.outDoor.lcoked = this.lcoked;

    }

    events() {
        // // Remove old click handlers
        for (let i = 0; i < this.clickHandlers.length; i++) {
            canvas.removeEventListener("click", this.clickHandlers[i]);
        }
        this.clickHandlers = [];
    
        // Add new click handlers
        for (let i = 0; i < this.buttons.length; i++) {
            const btn = this.buttons[i];
            const clickHandler = this.handleButtonClick(btn);
            canvas.addEventListener("click", clickHandler);
            this.clickHandlers.push(clickHandler);
        }

        canvas.addEventListener("mousedown", this.handleMouseDown);
        canvas.addEventListener("mouseup", this.handleMouseUp);
        canvas.addEventListener("mousemove", this.handleMouseMove);
        
    }


    // buttons click handler
    handleButtonClick = (btn) => {
        return function(event) {
            console.log("click");
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
    
            // Check if the click occurred within the bounds of the button
            if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                mouseY >= btn.y && mouseY <= btn.y + btn.height) {
                btn.clicked();
            }
        }  
    }

    handleMouseUp = (event) => {
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
    }


    handleMouseDown = (event) => {
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
    }

    handleMouseMove = (event) => {
        if (!this.alarmFlag) {
            let mouseX = event.clientX - canvas.offsetLeft;
            let mouseY = event.clientY - canvas.offsetTop;
            this.moveObject(mouseX, mouseY);
        }
    }


    // Later, when changing levels
    clearEvent() {
        console.log("clearing events");
        for (let i = 0; i < this.clickHandlers.length; i++) {
            canvas.removeEventListener("click", this.clickHandlers[i]);
        }

        canvas.removeEventListener("mousedown", this.handleMouseDown);
        canvas.removeEventListener("mouseup", this.handleMouseUp);
        canvas.removeEventListener("mousemove", this.handleMouseMove);


    }

    // events() {

    //     for (let i = 0; i < this.buttons.length; i++) {

    //         const btn = this.buttons[i];
            
    //         // btn.addEventListener("click", function() {
    //         //     btn.clicked();
    //         // });
    //         canvas.addEventListener("click", function(event) {

    //             var rect = canvas.getBoundingClientRect();
    //             var mouseX = event.clientX - rect.left;
    //             var mouseY = event.clientY - rect.top;

    //             // Check if the click occurred within the bounds of the button
    //             if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
    //                 mouseY >= btn.y && mouseY <= btn.y + btn.height) {
    //                     btn.clicked();
    //             }
    //         });
    //     }

    //     canvas.addEventListener("mousedown", (event) => {
    //         if (!this.alarmFlag) {
    //             let mouseX = event.clientX - canvas.offsetLeft;
    //             let mouseY = event.clientY - canvas.offsetTop;
    
    //             // check if any box was clicked
    //             for (let i = 0; i < this.boxes.length; i++) {
    //                 let box = this.boxes[i];
    //                 if (mouseX >= box.x && mouseX <= box.x + box.width &&
    //                     mouseY >= box.y && mouseY <= box.y + box.height) {
    //                     box.isDragging = true; // start dragging box
    //                 }
    //             }

    //             // check if any arrow was clicked
    //             for (let i = 0; i < this.arrows.length; i++) {
    //                 let arrow = this.arrows[i];
    //                 if (mouseX >= arrow.x && mouseX <= arrow.x + arrow.width &&
    //                     mouseY >= arrow.y && mouseY <= arrow.y + arrow.height) {
    //                     arrow.isDragging = true; // start dragging arrow
    //                 }
    //             }
    //         }
    //     });
        
    //     canvas.addEventListener("mouseup", (event) => {
    //         if (!this.alarmFlag) {
    //             for (let i = 0; i < this.boxes.length; i++) {
    //                 let box = this.boxes[i];
    //                 if (box.isDragging) {
    //                     box.isDragging = false;
    //                 }
    //             }

    //             for (let i = 0; i < this.arrows.length; i++) {
    //                 let arrow = this.arrows[i];
    //                 if (arrow.isDragging) {
    //                     arrow.isDragging = false;
    //                 }
    //             }
    //         }
    //     });
        
    //     canvas.addEventListener("mousemove", (event) => {
    //         if (!this.alarmFlag) {
    //             let mouseX = event.clientX - canvas.offsetLeft;
    //             let mouseY = event.clientY - canvas.offsetTop;
    //             // this.moveBox(mouseX, mouseY);
    //             this.moveObject(mouseX, mouseY);
    //         }
    //     });

    // }

    update() { // draw each frame

        // console.log(this.outDoor.locked);
    
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        // fill the whole canvas with background color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        

        // zindex 0 zone//
        //////////////////

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

        //fill the first three units with pannel color
        ctx.fillStyle = pannelColor;
        ctx.fillRect(0, 0, canvas.width, ClaculateUnit(3));


        // zindex 1 zone//
        //////////////////

        
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];
            wall.draw();
        }

        for (let i = 0; i < this.buttons.length; i++) {
            const btn = this.buttons[i];       
            btn.draw();
        }

        for (let i = 0; i < this.text.length; i++) {
            const txt = this.text[i];
            txt.draw();
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
    
    
                                if(obj.direction == "left" || obj.direction == "right") {
                                    if(Math.trunc(this.player.y) == obj.y) {
                                        this.player.direction = obj.direction;
                                        
                                        // round down the player position to the grid
                                        this.player.y = Math.floor(this.player.y / gridSize) * gridSize;
                                    }
                                }
        
                                if(obj.direction == "up" || obj.direction == "down") {
                                    if(Math.trunc(this.player.x) == obj.x) {
                                        this.player.direction = obj.direction;

                                        // round down the player position to the grid
                                        this.player.x = Math.floor(this.player.x / gridSize) * gridSize;
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
                                        // console.log("found a locked switch");
                                        allSwitchesUnLocked = false;
                                    }
                                }

                                if(allSwitchesUnLocked) {
                                    // console.log("all switches unlocked");
                                    this.lcoked = false;
                                    this.outDoor.locked = false;
                                }
                            }
                        }


                         
                    } else {

                        if (this.player.direction === "left") {
                            if (this.player.x < obj.x + obj.width && this.player.y + this.player.height > obj.y && this.player.y < obj.y + obj.height) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "right") {
                            if (this.player.x + this.player.width > obj.x && this.player.y + this.player.height > obj.y && this.player.y < obj.y + obj.height) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "up") {
                            if (this.player.y < obj.y + obj.height && this.player.x + this.player.width > obj.x && this.player.x < obj.x + obj.width) {
                                this.player.isMoving = false;
                            }
                        }
                        if (this.player.direction === "down") {
                            if (this.player.y + this.player.height > obj.y && this.player.x + this.player.width > obj.x && this.player.x < obj.x + obj.width) {
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
    
    stopAlarm() {
        console.log("stop alarm");
        this.alarm.stop();
    }
    // draw() {
    //     setInterval(this.update, frameRate);
    // }

}