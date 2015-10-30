redis = require 'fakeredis'
RedisNS = require '../index.js'

describe 'RedisNS', ->
  describe '->brpop', ->
    beforeEach (done)->
      @sut = new RedisNS 'ns', redis.createClient()
      @sut.brpop 'list1', 'list2', 1, (@error) => done()

    it 'should not throw an error', ->
      expect(@error).not.to.exist
