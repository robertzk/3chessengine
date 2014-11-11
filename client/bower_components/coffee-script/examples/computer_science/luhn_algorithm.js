(function() {
  var is_valid_identifier;

  is_valid_identifier = function(identifier) {
    var alt, c, num, sum, _i;
    sum = 0;
    alt = false;
    for (_i = identifier.length - 1; _i >= 0; _i += -1) {
      c = identifier[_i];
      num = parseInt(c, 10);
      if (isNaN(num)) {
        return false;
      }
      if (alt) {
        num *= 2;
        if (num > 9) {
          num = (num % 10) + 1;
        }
      }
      alt = !alt;
      sum += num;
    }
    return sum % 10 === 0;
  };

  console.log(is_valid_identifier("49927398716") === true);

  console.log(is_valid_identifier("4408041234567893") === true);

  console.log(is_valid_identifier("4408041234567890") === false);

}).call(this);
