Piece = require('./piece')
octopus = require('./octopus')
class King extends Piece

  constructor: (opts) ->
    super
    @type = 'king'

  regular_moves: octopus(true, true, true)
  moves: (index = 2) ->
    @regular_moves(index).concat @castling_moves()

  ###
  # If a king has moved, it can no longer castle.
  # We must record this somehow, simply as a boolean flag.
  ###
  initialize_unmoved: ->
    @unmoved = true

  ###
  # Return the list of available castling moves.
  ###
  castling_moves: ->
    # TODO: (RK) Filter checks
    return [] unless @unmoved
    moves = []
    for ix in [-3, 4]
      if rook = @board.piece_at(@x() + ix, @y())
        if rook.type is 'rook' and rook.unmoved
          empty = true
          empty and= !@board.piece_at(@x() - i, @y()) for i in [1..(Math.abs(ix) - 1)]
          if empty # No pieces in the way
            moves += [@x() + (if x == -3 then -1 else 2), @y()]


module.exports = King

