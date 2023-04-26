class Level3 extends Level {

    constructor() {
        super();
        this.lcoked = false;
        this.yMain = 26;

        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(3), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(9), ClaculateUnit(1), ClaculateUnit(3), "piece_v_end"));
        
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(3), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(9), ClaculateUnit(1), ClaculateUnit(3), "piece_v_end"));
        
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(3), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(9), ClaculateUnit(1), ClaculateUnit(3), "piece_v_end"));
        
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(3), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(6), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(9), ClaculateUnit(1), ClaculateUnit(3), "piece_v_end"));
        
        
        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(16), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(18), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(10), ClaculateUnit(21), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(16), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(18), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(14), ClaculateUnit(21), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(16), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(18), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(25), ClaculateUnit(21), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(16), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(18), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));
        this.walls.push(new Wall(ClaculateUnit(29), ClaculateUnit(21), ClaculateUnit(1), ClaculateUnit(3), "piece_v"));



        this.outDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", false);
        this.innerDoor = new Doors(ClaculateUnit(this.yMain), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");
        
        this.outDoor2 = new Doors(ClaculateUnit(11), ClaculateUnit(3), ClaculateUnit(3), ClaculateUnit(2), "out", true);
        this.innerDoor2 = new Doors(ClaculateUnit(11), ClaculateUnit(23), ClaculateUnit(3), ClaculateUnit(2), "in");

        this.props = [
            // top
            new Props(ClaculateUnit(2), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(6), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(2), ClaculateUnit(8), true, 2),
            new Props(ClaculateUnit(6), ClaculateUnit(8), true, 2),

            new Props(ClaculateUnit(16), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(21), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(16), ClaculateUnit(8), true, 2),
            new Props(ClaculateUnit(21), ClaculateUnit(8), true, 2),

            new Props(ClaculateUnit(31), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(35), ClaculateUnit(4), true, 2),
            new Props(ClaculateUnit(31), ClaculateUnit(8), true, 2),
            new Props(ClaculateUnit(35), ClaculateUnit(8), true, 2),
           

            // left
            // new Props(ClaculateUnit(1), ClaculateUnit(7), true, 11),

            // right
            // new Props(ClaculateUnit(36), ClaculateUnit(7), true, 18),

            // down
            new Props(ClaculateUnit(2), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(6), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(2), ClaculateUnit(21), true, 6),
            new Props(ClaculateUnit(6), ClaculateUnit(21), true, 6),

            new Props(ClaculateUnit(16), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(21), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(16), ClaculateUnit(21), true, 6),
            new Props(ClaculateUnit(21), ClaculateUnit(21), true, 6),

            new Props(ClaculateUnit(31), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(35), ClaculateUnit(17), true, 6),
            new Props(ClaculateUnit(31), ClaculateUnit(21), true, 6),
            new Props(ClaculateUnit(35), ClaculateUnit(21), true, 6),

        ];

        this.boxes = [
            new Box(ClaculateUnit(this.yMain), ClaculateUnit(7), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain), ClaculateUnit(17), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain-1), ClaculateUnit(12), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain+2), ClaculateUnit(13), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain-7), ClaculateUnit(14), ClaculateUnit(3), ClaculateUnit(3)),
            new Box(ClaculateUnit(this.yMain+8), ClaculateUnit(11), ClaculateUnit(3), ClaculateUnit(3)),
            
            new Box(ClaculateUnit(9), ClaculateUnit(11), ClaculateUnit(3), ClaculateUnit(3)),
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

        this.innerDoor2.draw();
        this.outDoor2.draw();
    }

}