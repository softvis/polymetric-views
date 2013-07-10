
CPM.sunburst = function(data, at) {

	var CWIDTH = 800;
	var CHEIGHT = CWIDTH;
	var RADIUS = CWIDTH / 2;

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
	var root = (roots.length == 1) ? roots[0] : { name: "", children: roots };

	$.each(data, function(idx, cls) {
		cls.children = [];
	});

	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return CPM.getv(d, at.shade) })])
    .range([80, 10]);

	var fscale2 = d3.scale.linear()
    .domain([0, 10])
    .range([40, 80]);
			
	var layout = d3.layout.treemap()
		.size([CWIDTH, CHEIGHT])
		.padding(3)
		.mode("squarify")
		.round(true)
		.sort(function(da, db) { return CPM.getv(da, at.order) - CPM.getv(db, at.order) })
		.value(function(d) { return CPM.getv(d, at.order) })
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
		.sort(function(da, db) { return CPM.getv(da, at.order) - CPM.getv(db, at.order) })
		.value(function(d) { return CPM.getv(d, at.width); })
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
			case "Class": return "hsl(200, 80%, " + fscale(CPM.getv(d, at.shade)) + "%)";
			case "Package": return "hsl(200, 0%, " + fscale2(d.depth) + "%)";
			default: return "white";
			}
		})
		.call(tooltip());
  
}

