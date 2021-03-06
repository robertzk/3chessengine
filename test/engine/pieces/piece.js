(function() {
  var Board, Piece, should;

  should = require('chai').should();

  Piece = require('../../../engine/pieces/piece');

  Board = require('../../../engine/board');

  describe('Piece', function() {
    it("should throw an error when no piece color is provided", function() {
      var error;
      try {
        return new Piece({});
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Please provide a piece color");
      }
    });
    it("should throw an error when incorrect piece color is provided", function() {
      var error;
      try {
        return new Piece({
          color: 'purple'
        });
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Piece color must be one of white, black, grey");
      }
    });
    it("should throw an error when no board is assigned", function() {
      var error;
      try {
        return new Piece({
          color: 'white'
        });
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Please provide a board");
      }
    });
    it("should throw an error when a non-Board is assigned", function() {
      var error;
      try {
        return new Piece({
          color: 'white',
          board: void 0
        });
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Specified 'board' is not a Board");
      }
    });
    it("show throw an error when no position is specified", function() {
      var error;
      try {
        return new Piece({
          color: 'white',
          board: new Board(false)
        });
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Please provide a position");
      }
    });
    it("show throw an error when an invalid position is specified", function() {
      var error;
      try {
        return new Piece({
          color: 'white',
          board: new Board(false),
          position: [1]
        });
      } catch (_error) {
        error = _error;
        return error.toString().should.equal("Position must be an array of two integers.");
      }
    });
    return it("should be able to create a Piece when a valid color, board, and position are provided", function() {
      return new Piece({
        color: 'white',
        board: new Board(false),
        position: [0, 0]
      });
    });
  });

}).call(this);
