class Arrow extends GameObject {
    constructor(x, y, width, height, direction) {
        super(x, y, width, height);
        this.isDragging = false;
        this.direction = direction;
        this.isreachable = true;
        this.isarrow = true;
    }

    draw(color = "yellow", image = false, src = null) {

        if (artOn) {
            image = true;
        }

        switch (this.direction) {
            case "up":
                src = "images/gameobjects/arrow_up.png";
                break;
            case "down":
                src = "images/gameobjects/arrow_down.png";
                break;
            case "left":
                src = "images/gameobjects/arrow_left.png";
                break;
            case "right":
                src = "images/gameobjects/arrow_right.png";
                break;
            default:
                src = "images/gameobjects/arrow_up.png";
                break;
        }

        super.draw(color, image, src);
    }

}