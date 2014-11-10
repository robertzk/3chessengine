King   = require './pieces/piece'
King   = require './pieces/king'
Queen  = require './pieces/queen'
Rook   = require './pieces/rook'
Bishop = require './pieces/bishop'
Knight = require './pieces/knight'
Pawn   = require './pieces/pawn'

class Board

  # Create
  constructor: (setup_pieces = true) ->
    @__class = 'Board'

    do @initialize_board
    do @initialize_constants
    @initialize_pieces() if setup_pieces

  initialize_constants: ->
    @piece_map = { rook: Rook, knight: Knight, bishop: Bishop, king: King, queen: Queen, pawn: Pawn }
    @colors = ['white', 'black', 'grey']

  initialize_board: ->
    @board = (null for _ in [0..5] for $ in [0..23])

  initialize_pieces: ->
    for color in @colors
      @initialize_backrank color
      @initialize_pawns    color

  initialize_backrank: (color) ->
    [color_name, color] = [color, @colors.indexOf(color)]
    @backrank_pieces ||= [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]
    for i in [0..7]
      new @backrank_pieces[i](color: color_name, board: @, position: [8 * color + i, 0])

  initialize_pawns: (color) ->
    [color_name, color] = [color, @colors.indexOf(color)]
    for i in [0..7]
      new Pawn(color: color_name, board: @, position: [8 * color + i, 1])

  # Read
  has_piece_at: (x, y) -> @board[(24 + x) % 24][y] != null
  piece_at:     (x, y) -> @board[(24 + x) % 24][y]

  # Update
  place_piece: (type, color, x, y) ->
    type = @piece_map[@sanitize_type(type)]
    piece = new type(board: @, position: [x, y], color: @sanitize_color(color))
    @board[(24 + x) % 24][y] = piece
    piece

  move_piece: (old_x, old_y, new_x, new_y) ->
    old_x = (old_x + 24) % 24
    throw "No piece at (#{old_x}, #{old_y})" unless @has_piece_at(old_x, old_y)
    @piece_at(old_x, old_y).move_to(new_x, new_y)

  # Destroy
  remove_piece: (x, y) -> @board[x][y] = null

  # Private
  ##

  sanitize_type: (type) ->
    type = type.toLowerCase()
    throw "Invalid piece type" unless type of @piece_map
    type

  sanitize_color: (color) ->
    color = color.toLowerCase()
    throw "Invalid color" unless color in @colors
    color

module.exports = Board
