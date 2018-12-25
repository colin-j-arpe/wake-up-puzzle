const MIN = 1;
const MAX = 9;

$(document).ready(() => {
    let boxArray = [];
    fillBoard(boxArray);
    sortArray(boxArray);
    listenToBoard($('.gameboard'));
});

function listenToBoard($board)  {
    return;
    // $('.gameboard__cell', $board).on('click'(i, cell) => {

    // })
}

function fillBoard(arr) {
    let numArray = [];
    for (var i = MIN; i <= MAX; i++) {
        numArray.push(i);
    }

    $('.gameboard__text').each((i, box) => {
        numArray.sort(function(a, b){return 0.5 - Math.random()});
        let thisNum;
        if (0.5 - Math.random() > 0) {
            thisNum = numArray.shift();
        }   else    {
            thisNum = numArray.pop();
        }

        $(box).text(thisNum);

        arr[i] = [];
        arr[i][0] = thisNum;
        arr[i][1] = box;

        let $cell = $(box).closest('.gameboard__cell');
        $cell.css("background-color", makeColor(thisNum));
    });
}

function makeColor(x)   {
    let colorArray = [];
    colorArray[x % 3] = ((x / (MAX * 2)) / 2) * 255;
    colorArray[(x + 1) % 3] = (x / (MAX * 2)) * 255;
    colorArray[(x + 2) % 3] = ((x / (MAX * 2)) * 2)   * 255;

    return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
};