# We should make sure the king cannot move into check!
#
should = require('chai').should()
same_moves = require('./pieces/util').same_moves

King   = require '../../engine/pieces/king'
Queen  = require '../../engine/pieces/queen'
Rook   = require '../../engine/pieces/rook'
Bishop = require '../../engine/pieces/bishop'
Knight = require '../../engine/pieces/knight'
Pawn   = require '../../engine/pieces/pawn'
Board = require '../../engine/board'

describe 'King moves', ->
  it "should not be able to move into a pawn's attack path", ->
    b = new Board()
    b.remove_piece(0, 0) # No rook
    b.remove_piece(1, 0) # No knight
    b.move_piece(0, 1, 0, 2) # Move up a1 pawn
    b.move_piece(19, 0, 23, 2) # Move gray king to left of pawn
    b.moats['white'] = false
    gray_king = b.piece_at(23, 2)
    gray_king.moves().length.should.equal 4
    same_moves(gray_king.moves(), [[22, 2], [22, 3], [0, 3], [0, 1]]).should.be.true
 
  it "should not be able to move into the path of a pawn that has crossed the center", ->
    b = new Board()
    b.move_piece(23, 1, 11, 2)
    b.piece_at(11, 2).towards_center = false
    b.remove_piece(12, 1)
    b.remove_piece(10, 1)
    black_king = b.piece_at(11, 0)
    black_king.moves().length.should.equal 0 # Blocked by pawn

  it "should not be able to cross a moat", ->
    b = new Board()
    p = b.piece_at(3, 0) # White king
    p.move_to(0, 0) # Move into the rook!
    p.moves().length.should.equal 0

  it "should be able to cross a closed moat", ->
    b = new Board()
    b.moats['white'] = false
    p = b.piece_at(3, 0) # White king
    p.move_to(0, 0) # Move into the rook!
    p.moves().length.should.equal 1

