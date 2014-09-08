(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook, should;

  should = require('chai').should();

  King = require('../../engine/pieces/king');

  Queen = require('../../engine/pieces/queen');

  Rook = require('../../engine/pieces/rook');

  Bishop = require('../../engine/pieces/bishop');

  Knight = require('../../engine/pieces/knight');

  Pawn = require('../../engine/pieces/pawn');

  Board = require('../../engine/board');

  describe('Board', function() {
    it("should initialize back rank correctly", function() {
      var b, colors, i, pieces, _i, _results;
      b = new Board();
      colors = ['white', 'black', 'grey'];
      pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];
      _results = [];
      for (i = _i = 0; _i <= 23; i = ++_i) {
        b.board[i][0].constructor.name.should.equal(pieces[i % 8].name);
        _results.push(b.board[i][0].color.should.equal(colors[(i - i % 8) / 8]));
      }
      return _results;
    });
    it("should initialize pawns correctly", function() {
      var b, colors, i, pieces, _i, _results;
      b = new Board();
      colors = ['white', 'black', 'grey'];
      pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];
      _results = [];
      for (i = _i = 0; _i <= 23; i = ++_i) {
        b.board[i][1].constructor.name.should.equal('Pawn');
        _results.push(b.board[i][1].color.should.equal(colors[(i - i % 8) / 8]));
      }
      return _results;
    });
    it("should show that a freshly initialized board has pieces in the last two ranks", function() {
      var b, i, _i, _results;
      b = new Board();
      _results = [];
      for (i = _i = 0; _i <= 23; i = ++_i) {
        b.has_piece_at(i, 0).should.be["true"];
        _results.push(b.has_piece_at(i, 1).should.be["true"]);
      }
      return _results;
    });
    it("should correctly ascertain a question about piece placement", function() {
      var b;
      b = new Board();
      return b.piece_at(0, 0).should.equal(b.board[0][0]);
    });
    it("should be able to move a piece", function() {
      var b, piece;
      b = new Board();
      piece = b.piece_at(0, 1);
      b.move_piece(0, 1, 0, 3);
      b.has_piece_at(0, 1).should.be["false"];
      b.has_piece_at(0, 3).should.be["true"];
      return b.piece_at(0, 3).should.equal(piece);
    });
    it("a virtual board should not interfere with the real board", function() {
      var b, vb;
      b = new Board();
      vb = b.virtual_board();
      vb.move_piece(1, 1, 1, 2);
      vb.has_piece_at(1, 2).should.be["true"];
      return b.has_piece_at(1, 2).should.be["false"];
    });
    it("can find a king", function() {
      var b, king;
      b = new Board();
      king = b.king('white');
      king.x().should.equal(3);
      king.y().should.equal(0);
      king = b.king('black');
      king.x().should.equal(3 + 8);
      king.y().should.equal(0);
      king = b.king('grey');
      king.x().should.equal(3 + 16);
      return king.y().should.equal(0);
    });
    return it("can find colored pieces", function() {
      var b, whites;
      b = new Board();
      whites = b.get_pieces('white');
      return whites.length.should.equal(16);
    });
  });

}).call(this);
