clone = require './clone'

Piece  = require './pieces/piece'
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
    @initialize_moats()

  initialize_constants: ->
    @piece_map = { rook: Rook, knight: Knight, bishop: Bishop, king: King, queen: Queen, pawn: Pawn }
    @colors = ['white', 'black', 'grey']

  initialize_board: ->
    @board = (null for _ in [0..5] for $ in [0..23])

  initialize_moats: ->
    @moats = {}
    @moats[k] = true for k in @colors # All moats are active.

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

  # A virtual copy of the board will be used for checking which moves put
  # a king into mate.

  # Read
  has_piece_at: (x, y) -> @board[(24 + x) % 24][y] != null
  piece_at:     (x, y) -> @board[(24 + x) % 24][y]
  
  boardState: ->
    state = []
    for y in [0..5]
      for x in [0..23]
        p = @piece_at(x, y)
        if p
          substate = []
          for attr of p when typeof p[attr] != 'function' && attr != 'board'
            substate.push p[attr]
          state.push substate
    state

  serialize: (content) -> JSON.stringify(@boardState())
  unserialize: (content) -> @unweaveState(JSON.parse(content))

  # Update
  place_piece: (type, color, x, y) ->
    type = @piece_map[@sanitize_type(type)]
    piece = new type(board: @, position: [x, y], color: @sanitize_color(color))
    @board[(24 + x) % 24][y] = piece
    piece

  unweaveState: (unserialized_api_data) ->
    @remove_board()
    for data in unserialized_api_data
      type = data[2]; color = data[0]; x = data[1][0]; y = data[1][1]
      piece = @place_piece(type, color, x, y)
      if type == 'pawn'
        piece.unmoved = data[3]
        piece.towards_center = data[4]


  move_piece: (old_x, old_y, new_x, new_y) ->
    old_x = (old_x + 24) % 24
    throw "No piece at (#{old_x}, #{old_y})" unless @has_piece_at(old_x, old_y)
    @piece_at(old_x, old_y).move_to(new_x, new_y)

  # Destroy
  remove_piece: (x, y) -> @board[x][y] = null

  remove_board: ->
    for y in [0..5]
      for x in [0..23]
        if @piece_at(x, y)
          @remove_piece(x, y)

  # Other
  virtual_board: ->
    board = new Board(false)
    for attr of @
      continue if attr == 'board'
      board[attr] = @[attr]

    clone_piece = (piece) ->
      return unless piece
      new_piece = new piece.constructor(color: piece.color, board: board, \
        position: (x for x in piece.position))
      # Copy over all non-function additional attributes.
      for attr of piece when typeof piece[attr] != 'function'
        continue if attr in ['color', 'board', 'position', 'type']
        new_piece[attr] = piece[attr]
      new_piece
      
    (clone_piece(_) for _ in $ for $ in @board)

    board

  king: (color) ->
    for x in [0..23]
      for y in [0..5]
        piece = @board[x][y]
        return piece if piece and piece.type == 'king' and piece.color == color

  get_pieces: (color) ->
    pieces = []
    for x in [0..23]
      for y in [0..5]
        piece = @board[x][y]
        pieces.push(piece) if piece and piece.color == color
    pieces

  left_moats: ->
    ((x*8 - 1 + 24) % 24 for x in [0..2] when @moats[@colors[x]])

  right_moats: ->
    (x * 8 for x in [0..2] when @moats[@colors[x]])

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
