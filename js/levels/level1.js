class Level1 extends Level {

    constructor() {
        super();
        this.lcoked = false;

        this.outDoor = new Doors(ClaculateUnit(18), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(18), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            new Props(ClaculateUnit(1), ClaculateUnit(4), true, 8),
            new Props(ClaculateUnit(4), ClaculateUnit(4), true, 3),

            new Props(ClaculateUnit(10), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(1), ClaculateUnit(7), true, 12),
            new Props(ClaculateUnit(1), ClaculateUnit(13), true, 13),

            new Props(ClaculateUnit(10), ClaculateUnit(21), true, 6),

            new Props(ClaculateUnit(26), ClaculateUnit(21), true, 6),

            new Props(ClaculateUnit(30), ClaculateUnit(4), true, 14),
        ];

        this.boxes = [
            new Box(ClaculateUnit(18), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(1), ClaculateUnit(16), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(33), ClaculateUnit(19), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.player = new Player(ClaculateUnit(18), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
        this.enemy = new Enemy(ClaculateUnit(18), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up");
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