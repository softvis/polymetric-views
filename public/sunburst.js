
PMV.sunburst = function(data, at) {

	var CWIDTH = 800;
	var CHEIGHT = CWIDTH;
	var RADIUS = CWIDTH / 2;

	var roots = PMV.findRoots(data);
	var root = (roots.length == 1) ? roots[0] : { name: "", items: roots };
	if (!("NOC" in root)) {
		PMV.calcNOC(root);
	}

	$.each(data, function(idx, cls) {
		cls.children = [];
	});

	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return PMV.getv(d, at.shade) })])
    .range([80, 20]);

	var fscale2 = d3.scale.linear()
    .domain([0, root.NOC])
    .range([80, 40]);
			
	var layout = d3.layout.treemap()
		.size([CWIDTH, CHEIGHT])
		.padding(3)
		.mode("squarify")
		.round(true)
		.sort(function(da, db) { return PMV.getv(da, at.order) - PMV.getv(db, at.order) })
		.value(function(d) { return PMV.getv(d, at.order) })
		.children(function(d) { return d.items; });
	
	var nodes = layout.nodes(root);
	
	d3.selectAll("svg").remove();
	var chart = d3.select("#chart-wrapper")
		.append("svg")
    	.attr("class", "chart")
    	.attr("width", CWIDTH)
    	.attr("height", CHEIGHT)
		.append("g")
			.attr("transform", "translate(" + CWIDTH / 2 + ", " + CHEIGHT / 2 + ")");

	var partition = d3.layout.partition()
		.sort(null)
		.size([2 * Math.PI, RADIUS * RADIUS])
		.sort(function(da, db) { return PMV.getv(da, at.order) - PMV.getv(db, at.order) })
		.value(function(d) { return PMV.getv(d, at.width); })
		.children(function(d) { return d.items; });

	var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

	chart.datum(root).selectAll("path")
	  .data(partition.nodes)
	  .enter().append("path")
		.attr("display", function(d) { return d.depth > 2 ? null : "none"; }) // hide inner ring
		.attr("d", arc)
		.style("stroke", "white")
		.style("fill", function(d) { 
			switch(d.type) {
			case "Class": return "hsl(200, 80%, " + fscale(PMV.getv(d, at.shade)) + "%)";
			case "Package": return "hsl(200, 0%, " + fscale2(d.NOC) + "%)";
			default: return "white";
			}
		})
		.call(tooltip());
  
}

