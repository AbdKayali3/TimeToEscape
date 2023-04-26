class Level2 extends Level {

    constructor() {
        super();
        this.lcoked = false;
        this.yMain = 10;

        this.outDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            new Props(ClaculateUnit(36), ClaculateUnit(4), true, 8),
            new Props(ClaculateUnit(18), ClaculateUnit(4), true, 3),
            new Props(ClaculateUnit(24), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(27), ClaculateUnit(4), true, 3),
            new Props(ClaculateUnit(33), ClaculateUnit(4), true, 2),

            // left
            new Props(ClaculateUnit(1), ClaculateUnit(7), true, 11),

            // right
            new Props(ClaculateUnit(36), ClaculateUnit(7), true, 18),
            new Props(ClaculateUnit(36), ClaculateUnit(13), true, 16),
            new Props(ClaculateUnit(36), ClaculateUnit(16), true, 18),
            new Props(ClaculateUnit(36), ClaculateUnit(21), true, 8),

            // down
            new Props(ClaculateUnit(33), ClaculateUnit(21), true, 6),
            new Props(ClaculateUnit(27), ClaculateUnit(21), true, 7),
            new Props(ClaculateUnit(24), ClaculateUnit(21), true, 6),
            new Props(ClaculateUnit(18), ClaculateUnit(21), true, 7),

        ];

        this.boxes = [
            new Box(ClaculateUnit(11), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(7), ClaculateUnit(8), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(2), ClaculateUnit(14), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(4), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.player = new Player(ClaculateUnit(this.yMain), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
        this.enemy = new Enemy(ClaculateUnit(this.yMain), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
    }

    start() {
        super.start();
    }

    events() {
        super.events();
    }

    update() {
        super.update();
    }

}