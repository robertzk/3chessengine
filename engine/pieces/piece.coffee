all_in = require('./util').all_in
class Piece

  constructor: (opts) ->
    return @ unless arguments.length
    @colors = ['white', 'black', 'grey']
    @assign_color    opts
    @assign_board    opts
    @assign_position opts

  moves: -> []

  filter_checks: (moves, depth = 0) ->
    return moves unless depth
    ok_moves = []
    for move in moves
      vb = do @board.virtual_board
      # Pretend to move this piece on a virtual board
      vb.move_piece(@x(), @y(), move[0], move[1])
      if @type == 'king' # If this is a king, record its moves
        x = move[0]
        y = move[1]
      else
        king = vb.king(@color) # Where is king after moving the piece?
        unless king
          # Is there no king? Then this is probably a test scenario and all moves
          # are OK.
          return moves
        x = king.x()
        y = king.y()

      try
        for color in vb.colors when color != @color
          for piece in vb.get_pieces(color) #when piece.type != 'pawn'
            if piece.type == 'pawn' && piece.y() != 5
              # Unnecessary to consider moves of far away pawns so skip those.
              # Back rank is tricky (since pawns can jump to the other side)
              # so we do check those. It is also tricky in the "singularity"
              # between 0 and 23, so check for bad moves there as well.
               continue if x > 0 && x < 23 && Math.abs(piece.x() - x) + Math.abs(piece.y() - y) > 2

            # If the king is within the movement path of a foreign piece,
            # this is a bad move since the king will get captured.
            throw "bad" if all_in([[x, y]], piece.moves(depth))
      catch _
        continue

      ok_moves.push(move)

    ok_moves

  assign_color: (opts) ->
    throw "Please provide a piece color" unless 'color' of opts
    color = opts.color.toLowerCase()
    unless color in @colors
      throw "Piece color must be one of #{@colors.join(', ')}"
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
    @unmoved = false if @unmoved?

    # For kings, castle
    @castle_move(new_x) if @type == 'king'

    new_x = (new_x + 24) % 24
    throw "Invalid new_x (#{new_x})" unless new_x in [0..23]
    throw "Invalid new_y (#{new_y})" unless new_y in [0..5]
    @board.board[new_x][new_y] = @
    @board.board[@x()][@y()] = null
    @position = [new_x, new_y]

module.exports = Piece

