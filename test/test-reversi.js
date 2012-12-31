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

        reversi.putPlace(26, 'black', board);

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

        var indexes = reversi.findReversibleIndexes(1, 34, 'black', board);

        console.log('indexes:', indexes);

        reversi.putPlace(34, 'black', board);
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
 
        indexes = reversi.findAllReversibleIndexes(42, 'white', board);
        console.log('indexes:', indexes);

        should.deepEqual(indexes, [35]);
 
        reversi.putPlace(42, 'white', board);
        reversi.reverseDisks(indexes, 'white', board);

        expected = [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 1, 2, 0, 0, 0, 
            0, 0, 1, 2, 1, 0, 0, 0, 
            0, 0, 2, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
        ];

        should.deepEqual(board, expected);
    });

    it('should get rest placeable indexes.', function() {

        board = reversi.createBoard();
        
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

        var indexes = reversi.getRestPlaceableIndexes('black', board);

        should.deepEqual(board, expected);
    });

    it('should get better putting indexes.', function() {

        var betterIndexes = reversi.getBetterPuttingIndexes([1, 2, 3]);

        should.equal(betterIndexes[0], 2);
    });


});
