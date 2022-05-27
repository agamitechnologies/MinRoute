'use strict';

function Cache () {
  var cacheObj = Object.create(null);
  this.put = function(key, value) {
    var record = {
      value: value,
    };
    cacheObj[key] = record;
    return value;
  };

  this.get = function(key) {
        return cacheObj[key].value;
  };
}

module.exports = new Cache();
module.exports.Cache = Cache;