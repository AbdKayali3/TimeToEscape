class Level9 extends Level {

    constructor() {
        super();
        this.lcoked = true;
        this.yMain =7;

        this.outDoor = new Doors(ClaculateUnit(30), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", true);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            // new Props(ClaculateUnit(30), ClaculateUnit(15), true, 14),
            // new Props(ClaculateUnit(30), ClaculateUnit(8), true, 14),

            // // left
            new Props(ClaculateUnit(1), ClaculateUnit(6), true, 12),
            new Props(ClaculateUnit(1), ClaculateUnit(12), true, 10),
            new Props(ClaculateUnit(1), ClaculateUnit(19), true, 13),
            new Props(ClaculateUnit(1), ClaculateUnit(15), true, 12),
            
            new Props(ClaculateUnit(24), ClaculateUnit(6), true, 12),
            // new Props(ClaculateUnit(24), ClaculateUnit(12), true, 10),
            // new Props(ClaculateUnit(24), ClaculateUnit(19), true, 13),
            new Props(ClaculateUnit(24), ClaculateUnit(15), true, 12),
            
            // // right
            new Props(ClaculateUnit(13), ClaculateUnit(6), true, 18),
            // new Props(ClaculateUnit(13), ClaculateUnit(12), true, 16),
            // new Props(ClaculateUnit(13), ClaculateUnit(19), true, 13),
            new Props(ClaculateUnit(13), ClaculateUnit(15), true, 18),


            new Props(ClaculateUnit(36), ClaculateUnit(6), true, 18),
            new Props(ClaculateUnit(36), ClaculateUnit(12), true, 16),
            new Props(ClaculateUnit(36), ClaculateUnit(19), true, 13),
            new Props(ClaculateUnit(36), ClaculateUnit(15), true, 18),
            
            // // down
            // new Props(ClaculateUnit(14), ClaculateUnit(21), true, 5),
            // new Props(ClaculateUnit(21), ClaculateUnit(21), true, 5),


        ];

        this.boxes = [
            new Box(ClaculateUnit(25), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(13), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.arrows = [
            new Arrow(ClaculateUnit(7), ClaculateUnit(14), ClaculateUnit(3), ClaculateUnit(3), "right"),
            new Arrow(ClaculateUnit(21), ClaculateUnit(9), ClaculateUnit(3), ClaculateUnit(3), "down"),
            new Arrow(ClaculateUnit(21), ClaculateUnit(18), ClaculateUnit(3), ClaculateUnit(3), "right"),
            new Arrow(ClaculateUnit(30), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3), "up"),
        ];

        this.switches.push(
             new Switch(ClaculateUnit(17), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), true),
             new Switch(ClaculateUnit(30), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), true),
        );

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