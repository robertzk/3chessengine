(function() {
  var Piece, all_in,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  all_in = require('./util').all_in;

  Piece = (function() {
    function Piece(opts) {
      if (!arguments.length) {
        return this;
      }
      this.assign_color(opts);
      this.assign_board(opts);
      this.assign_position(opts);
    }

    Piece.prototype.moves = function() {
      return [];
    };

    Piece.prototype.filter_checks = function(moves, depth) {
      var bad, color, king, move, ok_moves, piece, vb, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      if (depth == null) {
        depth = 0;
      }
      if (!depth) {
        return moves;
      }
      ok_moves = [];
      for (_i = 0, _len = moves.length; _i < _len; _i++) {
        move = moves[_i];
        vb = this.board.virtual_board();
        vb.move_piece(this.x(), this.y(), move[0], move[1]);
        if (this.type === 'king') {
          x = move[0];
          y = move[1];
        } else {
          king = vb.king(this.color);
          if (!king) {
            ok_moves = moves;
            break;
          }
          x = king.x();
          y = king.y();
        }
        bad = false;
        _ref = vb.colors;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          color = _ref[_j];
          if (color !== this.color) {
            _ref1 = vb.get_pieces(color);
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              piece = _ref1[_k];
              if (piece.type !== 'pawn') {
                if (all_in([[x, y]], piece.moves(depth))) {
                  bad = true;
                  break;
                }
              }
            }
          }
        }
        if (!bad) {
          ok_moves.push(move);
        }
      }
      return ok_moves;
    };

    Piece.prototype.assign_color = function(opts) {
      var color, colors;
      if (!('color' in opts)) {
        throw "Please provide a piece color";
      }
      color = opts.color.toLowerCase();
      if (__indexOf.call(colors = ['white', 'black', 'grey'], color) < 0) {
        throw "Piece color must be one of " + (colors.join(', '));
      }
      return this.color = color;
    };

    Piece.prototype.assign_board = function(opts) {
      var _ref;
      if (!('board' in opts)) {
        throw "Please provide a board";
      }
      if (((_ref = opts.board) != null ? _ref.__class : void 0) !== 'Board') {
        throw "Specified 'board' is not a Board";
      }
      return this.board = opts.board;
    };

    Piece.prototype.assign_position = function(opts) {
      if (!('position' in opts)) {
        throw "Please provide a position";
      }
      if (!(opts.position instanceof Array && opts.position.length === 2)) {
        throw "Position must be an array of two integers.";
      }
      this.position = opts.position;
      return this.board.board[this.position[0]][this.position[1]] = this;
    };

    Piece.prototype.x = function() {
      return this.position[0];
    };

    Piece.prototype.y = function() {
      return this.position[1];
    };

    Piece.prototype.move_to = function(new_x, new_y) {
      var _i, _results;
      new_x = (new_x + 24) % 24;
      if (__indexOf.call((function() {
        _results = [];
        for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
        return _results;
      }).apply(this), new_x) < 0) {
        throw "Invalid new_x";
      }
      if (__indexOf.call([0, 1, 2, 3, 4, 5], new_y) < 0) {
        throw "Invalid new_y";
      }
      this.board.board[new_x][new_y] = this;
      this.board.board[this.x()][this.y()] = null;
      return this.position = [new_x, new_y];
    };

    return Piece;

  })();

  module.exports = Piece;

}).call(this);
