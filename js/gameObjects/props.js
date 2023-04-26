class Props extends GameObject {
    constructor(x, y, width, height, iscollision = false) {
        
        super(x, y, width, height);
        this.iscollision = iscollision;
    }

    draw(color = "blue", image = false, src = null) {
        super.draw(color, image, src);
    }
}