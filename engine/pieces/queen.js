(function() {
  var Piece, Queen, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  octopus = require('./octopus');

  Queen = (function(_super) {
    __extends(Queen, _super);

    function Queen(opts) {
      Queen.__super__.constructor.apply(this, arguments);
      this.type = 'queen';
    }

    Queen.prototype._moves = octopus(true, true);

    return Queen;

  })(Piece);

  module.exports = Queen;

}).call(this);
