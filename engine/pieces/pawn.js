(function() {
  var Pawn, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Piece = require('./piece');

  Pawn = (function(_super) {
    __extends(Pawn, _super);

    function Pawn(opts) {
      Pawn.__super__.constructor.apply(this, arguments);
      this.type = 'pawn';
      this.initialize_unmoved();
      this.initialize_direction();
    }


    /*
     * With pawns, we must be careful about the direction in which
     * they move forward. For example, if a pawn crosses the inner circle
     * it is moving "backward" in relation to the pawns that started on that
     * side, which are moving forward.
     *
     * To record this moving direction, we simply maintain the convention that
     * @towards_center = true implies the pawn is moving toward the center, and
     * @towards_center = false implies the pawn is moving away from the center.
     *
     * A pawn changes direction if and only if it crosses the center circle.
     */

    Pawn.prototype.initialize_direction = function() {
      return this.towards_center = true;
    };


    /*
     * If a pawn has moved, it can no longer skip 2 spaces nor capture en passent.
     * We must record this somehow, simply as a boolean flag.
     */

    Pawn.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };


    /*
     * List the moves available to a pawn (in an array of [x, y] positions).
     *
     * Recall that it can capture to the sideways left and right, but only move
     * forward. Adjacent to the center, the pawn can cross the center, or 
     * capture along the same diagonal a bishop would be able to.
     */

    Pawn.prototype.moves = function(filter) {
      var moves;
      if (filter == null) {
        filter = 2;
      }
      moves = this.y() === 5 && this.towards_center ? this.center_moves() : this.noncenter_moves();
      return this.filter_checks(moves, filter - 1);
    };

    Pawn.prototype.center_moves = function() {
      var i, moves, _i, _len, _ref;
      moves = [];
      if (!this.board.has_piece_at((this.x() + 12) % 24, this.y())) {
        moves.push([(this.x() + 12) % 24, this.y()]);
      }
      _ref = [-1, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (this.board.has_piece_at((this.x() + 12 + 2 * i) % 24, this.y()) && this.board.piece_at((this.x() + 12 + 2 * i) % 24, this.y()).color !== this.color) {
          moves.push([(this.x() + 12 + 2 * i) % 24, this.y()]);
        }
      }
      return moves;
    };

    Pawn.prototype.noncenter_moves = function() {
      var delta, i, moves, _i, _len, _ref, _ref1, _ref2, _ref3;
      moves = [];
      if (this.unmoved && !this.board.has_piece_at(this.x(), this.y() + 2) && !this.board.has_piece_at(this.x(), this.y() + 1)) {
        moves.push([this.x(), this.y() + 2]);
      }
      delta = this.towards_center ? 1 : -1;
      if (!this.board.has_piece_at(this.x(), this.y() + delta)) {
        moves.push([this.x(), this.y() + delta]);
      }
      _ref = [-1, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if ((this.board.has_piece_at((this.x() + i + 24) % 24, this.y() + delta)) && (this.board.piece_at((this.x() + i + 24) % 24, this.y() + delta).color !== this.color)) {
          if (this.y() <= 2 && (_ref1 = this.x(), __indexOf.call(this.board.left_moats().concat(this.board.right_moats()), _ref1) >= 0)) {
            if (i === -1 && (_ref2 = this.x(), __indexOf.call(this.board.right_moats(), _ref2) >= 0)) {
              continue;
            }
            if (i === +1 && (_ref3 = this.x(), __indexOf.call(this.board.left_moats(), _ref3) >= 0)) {
              continue;
            }
          }
          moves.push([(this.x() + i + 24) % 24, this.y() + delta]);
        }
      }
      return moves;
    };

    Pawn.prototype.move_to = function(new_x, new_y) {
      var old_y, out;
      this.unmoved = false;
      old_y = this.y();
      out = Pawn.__super__.move_to.apply(this, arguments);
      if (old_y === 5 && new_y === 5) {
        this.towards_center = false;
      }
      return out;
    };

    return Pawn;

  })(Piece);

  module.exports = Pawn;

}).call(this);
