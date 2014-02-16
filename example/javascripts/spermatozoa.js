var Spermatozoa = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, 'mapSperm', 'moveSperm')
    this.width = 960;
    this.height = 500;

    this.n = 100;
    this.m = 12;
        degrees = 180 / Math.PI;

    this.spermatozoa = d3.range(this.n).map(this.mapSperm);

    this.svg = d3.select("#spermatazoa").append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

    this.g = this.svg.selectAll("g")
        .data(this.spermatozoa)
      .enter().append("g");

    this.head = this.g.append("ellipse")
        .attr("rx", 6.5)
        .attr("ry", 4);

    this.g.append("path")
        .datum(function(d) { return d.path.slice(0, 3); })
        .attr("class", "mid");

    this.g.append("path")
        .datum(function(d) { return d.path; })
        .attr("class", "tail");

    this.tail = this.g.selectAll("path");

    d3.timer(this.moveSperm);
  },

  headTranform: function(d) {
    return "translate(" + d.path[0] + ")rotate(" + Math.atan2(d.vy, d.vx) * degrees + ")";
  },

  tailPath: function(d) {
    return "M" + d.join("L");
  },

  mapSperm: function() {
    var x = Math.random() * this.width,
        y = Math.random() * this.height;
    return {
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      path: d3.range(this.m).map(function() { return [x, y]; }),
      count: 0
    };
  },

  moveSperm: function() {
    for (var i = -1; ++i < this.n;) {
      var spermatozoon = this.spermatozoa[i],
          path = spermatozoon.path,
          dx = spermatozoon.vx,
          dy = spermatozoon.vy,
          x = path[0][0] += dx,
          y = path[0][1] += dy,
          speed = Math.sqrt(dx * dx + dy * dy),
          count = speed * 10,
          k1 = -5 - speed / 3;

      // Bounce off the walls.
      if (x < 0 || x > this.width) spermatozoon.vx *= -1;
      if (y < 0 || y > this.height) spermatozoon.vy *= -1;

      // Swim!
      for (var j = 0; ++j < this.m;) {
        var vx = x - path[j][0],
            vy = y - path[j][1],
            k2 = Math.sin(((spermatozoon.count += count) + j * 3) / 300) / speed;
        path[j][0] = (x += dx / speed * k1) - dy * k2;
        path[j][1] = (y += dy / speed * k1) + dx * k2;
        speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
      }
    }
    this.head.attr("transform", this.headTransform);
    this.tail.attr("d", this.tailPath);
  }
});

$(function(){
  new Spermatozoa()
})
