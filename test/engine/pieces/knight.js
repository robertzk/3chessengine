(function() {
  var Board, Knight, assert, should;

  should = require('chai').should();

  assert = require('chai').assert;

  Knight = require('../../../engine/pieces/knight');

  Board = require('../../../engine/board');

  describe('Knight', function() {
    return it("should display two forward moves initially", function() {
      var b;
      return b = new Board();
    });
  });

}).call(this);
