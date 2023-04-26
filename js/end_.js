

let lastlvlPassed = 0;
let currentlvlIndex = 0;
// let currentSceneIndex = 0;

let scenes = [
    // 1 menu
    // 2 how to play
    // 3 losing screen
    // 4 thank you for playing
    new Menu(),
    new HowToPlay(),
    new ThankYou(),
    new GameOver(),
];

let lvls = [
    new Level(),
    new Level(),
    new Level(),
];


let currentScene;
let firstTimeRun = true;

currentScene = new Menu();

frameBeating = null;

function init() {

    currentScene.start();
    currentScene.events();
    // currentScene.draw();

    if (frameBeating) {
        clearInterval(frameBeating);
    }
        // draw();

    frameBeating = setInterval(draw, frameRate);

    // if(firstTimeRun) {
    //     draw();
    //     firstTimeRun = false;
    // }
}

function draw() {
    currentScene.update();
    // setInterval(draw, frameRate); // update at 60fps
    // console.log('draw');
}

function winning() {
    clearEverything();
    lastlvlPassed = currentlvlIndex;
    currentlvlIndex++;
    console.log("lvl passed");
    console.log(currentlvlIndex);
    lvlChanger(currentlvlIndex,2);
}

function Losing() {
    clearEverything();
    lvlChanger(3, 1);
}

function lvlChanger(lvl, sceneType) {
    // console.log('lvlChanger');
    currentScene.clearEvent();
    clearEverything();
    if(sceneType == 1) {
        currentScene = scenes[lvl];
    } else {
        // currentScene = lvls[lvl];
        if(lvl <= lvls.length - 1) {

            if (currentScene == lvls[lvl]) {
                lvls[lvl] = null;
                currentScene = new currentScene.constructor();
                lvls[lvl] = currentScene;
            } else {
                currentScene = lvls[lvl];
            }

        } else {
            console.log('end of lvls');
            currentScene = scenes[2];
        }
    }
    clearEverything();

    // canvas = document.getElementById("myCanvas");
    // ctx = canvas.getContext("2d");

    init();
}

function clearEverything() {

    // canvas = document.getElementById("myCanvas");
    // ctx = canvas.getContext("2d");

    DragableObjects = [];
    ColisionObjects = [];
    ActiveColisionObjects = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width;
    // canvas.beginPath();
}

init();


function test() {
    console.log("test");
}