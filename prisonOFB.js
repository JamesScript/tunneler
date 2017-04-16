level =
    "111111111111111111111111111111" +
    "10S00111100001111000011T100001" +
    "10000111100001111000011F100001" +
    "10000FFFF00001111000011F100001" +
    "10000111100001111000011F100001" +
    "10000111100001111000011F100001" +
    "11011111110111111101111F110111" +
    "11L1111111L1111111DFFFFF11L111" +
    "110111111101111111011111110111" +
    "100000000000000000000000000001" +
    "100000000000000000000000000001" +
    "100000000000000000000000000001" +
    "100000000000000000000000000001" +
    "11111111111111F111111111111111" +
    "11TFFFFFF111FFFFF111FFFF111111" +
    "111FT11FFFFFF111FFFFF11T111111" +
    "111F11111111111111111111111111" +
    "100000000000000000000000000001" +
    "100000000000000000000000000001" +
    "111F111F11111111F11111T1111F11" +
    "100001100000011000010000100001" +
    "100001100000011000011F00F00001" +
    "10000111111T1FF0000100T1100001" +
    "1000010000001F10000F0000T00001" +
    "111111111FFF1F1111111111111111" +
    "100000000010000000010000000001" +
    "100000000010000000010000000001" +
    "100000000010000000010000000001" +
    "100000000010000000010000000001" +
    "111111111111111111111111111111";

levelScript = function() {
    //Locked Door #1
    if (keyIsDown(13) && lockedDoors[0].n2p === true) {
        if (comms[0] === undefined) {
            comms.push(new Communication("This lock is far too complicated, I wouldn't know where to begin trying to pick it."));
        }
    }

    //Locked Door #2
    if (lockedDoors[1] !== undefined) {
        if (keyIsDown(13) && lockedDoors[1].n2p === true) {
            currentDoor = 1;
            lpScreen.beginner = true;
        }
    }

    //Locked Door #3
    if (lockedDoors[2] !== undefined) {
        if (keyIsDown(13) && lockedDoors[2].n2p === true) {
            if (comms[0] === undefined) {
                comms.push(new Communication("I need to find a key to open this lock."));
            }
        }
    }
}