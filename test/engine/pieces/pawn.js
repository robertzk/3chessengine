(function() {
  var Board, Pawn, assert, same_moves, should;

  should = require('chai').should();

  assert = require('chai').assert;

  same_moves = require('./util').same_moves;

  Pawn = require('../../../engine/pieces/pawn');

  Board = require('../../../engine/board');

  describe('Pawn', function() {
    it("should display one and two steps forward as the available moves initially", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(0, 1);
      p.moves().length.should.equal(2);
      return assert.deepEqual(p.moves(), [[0, 3], [0, 2]]);
    });
    it("should not display one step forward as an available move if there is an obstruction", function() {
      var b, enemy_pawn, p;
      b = new Board();
      enemy_pawn = new Pawn({
        color: 'black',
        board: b,
        position: [0, 2]
      });
      p = b.piece_at(0, 1);
      return p.moves().length.should.equal(0);
    });
    it("should be able to jump across the inner circle", function() {
      var b, p;
      b = new Board();
      p = new Pawn({
        color: 'black',
        board: b,
        position: [0, 5]
      });
      return assert.deepEqual(p.moves(), [[12, 5]]);
    });
    it("should not be able to jump across the circle if there is a piece", function() {
      var b, other, p;
      b = new Board();
      p = new Pawn({
        color: 'black',
        board: b,
        position: [0, 5]
      });
      other = new Pawn({
        color: 'black',
        board: b,
        position: [12, 5]
      });
      return p.moves().length.should.equal(0);
    });
    it("should be able to attack across the inner circle", function() {
      var b, other1, other2, other3, p;
      b = new Board();
      p = new Pawn({
        color: 'black',
        board: b,
        position: [0, 5]
      });
      other1 = new Pawn({
        color: 'black',
        board: b,
        position: [12, 5]
      });
      other2 = new Pawn({
        color: 'white',
        board: b,
        position: [14, 5]
      });
      other3 = new Pawn({
        color: 'white',
        board: b,
        position: [10, 5]
      });
      return assert.deepEqual(p.moves(), [[10, 5], [14, 5]]);
    });
    it("should not be able to attack across the inner circle if going inward", function() {
      var b, p;
      b = new Board();
      p = new Pawn({
        color: 'black',
        board: b,
        position: [0, 5]
      });
      p.towards_center = false;
      return assert.deepEqual(p.moves(), [[0, 4]]);
    });
    it("should be able to attack going inward", function() {
      var b, other1, other2, other3, p;
      b = new Board();
      p = new Pawn({
        color: 'black',
        board: b,
        position: [1, 5]
      });
      other1 = new Pawn({
        color: 'white',
        board: b,
        position: [0, 4]
      });
      other2 = new Pawn({
        color: 'white',
        board: b,
        position: [2, 4]
      });
      other3 = new Pawn({
        color: 'white',
        board: b,
        position: [1, 4]
      });
      p.towards_center = false;
      return assert.deepEqual(p.moves(), [[0, 4], [2, 4]]);
    });
    it("should not be able to attack friendlies", function() {
      var b, other1, other2, other3, p;
      b = new Board;
      p = new Pawn({
        color: 'black',
        board: b,
        position: [1, 2]
      });
      other1 = new Pawn({
        color: 'black',
        board: b,
        position: [0, 3]
      });
      other2 = new Pawn({
        color: 'black',
        board: b,
        position: [1, 3]
      });
      other3 = new Pawn({
        color: 'black',
        board: b,
        position: [2, 3]
      });
      return p.moves().length.should.equal(0);
    });
    it("should not be able to go two steps if it has moved", function() {
      var b, p;
      b = new Board();
      p = b.piece_at(0, 1);
      p.move_to(0, 3);
      return assert.deepEqual(p.moves(), [[0, 4]]);
    });
    it("crossing the inner circle should make a pawn change its towards_center", function() {
      var b, p;
      b = new Board();
      p = b.place_piece('pawn', 'white', 0, 5);
      p.towards_center.should.be["true"];
      p.move_to(12, 5);
      return p.towards_center.should.be["false"];
    });
    it("should be able to capture across to the left of column 0", function() {
      var b, p;
      b = new Board();
      b.move_piece(23, 1, 23, 3);
      b.move_piece(23, 3, 23, 4);
      b.move_piece(0, 1, 0, 3);
      p = b.piece_at(0, 3);
      p.moves().length.should.equal(2);
      return same_moves(p.moves(), [[23, 4], [0, 4]]).should.be["true"];
    });
    it("should be able to capture across to the right of column 23", function() {
      var b, p;
      b = new Board();
      b.move_piece(23, 1, 23, 3);
      b.move_piece(0, 1, 0, 3);
      b.move_piece(0, 3, 0, 4);
      p = b.piece_at(23, 3);
      p.moves().length.should.equal(2);
      return same_moves(p.moves(), [[23, 4], [0, 4]]).should.be["true"];
    });
    return it("should not be able to cross a creek", function() {
      var b, i, p, x, _i, _results;
      b = new Board();
      _results = [];
      for (i = _i = 0; _i <= 2; i = ++_i) {
        b.move_piece(x = b.left_moats()[i], 1, x, 2);
        p = b.piece_at((x + 1) % 24, 1);
        _results.push(p.moves().length.should.equal(2));
      }
      return _results;
    });
  });

}).call(this);
