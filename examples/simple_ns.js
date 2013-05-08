var redis = require('redis');
var RedisNS = require('../index.js');

var redisClient = redis.createClient();

var client = new RedisNS('MyNameSpace', redisClient);
var client2 = new RedisNS('MyNameSpace2', redisClient);

client.set('bla', 'yadda1');
client.set('bla1', 'yadda1');

client2.set('bla', 'yadda2');
client2.set('bla2', 'yadda2');
