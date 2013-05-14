$( document ).ready(function() {

  data.sort(function(da, db) { return db.FLENGTH - da.FLENGTH} )

	var CHEIGHT = 600
  var BWIDTH = 12

  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", BWIDTH * data.length)
    .attr("height", CHEIGHT)

  var yscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.LOC })])
    .range([0, CHEIGHT]);

  var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.WMC })])
    .range([100, 0]);

  chart.selectAll("line")
    .data(yscale.ticks(10))
    .enter().append("line")
    .attr("x1", 0)
    .attr("x2", BWIDTH * data.length)
    .attr("y1", function(d) { return CHEIGHT - yscale(d) })
    .attr("y2", function(d) { return CHEIGHT - yscale(d) })
    .style("stroke", "#ccc");

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { return i * BWIDTH; })
		.attr("y", function(d) { return CHEIGHT - yscale(d.LOC) })
    .attr("height", function(d) { return yscale(d.LOC) })
    .attr("width", BWIDTH - 3)
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d.WMC) + "%)" });

});
