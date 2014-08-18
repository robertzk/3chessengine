class Piece

  constructor: (opts) ->
    @assign_color opts
    @assign_board opts

  assign_color: (opts) ->
    throw "Please provide a piece color" unless 'color' of opts
    color = opts.color.toLowerCase()
    unless color in colors = ['white', 'black', 'grey']
      throw "Piece color must be one of #{colors.join(', ')}"
    @color = color

  assign_board: (opts) ->
    throw "Please provide a board" unless 'board' of opts
    unless opts.board?.constructor?.name is 'Board'
      throw "Specified 'board' is not a Board"

    @board = opts.board

module.exports = Piece
