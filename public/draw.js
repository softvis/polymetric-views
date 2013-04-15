$( document ).ready(function() {
  data.sort(function(a, b) { return b.FLENGTH - a.FLENGTH} )
  var bheight = 10
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 1000)
    .attr("height", bheight * data.length)
    .attr("x-foo", d3.max(data, function(d) { return d.LOC }))
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.LOC })])
    .range([0, 500]);
  var f = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.WMC })])
    .range([0, 100]);
  chart.selectAll("line")
    .data(x.ticks(10))
    .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", bheight * data.length)
    .style("stroke", "#ccc");
  chart.selectAll("rect")
    .data(data.map(function(d) { return d.LOC }))
    .enter().append("rect")
    .attr("y", function(d, i) { return i * bheight; })
    .attr("width", x)
    .attr("height", bheight - 2)
    .style("fill", "hsl(200, " + 10 + "%, 50%)");
 });
