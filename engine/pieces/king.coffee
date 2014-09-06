Piece = require('./piece')
class King extends Piece

  constructor: (opts) ->
    super
    @type = 'king'

  normalize_position: (old_x, old_y, x, y) ->
    return { can_move: false } if y < 0
    #if Math.abs(old_x - x) != 1 && Math.abs(old_y - y) != 1
    #  throw "Only adjacent moves supported"

    diff = x - old_x # This has to be precomputed before the % 24s
    x = (x + 24) % 24
    old_x = (old_x + 24) % 24
    out = { can_move: true, crossed_circle: false }
    if y > 5
      offset =
        if Math.abs(old_x - x) + Math.abs(old_y - y) == 2
          14 # Like a bishop
        else 
          12 # Like a rook

      if diff < 0
        x = old_x + (24 - offset)
        x %= 24
      else
        x = old_x + offset
        x %= 24
      y = 5
      out.crossed_circle = true
    
    if has_piece = @board.has_piece_at(x, y)
      same_color = @board.piece_at(x, y).color == @color
      # We can only move onto a piece if it is of a different color.
      out.can_move = !same_color
    # If there is a piece, this is our final move in this direction.
    out.final_move = has_piece
    out.position = [x, y]
    out

  moves: ->
    positions = []
    tries = []
    for dir in [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
      prev_x = @x()
      prev_y = @y()
      [x, y] = [prev_x + dir[0], prev_y + dir[1]]
      next_position = @normalize_position(prev_x, prev_y, x, y)
      tries.push [x, y]
      continue unless next_position.can_move
      positions.push next_position.position
    positions

module.exports = King

