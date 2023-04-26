class Player extends GameObject {
    constructor(x, y, width, height, direction = "up", isMoving = true) {
        super(x, y, width, height);
        this.isMoving = isMoving;
        this.direction = direction;
        this.show = false;
    }

    draw(color = "green", image = false, src = null) {
        if(this.show) {

            if (artOn) {
                image = true;
            }
            
            if (src == null) {
                switch (this.direction) {
                    case "up":
                        src = "images/gameobjects/player_up.png";
                        break;
                    case "down":
                        src = "images/gameobjects/player_down.png";
                        break;
                    case "left":
                        src = "images/gameobjects/player_left.png";
                        break;
                    case "right":
                        src = "images/gameobjects/player_right.png";
                        break;
                    default:
                        src = "images/gameobjects/player_up.png";
                        break;
                }
            }

            super.draw(color, image, src);
        }
    }

    move() {
        if (this.isMoving && this.show) {
            switch (this.direction) {
                case "up":
                    this.y -= speed;
                    break;
                case "down":
                    this.y += speed;
                    break;
                case "left":
                    this.x -= speed;
                    break;
                case "right":
                    this.x += speed;
                    break;
            }
        }
    }

    touch(obj) {
        // check if player is touching door manually not using existing functions
        // console.log(this);
        if (this.show) {
            if ((this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y))
                {
                if (obj.locked) {
                    // console.log("door is locked");
                    return false;
                } else {
                    // console.log("door is unlocked");
                    this.isMoving = false;
                    return true;
                }
            }
        }

        return false;   
    }

}