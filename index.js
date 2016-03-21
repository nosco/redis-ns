var util = require('util');
var redis = require('ioredis');
var _ = require('lodash');

var RedisNS = function(namespace, redisClient) {
  var self = this;
  _.extend(self, redisClient);
  self.namespace = namespace;
  self.redisClient = redisClient;


  // Take care of pub/sub messages
  self.on = function(event, callback) {
    if(event !== 'message'){
      return redisClient.on(event, callback);
    }

    redisClient.on('message', function(namespacedChannel, message){
      channel = namespacedChannel.replace(self.namespace+':', '');
      callback(channel, message);
    });

  };

  self['append'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['append'].apply(self.redisClient, arguments);
  };

  self['bitcount'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['bitcount'].apply(self.redisClient, arguments);
  };

  self['bitop'] = function() {
    for(var i=1 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['bitop'].apply(self.redisClient, arguments);
  };

  self['blpop'] = function() {
    for(var i=0 ; i < (arguments.length-1) ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['blpop'].apply(self.redisClient, arguments);
  };

  self['brpop'] = function() {
    for(var i=0 ; i < (arguments.length-2) ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['brpop'].apply(self.redisClient, arguments);
  };

  self['brpoplpush'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    arguments[1] = self.namespace + ':' + arguments[1];
    return self.redisClient['brpoplpush'].apply(self.redisClient, arguments);
  };

  self['debug object'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['debug object'].apply(self.redisClient, arguments);
  };

  self['decr'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['decr'].apply(self.redisClient, arguments);
  };

  self['decrby'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['decrby'].apply(self.redisClient, arguments);
  };

  self['del'] = function() {
    for(var i=0 ; i < arguments.length; i++) {
      if(typeof arguments[i] === 'function'){
        break;
      }
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['del'].apply(self.redisClient, arguments);
  };

  self['dump'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['dump'].apply(self.redisClient, arguments);
  };

  self['eval'] = function() {
    for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['eval'].apply(self.redisClient, arguments);
  };

  self['evalsha'] = function() {
    for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['evalsha'].apply(self.redisClient, arguments);
  };

  self['exists'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['exists'].apply(self.redisClient, arguments);
  };

  self['expire'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['expire'].apply(self.redisClient, arguments);
  };

  self['expireat'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['expireat'].apply(self.redisClient, arguments);
  };

  self['get'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['get'].apply(self.redisClient, arguments);
  };

  self['getbit'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['getbit'].apply(self.redisClient, arguments);
  };

  self['getrange'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['getrange'].apply(self.redisClient, arguments);
  };

  self['getset'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['getset'].apply(self.redisClient, arguments);
  };

  self['hdel'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hdel'].apply(self.redisClient, arguments);
  };

  self['hexists'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hexists'].apply(self.redisClient, arguments);
  };

  self['hget'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hget'].apply(self.redisClient, arguments);
  };

  self['hgetall'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hgetall'].apply(self.redisClient, arguments);
  };

  self['hincrby'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hincrby'].apply(self.redisClient, arguments);
  };

  self['hincrbyfloat'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hincrbyfloat'].apply(self.redisClient, arguments);
  };

  self['hkeys'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hkeys'].apply(self.redisClient, arguments);
  };

  self['hlen'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hlen'].apply(self.redisClient, arguments);
  };

  self['hmget'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hmget'].apply(self.redisClient, arguments);
  };

  self['hmset'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hmset'].apply(self.redisClient, arguments);
  };

  self['hset'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hset'].apply(self.redisClient, arguments);
  };

  self['hsetnx'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hsetnx'].apply(self.redisClient, arguments);
  };

  self['hvals'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['hvals'].apply(self.redisClient, arguments);
  };

  self['incr'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['incr'].apply(self.redisClient, arguments);
  };

  self['incrby'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['incrby'].apply(self.redisClient, arguments);
  };

  self['incrbyfloat'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['incrbyfloat'].apply(self.redisClient, arguments);
  };

  self['keys'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['keys'].apply(self.redisClient, arguments);
  };

  self['lindex'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lindex'].apply(self.redisClient, arguments);
  };

  self['linsert'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['linsert'].apply(self.redisClient, arguments);
  };

  self['llen'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['llen'].apply(self.redisClient, arguments);
  };

  self['lpop'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lpop'].apply(self.redisClient, arguments);
  };

  self['lpush'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lpush'].apply(self.redisClient, arguments);
  };

  self['lpushx'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lpushx'].apply(self.redisClient, arguments);
  };

  self['lrange'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lrange'].apply(self.redisClient, arguments);
  };

  self['lrem'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lrem'].apply(self.redisClient, arguments);
  };

  self['lset'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['lset'].apply(self.redisClient, arguments);
  };

  self['ltrim'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['ltrim'].apply(self.redisClient, arguments);
  };

  self['mget'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['mget'].apply(self.redisClient, arguments);
  };

  self['migrate'] = function() {
    arguments[2] = self.namespace + ':' + arguments[2];
    return self.redisClient['migrate'].apply(self.redisClient, arguments);
  };

  self['move'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['move'].apply(self.redisClient, arguments);
  };

  self['mset'] = function() {
    for(var i=0 ; i < arguments.length ; i+=2) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['mset'].apply(self.redisClient, arguments);
  };

  self['msetnx'] = function() {
    for(var i=0 ; i < arguments.length ; i+=2) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['msetnx'].apply(self.redisClient, arguments);
  };

  self['persist'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['persist'].apply(self.redisClient, arguments);
  };

  self['pexpire'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['pexpire'].apply(self.redisClient, arguments);
  };

  self['pexpireat'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['pexpireat'].apply(self.redisClient, arguments);
  };

  self['psetex'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['psetex'].apply(self.redisClient, arguments);
  };

  self['psubscribe'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['psubscribe'].apply(self.redisClient, arguments);
  };

  self['pttl'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['pttl'].apply(self.redisClient, arguments);
  };

  self['publish'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['publish'].apply(self.redisClient, arguments);
  };

  self['punsubscribe'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['punsubscribe'].apply(self.redisClient, arguments);
  };

  self['rename'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    arguments[1] = self.namespace + ':' + arguments[1];
    return self.redisClient['rename'].apply(self.redisClient, arguments);
  };

  self['renamenx'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    arguments[1] = self.namespace + ':' + arguments[1];
    return self.redisClient['renamenx'].apply(self.redisClient, arguments);
  };

  self['restore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['restore'].apply(self.redisClient, arguments);
  };

  self['rpop'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['rpop'].apply(self.redisClient, arguments);
  };

  self['rpoplpush'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    arguments[1] = self.namespace + ':' + arguments[1];
    return self.redisClient['rpoplpush'].apply(self.redisClient, arguments);
  };

  self['rpush'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['rpush'].apply(self.redisClient, arguments);
  };

  self['rpushx'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['rpushx'].apply(self.redisClient, arguments);
  };

  self['sadd'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['sadd'].apply(self.redisClient, arguments);
  };

  self['scard'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['scard'].apply(self.redisClient, arguments);
  };

  self['sdiff'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sdiff'].apply(self.redisClient, arguments);
  };

  self['sdiffstore'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sdiffstore'].apply(self.redisClient, arguments);
  };

  self['set'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['set'].apply(self.redisClient, arguments);
  };

  self['setbit'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['setbit'].apply(self.redisClient, arguments);
  };

  self['setex'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['setex'].apply(self.redisClient, arguments);
  };

  self['setnx'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['setnx'].apply(self.redisClient, arguments);
  };

  self['setrange'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['setrange'].apply(self.redisClient, arguments);
  };

  self['sinter'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sinter'].apply(self.redisClient, arguments);
  };

  self['sinterstore'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sinterstore'].apply(self.redisClient, arguments);
  };

  self['sismember'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['sismember'].apply(self.redisClient, arguments);
  };

  self['smembers'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['smembers'].apply(self.redisClient, arguments);
  };

  self['smove'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    arguments[1] = self.namespace + ':' + arguments[1];
    return self.redisClient['smove'].apply(self.redisClient, arguments);
  };

  self['sort'] = function() {
    // self one probably needs some work!...
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['sort'].apply(self.redisClient, arguments);
  };

  self['spop'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['spop'].apply(self.redisClient, arguments);
  };

  self['srandmember'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['srandmember'].apply(self.redisClient, arguments);
  };

  self['srem'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['srem'].apply(self.redisClient, arguments);
  };

  self['strlen'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['strlen'].apply(self.redisClient, arguments);
  };

  self['subscribe'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['subscribe'].apply(self.redisClient, arguments);
  };

  self['sunion'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sunion'].apply(self.redisClient, arguments);
  };

  self['sunionstore'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['sunionstore'].apply(self.redisClient, arguments);
  };

  self['ttl'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['ttl'].apply(self.redisClient, arguments);
  };

  self['type'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['type'].apply(self.redisClient, arguments);
  };

  self['unsubscribe'] = function() {
    if(arguments.length > 0) {
      for(var i=0 ; i < arguments.length ; i++) {
        arguments[i] = self.namespace + ':' + arguments[i];
      }
    }
    return self.redisClient['unsubscribe'].apply(self.redisClient, arguments);
  };

  self['watch'] = function() {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['watch'].apply(self.redisClient, arguments);
  };

  self['zadd'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zadd'].apply(self.redisClient, arguments);
  };

  self['zcard'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zcard'].apply(self.redisClient, arguments);
  };

  self['zcount'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zcount'].apply(self.redisClient, arguments);
  };

  self['zincrby'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zincrby'].apply(self.redisClient, arguments);
  };

  self['zinterstore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['zinterstore'].apply(self.redisClient, arguments);
  };

  self['zrange'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrange'].apply(self.redisClient, arguments);
  };

  self['zrangebyscore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrangebyscore'].apply(self.redisClient, arguments);
  };

  self['zrank'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrank'].apply(self.redisClient, arguments);
  };

  self['zrem'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrem'].apply(self.redisClient, arguments);
  };

  self['zremrangebyrank'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zremrangebyrank'].apply(self.redisClient, arguments);
  };

  self['zremrangebyscore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zremrangebyscore'].apply(self.redisClient, arguments);
  };

  self['zrevrange'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrevrange'].apply(self.redisClient, arguments);
  };

  self['zrevrangebyscore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrevrangebyscore'].apply(self.redisClient, arguments);
  };

  self['zrevrank'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zrevrank'].apply(self.redisClient, arguments);
  };

  self['zscore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    return self.redisClient['zscore'].apply(self.redisClient, arguments);
  };

  self['zunionstore'] = function() {
    arguments[0] = self.namespace + ':' + arguments[0];
    for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
      arguments[i] = self.namespace + ':' + arguments[i];
    }
    return self.redisClient['zunionstore'].apply(self.redisClient, arguments);
  };
};

module.exports = RedisNS;
