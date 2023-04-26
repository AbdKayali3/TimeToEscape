class Level6 extends Level {

    constructor() {
        super();
        this.lcoked = false;
        this.yMain = 33;

        this.walls.push(new Wall(ClaculateUnit(36), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(33), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(30), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(27), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(24), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(21), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(18), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(15), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        
        this.walls.push(new Wall(ClaculateUnit(21), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(18), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(15), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(12), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(9), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(6), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(3), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));
        this.walls.push(new Wall(ClaculateUnit(1), ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), "piece_h"));


        this.outDoor = new Doors(ClaculateUnit(26), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            // new Props(ClaculateUnit(14), ClaculateUnit(4), true, 1),

            // // left
            new Props(ClaculateUnit(1), ClaculateUnit(11), true, 10),
            new Props(ClaculateUnit(1), ClaculateUnit(14), true, 8),
            new Props(ClaculateUnit(1), ClaculateUnit(16), true, 10),
            new Props(ClaculateUnit(1), ClaculateUnit(19), true, 8),
            new Props(ClaculateUnit(1), ClaculateUnit(21), true, 8),
            new Props(ClaculateUnit(1), ClaculateUnit(21), true, 10),
            
            // // right
            new Props(ClaculateUnit(36), ClaculateUnit(4), true, 16),
            new Props(ClaculateUnit(36), ClaculateUnit(7), true, 8),
            new Props(ClaculateUnit(36), ClaculateUnit(9), true, 16),
            new Props(ClaculateUnit(36), ClaculateUnit(12), true, 8),
            new Props(ClaculateUnit(36), ClaculateUnit(14), true, 8),
            new Props(ClaculateUnit(36), ClaculateUnit(14), true, 16),
            
            // // down
            // new Props(ClaculateUnit(14), ClaculateUnit(21), true, 5),
            // new Props(ClaculateUnit(21), ClaculateUnit(21), true, 5),


        ];

        this.boxes = [
            new Box(ClaculateUnit(2), ClaculateUnit(5), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(5), ClaculateUnit(6), ClaculateUnit(3), ClaculateUnit(3)),

        ];

        this.arrows = [
            new Arrow(ClaculateUnit(30), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3), "left"),
            new Arrow(ClaculateUnit(26), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3), "up"),
            new Arrow(ClaculateUnit(13), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3), "up"),
            new Arrow(ClaculateUnit(7), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3), "right"),
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