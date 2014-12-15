Piece = require('./piece')
octopus = require('./octopus')
class King extends Piece

  constructor: (opts) ->
    super
    do @initialize_unmoved
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
      sign = if ix < 0 then -1 else 1
      if rook = @board.piece_at(@x() + ix, @y())
        if rook.type is 'rook' and rook.unmoved
          empty = true
          for i in [1..(Math.abs(ix) - 1)]
            empty and= !@board.piece_at(@x() + sign * i, @y())
          if empty # No pieces in the way
            moves.push [@x() + sign * 2, @y()]
    moves

  ###
  # Perform a castling move by moving the rook.
  ###
  castle_move: (new_x) ->
    # We assume this was in the list of allowed moves so castling is legal,
    # and the rook is appropriately placed.
    if new_x - @x() == -2
      @board.piece_at(@x() - 3, @y()).move_to(@x() - 1, @y())
    else if new_x - @x() == 2
      @board.piece_at(@x() + 4, @y()).move_to(@x() + 1, @y())

module.exports = King

