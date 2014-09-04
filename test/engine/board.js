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
    return it("should initialize pawns correctly", function() {
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
  });

}).call(this);
