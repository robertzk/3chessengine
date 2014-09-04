(function() {
  var Piece, Queen,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  Queen = (function(_super) {
    __extends(Queen, _super);

    function Queen(opts) {
      Queen.__super__.constructor.apply(this, arguments);
      this.type = 'queen';
    }

    return Queen;

  })(Piece);

  module.exports = Queen;

}).call(this);
