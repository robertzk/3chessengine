should = require('chai').should()
Piece = require '../../../engine/pieces/piece'
Board = require '../../../engine/board'

describe '#piece', ->
  it "should throw an error when no piece color is provided", ->
    try
      new Piece({})
    catch error
      error.toString().should.equal "Please provide a piece color"

  it "should throw an error when incorrect piece color is provided", ->
    try
      new Piece(color: 'purple')
    catch error
      error.toString().should.equal "Piece color must be one of white, black, grey"

  it "should throw an error when no board is assigned", ->
    try
      new Piece(color: 'white')
    catch error
      error.toString().should.equal "Please provide a board"

  it "should throw an error when a non-Board is assigned", ->
    try
      new Piece(color: 'white', board: undefined)
    catch error
      error.toString().should.equal "Specified 'board' is not a Board"

  it "should be able to create a Piece when a valid color and board are provided", ->
    new Piece(color: 'white', board: new Board())
    
