class Alarm extends GameObject {
    constructor(x, y, width, height, time) {
        super(x, y, width, height);
        this.time = time;
        this.startTime = Date.now();
        this.alarmFlag = false;
        // console.log("timer created");
    }

    start() {
        this.startTime = Date.now();
        window.requestAnimationFrame(() => this.tick());

    }

    tick() {
        let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        if (elapsedTime < this.time) {
            this.time;
            this.draw(this.time - elapsedTime);
            window.requestAnimationFrame(() => this.tick());
        } else {
            this.alarmFlag = true;
            this.draw(0);
        }
        // console.log("timer ticked");

        // console.log("tick");
    }

    draw(time) {
        // ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, ClaculateUnit(0.5), 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = ClaculateUnit(1)+"px "+ font;
        ctx.fillText(time, this.x+ClaculateUnit(0.8), this.y+ClaculateUnit(0.27));
    }
}