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

        var direction = [1, 0];
        var x = 2, y = 4;

        reversi.canTurnBackPlace(direction, x, y, 'black', board);
        reversi.putPlace(x, y, 'black', board);

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
        
        board[34] = 0; // undo
    });


//    it('should get initial postions', function() {
//
//        var positions = tetris.getInitialPositions(10);
//
//        positions.x.should.equal(4);
//        positions.y.should.equal(0);
//    });
//
//    it('should create shape id:0.', function() {
//
//        var shape0 = tetris.createShape(0);
//
//        var expected = [ 
//            [ 1, 1, 1, 1 ], 
//            [ 0, 0, 0, 0 ], 
//            [ 0, 0, 0, 0 ], 
//            [ 0, 0, 0, 0 ]
//         ];
//        
//        should.deepEqual(shape0, expected);
//    });
//
//    it('should create shape id:1.', function() {
//
//        var shape1 = tetris.createShape(1);
//
//        var expected = [ 
//            [ 2, 2, 2, 0 ], 
//            [ 2, 0, 0, 0 ], 
//            [ 0, 0, 0, 0 ], 
//            [ 0, 0, 0, 0 ]
//         ];
//        
//        should.deepEqual(shape1, expected);
//    });
//
//    it('should creat cursol', function() {
//
//        var positions = tetris.getInitialPositions(10);
//        var shape1 = tetris.createShape(1);
//        
//        var cursol = tetris.createCursol(positions, shape1);
//
//        should.exist( cursol.shape );
//        should.exist( cursol.positions );
//    });
//
//    it('should rotate.', function() {
//       
//        var board = tetris.createBoard(20, 10);
//
//        var positions = tetris.getInitialPositions(10);
//        var shape1 = tetris.createShape(1);
//        var cursol = tetris.createCursol(positions, shape1);
//
//        tetris.rotateCursol(cursol);
//        
//        var expected = [ 
//            [ 0, 0, 2, 2 ], 
//            [ 0, 0, 0, 2 ], 
//            [ 0, 0, 0, 2 ], 
//            [ 0, 0, 0, 0 ]
//         ];
// 
//        should.deepEqual(cursol.shape, expected);
//    });
//
//    it('should move cursol', function() {
//
//        var positions = tetris.getInitialPositions(10);
//        var shape1 = tetris.createShape(1);
//        
//        var cursol = tetris.createCursol(positions, shape1);
//
//        should.equal( positions.y, 0 );
//        should.equal( positions.x, 4 );
//        
//        tetris.moveCursol(cursol, 'left');
//
//        should.equal( positions.y, 0 );
//        should.equal( positions.x, 3 );
//        
//        tetris.moveCursol(cursol, 'down');
//
//        should.equal( positions.y, 1 );
//        should.equal( positions.x, 3 );
//         
//        tetris.moveCursol(cursol, 'right');
//
//        should.equal( positions.y, 1 );
//        should.equal( positions.x, 4 );
//    });
//
//    it('should calc cursol shape.', function() {
//
//        var board = tetris.createBoard(20, 10);
//        var shape1 = tetris.createShape(1);
//        var cursol = tetris.createCursol({x:5, y:0}, shape1);
//        
//        should.ok( tetris.isValidCursol(cursol, board) );
//        
//        var cursol = tetris.createCursol({x:-1, y:0}, shape1);
//        should.ok( ! tetris.isValidCursol(cursol, board) );
//    });
//
//    it('should render.', function() {
//       
//        var board = tetris.createBoard(20, 10);
//
//        var positions = tetris.getInitialPositions(10);
//        var shape1 = tetris.createShape(1);
//        var cursol = tetris.createCursol(positions, shape1);
//
//        var view = tetris.render(board, cursol);
//
//        var expected = [
//            [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
//            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//        ];
//
//        should.deepEqual(view, expected);
//    });
//
//    it('should freeze.', function() {
// 
//        var board = tetris.createBoard(20, 10);
//
//        var shape1 = tetris.createShape(1);
//        var cursol = tetris.createCursol({y:18, x:4}, shape1);
//
//        tetris.freeze(board, cursol);
//
//        var expected = [
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
//            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0]
//        ];
//
//        should.deepEqual(board, expected);
//    });
//
//    it('isMovable', function() {
//
//        // ready test 
//        var board = tetris.createBoard(20, 10);
//
//        var shape1 = tetris.createShape(1);
//        var cursol = tetris.createCursol({y:17, x:4}, shape1);
//
//        should.ok( tetris.isMovable(board, cursol, 'down') );
//
//        var cursol2 = tetris.createCursol({y:18, x:4}, shape1);
//        
//        should.ok( ! tetris.isMovable(board, cursol2, 'down') );
//    });
});
