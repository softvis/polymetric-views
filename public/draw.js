$( document ).ready(function() {
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 500)
    .attr("height", 20 * data.length)
    .attr("x-foo", d3.max(data, function(c) { return c.flength }))
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(c) { return c.flength })])
    .range([0, 500]);
  chart.selectAll("rect")
    .data(data.map(function(c) { return c.flength }))
    .enter().append("rect")
    .attr("y", function(d, i) { return i * 20; })
    .attr("width", x)
    .attr("height", 19);
});
