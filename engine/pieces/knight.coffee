Piece = require('./piece')
class Knight extends Piece

  constructor: (opts) ->
    super
    @type = 'knight'

  # If a knight has jumped across the center, it will look like
  # it has moved to spot y = 6 or y = 7. In this scenario, the knight's
  # actual position needs to be rotated to appear across the inner circle.
  normalize_position: (x, y) ->
    x += 24

    x += 12 if y > 5 # This is technically wrong, but it's ok!
      # We only care about *available* moves.
    y = 6 - (y % 5) if y > 5

    [x % 24, y unless y < 0]

  crossed_moat: (old_x, old_y, new_x, new_y) ->
    return false unless old_y == 0 or new_y == 0
    left_moats  = @board.left_moats()
    right_moats = @board.right_moats()

    out   = (old_x + 1 in left_moats and new_x in right_moats)
    out or= (old_x in left_moats and ((new_x in right_moats) or (new_x - 1 in right_moats)))
    out or= (old_x - 1 in right_moats and new_x in left_moats)
    out or= (old_x in right_moats and (new_x in left_moats or new_x + 1 in left_moats))
    out

  ###
  # List the moves available to a knight (in an array of [x, y] positions).
  #
  # Recall that it can capture in L shapes all around the board.
  ###
  _moves: (filter = 2) ->
    positions = []
    for sign1 in [-1..1] by 2
      for sign2 in [-1..1] by 2
        for d in [1..2]
          [x, y] = @normalize_position @x() + sign1 * d, @y() + sign2 * (3 - d)

          # Prevent moat crossing
          continue if @crossed_moat(@x(), @y(), x, y)

          # If the knight went off the board or is landing on a piece
          # of the same color, this is an illegal move.
          continue if !y? or @board.piece_at(x, y)?.color == @color

          positions.push [x, y]

    @filter_checks positions, filter - 1

  # TODO: (RK) Knights cannot cross moats.

module.exports = Knight

