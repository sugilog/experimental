(function($){
  var config = {
    days: 7,
    minUnit: 30,
    indexRatio: 9
  };

  var windowUtil = {
    resizeHeaderWidth: function() {
      jQuery("#calendar_field_header").css({width: jQuery("#calendar_field_parent").get(0).scrollWidth});
    },
    setResizable: function() {
      jQuery(document).ready(this.resizeHeaderWidth);
      jQuery(window).on("resize", this.resizeHeaderWidth);
    },
  };

  var cssUtil = {
    top: function(minute) {
      return (100 * minute / dateUtil.minutes) + "%";
    },
    bottom: function(minute) {
      return (100 - 100 * minute / dateUtil.minutes) + "%";
    },
    left: function(day) {
      return (config.indexRatio + (day * (100 - config.indexRatio) / config.days)) + "%";
    },
    right: function(day) {
      return ((config.days - day - 1) * (100 - config.indexRatio) / config.days) + "%";
    },
    background: function(type) {
      switch(type) {
        case "temp":
          return "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAATUlEQVQYV2P88OuXMQMa+PfnXwOyECO6InQFTCxMDSiKsCkAmQhXhEsBXBE+BWBF77792IzsSJAb0D2CogibApAtcEW4FMCtw6cApAgATqY9udqpShMAAAAASUVORK5CYII=)";
        case "fixed":
          return "#e4f7f8";
      };
    },
    border: function(type, color) {
      return "1px " + type + " " + (color || "#9fe1e7");
    }
  };

  var dateUtil = {
    minutes: (60 * 24),
    setCurrentTime: function() {
      var currentDate = new Date();
      var currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

      jQuery("#calendar_current_time_indicator")
        .css({
          position: "absolute",
          top:       cssUtil.top(currentTime),
          left:      cssUtil.left(currentDate.getDay()),
          right:     cssUtil.right(currentDate.getDay()),
          borderTop: cssUtil.border("solid", "#ff1493"),
          zIndex:    100
        });
    }
  };

  var eventUtil = {
    target: {
      day: function(targetEvent) {
        var xPosition = (targetEvent.pageX - jQuery("#calendar").position().left) / jQuery("#calendar").width() * 100;
        return Math.floor((xPosition - config.indexRatio) / ((100 - config.indexRatio) / config.days));
      },
      min: function(targetEvent) {
        var yPosition = {
          base:   jQuery("#calendar_field_parent").position().top,
          click:  targetEvent.pageY,
          scroll: jQuery("#calendar_field_parent .calendar_vertical_day:first").position().top,
          length: jQuery("#calendar_field_parent .calendar_vertical_day:first").height()
        }
        return Math.floor((dateUtil.minutes * (yPosition.click - yPosition.base - yPosition.scroll) / yPosition.length) / config.minUnit) * config.minUnit;
      },
      basePx: {
        day: function() {
          return jQuery(jQuery("#calendar_field_parent .calendar_vertical_day").get(1)).width();
        },
        min: function() {
          return jQuery("#calendar_field_parent .calendar_vertical_day:first").height() / (dateUtil.minutes / config.minUnit);
        }
      }
    },
    temp: {
      create: function(target) {
        return jQuery("<div>")
          .prop("id", "temp_event")
          .addClass("calendar_event")
          .css({
            position: "absolute",
            top:        cssUtil.top(target.from),
            bottom:     cssUtil.bottom(target.to),
            left:       cssUtil.left(target.day),
            right:      cssUtil.right(target.day),
            background: cssUtil.background("temp"),
            border:     cssUtil.border("solid")
          })
          .appendTo("#calendar_events");
      },
      change: function(target) {
        return jQuery("#temp_event")
          .css({
            top: cssUtil.top(target.from),
            bottom: cssUtil.bottom(target.to),
          });
      },
      cancel: function() {
        return jQuery("#temp_event").remove();
      },
      fix: function(target) {
        return jQuery("#temp_event")
          .prop("id", "")
          .css({
            background: cssUtil.background("fixed")
          })
          .data("target", target);
      }
    },
    drag: {
      start: function(eventDom) {
        return jQuery(eventDom)
          .css({
            background: cssUtil.background("temp")
          });
      },
      offset: function(baseEvent, currentEvent) {
        return {
          x: Math.round((currentEvent.pageX - baseEvent.pageX) / eventUtil.target.basePx.day()),
          y: Math.round((currentEvent.pageY - baseEvent.pageY) / eventUtil.target.basePx.min()) * config.minUnit
        };
      },
      change: function(eventDom, target) {
        return jQuery(eventDom)
          .css({
            top:    cssUtil.top(target.from),
            bottom: cssUtil.bottom(target.to),
            left:   cssUtil.left(target.day),
            right:  cssUtil.right(target.day),
          });
      },
      fix: function(eventDom, target) {
        return jQuery(eventDom)
          .css({
            background: cssUtil.background("fixed")
          })
          .data("target", target);
      }
    }
  };

  jQuery(function() {
    windowUtil.setResizable();
    dateUtil.setCurrentTime();

    jQuery("#calendar_field_horizontal_hour").on("mousedown.onTempEvent", function(_event) {
      _event.preventDefault();
      var day = eventUtil.target.day(_event);
      var min = eventUtil.target.min(_event);
      var target = {day: day, from: min, to: min + config.minUnit}
      var that = this;

      if (day >= 0) {
        eventUtil.temp.create(target);

        jQuery(this).add(".calendar_event").on("mousemove.onTempEvent", function(_eventOnMove) {
          _eventOnMove.preventDefault();
          var minOnMove = eventUtil.target.min(_eventOnMove);

          if (minOnMove >= min) { target.from = min; target.to = minOnMove + config.minUnit; }
          else { target.from = minOnMove; target.to = min + config.minUnit; }

          eventUtil.temp.change(target);
        });

        jQuery(this).add(".calendar_event").on("mouseup.onTempEvent", function(_eventOnUp) {
          _eventOnUp.preventDefault();
          jQuery(that).add(".calendar_event").off("mousemove.onTempEvent");
          jQuery(that).add(".calendar_event").off("mouseup.onTempEvent");
          var minOnUp = eventUtil.target.min(_eventOnUp);

          if (minOnUp >= min) { target.from = min; target.to = minOnUp + config.minUnit; }
          else { target.from = minOnUp; target.to = min + config.minUnit; }

          eventUtil.temp.change(target);
          eventUtil.temp.fix(target);
        });
      };
    });

    jQuery(document).on("mousedown.onEvent", ".calendar_event", function(_event) {
      _event.preventDefault();
      eventUtil.drag.start(_event.target);
      var target = jQuery(_event.target).data("target");
      var that = this;

      jQuery(this).add("#calendar_field_horizontal_hour").on("mousemove.onEvent", function(_eventOnMove) {
        _eventOnMove.preventDefault();
        var offset = eventUtil.drag.offset(_event, _eventOnMove);
        eventUtil.drag.change(that, {day: target.day + offset.x, from: target.from + offset.y, to: target.to + offset.y});
      });

      jQuery(this).add("#calendar_field_horizontal_hour").on("mouseup.onEvent", function(_eventOnUp) {
        jQuery(that).add("#calendar_field_horizontal_hour").off("mousemove.onEvent");
        jQuery(that).add("#calendar_field_horizontal_hour").off("mouseup.onEvent");
        _eventOnUp.preventDefault();

        var offset = eventUtil.drag.offset(_event, _eventOnUp);
        var fixTarget = {day: target.day + offset.x, from: target.from + offset.y, to: target.to + offset.y};

        if (offset.x === 0 && offset.y === 0) {
          eventUtil.drag.fix(that, fixTarget);
          console.log("acts like click event");
        }
        else {
          eventUtil.drag.change(that, fixTarget);
          eventUtil.drag.fix(that, fixTarget);
        }
      });
    });
  });
})(jQuery);
