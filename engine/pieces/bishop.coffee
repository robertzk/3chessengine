Piece = require('./piece')
octopus = require('./octopus')
class Bishop extends Piece

  constructor: (opts) ->
    super
    @type = 'bishop'

  _moves: octopus(true, false)

module.exports = Bishop

