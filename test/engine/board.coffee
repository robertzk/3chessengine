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

  it "should show that a freshly initialized board has pieces in the last two ranks", ->
    b = new Board()
    for i in [0..23]
      b.has_piece_at(i, 0).should.be.true
      b.has_piece_at(i, 1).should.be.true

  it "should correctly ascertain a question about piece placement", ->
    b = new Board()
    b.piece_at(0, 0).should.equal b.board[0][0]

  it "should be able to move a piece", ->
    b = new Board()
    piece = b.piece_at(0, 1)
    b.move_piece(0, 1, 0, 3)
    b.has_piece_at(0, 1).should.be.false
    b.has_piece_at(0, 3).should.be.true
    b.piece_at(0, 3).should.equal piece

