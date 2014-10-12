(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook, same_moves, should;

  should = require('chai').should();

  same_moves = require('./pieces/util').same_moves;

  King = require('../../engine/pieces/king');

  Queen = require('../../engine/pieces/queen');

  Rook = require('../../engine/pieces/rook');

  Bishop = require('../../engine/pieces/bishop');

  Knight = require('../../engine/pieces/knight');

  Pawn = require('../../engine/pieces/pawn');

  Board = require('../../engine/board');

  describe('King moves', function() {
    it("should not be able to move into a pawn's attack path", function() {
      var b, gray_king;
      b = new Board();
      b.remove_piece(0, 0);
      b.remove_piece(1, 0);
      b.move_piece(0, 1, 0, 2);
      b.move_piece(19, 0, 23, 2);
      gray_king = b.piece_at(23, 2);
      console.log("" + (gray_king.moves()) + " WTF WTF ");
      gray_king.moves().length.should.equal(4);
      return same_moves(gray_king.moves(), [[22, 2], [22, 3], [0, 3], [0, 1]]).should.be["true"];
    });
    return it("should not be able to move into the path of a pawn that has crossed the center", function() {
      var b, black_king;
      b = new Board();
      b.move_piece(23, 1, 11, 2);
      b.piece_at(11, 2).towards_center = false;
      b.remove_piece(12, 1);
      b.remove_piece(10, 1);
      black_king = b.piece_at(11, 0);
      return black_king.moves().length.should.equal(0);
    });
  });

}).call(this);
