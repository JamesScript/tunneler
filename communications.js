/**
 * Created by James on 12/04/2017.
 */
//Communicaion Box-----

function Communication(content, opOne, opTwo, opThree) {
    this.show = function() {
        s.immobilise();
        fill(219, 211, 173, 200);
        rect(25, 300, 550, 275, 10);
        fill(0);
        textAlign(CENTER);
        textSize(22);
        textFont(retroFont);
        text(content, 50, 320, 500, 150);
        if (opOne === undefined || opOne === "Next") {
            fill(249, 221, 183, 200);
            rect(400, 480, 120, 40, 10);
            fill(0);
            textSize(22);
            text("Next", 400, 485, 120, 40);
            if (mouseIsPressed && mouseX > 400 && mouseX < 520 && mouseY > 480 && mouseY < 520) {
                sounds[4].play();
                comms.splice(0, 1);
                if (comms[0] === undefined) {
                    s.mobilise();
                }
            }
        }
    }
}