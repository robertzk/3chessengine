should = require('chai').should()
assert = require('chai').assert
same_moves = require('./util').same_moves
Queen = require '../../../engine/pieces/queen'
Board = require '../../../engine/board'

describe 'Queen', ->
  it "Should have no moves in the corner", ->
    b = new Board()
    p = b.piece_at(4, 0) # White queen
    p.move_to(0, 0) # Put baby in the corner
    p.moves().length.should.equal 0

  it "should be able to cross a closed moat", ->
    b = new Board()
    b.moats['white'] = false
    p = b.piece_at(4, 0) # White queen
    p.move_to(0, 0)
    p.moves().length.should.equal 2

