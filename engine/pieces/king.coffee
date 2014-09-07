Piece = require('./piece')
octopus = require('./octopus')
class King extends Piece

  constructor: (opts) ->
    super
    @type = 'king'

  moves: octopus(true, true, true)

module.exports = King

