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

    King.prototype.moves = function() {
      return this.filter_checks(octopus(true, true, true).apply(this, Array.prototype.slice.call(arguments)));
    };


    /*
     * If a king has moved, it can no longer castle.
     * We must record this somehow, simply as a boolean flag.
     */

    King.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };

    return King;

  })(Piece);

  module.exports = King;

}).call(this);
