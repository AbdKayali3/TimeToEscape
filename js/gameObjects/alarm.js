class Alarm extends GameObject {
    constructor(x, y, width, height, time) {
      super(x, y, width, height);
      this.time = time;
      this.startTime = Date.now();
      this.alarmFlag = false;
      this.animationFrameId = null;
    }
  
    start() {
      this.startTime = Date.now();
      this.tick();
    }
  
    stop() {
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  
    tick() {
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      if (elapsedTime < this.time) {
        this.draw(this.time - elapsedTime);
        tickAudio.play();
        this.animationFrameId = window.requestAnimationFrame(() => this.tick());
      } else {
        this.alarmFlag = true;
        alarmAudio.play();
        this.draw(0);
      }
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