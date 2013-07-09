
CPM.scatterplot = function(data, at) {

	var CHEIGHT = 700;
	var CWIDTH = 700;
	var MAXWH = 40;
	var LEFTSPACE = 40;
	var TOPSPACE = 20;

	d3.selectAll("svg").remove();
	var chart = d3.select("#chart-wrapper").append("svg")
		.attr("class", "chart")
		.attr("width", CWIDTH)
		.attr("height", CHEIGHT);
		
	var xscale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return CPM.getv(d, at.xpos) })])
		.rangeRound([LEFTSPACE, CWIDTH - MAXWH])
		
	var yscale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return CPM.getv(d, at.ypos) })])
		.rangeRound([TOPSPACE, CHEIGHT - MAXWH]);

	var wmax = d3.max(data, function(d) { return CPM.getv(d, at.width) });
	var hmax = d3.max(data, function(d) { return CPM.getv(d, at.height) });

	if(at.width.match("^NO") && at.height.match("^NO")) {
		// magic proportional mode: if both are "number of" they'll get the same scale
		wmax = hmax = Math.max(wmax, hmax);
	} 

	var wscale = d3.scale.linear()
    .domain([0, wmax])
    .rangeRound([4, MAXWH]);

  var hscale = d3.scale.linear()
    .domain([0, hmax])
    .rangeRound([4, MAXWH]);

	var fscale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return CPM.getv(d, at.shade) })])
		.range([100, 0]);
		
	chart.selectAll("rect")
		.data(data)
		.enter().append("rect")
		.attr("x", function(d) { return xscale(CPM.getv(d, at.xpos)) })
		.attr("y", function(d) { return yscale(CPM.getv(d, at.ypos)) })
		.attr("width", function(d) { return wscale(CPM.getv(d, at.width)) })
		.attr("height", function(d) { return hscale(CPM.getv(d, at.height)) })
		.attr("shape-rendering", "crispEdges")
		.style("fill", function(d) { return "hsl(200, 80%, " + fscale(CPM.getv(d, at.shade)) + "%)" })
		.call(tooltip());
				
}

