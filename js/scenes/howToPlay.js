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

    // draw() {
    //     setInterval(this.update, frameRate);
    // }
}