(function() {
  var Person, tim;

  Person = (function() {
    function Person(options) {
      this.name = options.name, this.age = options.age, this.height = options.height;
    }

    return Person;

  })();

  tim = new Person({
    age: 4
  });

}).call(this);
