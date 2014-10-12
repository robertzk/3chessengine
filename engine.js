//built with clientside 0.5.1 https://github.com/jgallen23/clientside
if (typeof __cs == 'undefined') {
  var __cs = { 
    map: {}, 
    libs: {},
    r: function(p) {
      var mod = __cs.libs[__cs.map[p]];
      if (!mod) {
        throw new Error(p + ' not found');
      }
      return mod;
    }
  };
  window.require = __cs.r;
}
__cs.map['./engine/pieces/king'] = 'cs852f3f85';
__cs.map['./engine/pieces/queen'] = 'cs591948df';
__cs.map['./engine/pieces/rook'] = 'cs50ac7fdb';
__cs.map['./engine/pieces/bishop'] = 'cs5f8b3ecd';
__cs.map['./engine/pieces/knight'] = 'csefeb9072';
__cs.map['./engine/pieces/pawn'] = 'cs4379d23b';
__cs.map['./engine/board'] = 'cs07b02b0c';
__cs.map['./piece'] = 'cs6b44f638';
__cs.map['./octopus'] = 'csb79f58b0';
__cs.map['./clone'] = 'cs9a6a87bb';
__cs.map['./pieces/piece'] = 'cs6b44f638';
__cs.map['./pieces/king'] = 'cs852f3f85';
__cs.map['./pieces/queen'] = 'cs591948df';
__cs.map['./pieces/rook'] = 'cs50ac7fdb';
__cs.map['./pieces/bishop'] = 'cs5f8b3ecd';
__cs.map['./pieces/knight'] = 'csefeb9072';
__cs.map['./pieces/pawn'] = 'cs4379d23b';
__cs.map['./util'] = 'cs4dddfcc0';
__cs.map['underscore'] = 'cs7bbaf501';

//underscore.js
__cs.libs.cs7bbaf501 = (function(require, module, exports) {
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
  // Baseline setup
  // --------------
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;
  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;
  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;
  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;
  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  // Current version.
  _.VERSION = '1.7.0';
  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };
  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };
  // Collection Functions
  // --------------------
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };
  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
  var reduceError = 'Reduce of empty array with no initial value';
  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };
  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };
  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };
  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };
  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };
  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };
  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };
  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };
  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };
  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };
  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };
  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };
  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };
  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };
  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };
  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };
  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });
  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });
  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });
  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };
  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };
  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };
  // Array Functions
  // ---------------
  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };
  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };
  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };
  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };
  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };
  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };
  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };
  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };
  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };
  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };
  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };
  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };
  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };
  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };
  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };
  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  };
  // Function (ahem) Functions
  // ------------------
  // Reusable constructor function for prototype setting.
  var Ctor = function(){};
  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };
  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };
  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };
  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };
  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };
  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };
  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };
  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };
  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };
  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);
  // Object Functions
  // ----------------
  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };
  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };
  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };
  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };
  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };
  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };
   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };
  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };
  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };
  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };
  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };
  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };
  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };
  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };
  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };
  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });
  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }
  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }
  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };
  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };
  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };
  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };
  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };
  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };
  // Utility Functions
  // -----------------
  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };
  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };
  _.constant = function(value) {
    return function() {
      return value;
    };
  };
  _.noop = function(){};
  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };
  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };
  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };
  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };
   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);
  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);
  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };
  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };
  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };
  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;
  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };
  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);
    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');
    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;
      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";
    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';
    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }
    var template = function(data) {
      return render.call(this, data, _);
    };
    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
  };
  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };
  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };
  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };
  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);
  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });
  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });
  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };
  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
return module.exports || exports;
})(__cs.r, {}, {});

//util.js
__cs.libs.cs4dddfcc0 = (function(require, module, exports) {
(function() {
  var all_in, same_moves, _;
  _ = require('underscore')._;
  all_in = function(a, b) {
    var el, x;
    return _.all((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        el = a[_i];
        _results.push(_.some((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = b.length; _j < _len1; _j++) {
            x = b[_j];
            _results1.push(x[0] === el[0] && x[1] === el[1]);
          }
          return _results1;
        })()));
      }
      return _results;
    })());
  };
  same_moves = function(a, b) {
    return all_in(a, b) && all_in(b, a);
  };
  module.exports = {
    same_moves: same_moves,
    all_in: all_in
  };
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//piece.js
__cs.libs.cs6b44f638 = (function(require, module, exports) {
(function() {
  var Piece, all_in,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  all_in = require('./util').all_in;
  Piece = (function() {
    function Piece(opts) {
      if (!arguments.length) {
        return this;
      }
      this.assign_color(opts);
      this.assign_board(opts);
      this.assign_position(opts);
    }
    Piece.prototype.moves = function() {
      return [];
    };
    Piece.prototype.filter_checks = function(moves, depth) {
      var bad, color, king, move, ok_moves, piece, vb, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      if (depth == null) {
        depth = 0;
      }
      if (!depth) {
        return moves;
      }
      ok_moves = [];
      for (_i = 0, _len = moves.length; _i < _len; _i++) {
        move = moves[_i];
        vb = this.board.virtual_board();
        vb.move_piece(this.x(), this.y(), move[0], move[1]);
        if (this.type === 'king') {
          x = move[0];
          y = move[1];
        } else {
          king = vb.king(this.color);
          if (!king) {
            ok_moves = moves;
            break;
          }
          x = king.x();
          y = king.y();
        }
        bad = false;
        _ref = vb.colors;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          color = _ref[_j];
          if (color !== this.color) {
            _ref1 = vb.get_pieces(color);
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              piece = _ref1[_k];
              if (piece.type !== 'pawn') {
                if (all_in([[x, y]], piece.moves(depth))) {
                  bad = true;
                  break;
                }
              }
            }
          }
        }
        if (!bad) {
          ok_moves.push(move);
        }
      }
      return ok_moves;
    };
    Piece.prototype.assign_color = function(opts) {
      var color, colors;
      if (!('color' in opts)) {
        throw "Please provide a piece color";
      }
      color = opts.color.toLowerCase();
      if (__indexOf.call(colors = ['white', 'black', 'grey'], color) < 0) {
        throw "Piece color must be one of " + (colors.join(', '));
      }
      return this.color = color;
    };
    Piece.prototype.assign_board = function(opts) {
      var _ref;
      if (!('board' in opts)) {
        throw "Please provide a board";
      }
      if (((_ref = opts.board) != null ? _ref.__class : void 0) !== 'Board') {
        throw "Specified 'board' is not a Board";
      }
      return this.board = opts.board;
    };
    Piece.prototype.assign_position = function(opts) {
      if (!('position' in opts)) {
        throw "Please provide a position";
      }
      if (!(opts.position instanceof Array && opts.position.length === 2)) {
        throw "Position must be an array of two integers.";
      }
      this.position = opts.position;
      return this.board.board[this.position[0]][this.position[1]] = this;
    };
    Piece.prototype.x = function() {
      return this.position[0];
    };
    Piece.prototype.y = function() {
      return this.position[1];
    };
    Piece.prototype.move_to = function(new_x, new_y) {
      var _i, _results;
      new_x = (new_x + 24) % 24;
      if (__indexOf.call((function() {
        _results = [];
        for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
        return _results;
      }).apply(this), new_x) < 0) {
        throw "Invalid new_x";
      }
      if (__indexOf.call([0, 1, 2, 3, 4, 5], new_y) < 0) {
        throw "Invalid new_y";
      }
      this.board.board[new_x][new_y] = this;
      this.board.board[this.x()][this.y()] = null;
      return this.position = [new_x, new_y];
    };
    return Piece;
  })();
  module.exports = Piece;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//octopus.js
__cs.libs.csb79f58b0 = (function(require, module, exports) {
(function() {
  var moves, normalize_position;
  normalize_position = function(old_x, old_y, x, y) {
    var diff_x, diff_y, has_piece, offset, out, same_color;
    if (y < 0) {
      return {
        can_move: false
      };
    }
    if (Math.abs(old_x - x) !== 1 && Math.abs(old_y - y) !== 1) {
      throw "Only adjacent moves supported";
    }
    diff_x = x - old_x;
    diff_y = y - old_y;
    x = (x + 24) % 24;
    old_x = (old_x + 24) % 24;
    out = {
      can_move: true,
      crossed_circle: false
    };
    if (y > 5) {
      offset = Math.abs(diff_x) + Math.abs(diff_y) === 2 ? 14 : 12;
      if (diff_x < 0) {
        x = old_x + (24 - offset);
        x %= 24;
      } else {
        x = old_x + offset;
        x %= 24;
      }
      y = 5;
      out.crossed_circle = true;
    }
    if (has_piece = this.board.has_piece_at(x, y)) {
      same_color = this.board.piece_at(x, y).color === this.color;
      out.can_move = !same_color;
    }
    out.final_move = has_piece;
    out.position = [x, y];
    return out;
  };
  moves = function(diagonal, axial, one_step) {
    if (one_step == null) {
      one_step = false;
    }
    return function(filter) {
      var dir, dirs, next_position, positions, prev_x, prev_y, tries, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      if (filter == null) {
        filter = 2;
      }
      positions = [];
      dirs = [];
      if (axial) {
        _ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          dirs.push(x);
        }
      }
      if (diagonal) {
        _ref1 = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          x = _ref1[_j];
          dirs.push(x);
        }
      }
      tries = [];
      for (_k = 0, _len2 = dirs.length; _k < _len2; _k++) {
        dir = dirs[_k];
        prev_x = this.x();
        prev_y = this.y();
        while (true) {
          _ref2 = [prev_x + dir[0], prev_y + dir[1]], x = _ref2[0], y = _ref2[1];
          next_position = normalize_position.call(this, prev_x, prev_y, x, y);
          tries.push([x, y]);
          if (!next_position.can_move) {
            break;
          }
          positions.push(next_position.position);
          if (next_position.crossed_circle) {
            dir[1] = -dir[1];
          }
          if (next_position.final_move || one_step) {
            break;
          }
          _ref3 = next_position.position, prev_x = _ref3[0], prev_y = _ref3[1];
        }
      }
      return this.filter_checks(positions, filter - 1);
    };
  };
  module.exports = moves;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//king.js
__cs.libs.cs852f3f85 = (function(require, module, exports) {
(function() {
  var King, Piece, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  octopus = require('./octopus');
  King = (function(_super) {
    __extends(King, _super);
    function King(opts) {
      King.__super__.constructor.apply(this, arguments);
      this.type = 'king';
    }
    King.prototype.moves = octopus(true, true, true);

    /*
     * If a king has moved, it can no longer castle.
     * We must record this somehow, simply as a boolean flag.
     */
    King.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };
    return King;
  })(Piece);
  module.exports = King;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//queen.js
__cs.libs.cs591948df = (function(require, module, exports) {
(function() {
  var Piece, Queen, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  octopus = require('./octopus');
  Queen = (function(_super) {
    __extends(Queen, _super);
    function Queen(opts) {
      Queen.__super__.constructor.apply(this, arguments);
      this.type = 'queen';
    }
    Queen.prototype.moves = octopus(true, true);
    return Queen;
  })(Piece);
  module.exports = Queen;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//rook.js
__cs.libs.cs50ac7fdb = (function(require, module, exports) {
(function() {
  var Piece, Rook, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  octopus = require('./octopus');
  Rook = (function(_super) {
    __extends(Rook, _super);
    function Rook(opts) {
      Rook.__super__.constructor.apply(this, arguments);
      this.type = 'rook';
    }
    Rook.prototype.moves = octopus(false, true);

    /*
     * If a rook has moved, it can no longer be used in conjunction with castling.
     * We must record this somehow, simply as a boolean flag.
     */
    Rook.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };
    return Rook;
  })(Piece);
  module.exports = Rook;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//bishop.js
__cs.libs.cs5f8b3ecd = (function(require, module, exports) {
(function() {
  var Bishop, Piece, octopus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  octopus = require('./octopus');
  Bishop = (function(_super) {
    __extends(Bishop, _super);
    function Bishop(opts) {
      Bishop.__super__.constructor.apply(this, arguments);
      this.type = 'bishop';
    }
    Bishop.prototype.moves = octopus(true, false);
    return Bishop;
  })(Piece);
  module.exports = Bishop;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//knight.js
__cs.libs.csefeb9072 = (function(require, module, exports) {
(function() {
  var Knight, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  Knight = (function(_super) {
    __extends(Knight, _super);
    function Knight(opts) {
      Knight.__super__.constructor.apply(this, arguments);
      this.type = 'knight';
    }
    Knight.prototype.normalize_position = function(x, y) {
      x += 24;
      if (y > 5) {
        x += 12;
      }
      if (y > 5) {
        y = 6 - (y % 5);
      }
      return [x % 24, !(y < 0) ? y : void 0];
    };

    /*
     * List the moves available to a knight (in an array of [x, y] positions).
     *
     * Recall that it can capture in L shapes all around the board.
     */
    Knight.prototype.moves = function(filter) {
      var d, positions, sign1, sign2, x, y, _i, _j, _k, _ref, _ref1;
      if (filter == null) {
        filter = 2;
      }
      positions = [];
      for (sign1 = _i = -1; _i <= 1; sign1 = _i += 2) {
        for (sign2 = _j = -1; _j <= 1; sign2 = _j += 2) {
          for (d = _k = 1; _k <= 2; d = ++_k) {
            _ref = this.normalize_position(this.x() + sign1 * d, this.y() + sign2 * (3 - d)), x = _ref[0], y = _ref[1];
            if ((y == null) || ((_ref1 = this.board.piece_at(x, y)) != null ? _ref1.color : void 0) === this.color) {
              continue;
            }
            positions.push([x, y]);
          }
        }
      }
      return this.filter_checks(positions, filter - 1);
    };
    return Knight;
  })(Piece);
  module.exports = Knight;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//pawn.js
__cs.libs.cs4379d23b = (function(require, module, exports) {
(function() {
  var Pawn, Piece,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  Piece = require('./piece');
  Pawn = (function(_super) {
    __extends(Pawn, _super);
    function Pawn(opts) {
      Pawn.__super__.constructor.apply(this, arguments);
      this.type = 'pawn';
      this.initialize_unmoved();
      this.initialize_direction();
    }

    /*
     * With pawns, we must be careful about the direction in which
     * they move forward. For example, if a pawn crosses the inner circle
     * it is moving "backward" in relation to the pawns that started on that
     * side, which are moving forward.
     *
     * To record this moving direction, we simply maintain the convention that
     * @towards_center = true implies the pawn is moving toward the center, and
     * @towards_center = false implies the pawn is moving away from the center.
     *
     * A pawn changes direction if and only if it crosses the center circle.
     */
    Pawn.prototype.initialize_direction = function() {
      return this.towards_center = true;
    };

    /*
     * If a pawn has moved, it can no longer skip 2 spaces nor capture en passent.
     * We must record this somehow, simply as a boolean flag.
     */
    Pawn.prototype.initialize_unmoved = function() {
      return this.unmoved = true;
    };

    /*
     * List the moves available to a pawn (in an array of [x, y] positions).
     *
     * Recall that it can capture to the sideways left and right, but only move
     * forward. Adjacent to the center, the pawn can cross the center, or 
     * capture along the same diagonal a bishop would be able to.
     */
    Pawn.prototype.moves = function(filter) {
      var moves;
      if (filter == null) {
        filter = 2;
      }
      moves = this.y() === 5 && this.towards_center ? this.center_moves() : this.noncenter_moves();
      return this.filter_checks(moves, filter - 1);
    };
    Pawn.prototype.center_moves = function() {
      var i, moves, _i, _len, _ref;
      moves = [];
      if (!this.board.has_piece_at((this.x() + 12) % 24, this.y())) {
        moves.push([(this.x() + 12) % 24, this.y()]);
      }
      _ref = [-1, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (this.board.has_piece_at((this.x() + 12 + 2 * i) % 24, this.y()) && this.board.piece_at((this.x() + 12 + 2 * i) % 24, this.y()).color !== this.color) {
          moves.push([(this.x() + 12 + 2 * i) % 24, this.y()]);
        }
      }
      return moves;
    };
    Pawn.prototype.noncenter_moves = function() {
      var delta, i, moves, _i, _len, _ref;
      moves = [];
      if (this.unmoved && !this.board.has_piece_at(this.x(), this.y() + 2) && !this.board.has_piece_at(this.x(), this.y() + 1)) {
        moves.push([this.x(), this.y() + 2]);
      }
      delta = this.towards_center ? 1 : -1;
      if (!this.board.has_piece_at(this.x(), this.y() + delta)) {
        moves.push([this.x(), this.y() + delta]);
      }
      _ref = [-1, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if ((this.board.has_piece_at(this.x() + i, this.y() + delta)) && (this.board.piece_at(this.x() + i, this.y() + delta).color !== this.color)) {
          moves.push([this.x() + i, this.y() + delta]);
        }
      }
      return moves;
    };
    Pawn.prototype.move_to = function(new_x, new_y) {
      var old_y, out;
      this.unmoved = false;
      old_y = this.y();
      out = Pawn.__super__.move_to.apply(this, arguments);
      if (old_y === 5 && new_y === 5) {
        this.towards_center = false;
      }
      return out;
    };
    return Pawn;
  })(Piece);
  module.exports = Pawn;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//clone.js
__cs.libs.cs9a6a87bb = (function(require, module, exports) {
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
return module.exports || exports;
})(__cs.r, {}, {});

//board.js
__cs.libs.cs07b02b0c = (function(require, module, exports) {
(function() {
  var Bishop, Board, King, Knight, Pawn, Piece, Queen, Rook, clone,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  clone = require('./clone');
  Piece = require('./pieces/piece');
  King = require('./pieces/king');
  Queen = require('./pieces/queen');
  Rook = require('./pieces/rook');
  Bishop = require('./pieces/bishop');
  Knight = require('./pieces/knight');
  Pawn = require('./pieces/pawn');
  Board = (function() {
    function Board(setup_pieces) {
      if (setup_pieces == null) {
        setup_pieces = true;
      }
      this.__class = 'Board';
      this.initialize_board();
      this.initialize_constants();
      if (setup_pieces) {
        this.initialize_pieces();
      }
    }
    Board.prototype.initialize_constants = function() {
      this.piece_map = {
        rook: Rook,
        knight: Knight,
        bishop: Bishop,
        king: King,
        queen: Queen,
        pawn: Pawn
      };
      return this.colors = ['white', 'black', 'grey'];
    };
    Board.prototype.initialize_board = function() {
      var $, _;
      return this.board = (function() {
        var _i, _results;
        _results = [];
        for ($ = _i = 0; _i <= 23; $ = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (_ = _j = 0; _j <= 5; _ = ++_j) {
              _results1.push(null);
            }
            return _results1;
          })());
        }
        return _results;
      })();
    };
    Board.prototype.initialize_pieces = function() {
      var color, _i, _len, _ref, _results;
      _ref = this.colors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        this.initialize_backrank(color);
        _results.push(this.initialize_pawns(color));
      }
      return _results;
    };
    Board.prototype.initialize_backrank = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      this.backrank_pieces || (this.backrank_pieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook]);
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new this.backrank_pieces[i]({
          color: color_name,
          board: this,
          position: [8 * color + i, 0]
        }));
      }
      return _results;
    };
    Board.prototype.initialize_pawns = function(color) {
      var color_name, i, _i, _ref, _results;
      _ref = [color, this.colors.indexOf(color)], color_name = _ref[0], color = _ref[1];
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(new Pawn({
          color: color_name,
          board: this,
          position: [8 * color + i, 1]
        }));
      }
      return _results;
    };
    Board.prototype.virtual_board = function() {
      var $, attr, board, clone_piece, _, _i, _j, _len, _len1, _ref;
      board = new Board(false);
      for (attr in this) {
        if (attr === 'board') {
          continue;
        }
        board[attr] = this[attr];
      }
      clone_piece = function(piece) {
        if (!piece) {
          return;
        }
        return new piece.constructor({
          color: piece.color,
          board: board,
          position: piece.position
        });
      };
      _ref = this.board;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        $ = _ref[_i];
        for (_j = 0, _len1 = $.length; _j < _len1; _j++) {
          _ = $[_j];
          clone_piece(_);
        }
      }
      return board;
    };
    Board.prototype.has_piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y] !== null;
    };
    Board.prototype.piece_at = function(x, y) {
      return this.board[(24 + x) % 24][y];
    };
    Board.prototype.place_piece = function(type, color, x, y) {
      var piece;
      type = this.piece_map[this.sanitize_type(type)];
      piece = new type({
        board: this,
        position: [x, y],
        color: this.sanitize_color(color)
      });
      this.board[(24 + x) % 24][y] = piece;
      return piece;
    };
    Board.prototype.move_piece = function(old_x, old_y, new_x, new_y) {
      old_x = (old_x + 24) % 24;
      if (!this.has_piece_at(old_x, old_y)) {
        throw "No piece at (" + old_x + ", " + old_y + ")";
      }
      return this.piece_at(old_x, old_y).move_to(new_x, new_y);
    };
    Board.prototype.remove_piece = function(x, y) {
      return this.board[x][y] = null;
    };
    Board.prototype.king = function(color) {
      var piece, x, y, _i, _j;
      for (x = _i = 0; _i <= 23; x = ++_i) {
        for (y = _j = 0; _j <= 5; y = ++_j) {
          piece = this.board[x][y];
          if (piece && piece.type === 'king' && piece.color === color) {
            return piece;
          }
        }
      }
    };
    Board.prototype.get_pieces = function(color) {
      var piece, pieces, x, y, _i, _j;
      pieces = [];
      for (x = _i = 0; _i <= 23; x = ++_i) {
        for (y = _j = 0; _j <= 5; y = ++_j) {
          piece = this.board[x][y];
          if (piece && piece.color === color) {
            pieces.push(piece);
          }
        }
      }
      return pieces;
    };
    Board.prototype.sanitize_type = function(type) {
      type = type.toLowerCase();
      if (!(type in this.piece_map)) {
        throw "Invalid piece type";
      }
      return type;
    };
    Board.prototype.sanitize_color = function(color) {
      color = color.toLowerCase();
      if (__indexOf.call(this.colors, color) < 0) {
        throw "Invalid color";
      }
      return color;
    };
    return Board;
  })();
  module.exports = Board;
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});

//index.js
__cs.libs.cs168726db = (function(require, module, exports) {
(function() {
  var Bishop, Board, King, Knight, Pawn, Queen, Rook;
  King = require('./engine/pieces/king');
  Queen = require('./engine/pieces/queen');
  Rook = require('./engine/pieces/rook');
  Bishop = require('./engine/pieces/bishop');
  Knight = require('./engine/pieces/knight');
  Pawn = require('./engine/pieces/pawn');
  Board = require('./engine/board');
  module.exports = {
    King: King,
    Queen: Queen,
    Rook: Rook,
    Bishop: Bishop,
    Knight: Knight,
    Pawn: Pawn,
    Board: Board
  };
}).call(this);
return module.exports || exports;
})(__cs.r, {}, {});


window.ThreeChessEngine = __cs.libs.cs168726db; 
