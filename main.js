/**
 * Created by James on 09/04/2017.
 */
//Main Program-----------

var s; // Protagonist
var walls = [];
var fakeWalls = [];
var enemies = [];
var freeSpace = [];
var comms = [];
var lockedDoors = [];
var doors = [];
var traps = [];
var lpScreen; //Lock Picking Screen
var currentDoor; // The number of the locked door currently being picked by player, in terms of its position in the array
var scl = 20; //How big each 'tile' of the grid is
var score = 0;
var food;
var noRight = false;
var noUp = false;
var noDown = false;
var noLeft = false;
var level = "";
var retroFont;
var sounds = [];

function preload() {
    retroFont = loadFont('manaspace.ttf');
    sounds.push(loadSound('water-dripping.wav')); //0
    sounds.push(loadSound('wrongDuhNuh.mp3')); //1
    sounds.push(loadSound('lock.wav')); //2
    sounds.push(loadSound('door-open.mp3')); //3
    sounds.push(loadSound('next.wav')); //4
}

function setup() {
    createCanvas(600, 600);
    frameRate(12);

    //Inital communications
    comms.push(new Communication("What is this place? How the hell did I get here? Is this some sort of prison?"));
    comms.push(new Communication("I need to get out of here."));
    sounds[0].play();

    //New Formula Level Generator--

    function levelGenerate(str) {
        var nums = str.split('');
        for (i=0; i < nums.length; i++) {
            if (nums[i] == "1") {
                walls.push(new Wall(i%30, floor(i/30)));
            } else if (nums[i] == "F") {
                fakeWalls.push(new FakeWall(i%30, floor(i/30)));
            } else if (nums[i] == 'S') {
                s = new Protagonist(i%30, floor(i/30));
            } else if (nums[i] == 'E') {
                enemies.push(new Enemy(i%30, floor(i/30)));
            } else if (nums[i] == '0') {
                freeSpace.push(createVector(i%30, floor(i/30)));
            } else if (nums[i] == "L") {
                lockedDoors.push(new LockedDoor(i%30, floor(i/30)));
            } else if (nums[i] == "D") {
                doors.push(new Door(i%30, floor(i/30)));
            } else if (nums[i] == "T") {
                traps.push(new Trap(i%30, floor(i/30)));
            } /* else if (nums[i] == "2") {
                keyDoors.push(new KeyDoor(i%30, floor(i/30)))
            } */
        }
    }

    levelGenerate(level);
    lpScreen = new lockPicking();
    lpScreen.moverOneY = 110;
    lpScreen.moverOneActive = true;
    lpScreen.moverOneDown = true;
    lpScreen.moverTwoY = 110;
    lpScreen.moverTwoActive = false;
    lpScreen.moverTwoDown = true;

    //------------------------

    pickLocation();
}

function pickLocation() {
    var spot = floor(random(freeSpace.length))
    food = freeSpace[spot];
    console.log(food);
    food.mult(scl);
    if (food.x > scl*30 || food.y > scl*30) {
        pickLocation();
    }
}

function draw() {
    background(51);

    s.update();
    s.show();

    levelScript();

    noRight = false;
    noLeft = false;
    noDown = false;
    noUp = false;

    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
        s.stop();
    }

    for (var i = enemies.length - 1; i >= 0; i--) {
        enemies[i].show();
        enemies[i].update();
        enemies[i].patrol();
        enemies[i].kill();
        enemies[i].noRight = false;
        enemies[i].noLeft = false;
        enemies[i].noDown = false;
        enemies[i].noUp = false;
    }

    for (var i = walls.length - 1; i >= 0; i--) {
        walls[i].show();
        walls[i].check();
        walls[i].eCheck();
    }

    for (var i = fakeWalls.length - 1; i >= 0; i--) {
        fakeWalls[i].show();
    }

    for (var i = lockedDoors.length - 1; i >= 0; i--) {
        lockedDoors[i].n2p = false;
        lockedDoors[i].show();
        lockedDoors[i].check();
        lockedDoors[i].eCheck();
    }

    for (var i = doors.length - 1; i >= 0; i--) {
        doors[i].show();
        doors[i].check();
    }

    for (var i = traps.length - 1; i >= 0; i--) {
        traps[i].show();
    }

    if (s.eat(food)) {
        pickLocation();
        score++;
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);

    if (comms[0] !== undefined) {
        comms[0].show();
    }

    lpScreen.show();

    //REMOVE
    //lpScreen.beginner = true;

    /*
     //mouse Control for Mobile
     if (mouseX > 150 && mouseX < 500 && mouseY < 200) {
     moveUp();
     } else if (mouseX > 150 && mouseX < 500 && mouseY > 350) {
     moveDown();
     } else if (mouseY > 150 && mouseY < 500 && mouseX < 200) {
     moveLeft();
     } else if (mouseY > 150 && mouseY < 500 && mouseX > 400) {
     moveRight();
     } else if (mouseX > 150 && mouseX < 500 && mouseY > 150 && mouseY < 500) {
     s.stop();
     }
     */
}

function keyPressed() {
    if (keyIsDown(UP_ARROW)) {
        moveUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        moveDown();
    } else if (keyIsDown(RIGHT_ARROW)) {
        moveRight();
    } else if (keyIsDown(LEFT_ARROW)) {
        moveLeft();
    } else if (keyIsDown(82)) {
        pickLocation();
    }
}

function moveUp() {
    if (!noUp) {
        s.dir(0, -1);
    }
}

function moveDown() {
    if (!noDown) {
        s.dir(0, 1);
    }
}

function moveRight() {
    if (!noRight) {
        s.dir(1, 0);
    }
}

function moveLeft() {
    if (!noLeft) {
        s.dir(-1, 0);
    }
}

//-----------------------