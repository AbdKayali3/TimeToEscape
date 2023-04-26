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