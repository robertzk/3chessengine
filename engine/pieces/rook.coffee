Piece = require('./piece')
octopus = require('./octopus')
class Rook extends Piece

  constructor: (opts) ->
    super
    @type = 'rook'

  moves: octopus(false, true)

module.exports = Rook

