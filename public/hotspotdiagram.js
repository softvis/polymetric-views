var quadratic = function () {
	
	var PADDING = 2;	/* frame around entire layout */
	var SPACING = 2; /* minimum space between boxes */
	var sizer = undefined, xmax = 0, ymax = 0;
	
	function quadratic(data) {
		var wrappers = [];
		var numh = Math.ceil(Math.sqrt(data.length))
		var xp = PADDING, yp = PADDING;
		for (var i = 0; i < data.length; i++) {
			var wrapper = { x: xp, y: yp, item: data[i] };
			xp += sizer(data[i]) + SPACING
			xmax = Math.max(xmax, xp)
			ymax = Math.max(ymax, yp + sizer(data[i]))
			if((i + 1) % numh == 0) {
				xp = PADDING
				yp = ymax + SPACING
			}
			wrappers.push(wrapper);
		}
		return wrappers;
	}
	
	quadratic.size = function(x) {
    if (!arguments.length) return sizer;
    sizer = x;
    return quadratic;
	}
	
	quadratic.xmax = function(x) {
		return xmax + PADDING;
	}

	quadratic.ymax = function(x) {
		return ymax + PADDING;
	}

	return quadratic;
}


hotspot = {}

hotspot.draw = function(at) {

	data.shuffle().sort(function(da, db) { return da[at.sort] - db[at.sort]} )
  
  var wscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[at.width] })])
    .rangeRound([4, 40]);
  
	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[at.shade] })])
    .range([100, 0]);

	var layout = quadratic()
		.size(function(d) { return wscale(d[at.width]) });
		 
	var items = layout(data);
	
	d3.selectAll("svg").remove();
	var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", layout.xmax())
    .attr("height", layout.ymax());

  chart.selectAll("rect")
    .data(items)
    .enter().append("rect")
    .attr("x", function(d) { return d.x })
    .attr("y", function(d) { return d.y })
    .attr("width", function(d) { return wscale(d.item[at.width]) })
    .attr("height", function(d) { return wscale(d.item[at.width]) })
		.attr("shape-rendering", "crispEdges")
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d.item[at.shade]) + "%)" })
		.call(tooltip(function(d) { return d.item }));
}

