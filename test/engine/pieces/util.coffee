_ = require('underscore')._
should = require('chai').should()

all_in = (a, b) ->
  _.all(_.some(x[0] == el[0] && x[1] == el[1] for x in b) for el in a)

same_moves = (a, b) -> all_in(a, b) && all_in(b, a)

module.exports = { same_moves, all_in }
