class Level10 extends Level {

    constructor() {
        super();
        this.lcoked = true;
        this.yMain =30;

        this.outDoor = new Doors(ClaculateUnit(2), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", true);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            // new Props(ClaculateUnit(30), ClaculateUnit(15), true, 14),

            // // left
            // new Props(ClaculateUnit(1), ClaculateUnit(6), true, 12),
            
            // // right
            new Props(ClaculateUnit(36), ClaculateUnit(8), true, 15),


            // new Props(ClaculateUnit(36), ClaculateUnit(6), true, 18),
            
            // // down
            // new Props(ClaculateUnit(14), ClaculateUnit(21), true, 5),


        ];

        // this.boxes = [
            // new Box(ClaculateUnit(25), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(13), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3)),
            // new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
        // ];
        this.boxes.push(
            new Box(ClaculateUnit(30), ClaculateUnit(15), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(15), ClaculateUnit(5), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(20), ClaculateUnit(13), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(2), ClaculateUnit(18), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(36), ClaculateUnit(4), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(36), ClaculateUnit(21), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(25), ClaculateUnit(9), ClaculateUnit(3), ClaculateUnit(3)),
        );

        this.arrows = [
            new Arrow(ClaculateUnit(30), ClaculateUnit(19), ClaculateUnit(3), ClaculateUnit(3), "left"),
            new Arrow(ClaculateUnit(7), ClaculateUnit(19), ClaculateUnit(3), ClaculateUnit(3), "up"),
            new Arrow(ClaculateUnit(7), ClaculateUnit(6), ClaculateUnit(3), ClaculateUnit(3), "right"),
            new Arrow(ClaculateUnit(30), ClaculateUnit(6), ClaculateUnit(3), ClaculateUnit(3), "down"),
            new Arrow(ClaculateUnit(25), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), "up"),
            new Arrow(ClaculateUnit(11), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), "left"),
        ];

        this.switches.push(
            new Switch(ClaculateUnit(7), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3), true),
             new Switch(ClaculateUnit(16), ClaculateUnit(19), ClaculateUnit(3), ClaculateUnit(3), true),
             new Switch(ClaculateUnit(20), ClaculateUnit(6), ClaculateUnit(3), ClaculateUnit(3), true),
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