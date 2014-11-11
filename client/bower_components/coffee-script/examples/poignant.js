(function() {
  var Creature, LotteryDraw, LotteryTicket, WishScanner, food, idea, idea_name, wipe_mutterings_from, _i, _len, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = ['toast', 'wine', 'cheese'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    food = _ref[_i];
    print(food.capitalize());
  }

  LotteryTicket = {
    get_picks: function() {
      return this.picks;
    },
    set_picks: function(picks) {
      this.picks = picks;
    },
    get_purchased: function() {
      return this.purchase;
    },
    set_purchased: function(purchased) {
      this.purchased = purchased;
    }
  };

  LotteryDraw = {
    play: function() {
      var buyer, result, score, ticket, ticketList, winners, _j, _len1, _ref1;
      result = LotteryTicket.new_random();
      winners = {};
      _ref1 = this.tickets;
      for (buyer in _ref1) {
        ticketList = _ref1[buyer];
        for (_j = 0, _len1 = ticketList.length; _j < _len1; _j++) {
          ticket = ticketList[_j];
          if ((score = ticket.score(result)) !== 0) {
            (winners[buyer] || (winners[buyer] = [])).push([ticket, score]);
          }
        }
      }
      this.tickets = {};
      return winners;
    }
  };

  WishScanner = {
    scan_for_a_wish: function() {
      var wish;
      wish = this.read().detect(function(thought) {
        return thought.indexOf('wish: ') === 0;
      });
      return wish.replace('wish: ', '');
    }
  };

  Creature = {
    hit: function(damage) {
      var p_up;
      p_up = Math.rand(this.charisma);
      if (p_up % 9 === 7) {
        this.life += p_up / 4;
        console.log("[" + this.name + " magick powers up " + p_up + "!]");
      }
      this.life -= damage;
      if (this.life <= 0) {
        return console.log("[" + this.name + " has died.]");
      }
    },
    fight: function(enemy, weapon) {
      var enemy_hit, your_hit;
      if (this.life <= 0) {
        return console.log("[" + this.name + " is too dead to fight!]");
      }
      your_hit = Math.rand(this.strength + weapon);
      console.log("[You hit with " + your_hit + "points of damage!]");
      enemy.hit(your_hit);
      console.log(enemy);
      if (enemy.life > 0) {
        enemy_hit = Math.rand(enemy.strength + enemy.weapon);
        console.log("[Your enemy hit with " + enemy_hit + "points of damage!]");
        return this.hit(enemy_hit);
      }
    }
  };

  print("Enter your new idea: ");

  idea = gets();

  code_words.each(function(real, code) {
    return idea.replace(real, code);
  });

  print("File encoded. Please enter a name for this idea: ");

  idea_name = gets().strip();

  File.open("idea-" + idea_name + ".txt", 'w', function(file) {
    return file.write(idea);
  });

  wipe_mutterings_from = function(sentence) {
    var close, open, _results;
    if (!sentence.indexOf) {
      throw new Error("cannot wipe mutterings");
    }
    _results = [];
    while (__indexOf.call(sentence, '(') >= 0) {
      open = sentence.indexOf('(');
      close = sentence.indexOf(')');
      sentence = "" + sentence.slice(0, open) + sentence.slice(close + 1);
      _results.push(sentence);
    }
    return _results;
  };

}).call(this);
