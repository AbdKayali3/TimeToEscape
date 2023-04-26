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