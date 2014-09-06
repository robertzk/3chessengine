(function() {
  var King, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  King = (function(_super) {
    __extends(King, _super);

    function King(opts) {
      King.__super__.constructor.apply(this, arguments);
      this.type = 'king';
    }

    King.prototype.normalize_position = function(old_x, old_y, x, y) {
      var diff, has_piece, offset, out, same_color;
      if (y < 0) {
        return {
          can_move: false
        };
      }
      diff = x - old_x;
      x = (x + 24) % 24;
      old_x = (old_x + 24) % 24;
      out = {
        can_move: true,
        crossed_circle: false
      };
      if (y > 5) {
        offset = Math.abs(old_x - x) + Math.abs(old_y - y) === 2 ? 14 : 12;
        if (diff < 0) {
          x = old_x + (24 - offset);
          x %= 24;
        } else {
          x = old_x + offset;
          x %= 24;
        }
        y = 5;
        out.crossed_circle = true;
      }
      if (has_piece = this.board.has_piece_at(x, y)) {
        same_color = this.board.piece_at(x, y).color === this.color;
        out.can_move = !same_color;
      }
      out.final_move = has_piece;
      out.position = [x, y];
      return out;
    };

    King.prototype.moves = function() {
      var dir, next_position, positions, prev_x, prev_y, tries, x, y, _i, _len, _ref, _ref1;
      positions = [];
      tries = [];
      _ref = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dir = _ref[_i];
        prev_x = this.x();
        prev_y = this.y();
        _ref1 = [prev_x + dir[0], prev_y + dir[1]], x = _ref1[0], y = _ref1[1];
        next_position = this.normalize_position(prev_x, prev_y, x, y);
        tries.push([x, y]);
        if (!next_position.can_move) {
          continue;
        }
        positions.push(next_position.position);
      }
      return positions;
    };

    return King;

  })(Piece);

  module.exports = King;

}).call(this);
