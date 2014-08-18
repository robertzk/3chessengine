should = require('chai').should()

King   = require '../../engine/pieces/king'
Queen  = require '../../engine/pieces/queen'
Rook   = require '../../engine/pieces/rook'
Bishop = require '../../engine/pieces/bishop'
Knight = require '../../engine/pieces/knight'
Pawn   = require '../../engine/pieces/pawn'
Board = require '../../engine/board'

describe 'Board', ->
  it "should initialize back rank correctly", ->
    b = new Board()
    colors = ['white', 'black', 'grey']
    pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]

    for i in [0..23]
      b.board[i][0].constructor.name.should.equal pieces[i % 8].name
      b.board[i][0].color.should.equal colors[(i - i % 8) / 8]

  it "should initialize pawns correctly", ->
    b = new Board()
    colors = ['white', 'black', 'grey']
    pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]

    for i in [0..23]
      b.board[i][1].constructor.name.should.equal 'Pawn'
      b.board[i][1].color.should.equal colors[(i - i % 8) / 8]

