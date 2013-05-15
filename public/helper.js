var tooltip = function(d) {
	path = d.path.split("/").slice(0, -1).join("/");
	return "<h2>" + d.name + "</h2><p class='filename'>" + path + 
		"<p>FLENGTH: " + d.FLENGTH + "<br>LOC: " + d.LOC + "<br>MCOUNT: " + d.MCOUNT + "<br>WMC: " + d.WMC;
};
/*
var tooltip2 = function(el, d) {      
	el.on("mouseover", function(x) {
			d3.select("body")
				.select("div.tooltip")
				.transition()        
	    	.duration(200)      
	    	.style("opacity", 1);      
	    	.html(tooltip(d))  
	    	.style("left", (d3.event.pageX) + "px")     
	    	.style("top", (d3.event.pageY - 28) + "px");    
		})
    .on("mouseout", function(x) {       
			d3.select("body")
				.select("div.tooltip")
		 		.transition()        
		    .duration(500)      
		    .style("opacity", 0)
		});
};
  
*/