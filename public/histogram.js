var redraw = function() {
	
	var CHEIGHT = 600;
	var BWIDTH = 8;
	var BGAP = 2;
	var LEFTSPACE = 40;

	var at = {
		SORT: $('#sel-xpos').find(":selected").text(),
		HEIGHT: $('#sel-height').find(":selected").text(),
		SHADE: $('#sel-shading').find(":selected").text(),
	}

	data.shuffle().sort(function(da, db) { return db[at.SORT] - da[at.SORT]} )

	d3.selectAll("svg").remove();
	var chart = d3.select("body").append("svg")
		.attr("class", "chart")
		.attr("width", (BWIDTH + BGAP) * data.length)
		.attr("height", CHEIGHT + 5); /* to accomodate bottom label */
		
	var xscale = d3.scale.linear()
		.domain([0, data.length])
		.rangeRound([LEFTSPACE, (BWIDTH + BGAP) * data.length + LEFTSPACE])
		
	var yscale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d[at.HEIGHT] })])
		.rangeRound([CHEIGHT-1, 0]);

	var fscale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d[at.SHADE] })])
		.range([100, 0]);

	var yaxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(10);
		
	chart.selectAll("line")
		.data(yscale.ticks(10))
		.enter().append("line")
		.attr("x1", function(td) { return xscale(0) })
		.attr("x2", function(td) { return xscale(data.length) })
		.attr("y1", yscale)
		.attr("y2", yscale)
		.style("stroke", "#ccc");

	chart.selectAll("rect")
		.data(data)
		.enter().append("rect")
		.attr("x", function(d, i) { return xscale(i) })
		.attr("y", function(d) { return yscale(d[at.HEIGHT]) })
		.attr("height", function(d) { return CHEIGHT -yscale(d[at.HEIGHT]) })
		.attr("width", BWIDTH)
		.attr("shape-rendering", "crispEdges")
		.style("fill", function(d) { return "hsl(200, 80%, " + fscale(d[at.SHADE]) + "%)" })
		.call(tooltip());
				
	chart.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + LEFTSPACE + ", 0)")
		.call(yaxis);
}

$(document).ready(redraw());
