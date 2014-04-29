
PMV.treemap = function(data, at) {

	var roots = [];
	$.each(data, function(idx, cls) {
		var p = cls.package;
		while(p.parentPackage) {
			p = p.parentPackage;
		}
		// this will be inefficient if there are many roots
		if (roots.indexOf(p) < 0) {
			roots.push(p);
		}
	});
	var root = (roots.length == 1) ? roots[0] : { name: "", items: roots };

	$.each(data, function(idx, cls) {
		cls.children = [];
	});

	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return PMV.getv(d, at.shade) })])
    .range([100, 20]);

	var layout = d3.layout.treemap()
		.size([699, 699])
		.padding(3)
		.mode("squarify")
		.round(true)
		.sort(function(da, db) { return PMV.getv(da, at.order) - PMV.getv(db, at.order) })
		.value(function(d) { return PMV.getv(d, at.order) })
		.children(function(d) { return d.items; });
	
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
		.attr("y", function(d) { return d.y + 1 })
		.attr("width", function(d) { return d.dx })
		.attr("height", function(d) { return d.dy })
		.attr("shape-rendering", "crispEdges")
		.style("fill", function(d) { 
			switch(d.type) {
			case "Class": return "hsl(200, 80%, " + fscale(PMV.getv(d, at.shade)) + "%)";
			case "Package": return "#CCC";
			default: return "white";
			}
		})
		.call(tooltip());
  
}

