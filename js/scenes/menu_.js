class Menu extends Scene {
    constructor() {
        super();
        let widthOfBtn = ClaculateUnit(6);
        let middle = canvas.width / 2 - (widthOfBtn/2);

        this.text = [
            new TextOnly(0, ClaculateUnit(2), canvas.width, ClaculateUnit(3), "TIME TO ESCAPE", ClaculateUnit(3)),
            new TextOnly(0, canvas.height - ClaculateUnit(3), canvas.width/3, ClaculateUnit(1), "Made by: GeneralSam Games", ClaculateUnit(1)),
        ];

        this.buttons = [
            new Button(middle, ClaculateUnit(7), widthOfBtn, ClaculateUnit(3), true, 2, "play", currentlvlIndex),
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

    // draw() {
    //     setInterval(this.update, frameRate);
    // }
}