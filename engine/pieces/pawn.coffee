Piece = require('./piece')
class Pawn extends Piece

  constructor: (opts) ->
    super
    
    do @initialize_direction
    @type = 'pawn'

  ###
  # With pawns, we must be careful about the direction in which
  # they move forward. For example, if a pawn crosses the inner circle
  # it is moving "backward" in relation to the pawns that started on that
  # side, which are moving forward.
  #
  # To record this moving direction, we simply maintain the convention that
  # @direction = 1 implies the pawn is moving toward the center, and
  # @direction = -1 implies the pawn is moving away from the center.
  #
  # A pawn changes direction if and only if it crosses the center circle.
  ###
  initialize_direction: ->
    @direction = 1

module.exports = Pawn

