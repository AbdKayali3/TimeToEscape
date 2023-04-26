class Props extends GameObject {
    constructor(x, y, iscollision = false ,type) {
        
        super(x, y, null, null);
        this.iscollision = iscollision;
        
        // 1 = top_computer_center, 2 = top_computer, 3 = top_chemicals, 4 = top_empty
        // 5 = down_computer_center, 6 = down_computer, 7 = down_chemicals, 8 = empty_corner
        // 9 = side_computer_center, 10 = side_computer_middle , 11 = side_computer 
        // 12 = side_chemicals, 13 = side_empty, 14 = tbl
        // 15 = right_computer_center, 16 = right_computer_middle , 17 = right_computer 
        // 18 = right_chemicals, 19 = right_empty
        this.type = type; 


        switch (this.type) {
            case 1:
                this.width = ClaculateUnit(12);
                this.height = ClaculateUnit(3);
                break;
            case 2:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 3:
                this.width = ClaculateUnit(6);
                this.height = ClaculateUnit(3);
                break;
            case 4:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 5:
                this.width = ClaculateUnit(12);
                this.height = ClaculateUnit(3);
                break;
            case 6:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 7:
                this.width = ClaculateUnit(6);
                this.height = ClaculateUnit(3);
                break;
            case 8:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 9:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(12);
                break;
            case 10:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 11:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 12:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(6);
                break;
            case 13:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 14:
                this.width = ClaculateUnit(8);
                this.height = ClaculateUnit(3);
                break;
            case 15:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(12);
                break;
            case 16:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 17:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            case 18:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(6);
                break;
            case 19:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
            default:
                this.width = ClaculateUnit(3);
                this.height = ClaculateUnit(3);
                break;
        }



    }

    

    draw(color = "blue", image = false, src = null) {

        if (artOn) {
            image = true;
        }

        switch (this.type) {
            case 1:
                src = "images/probs/top_computer_center.png";
                break;
            case 2:
                src = "images/probs/top_computer.png";
                break;
            case 3:
                src = "images/probs/top_chemicals.png";
                break;
            case 4:
                src = "images/probs/top_empty.png";
                break;
            case 5:
                src = "images/probs/down_computer_center.png";
                break;
            case 6:
                src = "images/probs/down_computer.png";
                break;
            case 7:
                src = "images/probs/down_chemicals.png";
                break;
            case 8:
                src = "images/probs/empty_corner.png";
                break;
            case 9:
                src = "images/probs/side_computer_center.png";
                break;
            case 10:
                src = "images/probs/side_computer_middle.png";
                break;
            case 11:
                src = "images/probs/side_computer.png";
                break;
            case 12:
                src = "images/probs/side_chemicals.png";
                break;
            case 13:
                src = "images/probs/side_empty.png";
                break;
            case 14:
                src = "images/probs/tbl.png";
                break;
            case 15:
                src = "images/probs/right_computer_center.png";
                break;
            case 16:
                src = "images/probs/right_computer_middle.png";
                break;
            case 17:
                src = "images/probs/right_computer.png";
                break;
            case 18:
                src = "images/probs/right_chemicals.png";
                break;
            case 19:
                src = "images/probs/side_empty.png";
                break;
            default:
                src = "images/probs/top_computer.png";
                break;
        }

        super.draw(color, image, src);
    }
}