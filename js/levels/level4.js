class Level4 extends Level {

    constructor() {
        super();
        this.lcoked = false;
        this.yMain = 33;

        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(7), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(10), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(13), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(16), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(18), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(21), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));

        this.outDoor = new Doors(ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            // new Props(ClaculateUnit(36), ClaculateUnit(4), true, 8),

            // // left
            new Props(ClaculateUnit(1), ClaculateUnit(9), true, 9),
            
            // // right
            new Props(ClaculateUnit(26), ClaculateUnit(9), true, 15),
            
            // // down
            new Props(ClaculateUnit(9), ClaculateUnit(21), true, 5),


        ];

        this.boxes = [
            new Box(ClaculateUnit(14), ClaculateUnit(4), ClaculateUnit(3), ClaculateUnit(3)),
        ];

        this.arrows = [
            new Arrow(ClaculateUnit(36), ClaculateUnit(13), ClaculateUnit(3), ClaculateUnit(3), "left"),
            // new Arrow(ClaculateUnit(13), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3), "up"),
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