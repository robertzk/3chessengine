Piece = require('./piece')
class Pawn extends Piece

  constructor: (opts) ->
    super
    @type = 'pawn'
    do @initialize_unmoved
    do @initialize_direction

  ###
  # With pawns, we must be careful about the direction in which
  # they move forward. For example, if a pawn crosses the inner circle
  # it is moving "backward" in relation to the pawns that started on that
  # side, which are moving forward.
  #
  # To record this moving direction, we simply maintain the convention that
  # @towards_center = true implies the pawn is moving toward the center, and
  # @towards_center = false implies the pawn is moving away from the center.
  #
  # A pawn changes direction if and only if it crosses the center circle.
  ###
  initialize_direction: ->
    @towards_center = true

  ###
  # If a pawn has moved, it can no longer skip 2 spaces nor capture en passent.
  # We must record this somehow, simply as a boolean flag.
  ###
  initialize_unmoved: ->
    @unmoved = true

  ###
  # List the moves available to a pawn (in an array of [x, y] positions).
  #
  # Recall that it can capture to the sideways left and right, but only move
  # forward. Adjacent to the center, the pawn can cross the center, or 
  # capture along the same diagonal a bishop would be able to.
  ###
  moves: (filter = true) ->
    moves =
      if @y() == 5 && @towards_center # We have reached the inner circle
        do @center_moves
      else
        do @noncenter_moves

    if filter
      @filter_checks moves
    else
      moves

  center_moves: ->
    moves = []
    # Move forward directly across the circle
    unless @board.has_piece_at((@x() + 12) % 24, @y())
      moves.push [(@x() + 12) % 24, @y()]

    # Take a piece along the diagonals one step across the circle.
    for i in [-1, 1]
      if @board.has_piece_at((@x() + 12 + 2 * i) % 24, @y()) &&
         @board.piece_at((@x() + 12 + 2 * i) % 24, @y()).color != @color
        moves.push [(@x() + 12 + 2 * i) % 24, @y()]

    moves

  noncenter_moves: ->
    moves = []

    # TODO: (RK) Incorporate pins?
    if @unmoved and !@board.has_piece_at(@x(), @y() + 2) and \
        !@board.has_piece_at(@x(), @y() + 1)
      moves.push [@x(), @y() + 2]

    delta = if @towards_center then 1 else -1

    # Move forward.
    unless @board.has_piece_at(@x(), @y() + delta)
      moves.push [@x(), @y() + delta]

    # Take a piece along the adjacent diagonals.
    for i in [-1, 1]
      if (@board.has_piece_at(@x() + i, @y() + delta)) and \
         (@board.piece_at(@x() + i, @y() + delta).color != @color)
        moves.push [@x() + i, @y() + delta]
    
    moves

  move_to: (new_x, new_y) ->
    @unmoved = false
    old_y = @y()
    out = super
    if old_y == 5 && new_y == 5 # We crossed the inner circle
      @towards_center = false
    out

module.exports = Pawn

