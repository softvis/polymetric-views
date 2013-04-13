$( document ).ready(function() {
  data.sort(function(a, b) { return b.FLENGTH - a.FLENGTH} )
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 1000)
    .attr("height", 3 * data.length)
    .attr("x-foo", d3.max(data, function(c) { return c.FLENGTH }))
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(c) { return c.FLENGTH })])
    .range([0, 500]);
  chart.selectAll("rect")
    .data(data.map(function(c) { return c.FLENGTH }))
    .enter().append("rect")
    .attr("y", function(d, i) { return i * 3; })
    .attr("width", x)
    .attr("height", 2);
});
