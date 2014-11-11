should = require('chai').should()
assert = require('chai').assert
same_moves = require('./util').same_moves
Rook = require '../../../engine/pieces/rook'
Board = require '../../../engine/board'

describe 'Rook', ->
  it "should not be able to make any moves initially", ->
    b = new Board()
    p = b.piece_at(0, 0) # King-side white rook
    p.moves().length.should.equal 0

  it "should be able to cross over a moat", ->
    b = new Board()
    b.moats['white'] = false
    p = b.piece_at(0, 0) # King-side white rook
    same_moves(p.moves(), [[23, 0]]).should.be.true
