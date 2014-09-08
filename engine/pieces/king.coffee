Piece = require('./piece')
octopus = require('./octopus')
class King extends Piece

  constructor: (opts) ->
    super
    @type = 'king'

  moves: ->
    @filter_checks octopus(true, true, true).apply(@, Array.prototype.slice.call(arguments))

  ###
  # If a king has moved, it can no longer castle.
  # We must record this somehow, simply as a boolean flag.
  ###
  initialize_unmoved: ->
    @unmoved = true

module.exports = King

