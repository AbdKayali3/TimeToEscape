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
        // console.log('clicked');
        if(this.islvl) {
            this.changelvl(this.param);
        } else {
            this.callEvent(this.param);
        }
    }

    changelvl(lvl) {
        // console.log('changelvl');
        lvlChanger(lvl, this.sceneType);
    }

    callEvent(functionName) {
        window[functionName]();
    }
}