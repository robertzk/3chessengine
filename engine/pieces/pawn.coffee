Piece = require('./piece')
class Pawn extends Piece

  constructor: (opts) ->
    super
    @type = 'pawn'

module.exports = Pawn

