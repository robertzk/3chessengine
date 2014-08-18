class Board

  constructor: ->
    do @initialize_board
    do @initialize_pieces

  initialize_board: ->
    @board = (null for _ in [0..5] for $ in [0..23])

  initialize_pieces: ->


module.exports = Board
