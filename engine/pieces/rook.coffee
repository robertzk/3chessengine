Piece = require('./piece')
class Rook extends Piece

  constructor: (opts) ->
    super
    @type = 'rook'

  normalize_position: (old_x, old_y, x, y) ->
    return { can_move: false } if y < 0
    if Math.abs(old_x - x) != 1 && Math.abs(old_y - y) != 1
      throw "Only adjacent moves supported"

    diff = x - old_x # This has to be precomputed before the % 24s
    x = (x + 24) % 24
    old_x = (old_x + 24) % 24
    out = { can_move: true, crossed_circle: false }
    if y > 5
      if diff < 0
        x = old_x + (24 - 14)
        x %= 24
      else
        x = old_x + 14
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
    for dir in [[-1, 0], [1, 0], [0, -1], [0, 1]]
      prev_x = @x()
      prev_y = @y()
      loop
        [x, y] = [prev_x + dir[0], prev_y + dir[1]]
        next_position = @normalize_position(prev_x, prev_y, x, y)
        tries.push [x, y]
        break unless next_position.can_move
        positions.push next_position.position
        # If the bishop crosses the inner circle,
        # we need to move "down" on the Y axis.
        dir[1] = -dir[1] if next_position.crossed_circle
        break if next_position.final_move
        [prev_x, prev_y] = next_position.position
    positions

module.exports = Rook

