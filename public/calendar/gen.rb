def horizontal_div(time)
  sprintf('<div id="calendar_horizontal_hour_%1$04d" class="hour%1$04d calendar_horizontal_%2$s"></div>', time * 30, (time.modulo(2) == 0 ? "hour" : "half_hour"))
end

def horizontal_div_css(time)
  sprintf('.calendar_horizontal_%04d { position: absolute; top: %10.7f%%; bottom: %10.7f%%; border-top: 1px %s #cccccc; }', time * 30, time * 100.0 / 48, (100 - (time + 1) * 100.0 / 48), (time.modulo(2) == 0 ? "solid" : "dotted"))
end

(0..47).each do |i|
  puts horizontal_div_css i
end
