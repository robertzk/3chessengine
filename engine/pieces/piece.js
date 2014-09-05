(function() {
  var Piece,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Piece = (function() {
    function Piece(opts) {
      this.assign_color(opts);
      this.assign_board(opts);
      this.assign_position(opts);
    }

    Piece.prototype.moves = function() {
      return [];
    };

    Piece.prototype.assign_color = function(opts) {
      var color, colors;
      if (!('color' in opts)) {
        throw "Please provide a piece color";
      }
      color = opts.color.toLowerCase();
      if (__indexOf.call(colors = ['white', 'black', 'grey'], color) < 0) {
        throw "Piece color must be one of " + (colors.join(', '));
      }
      return this.color = color;
    };

    Piece.prototype.assign_board = function(opts) {
      var _ref, _ref1;
      if (!('board' in opts)) {
        throw "Please provide a board";
      }
      if (((_ref = opts.board) != null ? (_ref1 = _ref.constructor) != null ? _ref1.name : void 0 : void 0) !== 'Board') {
        throw "Specified 'board' is not a Board";
      }
      return this.board = opts.board;
    };

    Piece.prototype.assign_position = function(opts) {
      if (!('position' in opts)) {
        throw "Please provide a position";
      }
      if (!(opts.position instanceof Array && opts.position.length === 2)) {
        throw "Position must be an array of two integers.";
      }
      this.position = opts.position;
      return this.board.board[this.position[0]][this.position[1]] = this;
    };

    Piece.prototype.x = function() {
      return this.position[0];
    };

    Piece.prototype.y = function() {
      return this.position[1];
    };

    return Piece;

  })();

  module.exports = Piece;

}).call(this);
