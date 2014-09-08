(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
      this.__class = 'Board';
      this.initialize_board();
      this.initialize_constants();
      if (setup_pieces) {
        this.initialize_pieces();
      }
    }

    Board.prototype.initialize_constants = function() {
      this.piece_map = {
        rook: Rook,
        knight: Knight,
        bishop: Bishop,
        king: King,
        queen: Queen,
        pawn: Pawn
      };
      return this.colors = ['white', 'black', 'grey'];
    };

    Board.prototype.initialize_board = function() {
      var $, _;
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

    Board.prototype.place_piece = function(type, color, x, y) {
      var piece;
      type = this.piece_map[this.sanitize_type(type)];
      piece = new type({
        board: this,
        position: [x, y],
        color: this.sanitize_color(color)
      });
      this.board[(24 + x) % 24][y] = piece;
      return piece;
    };

    Board.prototype.move_piece = function(old_x, old_y, new_x, new_y) {
      old_x = (old_x + 24) % 24;
      if (!this.has_piece_at(old_x, old_y)) {
        throw "No piece at (" + old_x + ", " + old_y + ")";
      }
      return this.piece_at(old_x, old_y).move_to(new_x, new_y);
    };

    Board.prototype.remove_piece = function(x, y) {
      return this.board[x][y] = null;
    };

    Board.prototype.sanitize_type = function(type) {
      type = type.toLowerCase();
      if (!(type in this.piece_map)) {
        throw "Invalid piece type";
      }
      return type;
    };

    Board.prototype.sanitize_color = function(color) {
      color = color.toLowerCase();
      if (__indexOf.call(this.colors, color) < 0) {
        throw "Invalid color";
      }
      return color;
    };

    return Board;

  })();

  module.exports = Board;

}).call(this);
