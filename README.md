[![NPM version](https://badge.fury.io/js/redis-ns.png)](http://badge.fury.io/js/redis-ns)

# redis-ns

This module enables you to create Redis namespaces.

Example usage:

	var redis = require('redis');
	var RedisNS = require('redis-ns');

	var redisClient = redis.createClient();

	var client = new RedisNS('MyNameSpace', redisClient);
	var client2 = new RedisNS('MyNameSpace2', redisClient);

	client.set('bla', 'yadda1');
	client.set('bla1', 'yadda1');

	client2.set('bla', 'yadda2');
	client2.set('bla2', 'yadda2');

The above will give you the following keys in Redis:

	"MyNameSpace:bla"
	"MyNameSpace:bla1"
	"MyNameSpace2:bla"
	"MyNameSpace2:bla2"

You can leave out the connection paramater, to create a new connection:

	var client = new RedisNS('MyNameSpace');


### This is an early BETA version

As soon as the module has shown it's worth and stability on a live system, it will be marked as version >= 1.0.0.

Until then: Feel free to play around with it, learn from it.

### To install

	npm install redis-ns


[![Build Status](https://travis-ci.org/octoblu/redis-ns.svg?branch=master)](https://travis-ci.org/octoblu/redis-ns)
[![Code Climate](https://codeclimate.com/github/octoblu/redis-ns/badges/gpa.svg)](https://codeclimate.com/github/octoblu/redis-ns)
[![Test Coverage](https://codeclimate.com/github/octoblu/redis-ns/badges/coverage.svg)](https://codeclimate.com/github/octoblu/redis-ns)
[![npm version](https://badge.fury.io/js/redis-ns.svg)](http://badge.fury.io/js/redis-ns)
[![Gitter](https://badges.gitter.im/octoblu/help.svg)](https://gitter.im/octoblu/help)
