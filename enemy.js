/**
 * Created by James on 09/04/2017.
 */
//Enemy----------------

function Enemy(x, y) {
    this.x = x * scl;
    this.y = y * scl;
    this.xspeed = 0;
    this.yspeed = 0;
    this.noUp = false;
    this.noRight = false;
    this.noLeft = false;
    this.noDown = false;

    this.show = function() {
        fill(100, 200, 100);
        rect(this.x, this.y, scl, scl);
    }

    this.update = function() {
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
    }

    this.stop = function() {
        this.xspeed = 0;
        this.yspeed = 0;
    }

    this.patrol = function() {
        var randomNumber = Math.floor(random(10));
        if (randomNumber === 1 && !this.noLeft) {
            this.xspeed = -1;
            this.yspeed = 0;
        } else if (randomNumber === 2 && !this.noRight) {
            this.xspeed = 1;
            this.yspeed = 0;
        } else if (randomNumber === 3 && !this.noUp) {
            this.xspeed = 0;
            this.yspeed = -1;
        } else if (randomNumber === 4 && !this.noDown) {
            this.xspeed = 0;
            this.yspeed = 1;
        } else {
            this.stop();
        }
    }

    this.kill = function() {
        if (this.x == s.x && this.y == s.y) {
            alert("You died motherfucker");
        }
    }
}

//---------------------