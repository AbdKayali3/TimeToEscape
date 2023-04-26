class Wall extends GameObject {
    constructor(x, y, width, height, type = "top") {
        super(x, y, width, height);
        this.type = type; // top, down, side, piece_v, piece_h,  piece_v_end
    }

    draw(color = "black", image = false, src = null) {

        // switch the type.. and change the src for the image
        switch (this.type) {
            case "top":
                src = "images/walls/wall_top.png";
                break;
            case "down":
                src = "images/walls/wall_down.png";
                break;
            case "side":
                src = "images/walls/wall_right.png";
                break;
            case "piece_v":
                src = "images/walls/wall_piece_v.png";
                break;
            case "piece_h":
                src = "images/walls/wall_piece_h.png";
                break;
            case "piece_v_end":
                src = "images/walls/wall_piece_v_end.png";
                break;
            case "piece_h_end":
                src = "images/walls/wall_piece_h_end.png";
                break;
            default:
                src = "images/walls/wall_top.png";
                break;
        }

        if (artOn) {
            image = true;
        }

        super.draw(color, image, src);
    }
}