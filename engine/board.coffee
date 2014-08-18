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
    @colors = ['white', 'black', 'grey']
    @board = (null for _ in [0..5] for $ in [0..23])

  initialize_pieces: ->
    for color in @colors
      @initialize_backrank color
      @initialize_pawns    color

      # Set up second rank

  initialize_backrank: (color) ->
    [color_name, color] = [color, @colors.indexOf(color)]
    @backrank_pieces ||= [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]
    for i in [0..7]
      @board[8 * color + i][0] =
        new @bankrank_pieces[i](color: color_name, board: @)

  initialize_pawns: (color) ->
    [color_name, color] = [color, @colors.indexOf(color)]
    for i in [0..7]
      @board[8 * color + i][1] = new Pawn(color: color_name, board: @)


module.exports = Board
