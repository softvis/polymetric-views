
CPM.treemap = function(data, at) {

	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return CPM.getv(d, at.shade) })])
    .range([100, 0]);

	var layout = d3.layout.treemap()
		.size([700, 600])
		.padding(4)
		.mode("squarify")
		.round(true)
		.value(function(d) { return CPM.getv(d, at.order) })
		.children(function(d) { return d.subclasses; });
		 
	var root = { name: "ROOT", subclasses: $.grep(data, function(d) { return !("superclass" in d) }) };
	
	var nodes = layout.nodes(root);
	
	d3.selectAll("svg").remove();
	var chart = d3.select("#chart-wrapper").append("svg")
    .attr("class", "chart")
    .attr("width", 700)
    .attr("height", 700);

	chart.selectAll("rect")
	  .data(nodes)
	  .enter()
	  .append("rect")
		.attr("x", function(d) { return d.x })
		.attr("y", function(d) { return d.y })
		.attr("width", function(d) { return d.dx })
		.attr("height", function(d) { return d.dy })
		.attr("shape-rendering", "crispEdges")
		.style("fill", function(d) { return "hsl(200, 80%, " + fscale(CPM.getv(d, at.shade)) + "%)" })
		.call(tooltip());
  
}

