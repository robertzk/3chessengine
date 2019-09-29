Piece = require('./piece')
octopus = require('./octopus')
class Rook extends Piece

  constructor: (opts) ->
    super
    do @initialize_unmoved
    @type = 'rook'

  _moves: octopus(false, true)

  ###
  # If a rook has moved, it can no longer be used in conjunction with castling.
  # We must record this somehow, simply as a boolean flag.
  ###
  initialize_unmoved: ->
    @unmoved = true

module.exports = Rook

