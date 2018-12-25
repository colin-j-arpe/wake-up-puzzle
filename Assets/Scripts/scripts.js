const MIN = 1;
const MAX = 9;
const LIGHTER = 0.5;
const BLINK = 200;

let eventType;

$(document).ready(() => {
    startGame();
});

function startGame()    {
    let boxArray = [];
    fillBoard(boxArray);
    sortArray(boxArray);
    if (eventType == undefined) {
        getScreen($('.gameboard'), boxArray)
    }   else    {
        listenToBoard($('.gameboard'), boxArray, eventType);
    }
}

function getScreen($board, arr)    {
    $board.on('click touchstart', (e) => {
        $board.off();
        eventType = e.type;
        listenToBoard($board, arr, e.type)
        $(e.target).trigger(eventType);
    });
}

function listenToBoard($board, arr, event)  {
    let count = 0;
    $('.gameboard__cell', $board).on(event, (e) => {
        let thisCell = e.currentTarget;
        if (thisCell == arr[count]["cell"][0]) {
            $(thisCell).css("opacity", 1);
            count++;
        }   else    {
            loseGame($board, thisCell);
        }
        if (count == 4) {
            winGame($board);
        }
    })
}

function sortArray(arr) {
    arr.sort((a, b) => {
        return a["value"] - b["value"];
    })
}

function fillBoard(arr) {
    let numArray = [];
    for (var i = MIN; i <= MAX; i++) {
        numArray.push(i);
    }

    $('.gameboard__text').each((i, box) => {
        numArray.sort((a, b) => {return 0.5 - Math.random()});
        let thisNum;
        if (0.5 - Math.random() > 0) {
            thisNum = numArray.shift();
        }   else    {
            thisNum = numArray.pop();
        }

        $(box).css("color", "white").text(thisNum);

        let $cell = $(box).closest('.gameboard__cell');
        $cell.css("background-color", makeColor(thisNum));
        $cell.css("opacity", 0.7);

        arr[i] = [];
        arr[i]["value"] = thisNum;
        arr[i]["cell"] = $cell;
    });
}

function makeColor(x)   {
    let colorArray = [];
    colorArray[x % 3] = (((x / (MAX * 2)) / 2) + LIGHTER) * 255;
    colorArray[(x + 1) % 3] = ((x / (MAX * 2)) + (LIGHTER / 2)) * 255;
    colorArray[(x + 2) % 3] = ((x / (MAX * 2)) * 2)   * 255;

    return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
};

function winGame($board)    {
    $('.gameboard__cell', $board).off();
    let count = 0;
    stopBlinking = setInterval(() => {
        $('.gameboard__cell', $board).each((i, cell) => {
            let thisOpacity = $(cell).css("opacity");
            thisOpacity = 1 - ((((thisOpacity * 10) + 5) % 10) / 10);
            $(cell).css("opacity", thisOpacity);
            if (++count == 24) {
                clearInterval(stopBlinking);
                startGame();
            }
        });
    }, BLINK);
}

function loseGame($board, cell) {
    $('.gameboard__cell', $board).off();
    $(cell).css("background-color", "#000");
    $('.gameboard__text', cell).css("color", "black");
    setTimeout(() => {
        startGame();
    }, 1500);
}