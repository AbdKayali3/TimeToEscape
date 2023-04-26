class Arrow extends GameObject {
    constructor(x, y, width, height, direction) {
        super(x, y, width, height);
        this.isDragging = false;
        this.direction = direction;
        this.isreachable = true;
        this.isarrow = true;
    }

    draw(color = "yellow", image = false, src = null) {
        super.draw(color, image, src);
    }

}