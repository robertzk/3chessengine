all_in = require('./util').all_in
class Piece

  constructor: (opts) ->
    return @ unless arguments.length
    @assign_color    opts
    @assign_board    opts
    @assign_position opts

  moves: -> []

  filter_checks: (moves, depth = 0) ->
    return moves unless depth
    ok_moves = []
    for move in moves
      vb = do @board.virtual_board
      vb.move_piece(@x(), @y(), move[0], move[1])
      if @type == 'king'
        x = move[0]
        y = move[1]
      else
        king = vb.king(@color)
        unless king
          ok_moves = moves
          break
        x = king.x()
        y = king.y()
      bad = false
      for color in vb.colors when color != @color
        for piece in vb.get_pieces(color) when piece.type != 'pawn'
          if all_in([[x, y]], piece.moves(depth))
            bad = true
            break

      ok_moves.push(move) unless bad

    ok_moves

  assign_color: (opts) ->
    throw "Please provide a piece color" unless 'color' of opts
    color = opts.color.toLowerCase()
    unless color in colors = ['white', 'black', 'grey']
      throw "Piece color must be one of #{colors.join(', ')}"
    @color = color

  assign_board: (opts) ->
    throw "Please provide a board" unless 'board' of opts
    unless opts.board?.__class == 'Board'
      throw "Specified 'board' is not a Board"

    @board = opts.board

  assign_position: (opts) ->
    throw "Please provide a position" unless 'position' of opts
    unless opts.position instanceof Array and opts.position.length == 2
      throw "Position must be an array of two integers."
    @position = opts.position
    # TODO: (RK) Should we be violating the law of demeter here?
    @board.board[@position[0]][@position[1]] = @

  x: -> @position[0]
  y: -> @position[1]

  move_to: (new_x, new_y) ->
    new_x = (new_x + 24) % 24
    throw "Invalid new_x" unless new_x in [0..23]
    throw "Invalid new_y" unless new_y in [0..5]
    @board.board[new_x][new_y] = @
    @board.board[@x()][@y()] = null
    @position = [new_x, new_y]

module.exports = Piece

