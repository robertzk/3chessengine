(function() {
  $('body').click(function(e) {
    return $('.box').fadeIn('fast').addClass('.active');
  }).css('background', 'white');

}).call(this);
