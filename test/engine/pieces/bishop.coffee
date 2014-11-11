should = require('chai').should()
assert = require('chai').assert
same_moves = require('./util').same_moves
Bishop = require '../../../engine/pieces/bishop'
Board = require '../../../engine/board'

describe 'Bishop', ->
  it "should have no moves in the initial board position", ->
    b = new Board()
    p = b.piece_at(2, 0)
    p.moves().length.should.equal 0

  it "should be able to move in a loop if the white b2 pawn is removed", ->
    b = new Board()
    p = b.piece_at(2, 0)
    b.remove_piece(1, 1)
    moves = p.moves()
    moves.length.should.equal 9
    true_moves = [[1,1],[0,2],[23,3],[22,4],[21,5],[7,5],[6,4],[5,3],[4,2]]
    same_moves(moves, true_moves).should.be.true

  it "should not be able to cross a moat", ->
    b = new Board()
    p = b.piece_at(2, 0) # King-side white bishop
    p.move_to(0, 0) # Move into the rook!
    p.moves().length.should.equal 0

  it "should be able to cross a closed moat", ->
    b = new Board()
    b.moats['white'] = false
    p = b.piece_at(2, 0) # King-side white bishop
    p.move_to(0, 0) # Move into the rook!
    p.moves().length.should.equal 1

