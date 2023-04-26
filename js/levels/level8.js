class Level8 extends Level {

    constructor() {
        super();
        this.lcoked = true;
        this.yMain = 12;

        this.outDoor = new Doors(ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", true);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            // new Props(ClaculateUnit(30), ClaculateUnit(15), true, 14),
            // new Props(ClaculateUnit(30), ClaculateUnit(8), true, 14),
            // new Props(ClaculateUnit(2), ClaculateUnit(15), true, 14),
            // new Props(ClaculateUnit(2), ClaculateUnit(8), true, 14),
            new Props(ClaculateUnit(2), ClaculateUnit(12), true, 14),
            new Props(ClaculateUnit(30), ClaculateUnit(12), true, 14),
            new Props(ClaculateUnit(16), ClaculateUnit(12), true, 14),

            // // left
            // new Props(ClaculateUnit(1), ClaculateUnit(9), true, 9),
            
            // // right
            // new Props(ClaculateUnit(36), ClaculateUnit(8), true, 17),
            // new Props(ClaculateUnit(36), ClaculateUnit(17), true, 17),
            
            // // down
            // new Props(ClaculateUnit(14), ClaculateUnit(21), true, 5),
            // new Props(ClaculateUnit(21), ClaculateUnit(21), true, 5),


        ];

        this.boxes = [
            new Box(ClaculateUnit(10), ClaculateUnit(11), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(13), ClaculateUnit(13), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.arrows = [
            new Arrow(ClaculateUnit(25), ClaculateUnit(8), ClaculateUnit(3), ClaculateUnit(3), "left"),
            new Arrow(ClaculateUnit(13), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3), "up"),
            new Arrow(ClaculateUnit(8), ClaculateUnit(20), ClaculateUnit(3), ClaculateUnit(3), "right"),
            new Arrow(ClaculateUnit(15), ClaculateUnit(5), ClaculateUnit(3), ClaculateUnit(3), "up"),
        ];

        this.switches.push(
             new Switch(ClaculateUnit(18), ClaculateUnit(8), ClaculateUnit(3), ClaculateUnit(3), true),
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