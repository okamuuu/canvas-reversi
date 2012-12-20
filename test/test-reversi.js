var should = require('should');
var reversi = require('../lib/reversi');

describe('create board object', function() {

    var board;

    it('should create board array object', function() {

        board = reversi.createBoard();

        var expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.deepEqual(board, expected);
    });

    it('should give target cell index', function() {

        var index = reversi.getCellIndex(2, 3);

        board[index] = 1;

        var expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 1, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.equal(index, 26);
        should.deepEqual(board, expected);
        
        board[index] = 0; // undo
    });

    it('should put initial place', function() {

        reversi.putInitialPlace(board);

        var expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 1, 2, 0, 0, 0, 
            0, 0, 0, 2, 1, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.deepEqual(board, expected);
    });

    it('should put place', function() {

        reversi.putPlace(2, 3, 'black', board);

        var expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 1, 1, 2, 0, 0, 0, 
            0, 0, 0, 2, 1, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.deepEqual(board, expected);
        
        board[26] = 0; // undo
    });

    it('should turn back place.', function() {

        var direction = [1, 0]; // 右
        var x = 2, y = 4;

        var indexes = reversi.findReversibleIndexesByPlacingDisk(1, x, y, 'black', board);
        console.log('indexes:', indexes);

        reversi.putPlace(x, y, 'black', board);
        reversi.reverseDisks(indexes, 'black', board);

        var expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 1, 2, 0, 0, 0, 
            0, 0, 1, 1, 1, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.deepEqual(board, expected);
        
        //board[34] = 0; // undo
    });

});
