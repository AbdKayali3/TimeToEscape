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