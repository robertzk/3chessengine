(function() {
  var Board, Rook, assert, same_moves, should;

  should = require('chai').should();

  assert = require('chai').assert;

  same_moves = require('./util').same_moves;

  Rook = require('../../../engine/pieces/rook');

  Board = require('../../../engine/board');

  describe('Rook', function() {
    it("should not be able to make any moves initially", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(0, 0);
      return p.moves().length.should.equal(0);
    });
    return it("should be able to cross over a moat", function() {
      var b, p;
      b = new Board();
      b.moats['white'] = false;
      p = b.piece_at(0, 0);
      return same_moves(p.moves(), [[23, 0]]).should.be["true"];
    });
  });

}).call(this);
