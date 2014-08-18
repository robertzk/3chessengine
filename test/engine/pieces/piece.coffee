should = require('chai').should()
Piece = require '../../../engine/pieces/piece'
Board = require '../../../engine/board'

describe 'Piece', ->
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

  it "show throw an error when no position is specified", ->
    try
      new Piece(color: 'white', board: new Board(false))
    catch error
      error.toString().should.equal "Please provide a position"

  it "show throw an error when an invalid position is specified", ->
    try
      new Piece(color: 'white', board: new Board(false), position: [1])
    catch error
      error.toString().should.equal "Position must be an array of two integers."

  it "should be able to create a Piece when a valid color, board, and position are provided", ->
    new Piece(color: 'white', board: new Board(false), position: [0, 0])
    
