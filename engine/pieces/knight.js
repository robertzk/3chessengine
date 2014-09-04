(function() {
  var Knight, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  Knight = (function(_super) {
    __extends(Knight, _super);

    function Knight(opts) {
      Knight.__super__.constructor.apply(this, arguments);
      this.type = 'knight';
    }

    Knight.prototype.normalize_position = function(x, y) {
      x += 24;
      if (y > 5) {
        x += 12;
      }
      if (y > 5) {
        y -= y % 5;
      }
      if (!(y < 0)) {
        return [x % 24, y];
      }
    };


    /*
     * List the moves available to a knight (in an array of [x, y] positions).
     *
     * Recall that it can capture in L shapes all around the board.
     */

    Knight.prototype.moves = function() {
      var d, sign, sign2, x, y, _i, _results;
      _results = [];
      for (sign = _i = -1; _i <= 1; sign = _i += 2) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (sign2 = _j = -1; _j <= 1; sign2 = _j += 2) {
            _results1.push((function() {
              var _k, _ref, _ref1, _results2;
              _results2 = [];
              for (d = _k = 1; _k <= 2; d = ++_k) {
                _ref = this.normalize_position(this.x + sign1 * d, this.y + sign2 * (3 - d)), x = _ref[0], y = _ref[1];
                if ((y == null) || ((_ref1 = this.board.piece_at(x, y)) != null ? _ref1.color : void 0) === this.color) {
                  continue;
                }
                _results2.push([x, y]);
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return Knight;

  })(Piece);

  module.exports = Knight;

}).call(this);
