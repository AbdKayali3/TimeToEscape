let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1280;
// canvas.height = 705;
canvas.height = 801;

const font = 'VT323';
const gridColor = "#00000030";
const bgColor = "#6A6A84";

const FPS = 60;
const frameRate = 1000 / FPS;


const unit = 32;
const gridSize = unit;

function ClaculateUnit(n) {return n * unit;}

const speed = ClaculateUnit(8) / FPS; // unit per second
const animationSpeed = 4; // animation_frames per second


let DragableObjects = [];
let ColisionObjects = [];
let ActiveColisionObjects = [];

let musicOn = true;
let SFXOn = true;
let artOn = true;



function SingleCollisionDetection(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y) {

            return true;
        }

        return false;

}

function CollisionDetection(obj1) {
    for (let i = 0; i < ColisionObjects.length; i++) {
        let obj2 = ColisionObjects[i];
        if (SingleCollisionDetection(obj1, obj2)) {
            return obj2;
        }
    }
    return false;
}