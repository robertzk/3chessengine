(function() {
  var Board, Pawn, assert, should;

  should = require('chai').should();

  assert = require('chai').assert;

  Pawn = require('../../../engine/pieces/pawn');

  Board = require('../../../engine/board');

  describe('Pawn', function() {
    return it("should display one and two steps forward as the available moves initially", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(0, 1);
      p.moves().length.should.equal(2);
      return assert.deepEqual(p.moves(), [[0, 3], [0, 2]]);
    });
  });

}).call(this);
