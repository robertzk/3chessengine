(function() {
  var Piece, Rook, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  octopus = require('./octopus');

  Rook = (function(_super) {
    __extends(Rook, _super);

    function Rook(opts) {
      Rook.__super__.constructor.apply(this, arguments);
      this.initialize_unmoved();
      this.type = 'rook';
    }

    Rook.prototype.moves = octopus(false, true);


    /*
     * If a rook has moved, it can no longer be used in conjunction with castling.
     * We must record this somehow, simply as a boolean flag.
     */

    Rook.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };

    return Rook;

  })(Piece);

  module.exports = Rook;

}).call(this);
