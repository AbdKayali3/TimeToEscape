class Wall extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw(color = "black", image = false, src = null) {
        super.draw(color, image, src);
    }
}