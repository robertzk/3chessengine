(function() {
  var King, Piece, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  octopus = require('./octopus');

  King = (function(_super) {
    __extends(King, _super);

    function King(opts) {
      King.__super__.constructor.apply(this, arguments);
      this.type = 'king';
    }

    King.prototype.regular_moves = octopus(true, true, true);

    King.prototype.moves = function(index) {
      if (index == null) {
        index = 2;
      }
      return this.regular_moves(index).concat(this.castling_moves());
    };


    /*
     * If a king has moved, it can no longer castle.
     * We must record this somehow, simply as a boolean flag.
     */

    King.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };


    /*
     * Return the list of available castling moves.
     */

    King.prototype.castling_moves = function() {
      var empty, i, ix, moves, rook, _i, _j, _len, _ref, _ref1, _results;
      if (!this.unmoved) {
        return [];
      }
      moves = [];
      _ref = [-3, 4];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ix = _ref[_i];
        if (rook = this.board.piece_at(this.x() + ix, this.y())) {
          if (rook.type === 'rook' && rook.unmoved) {
            empty = true;
            for (i = _j = 1, _ref1 = Math.abs(ix) - 1; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
              empty && (empty = !this.board.piece_at(this.x() - i, this.y()));
            }
            if (empty) {
              _results.push(moves += [this.x() + (x === -3 ? -1 : 2), this.y()]);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return King;

  })(Piece);

  module.exports = King;

}).call(this);
