
// Create Countdown
var Countdown = {

  // Backbone-like structure
  $el: $('.countdown'),

  // Params
  countdown_interval: null,

  // Initialize the countdown
  init: function() {

    // DOM
		this.$ = {
      days   : this.$el.find('.bloc-time.days .figure'),
    	hours  : this.$el.find('.bloc-time.hours .figure'),
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    // Animate countdown to the end
    this.count();
  },

  count: function() {

    var that    = this,
        $day_1  = this.$.days.eq(0),
        $day_2  = this.$.days.eq(1),
        $hour_1 = this.$.hours.eq(0),
        $hour_2 = this.$.hours.eq(1),
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);


    var update = function() {

      var date1 = new Date(); // Now.
      var date2 = new Date("2020-07-30T10:00:00.000+08:00");

      var diff = date2.getTime() - date1.getTime();

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -=  days * (1000 * 60 * 60 * 24);

      var hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      var mins = Math.floor(diff / (1000 * 60));
      diff -= mins * (1000 * 60);

      var seconds = Math.floor(diff / (1000));
      diff -= mins * (1000);

      if(days > 0 || hours > 0 || mins > 0 || seconds > 0) {

        // Update DOM values
        // Days
        that.checkHour(days, $day_1, $day_2);

        // Hours
        that.checkHour(hours, $hour_1, $hour_2);

        // Minutes
        that.checkHour(mins, $min_1, $min_2);

        // Seconds
        that.checkHour(seconds, $sec_1, $sec_2);

        return true;
      } else {
        return false;
      }
    };


    if (update()) {
      this.countdown_interval = setInterval(function() {
        if (!update()) {
          clearInterval(that.countdown_interval);
        }
      }, 1000);
    }
  },

  animateFigure: function($el, value) {

     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    // Before we begin, change the back value
    $back_top.find('span').html(value);

    // Also change the back bottom value
    $back_bottom.find('span').html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, {
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        clearProps          : 'all'
    });
  },

  checkHour: function(value, $el_1, $el_2) {

    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        // Animate only if the figure has changed
        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        // If we are under 10, replace first figure with 0
        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }
  }
};

// Let's go !
// Countdown.init();
