(function() {
  var merge_sort;

  merge_sort = function(list) {
    var left, pivot, result, right;
    if (list.length === 1) {
      return list;
    }
    pivot = Math.floor(list.length / 2);
    left = merge_sort(list.slice(0, pivot));
    right = merge_sort(list.slice(pivot));
    result = (function() {
      var _results;
      _results = [];
      while (left.length && right.length) {
        if (left[0] < right[0]) {
          _results.push(left.shift());
        } else {
          _results.push(right.shift());
        }
      }
      return _results;
    })();
    return result.concat(left).concat(right);
  };

  console.log(merge_sort([3, 2, 1]).join(' ') === '1 2 3');

  console.log(merge_sort([9, 2, 7, 0, 1]).join(' ') === '0 1 2 7 9');

}).call(this);
