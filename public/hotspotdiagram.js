var redraw = function() {

	var CWIDTH = 800;

	var at = {
		SORT: $('#sel-order').find(":selected").text(),
		WIDTH: $('#sel-width').find(":selected").text(),
		HEIGHT: $('#sel-height').find(":selected").text(),
		SHADE: $('#sel-shading').find(":selected").text(),
	}

	data.shuffle().sort(function(da, db) { return da[at.SORT] - db[at.SORT]} )
  
	d3.selectAll("svg").remove();
	var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", CWIDTH)
    .attr("height", 5000);

  var wscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[at.WIDTH] })])
    .range([5, 50]);
  
	var fscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[at.SHADE] })])
    .range([100, 0]);

  var xp = 2;
  var xp2 = 2
  var yp = 0;
  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { 
      var w = wscale(d[at.WIDTH])
      xp += w + 2; 
      if (i % 40 == 0) {
        xp = w + 4; 
      }
      return xp - (w + 2)
    })
    .attr("y", function(d, i) { 
      var w = wscale(d[at.WIDTH])
      xp2 += w + 2; 
      if (i % 40 == 0) {
        xp2 = w + 4; 
        yp += w + 2;
      }
      return yp
    })
    .attr("width", function(d) { return wscale(d[at.WIDTH]) })
    .attr("height", function(d) { return wscale(d[at.WIDTH]) })
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d[at.SHADE]) + "%)" })
		.call(tooltip());
 }

 $(document).ready(redraw());
