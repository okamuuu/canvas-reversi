function Reversi() {}

// for frontend javascript
var reversi = new Reversi();

// for node.js
try {
    module.exports = reversi;
} catch (e) {}

var BORAD_SIZE = 8;

var COLORS = {
    'green': 0,
    'black': 1,
    'white': 2
};

var Directions = [ -9, -8, -7, 
                   -1,      1, 
                    7,  8,  9  ];

var points = [
  80, 0,30,20,20,30, 0,80,
   0, 0, 0, 0, 0, 0, 0, 0,
  30, 0,40,30,30,40, 0,30,
  20, 0,30, 0, 0,30, 0,20,
  20, 0,30, 0, 0,30, 0,20,
  30, 0,40,30,30,40, 0,30,
   0, 0, 0, 0, 0, 0, 0, 0,
  80, 0,30,20,20,30, 0,80
];

function _copy(data) {
    return JSON.parse(JSON.stringify(data));
}

function _isNumber(value) {
    return !isNaN(value) && typeof value === 'number' ? true : false;
}

function _color2Number(color) {

    var number = COLORS[color];

    if (!_isNumber(number)) {
        throw new Error(number + 'is invalid color number');
    }

    return number;
}

Reversi.prototype.createBoard = function() {

    var boardLength = Math.pow(BORAD_SIZE, 2);

    var board = [];
    for (var i = 0; i < boardLength; i++) {
        board[i] = 0;
    }

    return board;
};

Reversi.prototype.getCellIndex = function(x, y) {
    return x + y * BORAD_SIZE;
};

Reversi.prototype.canPutLine = function(x, y, color, board) {

    var index = this.getCellIndex(x, y);

    if (board[index] === undefined) {
        throw new Error('invalidIndex:', index);
    } else if (board[index] > 0) {
        throw new Error('alreadyPlaced');
    }
};

Reversi.prototype.putPlace = function(index, color, board) {

    if (board[index] === undefined) {
        throw new Error('invalidIndex:', index);
    } else if (board[index] > 0) {
        throw new Error('alreadyPlaced');
    }

    board[index] = _color2Number(color);
};

Reversi.prototype.putInitialPlace = function(board) {
    board[this.getCellIndex(3, 3)] = COLORS.black;
    board[this.getCellIndex(4, 4)] = COLORS.black;
    board[this.getCellIndex(3, 4)] = COLORS.white;
    board[this.getCellIndex(4, 3)] = COLORS.white;
};

Reversi.prototype.isReverseColorDisk = function(index, color, board) {
    return board[index] > 0 && board[index] !== _color2Number(color) ? true : false;
};

Reversi.prototype.isSameColorDisk = function(index, color, board) {
    return board[index] > 0 && board[index] === _color2Number(color) ? true : false;
};

//相手の石がある状態なら、次のマスに移動。
//自分の石がある状態なら、出発点と現在のマスの間の石を自分の石に変えて、処理を終了。
//空きマスか壁の場合には、なにもせずに処理を終了。
Reversi.prototype.findReversibleIndexesByPlacingDisk = function(direction, x, y, color, board) {
    return this.findReversibleIndexes(direction, x, y, color, board);
};

Reversi.prototype.findAllReversibleIndexes = function(index, color, board) {

    var indexes = [];

    for (var i = 0, l = Directions.length; i < l; i++) {
        var _indexes = this.findReversibleIndexes(Directions[i], index, color, board);
        if(_indexes.length > 0 ) {
            indexes = indexes.concat(_indexes);
        }
    }

    return indexes;
};

Reversi.prototype.findReversibleIndexes = function(direction, index, color, board) {

    var reversibleIndexes = [];

    while (1) {

        // XXX: 設計ミスを補正する処理( ；´Д｀)
        //      左端から左方向への移動は不可能
        //      右端から右方向への移動は不可能
        if(index % 8 === 0 && [-9 , -1, 7].indexOf(direction) > -1 ) {
            return [];
        } 
        
        if(index % 8 === 7 && [-7 , 1, 9].indexOf(direction) > -1 ) {
            return [];
        } 
 
        index += direction; // 隣へ移動

        if (this.isReverseColorDisk(index, color, board)) {
            reversibleIndexes.push(index);
        } else if (this.isSameColorDisk(index, color, board)) {
            return reversibleIndexes;
        } else {
            return [];
        }
    }
};

Reversi.prototype.isEnd = function(board) {

    // XXX: 64回のカウントを取得したほうが効率的   
    var empties = []; 
    
    for (var i = 0, l = board.length; i < l; i ++ ) {
        if(board[i]) {
            empties.push(i);
        }
    }

    if (empties.length === 0 ) { 
        return true; 
    }



};

Reversi.prototype.end = function(board) {
 
    var result = this.getResult(board);

    return {
        black: result[1],
        white: result[2],
        winner: result[1] > result[2] ? 'black' : 'white'
    };
};

Reversi.prototype.reverseDisks = function(indexes, color, board) {

    for (var i = 0, l = indexes.length; i < l; i++) {
        if (reversi.isReverseColorDisk(indexes[i], color, board)) {
            board[indexes[i]] = _color2Number(color);
        } else {
            throw new Error(indexes[i] + ' is not reverse color disk!!');
        }
    }
};

Reversi.prototype.canPut = function(index, color, board) {

    return board[index] === 0 && this.findAllReversibleIndexes(index, color, board).length > 0 ? true : false;
};    
    
Reversi.prototype.getRestPlaceableIndexes = function(color, board) {

    var indexes = [];

    for (var i = 0, l = board.length; i < l; i++) {
        if (board[i] === 0 && this.findAllReversibleIndexes(i, color, board).length > 0) {
            indexes.push(i);
        }
    }

    return indexes;
};

Reversi.prototype.getResult = function(board) {
    
    var result = [0, 0, 0];
    for ( var i = 0, l = board.length; i < l; i ++ ) {
        var color = board[i]; 
        result[color]++;
    }

    return result;
};

Reversi.prototype.getBetterPuttingIndexes = function(indexes) {

    var betterIndexes = _copy(indexes);

    betterIndexes.sort(function(a, b){
        return points[b] - points[a];
    });

    return betterIndexes;
};

Reversi.prototype.npcPlay = function(color, board) {

    var placeableIndexes = this.getRestPlaceableIndexes(color, board);

    if( placeableIndexes.length === 0 ) {
        return;
    }

    var betterIndexes = this.getBetterPuttingIndexes(placeableIndexes);
    
    var reversibleIndexes = this.findAllReversibleIndexes(betterIndexes[0], color, board);

    this.putPlace(betterIndexes[0], color, board);

    this.reverseDisks(reversibleIndexes, color, board);

    return betterIndexes[0];
};

Reversi.prototype.demoPlay = function() {

    var board = this.createBoard();

    this.putInitialPlace(board);

    this.preview(board);

    var currentTurn = 'black';

    var pass = 0;

    var count = Math.pow(BORAD_SIZE, 2) - 4;
    
    while(count--) {

        var placedIndex = this.npcPlay(currentTurn, board);

        if(placedIndex) {
            console.log(currentTurn + ' put place ' + placedIndex);
            pass=0;
        }
        else {
            console.log(currentTurn + ' can not put place...');
            pass++;
        } 
 
        // pass が2回続いたら終了
        if(pass > 1) {
            break;
        }
           
        this.preview(board);
        currentTurn = currentTurn === 'black' ? 'white' : 'black'; 
    }
 
    var result = this.getResult(board);

    console.log('black:', result[1]);
    console.log('white:', result[2]);
    console.log('winner:', result[1]>result[2]?'black':'white');
};

Reversi.prototype.preview = function(board) {

    var cols = [];

    console.log('--------------------------');

    for (var i = 0, l = board.length; i < l; i ++ ) {

        if (i > 0 && i % 8 === 0){
            console.log(cols);
            cols = [];
        }
       
        cols.push(board[i]); 
    }

    console.log(cols);
};
