# A bishop, rook and queen all share very similar movement behavior
# that can be abstracted with the idea of an "octopus". Namely,
# the available moves are branching out in any of the eight adjacent
# directions until we find another piece. The rook will filter to
# axial moves and the bishop will filter to diagonal moves. Care needs
# to be taken when crossing the inner circle.
#
# For example, let's consider the bishop.
#
# If a bishop is crossing the inner circle, the following heuristic holds. 
# When the bishop moves left (for example, from [0,5] to [23, 6]) it is 
# actually moving 14 squares left (so it would land on [-14,5] = [10,5] mod 24).
# If it moves right (for example, from [0,5] to [1,6]) it is actually
# moving 14 squares right (so it would land on [14,5]).
# 
# This function will attempt to perform the above computation, and will return
# { can_move: false } if an invalid move is made (e.g., the bishop moves off the board).
#
# The function requires the old position because the bishop's movement direction
# determines the normalized square.
# 
# The return value of normalize_position will be an object containing
# up to the following four keys:
#  - can_move: Whether or not the bishop can move to the given x and y 
#     (always some adjacent square)
#  - final_move: Whether or not this is the final move (i.e., we are
#     capturing a piece.)
#  - crossed_circle: Whether or not we have crossed the inner circle
#     with this move.
#  - position: The normalized x and y coordinates.
normalize_position = (old_x, old_y, x, y) ->
  return { can_move: false } if y < 0
  if Math.abs(old_x - x) != 1 && Math.abs(old_y - y) != 1
    throw "Only adjacent moves supported"

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

# Compute all diagonal or axial moves for a piece. If King, we can
# set one_step = true so we only compute one step forward.
# This function is intended to be used for Queen, Bishop, Rook, and King
# as a method.
moves = (diagonal, axial, one_step = false) -> ->
  positions = []
  dirs = []
  if axial
    dirs.push x for x in [[-1, 0], [1, 0], [0, -1], [0, 1]]
  if diagonal
    dirs.push x for x in [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    
  tries = []
  for dir in dirs
    prev_x = @x()
    prev_y = @y()
    loop
      [x, y] = [prev_x + dir[0], prev_y + dir[1]]
      next_position = normalize_position.call(@, prev_x, prev_y, x, y)
      tries.push [x, y]
      break unless next_position.can_move
      positions.push next_position.position
      # If the bishop crosses the inner circle,
      # we need to move "down" on the Y axis.
      dir[1] = -dir[1] if next_position.crossed_circle
      break if next_position.final_move || one_step
      [prev_x, prev_y] = next_position.position

  positions

module.exports = moves

