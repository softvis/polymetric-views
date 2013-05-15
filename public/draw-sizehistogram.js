$( document ).ready(function() {

  data.sort(function(da, db) { return db.FLENGTH - da.FLENGTH} )

	var CHEIGHT = 600
  var BWIDTH = 8
	var BGAP = 2;
	var BMINHEIGHT = 5

	var div = d3.select("body").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);
			
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", (BWIDTH + BGAP) * data.length)
    .attr("height", CHEIGHT + 1);
		
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
    .attr("x2", (BWIDTH + BGAP) * data.length)
    .attr("y1", function(d) { return CHEIGHT - yscale(d) })
    .attr("y2", function(d) { return CHEIGHT - yscale(d) })
    .style("stroke", "#ccc");

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { return i * (BWIDTH + BGAP); })
		.attr("y", function(d) { return CHEIGHT - yscale(d.LOC) })
    .attr("height", function(d) { return Math.max(BMINHEIGHT, yscale(d.LOC)) })
    .attr("width", BWIDTH)
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d.WMC) + "%)" })
		.on("mouseover", function(d) {      
				div.transition()        
           .duration(200)      
           .style("opacity", 1);      
        div.html(tooltip(d))  
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");    
         })
    .on("mouseout", function(d) {       
		 		div.transition()        
		       .duration(500)      
		       .style("opacity", 0)
				});  
});
