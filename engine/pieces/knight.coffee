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
    y -= y % 5 if y > 5

    [x % 24, y unless y < 0]

  ###
  # List the moves available to a knight (in an array of [x, y] positions).
  #
  # Recall that it can capture in L shapes all around the board.
  ###
  moves: ->
    positions = []
    for sign1 in [-1..1] by 2
      for sign2 in [-1..1] by 2
        for d in [1..2]
          [x, y] = @normalize_position @x() + sign1 * d, @y() + sign2 * (3 - d)
          # If the knight went off the board or is landing on a piece
          # of the same color, this is an illegal move.
          continue if !y? or @board.piece_at(x, y)?.color == @color
          positions.push [x, y]

    positions

  # TODO: (RK) Knights cannot cross moats.

module.exports = Knight

