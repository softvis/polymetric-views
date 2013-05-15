$( document ).ready(function() {

	var at = {
		SORT: "FLENGTH",
		HEIGHT: "LOC",
		SHADE: "WMC",
	}

	var CHEIGHT = 600;
  var BWIDTH = 8;
	var BGAP = 2;
	var LEFTSPACE = 50;

  data.sort(function(da, db) { return db[at.SORT] - da[at.SORT]} )

	var div = d3.select("body").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);
			
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", (BWIDTH + BGAP) * data.length)
    .attr("height", CHEIGHT + 5); /* to accomodate bottom label */
		
	var xscale = d3.scale.linear()
		.domain([0, data.length])
		.range([LEFTSPACE, (BWIDTH + BGAP) * data.length + LEFTSPACE])
		
  var yscale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[at.HEIGHT] })])
    .range([CHEIGHT-1, 0]);

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
    .attr("y1", function(td) { return yscale(td) })
    .attr("y2", function(td) { return yscale(td) })
    .style("stroke", "#ccc");

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { return xscale(i) })
		.attr("y", function(d) { return yscale(d[at.HEIGHT]) })
    .attr("height", function(d) { return CHEIGHT -yscale(d[at.HEIGHT]) })
    .attr("width", BWIDTH)
    .style("fill", function(d) { return "hsl(200, 80%, " + fscale(d[at.SHADE]) + "%)" })
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
				
	chart.append("g")
  	.attr("class", "axis")
		.attr("transform", "translate(" + LEFTSPACE + ", 0)")
		.call(yaxis);
				
});
