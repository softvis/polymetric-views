$( document ).ready(function() {

  data.sort(function(da, db) { return db.FLENGTH - da.FLENGTH} )

  var BHEIGHT = 10

  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 1000)
    .attr("height", BHEIGHT * data.length)

  var xscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.LOC })])
    .range([0, 1000]);

  var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.WMC })])
    .range([100, 0]);

  chart.selectAll("line")
    .data(xscale.ticks(10))
    .enter().append("line")
    .attr("x1", xscale)
    .attr("x2", xscale)
    .attr("y1", 0)
    .attr("y2", BHEIGHT * data.length)
    .style("stroke", "#ccc");

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("y", function(d, i) { return i * BHEIGHT; })
    .attr("width", function(d) { return xscale(d.LOC) })
    .attr("height", BHEIGHT - 2)
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d.WMC) + "%)" });

});
