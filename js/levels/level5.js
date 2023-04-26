class Level5 extends Level {

    constructor() {
        super();
        this.lcoked = false;
        this.yMain = 3;

        this.outDoor = new Doors(ClaculateUnit(33), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            new Props(ClaculateUnit(14), ClaculateUnit(4), true, 1),

            // // left
            // new Props(ClaculateUnit(1), ClaculateUnit(9), true, 9),
            
            // // right
            new Props(ClaculateUnit(36), ClaculateUnit(8), true, 17),
            new Props(ClaculateUnit(36), ClaculateUnit(17), true, 17),
            
            // // down
            new Props(ClaculateUnit(14), ClaculateUnit(21), true, 5),
            // new Props(ClaculateUnit(21), ClaculateUnit(21), true, 5),


        ];

        this.boxes = [
            new Box(ClaculateUnit(10), ClaculateUnit(4), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(25), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(2), ClaculateUnit(14), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(21), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.arrows = [
            new Arrow(ClaculateUnit(30), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3), "right"),
            new Arrow(ClaculateUnit(13), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3), "up"),
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