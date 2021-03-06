(function() {
  var Bishop, Piece, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Piece = require('./piece');

  octopus = require('./octopus');

  Bishop = (function(_super) {
    __extends(Bishop, _super);

    function Bishop(opts) {
      Bishop.__super__.constructor.apply(this, arguments);
      this.type = 'bishop';
    }

    Bishop.prototype.moves = octopus(true, false);

    return Bishop;

  })(Piece);

  module.exports = Bishop;

}).call(this);
