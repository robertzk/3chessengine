
/*
Example of embedding the CoffeeScript REPL, strikingly similar to the Node REPL.
 */

(function() {
  var r, repl;

  repl = require('../repl');

  console.log('Custom REPL! Type `sayHi()` to see what it does!');

  r = repl.start({
    prompt: 'my-repl> '
  });

  r.context.sayHi = function() {
    return console.log('Hello');
  };

  r.on('exit', function() {
    console.log('Bye!');
    return process.exit();
  });

}).call(this);
