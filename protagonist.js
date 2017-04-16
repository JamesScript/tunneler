/**
 * Created by James on 09/04/2017.
 */
//Protagonist------------
function Protagonist(x, y) {
    this.x = x * scl;
    this.y = y * scl;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;

    this.stop = function() {
        s.xspeed = 0;
        s.yspeed = 0;
    }

    this.immobilise = function() {
        noUp = true;
        noRight = true;
        noDown = true;
        noLeft = true;
    }

    this.mobilise = function() {
        noUp = false;
        noRight = false;
        noDown = false;
        noLeft = false;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function() {
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function() {
        fill(255);
        ellipse(this.x + scl / 2, this.y + scl / 2, scl, scl)
    }
}
//-----------------------