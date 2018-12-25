const MIN = 1;
const MAX = 9;
const LIGHTER = 0.25;
$(document).ready(() => {
    let boxArray = [];
    fillBoard(boxArray);
    sortArray(boxArray);
    listenToBoard($('.gameboard'), boxArray);
});

function listenToBoard($board, arr)  {
    let count = 0;
    $('.gameboard__cell', $board).on('click', (e) => {
        let thisCell = e.currentTarget;
        if (thisCell == arr[count]["cell"][0]) {
            $(thisCell).css("opacity", 1);
            count++;
        }   else    {
            $(thisCell).css("background-color", "#000");
            $('.gameboard__text', thisCell).css("color", "black");
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

        $(box).text(thisNum);

        let $cell = $(box).closest('.gameboard__cell');
        $cell.css("background-color", makeColor(thisNum));

        arr[i] = [];
        arr[i]["value"] = thisNum;
        arr[i]["cell"] = $cell;
    });
}

function makeColor(x)   {
    let colorArray = [];
    colorArray[x % 3] = (((x / (MAX * 2)) / 2) + LIGHTER) * 255;
    colorArray[(x + 1) % 3] = (x / (MAX * 2)) * 255;
    colorArray[(x + 2) % 3] = ((x / (MAX * 2)) * 2)   * 255;

    return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
};