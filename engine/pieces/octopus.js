(function() {
  var moves, normalize_position;

  normalize_position = function(old_x, old_y, x, y) {
    var diff_x, diff_y, has_piece, offset, out, same_color;
    if (y < 0) {
      return {
        can_move: false
      };
    }
    if (Math.abs(old_x - x) !== 1 && Math.abs(old_y - y) !== 1) {
      throw "Only adjacent moves supported";
    }
    diff_x = x - old_x;
    diff_y = y - old_y;
    x = (x + 24) % 24;
    old_x = (old_x + 24) % 24;
    out = {
      can_move: true,
      crossed_circle: false
    };
    if (y > 5) {
      offset = Math.abs(diff_x) + Math.abs(diff_y) === 2 ? 14 : 12;
      if (diff_x < 0) {
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

  moves = function(diagonal, axial, one_step) {
    if (one_step == null) {
      one_step = false;
    }
    return function(filter) {
      var dir, dirs, next_position, positions, prev_x, prev_y, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      if (filter == null) {
        filter = 2;
      }
      positions = [];
      dirs = [];
      if (axial) {
        _ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          dirs.push(x);
        }
      }
      if (diagonal) {
        _ref1 = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          x = _ref1[_j];
          dirs.push(x);
        }
      }
      for (_k = 0, _len2 = dirs.length; _k < _len2; _k++) {
        dir = dirs[_k];
        prev_x = this.x();
        prev_y = this.y();
        while (true) {
          _ref2 = [prev_x + dir[0], prev_y + dir[1]], x = _ref2[0], y = _ref2[1];
          next_position = normalize_position.call(this, prev_x, prev_y, x, y);
          if (!next_position.can_move) {
            break;
          }
          positions.push(next_position.position);
          if (next_position.crossed_circle) {
            dir[1] = -dir[1];
          }
          if (next_position.final_move || one_step) {
            break;
          }
          _ref3 = next_position.position, prev_x = _ref3[0], prev_y = _ref3[1];
        }
      }
      return this.filter_checks(positions, filter - 1);
    };
  };

  module.exports = moves;

}).call(this);
