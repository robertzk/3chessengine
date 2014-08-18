should = require('chai').should()
hello = require('../hello')
one = hello.one

describe '#one', ->
  it 'does one', ->
    one.should.equal(1)

