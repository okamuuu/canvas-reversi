function Reversi() {}

var reversi = new Reversi(); // for frontend javascript

try { module.exports = reversi; } catch(e) {} // for node.js

var BORAD_SIZE = 8;
var C_BLACK = 1, C_WHITE = 2;

function _copy(data) {
    return JSON.parse( JSON.stringify(data) );
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

Reversi.prototype.putInitialPlace = function(board) {
    
    board[this.getCellIndex(3, 3)] = C_BLACK;
    board[this.getCellIndex(4, 4)] = C_BLACK;
    board[this.getCellIndex(3, 4)] = C_WHITE;
    board[this.getCellIndex(4, 3)] = C_WHITE;

    return board;
};

