King   = require './pieces/king'
Queen  = require './pieces/queen'
Rook   = require './pieces/rook'
Bishop = require './pieces/bishop'
Knight = require './pieces/knight'
Pawn   = require './pieces/pawn'

class Board

  constructor: ->
    do @initialize_board
    do @initialize_pieces

  initialize_board: ->
    @board = (null for _ in [0..5] for $ in [0..23])

  initialize_pieces: ->
    colors = ['white', 'black', 'grey']
    pieces = [King, Queen, Rook, Bishop, Knight, Pawn]
    for color in [0..2]
      # Set up back rank
      pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]
      for i in [0..7]
        @board[8 * color + i][0] = new pieces[i](color: colors[color], board: @)

      # Set up second rank
      for i in [0..7]
        @board[8 * color + i][1] = new Pawn(color: colors[color], board: @)

module.exports = Board
