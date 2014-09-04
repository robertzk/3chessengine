should = require('chai').should()
assert = require('chai').assert
Knight = require '../../../engine/pieces/knight'
Board = require '../../../engine/board'

describe 'Knight', ->
  it "should display two forward moves initially", ->
    b = new Board()
