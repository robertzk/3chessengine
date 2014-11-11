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
