should = require('chai').should()
assert = require('chai').assert
Knight = require '../../../engine/pieces/knight'
Board = require '../../../engine/board'

describe 'Knight', ->
  it "should display two forward moves and one capturing move initially", ->
    b = new Board()
    p = b.piece_at(1, 0) # King-side white knight
    #p.moves().length.should.equal 2
    assert.deepEqual p.moves(), [[0, 2], [23, 1], [2, 2]]
