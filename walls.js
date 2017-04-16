/**
 * Created by James on 09/04/2017.
 */
//Walls------------------

//CONTENTS
//1 - Walls
//2 - Fake Walls
//3 - Locked Doors
//-----------------------

//1 - Walls

function Wall(x, y) {
    this.x = x * scl;
    this.y = y * scl;

    this.show = function() {
        fill(100, 100, 200);
        rect(this.x, this.y, scl, scl);
    }

    this.check = function() {
        if (s.y == this.y && s.x == this.x - scl) {
            noRight = true;
            if (s.xspeed > 0) {
                s.stop();
            }
        } else if (s.y == this.y && s.x == this.x + scl) {
            noLeft = true;
            if (s.xspeed < 0) {
                s.stop();
            }
        } else if (s.x == this.x && s.y == this.y - scl) {
            noDown = true;
            if (s.yspeed > 0) {
                s.stop();
            }
        } else if (s.x == this.x && s.y == this.y + scl) {
            noUp = true;
            if (s.yspeed < 0) {
                s.stop();
            }
        }
    }


    this.eCheck = function() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            if (enemies[i].y === this.y && enemies[i].x === this.x - scl) {
                enemies[i].noRight = true;
                if (enemies[i].xspeed > 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].y === this.y && enemies[i].x === this.x + scl) {
                enemies[i].noLeft = true;
                if (enemies[i].xspeed < 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].x === this.x && enemies[i].y === this.y - scl) {
                enemies[i].noDown = true;
                if (enemies[i].yspeed > 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].x === this.x && enemies[i].y === this.y + scl) {
                enemies[i].noUp = true;
                if (enemies[i].xspeed < 0) {
                    enemies[i].stop();
                }
            }
        }
    }
}

//2 - Fake Walls

function FakeWall(x, y) {
    this.x = x * scl;
    this.y = y * scl;
    this.alpha = 255;
    this.show = function () {
        fill(100, 100, 200, this.alpha);
        rect(this.x, this.y, scl, scl);
        if (s.x === this.x && s.y === this.y) {
            this.alpha = 100;
        }
    }
}

//3 - Locked Doors

function LockedDoor(x, y) {
    // What each door does should be stored in the levelScript function which should be in the level's .js document
    this.x = x * scl;
    this.y = y * scl;
    this.active = true;

    this.show = function() {
        if (this.active) {
            fill(156, 160, 102);
            rect(this.x, this.y, scl, scl);
        }
    }

    this.check = function() {
        if (this.active) {
            if (s.y == this.y && s.x == this.x - scl) {
                noRight = true;
                this.n2p = true;
                if (s.xspeed > 0) {
                    s.stop();
                }
            } else if (s.y == this.y && s.x == this.x + scl) {
                noLeft = true;
                this.n2p = true;
                if (s.xspeed < 0) {
                    s.stop();
                }
            } else if (s.x == this.x && s.y == this.y - scl) {
                noDown = true;
                this.n2p = true;
                if (s.yspeed > 0) {
                    s.stop();
                }
            } else if (s.x == this.x && s.y == this.y + scl) {
                noUp = true;
                this.n2p = true;
                if (s.yspeed < 0) {
                    s.stop();
                }
            }
        }
    }


    this.eCheck = function() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            if (enemies[i].y === this.y && enemies[i].x === this.x - scl) {
                enemies[i].noRight = true;
                if (enemies[i].xspeed > 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].y === this.y && enemies[i].x === this.x + scl) {
                enemies[i].noLeft = true;
                if (enemies[i].xspeed < 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].x === this.x && enemies[i].y === this.y - scl) {
                enemies[i].noDown = true;
                if (enemies[i].yspeed > 0) {
                    enemies[i].stop();
                }
            } else if (enemies[i].x === this.x && enemies[i].y === this.y + scl) {
                enemies[i].noUp = true;
                if (enemies[i].xspeed < 0) {
                    enemies[i].stop();
                }
            }
        }
    }
}

function Door(x, y) {
    this.x = x * scl;
    this.y = y * scl;
    this.visible = true;
    this.opened = false;
    //this.n2p;
    this.show = function() {
        if (this.visible) {
            fill(0, 220, 0);
            rect(this.x, this.y, scl, scl);
        }
    }

    this.check = function() {
        if (s.x === this.x && s.y === this.y || s.y == this.y && s.x == this.x - scl || s.y == this.y && s.x == this.x + scl || s.x == this.x && s.y == this.y - scl || s.x == this.x && s.y == this.y + scl) {
            this.visible = false;
            if (this.opened === false) {
                sounds[3].play();
                this.opened = true;
            }
        } else {
            this.visible = true;
            this.opened = false;
        }
    }
}

function Trap(x, y) {
    // this.tile: 1 = Wall
    this.x = x * scl;
    this.y = y * scl;
    this.tile = 1;
    this.alpha = 255;
    this.show = function() {
        if (this.tile === 1) {
            fill(100, 100, 200, this.alpha);
            rect(this.x, this.y, scl, scl);
        }
        if (s.x === this.x && s.y === this.y) {
            s.x = 2 * scl;
            s.y = 2 * scl;
            this.alpha = 100;
        }
    }
}

//-----------------------