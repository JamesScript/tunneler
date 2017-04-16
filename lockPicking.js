
function lockPicking() {
    this.show = function() {
        if (this.beginner === true) {
            //stops player from moving during lock picking
            s.immobilise();
            //interface for lock picking
            fill(10, 10, 10, 230);
            rect(0, 0, 600, 600);
            fill(200, 200, 200, 230);
            rect(30, 30, 540, 540);
            //Lock Part 1
            fill(255, 220, 180);
            rect(250, 100, 30, 200);
            noStroke();
            fill(0, 200, 0, 150);
            rect(251, 150, 29, 100);
            //MoverOne
            stroke(0);
            fill(0)
            rect(250, this.moverOneY, 30, 5);
            if (this.moverOneActive) {
                if (this.moverOneDown) {
                    this.moverOneY += 10;
                    if (this.moverOneY >= 280) {
                        this.moverOneDown = false;
                    }
                } else {
                    this.moverOneY -= 10;
                    if (this.moverOneY <= 100) {
                        this.moverOneDown = true;
                    }
                }
            }
            //button One
            if (this.moverOneActive) {
                fill(255, 100, 50);
                ellipse(265, 350, 50, 50);
                var d = dist(mouseX, mouseY, 265, 350);
                if (mouseIsPressed && d < 25) {
                    if (this.moverOneY >= 150 && this.moverOneY <= 250) {
                        this.moverOneActive = false;
                        this.moverTwoActive = true;
                        sounds[2].play()
                    } else {
                        this.moverOneY = 101;
                        sounds[1].play();
                    }
                }
            }
            //Lock Part 2
            fill(255, 220, 180);
            rect(350, 100, 30, 200);
            noStroke();
            fill(0, 200, 0, 150);
            rect(351, 180, 29, 60);
            //MoverTwo
            stroke(0);
            fill(0)
            rect(350, this.moverTwoY, 30, 5);
            if (this.moverTwoActive) {
                if (this.moverTwoDown) {
                    this.moverTwoY += 20;
                    if (this.moverTwoY >= 285) {
                        this.moverTwoDown = false;
                    }
                } else {
                    this.moverTwoY -= 20;
                    if (this.moverTwoY <= 110) {
                        this.moverTwoDown = true;
                    }
                }
            }
            //Button Two
            if (this.moverTwoActive) {
                fill(255, 100, 50);
                ellipse(365, 350, 50, 50);
                var d = dist(mouseX, mouseY, 365, 350);
                if (mouseIsPressed && d < 25) {
                    if (this.moverTwoY > 170 && this.moverTwoY < 240) {
                        sounds[2].play()
                        this.beginner = false;
                        var location = createVector(lockedDoors[currentDoor].x, lockedDoors[currentDoor].y);
                        //lockedDoors.splice(currentDoor, 1);
                        //lockedDoors[currentDoor].x = 900;
                        lockedDoors[currentDoor].active = false;
                        doors.push(new Door(location.x / scl, location.y / scl));
                    } else {
                        this.moverTwoY = 110;
                        this.moverOneY = 110;
                        this.moverTwoActive = false;
                        this.moverOneActive = true;
                        sounds[1].play();
                    }
                }
            }
        }
    }
}

