class Box extends GameObject {
    constructor(x, y, width, height) {
        
        super(x, y, width, height);
        this.isDragging = false;
    }

    draw(color = "red", image = false, src = null) {
        super.draw(color, image, src);
    }
}