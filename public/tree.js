
CPM.tree = function(data, at) {

	var wmax = d3.max(data, function(d) { return CPM.getv(d, at.width) });
	var hmax = d3.max(data, function(d) { return CPM.getv(d, at.height) });
	
	if(at.width.match("^NO") && at.height.match("^NO")) {
		// magic proportional mode: if both are "number of" they'll get the same scale
		wmax = hmax = Math.max(wmax, hmax);
	} 
  
	var wscale = d3.scale.linear()
    .domain([0, wmax])
    .rangeRound([4, 40]);

  var hscale = d3.scale.linear()
    .domain([0, hmax])
    .rangeRound([4, 40]);
  
	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return CPM.getv(d, at.shade) })])
    .range([100, 0]);

	var layout = d3.layout.tree()
		.size([700, 600])
		.children(function(d) { return d.subclasses; });
		 
	var root = { name: "ROOT", subclasses: $.grep(data, function(d) { return !("superclass" in d) }) };
	
	var nodes = layout.nodes(root);
	var links = layout.links(nodes);
	
	d3.selectAll("svg").remove();
	var chart = d3.select("#chart-wrapper").append("svg")
    .attr("class", "chart")
    .attr("width", 700)
    .attr("height", 700);

  chart.selectAll("path.link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.svg.diagonal());

	chart.selectAll("rect")
	  .data(nodes)
	  .enter()
	  .append("rect")
		.attr("x", function(d) { return d.x })
		.attr("y", function(d) { return d.y })
		.attr("width", 10)
		.attr("height", 10)
		.attr("shape-rendering", "crispEdges")
		.style("fill", function(d) { return "hsl(200, 80%, " + fscale(CPM.getv(d, at.shade)) + "%)" })
		.call(tooltip());
  
}

