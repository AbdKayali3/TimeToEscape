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

        if (artOn) {
            image = true;
        }

        if(!this.locked && this.type == "out") {
            if (image) {
                let img = new Image();
                img.src = "images/gameobjects/door_end_green.png";
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "darkgreen";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        } else {
            if (image) {
                let img = new Image();

                if(this.type == "out") {
                    src = "images/gameobjects/door_end_red.png";
                } else {
                    src = "images/gameobjects/door_start.png";
                }
                img.src = src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = "brown";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}