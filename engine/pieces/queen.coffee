Piece = require('./piece')
octopus = require('./octopus')
class Queen extends Piece

  constructor: (opts) ->
    super
    @type = 'queen'

  moves: octopus(true, true)

module.exports = Queen

