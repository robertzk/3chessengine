// http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
clone = function(obj, except) {
    if (except == null) except = []
    if (null == obj || "object" != typeof obj) {
      if (obj instanceof Array) {
        newarr = [];
        for (el in obj) newarr.push(clone(el));
        return newarr;
      }
      return obj;
    }
    var copy = obj.constructor();
    if (copy) {
      for (var attr in obj) {
          if (attr in except) continue;
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
    }
    return copy;
}

module.exports = clone;
