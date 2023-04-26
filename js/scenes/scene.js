class Scene {
    constructor() {
        this.buttons = [
            new Button(ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), true, 2, "play", 0),
            // new Button(ClaculateUnit(6), ClaculateUnit(2), ClaculateUnit(2), ClaculateUnit(2), false, null, "test", "test"),
        ];
        this.clickHandlers = [];
        this.hasAlarm = false;
    }

    start() {
        // this.clickHandlers = [];
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
    // }

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
    }
    
    // Later, when changing levels
    clearEvent() {
        console.log("clearing events");
        for (let i = 0; i < this.clickHandlers.length; i++) {
            canvas.removeEventListener("click", this.clickHandlers[i]);
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

    // draw() {
    //     setInterval(this.update, frameRate);
    // }
}