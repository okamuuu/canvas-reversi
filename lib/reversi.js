function Reversi() {}

// for frontend javascript
var reversi = new Reversi(); 

// for node.js
try { module.exports = reversi; } catch (e) {} 

var BORAD_SIZE = 8;

var COLORS = {
    'green': 0,
    'black': 1,
    'white': 2
};

var DIRECTIONS = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
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
        throw new Error( number + 'is invalid color number');
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
        throw new Error('invalidIndex');
    }
    else if (board[index] > 0) {
        throw new Error('alreadyPlaced');
    }
};

Reversi.prototype.putPlace = function(x, y, color, board) {

    var index = this.getCellIndex(x, y);

    if (board[index] === undefined) {
        throw new Error('invalidIndex');
    }
    else if (board[index] > 0) {
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

Reversi.prototype.canTurnBackPlace = function(direction, x, y, color, board) {

    var cnt = 0;
  
    // 一つ向こう
    if (x < 0 || y < 0) return 0;
    if (x >=8 || y >=8) return 0;
  
    // 方角のcell が反対の色かどうかをチェック
    var rcol = color === 1 ? 2 : 1;

    if (cells[getI(x, y)] != rcol) return 0;
  
    cnt++;
    for (;;) {
        x += tx;
        y += ty;
        if (x < 0 || y < 0) return 0;
        if (x >=8 || y >=8) return 0;
        var ci = cells[getI(x, y)];
        if (ci == rcol) cnt++;
        if (ci == col) return cnt;
        if (ci == 0) break;
    }
    return 0;
}
};

