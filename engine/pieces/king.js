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

    return King;

  })(Piece);

  module.exports = King;

}).call(this);
