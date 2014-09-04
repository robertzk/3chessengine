(function() {
  var Board, Knight, assert, should;

  should = require('chai').should();

  assert = require('chai').assert;

  Knight = require('../../../engine/pieces/knight');

  Board = require('../../../engine/board');

  describe('Knight', function() {
    return it("should display two forward moves and one capturing move initially", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(1, 0);
      return assert.deepEqual(p.moves(), [[0, 2], [23, 1], [2, 2]]);
    });
  });

}).call(this);
