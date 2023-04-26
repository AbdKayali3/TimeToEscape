class Enemy extends Player {
    constructor(x, y, width, height, direction = "up", isMoving = true) {
        super(x, y, width, height, direction, isMoving);
        this.startTime = null;
        this.time = 1;
        // this.show = false;
    }

    draw(color = "white", image = false, src = null) {

        if (artOn) {
            image = true;
        }

        switch (this.direction) {
            case "up":
                src = "images/gameobjects/rocket_up.png";
                break;
            case "down":
                src = "images/gameobjects/rocket_down.png";
                break;
            case "left":
                src = "images/gameobjects/rocket_left.png";
                break;
            case "right":
                src = "images/gameobjects/rocket_right.png";
                break;
            default:
                src = "images/gameobjects/rocket_up.png";
                break;
        }

        super.draw(color, image, src);
    }

    actiate() {
        this.tick();
    }

    tick(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        let elapsedTime = timestamp - this.startTime;
        // console.log("elapsedTime: " + elapsedTime + " " + this.startTime);
        // console.log("time: " + this.time);
        if (elapsedTime >= this.time * 1000) {
          this.show = true;
        //   console.log("show");
        } else {
        //   console.log("not show");
          window.requestAnimationFrame((timestamp) => this.tick(timestamp));
        }
      }

    move() {
        super.move();
    }

    touch(obj) {
        // check if the enemy is touching the player manually not using existing functions
        if (this.show) {
            if (obj.direction == this.direction) {
                if ((this.x < obj.x + obj.width &&
                    this.x + this.width > obj.x &&
                    this.y < obj.y + obj.height &&
                    this.y + this.height > obj.y))
                    {
                        this.isMoving = false;
                        return true;
                    }
            }

        }

        return false;
    }

}