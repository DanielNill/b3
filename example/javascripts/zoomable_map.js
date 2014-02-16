var Map = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, 'clicked', 'render', 'isCentered')
    this.width = 960;
    this.height = 500;
    this.centered;

    var projection = d3.geo.albersUsa()
        .scale(1070)
        .translate([this.width / 2, this.height / 2]);

    this.path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#zoomable_map").append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", this.width)
        .attr("height", this.height)
        .on("click", this.clicked);

    this.g = svg.append("g");

    d3.json("/data/us.json", this.render)
  },

  render: function(error, us) {
    this.g.append("g")
        .attr("id", "states")
      .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
        .attr("d", this.path)
        .on("click", this.clicked);

    this.g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", this.path);
  },

  clicked: function(d) {
    var x, y, k;

    if (d && this.centered !== d) {
      var centroid = this.path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      this.centered = d;
    } else {
      x = this.width / 2;
      y = this.height / 2;
      k = 1;
      this.centered = null;
    }

    this.g.selectAll("path")
        .classed("active", this.centered && this.isCentered);

    this.g.transition()
        .duration(750)
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
  },

  isCentered: function(d) { return d === this.centered; }

})


$(function(){
  new Map()
})
