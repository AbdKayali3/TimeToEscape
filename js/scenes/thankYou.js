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

    // draw() {
    //     setInterval(this.update, frameRate);
    // }
}
