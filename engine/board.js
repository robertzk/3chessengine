(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook;

  King = require('./pieces/piece');

  King = require('./pieces/king');

  Queen = require('./pieces/queen');

  Rook = require('./pieces/rook');

  Bishop = require('./pieces/bishop');

  Knight = require('./pieces/knight');

  Pawn = require('./pieces/pawn');

  Board = (function() {
    function Board(setup_pieces) {
      if (setup_pieces == null) {
        setup_pieces = true;
      }
      this.initialize_board();
      if (setup_pieces) {
        this.initialize_pieces();
      }
    }

    Board.prototype.initialize_board = function() {
      var $, _;
      this.colors = ['white', 'grey', 'black'];
      return this.board = (function() {
        var _i, _results;
        _results = [];
        for ($ = _i = 0; _i <= 23; $ = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (_ = _j = 0; _j <= 5; _ = ++_j) {
              _results1.push(null);
            }
            return _results1;
          })());
        }
        return _results;
      })();
    };

    Board.prototype.initialize_pieces = function() {
      var color, _i, _len, _ref, _results;
      _ref = this.colors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        this.initialize_backrank(color);
        _results.push(this.initialize_pawns(color));
      }
      return _results;
    };

    Board.prototype.initialize_backrank = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      this.backrank_pieces || (this.backrank_pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]);
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new this.backrank_pieces[i]({
          color: color_name,
          board: this,
          position: [8 * color + i, 0]
        }));
      }
      return _results;
    };

    Board.prototype.initialize_pawns = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new Pawn({
          color: color_name,
          board: this,
          position: [8 * color + i, 1]
        }));
      }
      return _results;
    };

    Board.prototype.has_piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y] !== null;
    };

    Board.prototype.piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y];
    };

    Board.prototype.place_piece = function(piece, x, y) {
      if (!(piece instanceof Piece)) {
        throw "Must place a Piece";
      }
      return this.board[(24 + x) % 24][y] = piece;
    };

    return Board;

  })();

  module.exports = Board;

}).call(this);
