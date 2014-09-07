//built with clientside 0.5.1 https://github.com/jgallen23/clientside
if (typeof __cs == 'undefined') {
  var __cs = { 
    map: {}, 
    libs: {},
    r: function(p) {
      var mod = __cs.libs[__cs.map[p]];
      if (!mod) {
        throw new Error(p + ' not found');
      }
      return mod;
    }
  };
  window.require = __cs.r;
}
__cs.map['./engine/pieces/king'] = 'cs852f3f85';
__cs.map['./engine/pieces/queen'] = 'cs591948df';
__cs.map['./engine/pieces/rook'] = 'cs50ac7fdb';
__cs.map['./engine/pieces/bishop'] = 'cs5f8b3ecd';
__cs.map['./engine/pieces/knight'] = 'csefeb9072';
__cs.map['./engine/pieces/pawn'] = 'cs4379d23b';
__cs.map['./engine/board'] = 'cs07b02b0c';
__cs.map['./piece'] = 'cs6b44f638';
__cs.map['./octopus'] = 'csb79f58b0';
__cs.map['./pieces/piece'] = 'cs6b44f638';
__cs.map['./pieces/king'] = 'cs852f3f85';
__cs.map['./pieces/queen'] = 'cs591948df';
__cs.map['./pieces/rook'] = 'cs50ac7fdb';
__cs.map['./pieces/bishop'] = 'cs5f8b3ecd';
__cs.map['./pieces/knight'] = 'csefeb9072';
__cs.map['./pieces/pawn'] = 'cs4379d23b';

//piece.js
__cs.libs.cs6b44f638 = (function(require, module, exports) {
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
    Piece.prototype.move_to = function(new_x, new_y) {
      var _i, _results;
      if (__indexOf.call((function() {
        _results = [];
        for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
        return _results;
      }).apply(this), new_x) < 0) {
        throw "Invalid new_x";
      }
      if (__indexOf.call([0, 1, 2, 3, 4, 5], new_y) < 0) {
        throw "Invalid new_y";
      }
      this.board.board[new_x][new_y] = this;
      this.board.board[this.x()][this.y()] = null;
      return this.position = [new_x, new_y];
    };
    return Piece;
  })();
  module.exports = Piece;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//octopus.js
__cs.libs.csb79f58b0 = (function(require, module, exports) {
(function() {
  var moves, normalize_position;
  normalize_position = function(old_x, old_y, x, y) {
    var diff, has_piece, offset, out, same_color;
    if (y < 0) {
      return {
        can_move: false
      };
    }
    if (Math.abs(old_x - x) !== 1 && Math.abs(old_y - y) !== 1) {
      throw "Only adjacent moves supported";
    }
    diff = x - old_x;
    x = (x + 24) % 24;
    old_x = (old_x + 24) % 24;
    out = {
      can_move: true,
      crossed_circle: false
    };
    if (y > 5) {
      offset = Math.abs(old_x - x) + Math.abs(old_y - y) === 2 ? 14 : 12;
      if (diff < 0) {
        x = old_x + (24 - offset);
        x %= 24;
      } else {
        x = old_x + offset;
        x %= 24;
      }
      y = 5;
      out.crossed_circle = true;
    }
    if (has_piece = this.board.has_piece_at(x, y)) {
      same_color = this.board.piece_at(x, y).color === this.color;
      out.can_move = !same_color;
    }
    out.final_move = has_piece;
    out.position = [x, y];
    return out;
  };
  moves = function(diagonal, axial, one_step) {
    if (one_step == null) {
      one_step = false;
    }
    return function() {
      var dir, dirs, next_position, positions, prev_x, prev_y, tries, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      positions = [];
      dirs = [];
      if (axial) {
        _ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          dirs.push(x);
        }
      }
      if (diagonal) {
        _ref1 = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          x = _ref1[_j];
          dirs.push(x);
        }
      }
      tries = [];
      for (_k = 0, _len2 = dirs.length; _k < _len2; _k++) {
        dir = dirs[_k];
        prev_x = this.x();
        prev_y = this.y();
        while (true) {
          _ref2 = [prev_x + dir[0], prev_y + dir[1]], x = _ref2[0], y = _ref2[1];
          next_position = normalize_position.call(this, prev_x, prev_y, x, y);
          tries.push([x, y]);
          if (!next_position.can_move) {
            break;
          }
          positions.push(next_position.position);
          if (next_position.crossed_circle) {
            dir[1] = -dir[1];
          }
          if (next_position.final_move || one_step) {
            break;
          }
          _ref3 = next_position.position, prev_x = _ref3[0], prev_y = _ref3[1];
        }
      }
      return positions;
    };
  };
  module.exports = moves;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//king.js
__cs.libs.cs852f3f85 = (function(require, module, exports) {
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
    King.prototype.moves = octopus(true, true, true);
    return King;
  })(Piece);
  module.exports = King;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//queen.js
__cs.libs.cs591948df = (function(require, module, exports) {
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
    Queen.prototype.moves = octopus(true, true);
    return Queen;
  })(Piece);
  module.exports = Queen;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//rook.js
__cs.libs.cs50ac7fdb = (function(require, module, exports) {
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
      this.type = 'rook';
    }
    Rook.prototype.moves = octopus(false, true);
    return Rook;
  })(Piece);
  module.exports = Rook;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//bishop.js
__cs.libs.cs5f8b3ecd = (function(require, module, exports) {
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
return module.exports || exports;
})(__cs.r, {}, {});

//knight.js
__cs.libs.csefeb9072 = (function(require, module, exports) {
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
        y = 6 - (y % 5);
      }
      return [x % 24, !(y < 0) ? y : void 0];
    };

    /*
     * List the moves available to a knight (in an array of [x, y] positions).
     *
     * Recall that it can capture in L shapes all around the board.
     */
    Knight.prototype.moves = function() {
      var d, positions, sign1, sign2, x, y, _i, _j, _k, _ref, _ref1;
      positions = [];
      for (sign1 = _i = -1; _i <= 1; sign1 = _i += 2) {
        for (sign2 = _j = -1; _j <= 1; sign2 = _j += 2) {
          for (d = _k = 1; _k <= 2; d = ++_k) {
            _ref = this.normalize_position(this.x() + sign1 * d, this.y() + sign2 * (3 - d)), x = _ref[0], y = _ref[1];
            if ((y == null) || ((_ref1 = this.board.piece_at(x, y)) != null ? _ref1.color : void 0) === this.color) {
              continue;
            }
            positions.push([x, y]);
          }
        }
      }
      return positions;
    };
    return Knight;
  })(Piece);
  module.exports = Knight;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//pawn.js
__cs.libs.cs4379d23b = (function(require, module, exports) {
(function() {
  var Pawn, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
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
    Pawn.prototype.moves = function() {
      if (this.y() === 5 && this.towards_center) {
        return this.center_moves();
      } else {
        return this.noncenter_moves();
      }
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
      var delta, i, moves, _i, _len, _ref;
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
        if ((this.board.has_piece_at(this.x() + i, this.y() + delta)) && (this.board.piece_at(this.x() + i, this.y() + delta).color !== this.color)) {
          moves.push([this.x() + i, this.y() + delta]);
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
return module.exports || exports;
})(__cs.r, {}, {});

//board.js
__cs.libs.cs07b02b0c = (function(require, module, exports) {
(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  King = require('./pieces/piece');
  King = require('./pieces/king');
  Queen = require('./pieces/queen');
  Rook = require('./pieces/rook');
  Bishop = require('./pieces/bishop');
  Knight = require('./pieces/knight');
  Pawn = require('./pieces/pawn');
  Board = (function() {
    function Board(setup_pieces) {
      if (setup_pieces == null) {
        setup_pieces = true;
      }
      this.initialize_board();
      this.initialize_constants();
      if (setup_pieces) {
        this.initialize_pieces();
      }
    }
    Board.prototype.initialize_constants = function() {
      this.piece_map = {
        rook: Rook,
        knight: Knight,
        bishop: Bishop,
        king: King,
        queen: Queen,
        pawn: Pawn
      };
      return this.colors = ['white', 'black', 'grey'];
    };
    Board.prototype.initialize_board = function() {
      var $, _;
      return this.board = (function() {
        var _i, _results;
        _results = [];
        for ($ = _i = 0; _i <= 23; $ = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (_ = _j = 0; _j <= 5; _ = ++_j) {
              _results1.push(null);
            }
            return _results1;
          })());
        }
        return _results;
      })();
    };
    Board.prototype.initialize_pieces = function() {
      var color, _i, _len, _ref, _results;
      _ref = this.colors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        this.initialize_backrank(color);
        _results.push(this.initialize_pawns(color));
      }
      return _results;
    };
    Board.prototype.initialize_backrank = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      this.backrank_pieces || (this.backrank_pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]);
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new this.backrank_pieces[i]({
          color: color_name,
          board: this,
          position: [8 * color + i, 0]
        }));
      }
      return _results;
    };
    Board.prototype.initialize_pawns = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new Pawn({
          color: color_name,
          board: this,
          position: [8 * color + i, 1]
        }));
      }
      return _results;
    };
    Board.prototype.has_piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y] !== null;
    };
    Board.prototype.piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y];
    };
    Board.prototype.place_piece = function(type, color, x, y) {
      var piece;
      type = this.piece_map[this.sanitize_type(type)];
      piece = new type({
        board: this,
        position: [x, y],
        color: this.sanitize_color(color)
      });
      this.board[(24 + x) % 24][y] = piece;
      return piece;
    };
    Board.prototype.move_piece = function(old_x, old_y, new_x, new_y) {
      old_x = (old_x + 24) % 24;
      if (!this.has_piece_at(old_x, old_y)) {
        throw "No piece at (" + old_x + ", " + old_y + ")";
      }
      return this.piece_at(old_x, old_y).move_to(new_x, new_y);
    };
    Board.prototype.remove_piece = function(x, y) {
      return this.board[x][y] = null;
    };
    Board.prototype.sanitize_type = function(type) {
      type = type.toLowerCase();
      if (!(type in this.piece_map)) {
        throw "Invalid piece type";
      }
      return type;
    };
    Board.prototype.sanitize_color = function(color) {
      color = color.toLowerCase();
      if (__indexOf.call(this.colors, color) < 0) {
        throw "Invalid color";
      }
      return color;
    };
    return Board;
  })();
  module.exports = Board;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//index.js
__cs.libs.cs168726db = (function(require, module, exports) {
(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook;
  King = require('./engine/pieces/king');
  Queen = require('./engine/pieces/queen');
  Rook = require('./engine/pieces/rook');
  Bishop = require('./engine/pieces/bishop');
  Knight = require('./engine/pieces/knight');
  Pawn = require('./engine/pieces/pawn');
  Board = require('./engine/board');
  module.exports = {
    King: King,
    Queen: Queen,
    Rook: Rook,
    Bishop: Bishop,
    Knight: Knight,
    Pawn: Pawn,
    Board: Board
  };
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});


window.ThreeChessEngine = __cs.libs.cs168726db; 
