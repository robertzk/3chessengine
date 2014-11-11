(function() {
  var Bishop, Board, assert, same_moves, should;

  should = require('chai').should();

  assert = require('chai').assert;

  same_moves = require('./util').same_moves;

  Bishop = require('../../../engine/pieces/bishop');

  Board = require('../../../engine/board');

  describe('Bishop', function() {
    it("should have no moves in the initial board position", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(2, 0);
      return p.moves().length.should.equal(0);
    });
    it("should be able to move in a loop if the white b2 pawn is removed", function() {
      var b, moves, p, true_moves;
      b = new Board();
      p = b.piece_at(2, 0);
      b.remove_piece(1, 1);
      moves = p.moves();
      moves.length.should.equal(9);
      true_moves = [[1, 1], [0, 2], [23, 3], [22, 4], [21, 5], [7, 5], [6, 4], [5, 3], [4, 2]];
      return same_moves(moves, true_moves).should.be["true"];
    });
    it("should not be able to cross a moat", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(2, 0);
      p.move_to(0, 0);
      return p.moves().length.should.equal(0);
    });
    return it("should be able to cross a closed moat", function() {
      var b, p;
      b = new Board();
      b.moats['white'] = false;
      p = b.piece_at(2, 0);
      p.move_to(0, 0);
      return p.moves().length.should.equal(1);
    });
  });

}).call(this);
