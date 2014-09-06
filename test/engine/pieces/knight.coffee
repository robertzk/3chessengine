should = require('chai').should()
assert = require('chai').assert
same_moves = require('./util').same_moves
Knight = require '../../../engine/pieces/knight'
Board = require '../../../engine/board'

describe 'Knight', ->
  it "should display two forward moves and one capturing move initially", ->
    b = new Board()
    p = b.piece_at(1, 0) # King-side white knight
    p.moves().length.should.equal 3
    assert.deepEqual p.moves(), [[0, 2], [23, 1], [2, 2]]

  it "should move all eight directions from a middle square", ->
    b = new Board()
    k = new Knight(position: [21, 3], board: b, color: 'white')
    moves = k.moves()
    moves.length.should.equal 8
    true_moves = [[23, 4], [23, 2], [22, 5], [22, 1], [20, 5], [20, 1],
                  [19, 2], [19, 4]]
    same_moves(moves, true_moves).should.be.true

  it "should not be able to move onto friendlies from a middle square", ->
    b = new Board()
    k = new Knight(position: [3, 3], board: b, color: 'white')
    moves = k.moves()
    moves.length.should.equal 6
    true_moves = [[5, 4], [5, 2], [4, 5], [2, 5], [1, 2], [1, 4]]
    same_moves(moves, true_moves).should.be.true

  it "should be able to move across the inner circle", ->
    b = new Board()
    k = new Knight(position: [3, 5], board: b, color: 'white')
    moves = k.moves()
    moves.length.should.equal 8
    true_moves = [[1, 4], [2, 3], [4, 3], [5, 4],
                  [13, 5], [14, 4], [16, 4], [17, 5]]

    same_moves(moves, true_moves).should.be.true

