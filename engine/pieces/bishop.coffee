Piece = require('./piece')
class Bishop extends Piece

  constructor: (opts) ->
    super
    @type = 'bishop'

  normalize_position: (x, y) ->
    return false if y < 0

  moves: ->
    positions = []

module.exports = Bishop

