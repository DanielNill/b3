var BulletCharts = Backbone.View.extend({

  id: '#bullet_charts',

  buildSvg: function(){
    this.svg = this.d3el.append('svg')
  },

  buildD3El: function(){
    if(this.el.id.length > 0){
      this.d3el = d3.select(this.el.id)
    }
    else if(this.el.className.length > 0){
      this.d3el = d3.select(this.el.className)
    }
    else{
      this.d3el = d3.select(this.el.tagName)
    }
  },

  initialize: function(){
    _.bindAll(this, 'showCharts', 'randomizer', 'randomize', 'changeChart');
    this.margin = {top: 5, right: 40, bottom: 20, left: 120};
    this.width = 960 - this.margin.left - this.margin.right,
    this.height = 50 - this.margin.top - this.margin.bottom;
  },

  render: function() {
    this.buildD3El();
    this.chart = d3.bullet()
        .width(this.width)
        .height(this.height);

    d3.json("/data/bullet.json", this.showCharts);
    return this;
  },

  showCharts: function(error, data){
    //objects = this.d3el.selectAll('svg').data(data).enter()
    for(var i = 0; i < data.length; i++){
      this.$el.append(new BulletChart({id: "#bullet_chart_" + i, data: data[i], chart: this.chart}).render().el)
    }
    //   this.d3el.selectAll('svg').data(data).enter().append("svg")
    //     .attr("class", "bullet")
    //     .attr("width", this.width + this.margin.left + this.margin.right)
    //     .attr("height", this.height + this.margin.top + this.margin.bottom)
    //   .append("g")
    //     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
    //     .call(this.chart);

    // var title = this.svg.append("g")
    //     .style("text-anchor", "end")
    //     .attr("transform", "translate(-6," + this.height / 2 + ")");

    // title.append("text")
    //     .attr("class", "title")
    //     .text(function(d) { return d.title; });

    // title.append("text")
    //     .attr("class", "subtitle")
    //     .attr("dy", "1em")
    //     .text(function(d) { return d.subtitle; });

    d3.selectAll("button").on("click", this.changeChart);
  },

  changeChart: function() {
    this.svg.datum(this.randomize).call(this.chart.duration(1000)); // TODO automatic transition
  },

  randomize: function(d) {
    if (!d.randomizer) d.randomizer = this.randomizer(d);
    d.ranges = d.ranges.map(d.randomizer);
    d.markers = d.markers.map(d.randomizer);
    d.measures = d.measures.map(d.randomizer);
    return d;
  },

  randomizer: function(d) {
    var k = d3.max(d.ranges) * .2;
    return function(d) {
      return Math.max(0, d + k * (Math.random() - .5));
    };
  }
});

//////////////////////////////////////////////////////////////////

var BulletChart = Backbone.View.extend({

  elIsAttached: function(){
    return this.$el.closest('html').length > 0
  },

  buildSvg: function(){
    this.svg = this.d3el.append('svg')
  },

  buildD3El: function(){
    if(this.el.id.length > 0){
      this.d3el = this.elIsAttached() ? d3.select(this.el.id) : d3.select(this.el)
    }
    else if(this.el.className.length > 0){
      this.d3el = this.elIsAttached() ? d3.select(this.el.className) : d3.select(this.el)
    }
    else{
      this.d3el = this.elIsAttached() ? d3.select(this.el.tagName) : d3.select(this.el)
    }
  },

  initialize: function(options){
    this.margin = {top: 5, right: 40, bottom: 20, left: 120};
    this.width = 960 - this.margin.left - this.margin.right,
    this.height = 50 - this.margin.top - this.margin.bottom;
    this.chart = options.chart;
    this.data = options.data;
  },

  render: function(){
    this.buildD3El();
    this.buildSvg();
    this.svg.data(this.data);
    this.svg.attr("class", "bullet");
    this.svg.attr("width", this.width + this.margin.left + this.margin.right);
    this.svg.attr("height", this.height + this.margin.top + this.margin.bottom)
    this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .call(this.chart);

    var title = this.svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + this.height / 2 + ")");

    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });

    return this;
  }
})
$(function(){
  new BulletCharts().render()
})
