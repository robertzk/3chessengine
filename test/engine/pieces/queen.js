(function() {
  var Board, Queen, assert, same_moves, should;

  should = require('chai').should();

  assert = require('chai').assert;

  same_moves = require('./util').same_moves;

  Queen = require('../../../engine/pieces/queen');

  Board = require('../../../engine/board');

  describe('Queen', function() {
    it("Should have no moves in the corner", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(4, 0);
      p.move_to(0, 0);
      return p.moves().length.should.equal(0);
    });
    return it("should be able to cross a closed moat", function() {
      var b, p;
      b = new Board();
      b.moats['white'] = false;
      p = b.piece_at(4, 0);
      p.move_to(0, 0);
      return p.moves().length.should.equal(2);
    });
  });

}).call(this);
