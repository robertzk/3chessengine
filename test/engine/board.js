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
    return it("should be able to move a piece", function() {
      var b, piece;
      b = new Board();
      piece = b.piece_at(0, 1);
      b.move_piece(0, 1, 0, 3);
      b.has_piece_at(0, 1).should.be["false"];
      b.has_piece_at(0, 3).should.be["true"];
      return b.piece_at(0, 3).should.equal(piece);
    });
  });

}).call(this);
