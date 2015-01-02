Piece = require('./piece')
octopus = require('./octopus')
class Bishop extends Piece

  constructor: (opts) ->
    super
    @type = 'bishop'

  moves: octopus(true, false)

module.exports = Bishop

