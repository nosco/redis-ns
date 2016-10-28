var util = require('util');
var redis = require('redis');

var RedisNS = function(namespace, redisClient) {
  var self = this;

  this.namespace = namespace;
  var namespaceRE = new RegExp('^' + namespace + ':');
  this.redisClient = redisClient;

  // "inherit" missing functions from redisClient
  for(var i in redisClient) {
    if(typeof this[i] !== 'function') {
      this[i] = redisClient[i];
    }
  }

  // Take care of pub/sub messages.
  redisClient.emit = function(eventType) {
    if(eventType === 'message' && arguments.length === 3) {
      // WARNING: This is currently broken, messages are being published in all
      // namespaces, hence this check, and the adding of the namespace to the
      // message itself so that subscribers can filter out messages not for them
      var channel = arguments[1].replace(namespaceRE, '');
      if (channel === arguments[1]) {
        // This would be a message from a different namespace.
        return;
      }
      arguments[1] = channel;
      arguments[2] = JSON.parse(arguments[2]);
      arguments[2].namespace = namespace;
    }
    redis.RedisClient.prototype.emit.apply(this, arguments);
  };
};
util.inherits(RedisNS, redis.RedisClient);
module.exports = RedisNS;

RedisNS.prototype['append'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['append'].apply(this.redisClient, arguments);
};

RedisNS.prototype['bitcount'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['bitcount'].apply(this.redisClient, arguments);
};

RedisNS.prototype['bitop'] = function() {
  for(var i=1 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['bitop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['blpop'] = function() {
  for(var i=0 ; i < (arguments.length-1) ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['blpop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['brpop'] = function() {
  for(var i=0 ; i < (arguments.length-1) ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['brpop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['brpoplpush'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = this.namespace + ':' + arguments[1];
  return this.redisClient['brpoplpush'].apply(this.redisClient, arguments);
};

RedisNS.prototype['debug object'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['debug object'].apply(this.redisClient, arguments);
};

RedisNS.prototype['decr'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['decr'].apply(this.redisClient, arguments);
};

RedisNS.prototype['decrby'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['decrby'].apply(this.redisClient, arguments);
};

RedisNS.prototype['del'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['del'].apply(this.redisClient, arguments);
};

RedisNS.prototype['dump'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['dump'].apply(this.redisClient, arguments);
};

RedisNS.prototype['eval'] = function() {
  for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['eval'].apply(this.redisClient, arguments);
};

RedisNS.prototype['evalsha'] = function() {
  for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['evalsha'].apply(this.redisClient, arguments);
};

RedisNS.prototype['exists'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['exists'].apply(this.redisClient, arguments);
};

RedisNS.prototype['expire'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['expire'].apply(this.redisClient, arguments);
};

RedisNS.prototype['expireat'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['expireat'].apply(this.redisClient, arguments);
};

RedisNS.prototype['get'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['get'].apply(this.redisClient, arguments);
};

RedisNS.prototype['getbit'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['getbit'].apply(this.redisClient, arguments);
};

RedisNS.prototype['getrange'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['getrange'].apply(this.redisClient, arguments);
};

RedisNS.prototype['getset'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['getset'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hdel'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hdel'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hexists'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hexists'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hget'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hget'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hgetall'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hgetall'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hincrby'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hincrby'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hincrbyfloat'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hincrbyfloat'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hkeys'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hkeys'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hlen'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hlen'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hmget'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hmget'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hmset'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hmset'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hset'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hset'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hsetnx'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hsetnx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['hvals'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['hvals'].apply(this.redisClient, arguments);
};

RedisNS.prototype['incr'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['incr'].apply(this.redisClient, arguments);
};

RedisNS.prototype['incrby'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['incrby'].apply(this.redisClient, arguments);
};

RedisNS.prototype['incrbyfloat'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['incrbyfloat'].apply(this.redisClient, arguments);
};

RedisNS.prototype['keys'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['keys'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lindex'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lindex'].apply(this.redisClient, arguments);
};

RedisNS.prototype['linsert'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['linsert'].apply(this.redisClient, arguments);
};

RedisNS.prototype['llen'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['llen'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lpop'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lpop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lpush'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lpush'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lpushx'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lpushx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lrange'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lrange'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lrem'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lrem'].apply(this.redisClient, arguments);
};

RedisNS.prototype['lset'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['lset'].apply(this.redisClient, arguments);
};

RedisNS.prototype['ltrim'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['ltrim'].apply(this.redisClient, arguments);
};

RedisNS.prototype['mget'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['mget'].apply(this.redisClient, arguments);
};

RedisNS.prototype['migrate'] = function() {
  arguments[2] = this.namespace + ':' + arguments[2];
  return this.redisClient['migrate'].apply(this.redisClient, arguments);
};

RedisNS.prototype['move'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['move'].apply(this.redisClient, arguments);
};

RedisNS.prototype['mset'] = function() {
  for(var i=0 ; i < arguments.length ; i+=2) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['mset'].apply(this.redisClient, arguments);
};

RedisNS.prototype['msetnx'] = function() {
  for(var i=0 ; i < arguments.length ; i+=2) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['msetnx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['persist'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['persist'].apply(this.redisClient, arguments);
};

RedisNS.prototype['pexpire'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['pexpire'].apply(this.redisClient, arguments);
};

RedisNS.prototype['pexpireat'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['pexpireat'].apply(this.redisClient, arguments);
};

RedisNS.prototype['psetex'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['psetex'].apply(this.redisClient, arguments);
};

RedisNS.prototype['psubscribe'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['psubscribe'].apply(this.redisClient, arguments);
};

RedisNS.prototype['pttl'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['pttl'].apply(this.redisClient, arguments);
};

RedisNS.prototype['publish'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = JSON.stringify(arguments[1]);
  return this.redisClient['publish'].apply(this.redisClient, arguments);
};

RedisNS.prototype['punsubscribe'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['punsubscribe'].apply(this.redisClient, arguments);
};

RedisNS.prototype['rename'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = this.namespace + ':' + arguments[1];
  return this.redisClient['rename'].apply(this.redisClient, arguments);
};

RedisNS.prototype['renamenx'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = this.namespace + ':' + arguments[1];
  return this.redisClient['renamenx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['restore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['restore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['rpop'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['rpop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['rpoplpush'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = this.namespace + ':' + arguments[1];
  return this.redisClient['rpoplpush'].apply(this.redisClient, arguments);
};

RedisNS.prototype['rpush'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['rpush'].apply(this.redisClient, arguments);
};

RedisNS.prototype['rpushx'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['rpushx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sadd'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['sadd'].apply(this.redisClient, arguments);
};

RedisNS.prototype['scard'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['scard'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sdiff'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sdiff'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sdiffstore'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sdiffstore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['set'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['set'].apply(this.redisClient, arguments);
};

RedisNS.prototype['setbit'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['setbit'].apply(this.redisClient, arguments);
};

RedisNS.prototype['setex'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['setex'].apply(this.redisClient, arguments);
};

RedisNS.prototype['setnx'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['setnx'].apply(this.redisClient, arguments);
};

RedisNS.prototype['setrange'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['setrange'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sinter'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sinter'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sinterstore'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sinterstore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sismember'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['sismember'].apply(this.redisClient, arguments);
};

RedisNS.prototype['smembers'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['smembers'].apply(this.redisClient, arguments);
};

RedisNS.prototype['smove'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  arguments[1] = this.namespace + ':' + arguments[1];
  return this.redisClient['smove'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sort'] = function() {
  // This one probably needs some work!...
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['sort'].apply(this.redisClient, arguments);
};

RedisNS.prototype['spop'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['spop'].apply(this.redisClient, arguments);
};

RedisNS.prototype['srandmember'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['srandmember'].apply(this.redisClient, arguments);
};

RedisNS.prototype['srem'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['srem'].apply(this.redisClient, arguments);
};

RedisNS.prototype['strlen'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['strlen'].apply(this.redisClient, arguments);
};

RedisNS.prototype['subscribe'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['subscribe'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sunion'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sunion'].apply(this.redisClient, arguments);
};

RedisNS.prototype['sunionstore'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['sunionstore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['ttl'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['ttl'].apply(this.redisClient, arguments);
};

RedisNS.prototype['type'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['type'].apply(this.redisClient, arguments);
};

RedisNS.prototype['unsubscribe'] = function() {
  if(arguments.length > 0) {
    for(var i=0 ; i < arguments.length ; i++) {
      arguments[i] = this.namespace + ':' + arguments[i];
    }
  }
  return this.redisClient['unsubscribe'].apply(this.redisClient, arguments);
};

RedisNS.prototype['watch'] = function() {
  for(var i=0 ; i < arguments.length ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['watch'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zadd'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zadd'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zcard'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zcard'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zcount'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zcount'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zincrby'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zincrby'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zinterstore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['zinterstore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrange'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrange'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrangebyscore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrangebyscore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrank'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrank'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrem'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrem'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zremrangebyrank'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zremrangebyrank'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zremrangebyscore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zremrangebyscore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrevrange'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrevrange'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrevrangebyscore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrevrangebyscore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zrevrank'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zrevrank'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zscore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  return this.redisClient['zscore'].apply(this.redisClient, arguments);
};

RedisNS.prototype['zunionstore'] = function() {
  arguments[0] = this.namespace + ':' + arguments[0];
  for(var i=2, lastKeyIndex = (parseInt(arguments[1])+1) ; i <= lastKeyIndex ; i++) {
    arguments[i] = this.namespace + ':' + arguments[i];
  }
  return this.redisClient['zunionstore'].apply(this.redisClient, arguments);
};

