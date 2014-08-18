should = require('chai').should()
engine = require('../../engine/index')
chess = engine.Chess

describe '#chess', ->
  it "should chess", ->
    (do chess).should.equal(1)

