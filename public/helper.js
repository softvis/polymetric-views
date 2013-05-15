
var tooltip = function() {
	
	function tooltip(selection) {
		selection
			.on("mouseover", function(d) {
			 	var div = d3.select("body").selectAll("div.tooltip");
				if (div.empty()) {
				 	div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
				}
			  div.style("left", (d3.event.pageX - 20) + "px")     
	  		   .style("top", (d3.event.pageY + 20) + "px");
			  div.html("");
				div.append("h2").text(d.name);
				div.append("p").attr("class", "filename").text(d.path.split("/").slice(0, -1).join("/"));
				for (var p in d) {
				  if (d.hasOwnProperty(p) && (p.toUpperCase() == p)) {
						div.append("p").text(p + ": " + d[p]);
				  }
				}
 				div.transition().duration(100).style("opacity", 0.9);
			})
			.on("mouseout", function(d) {       
				div = d3.select("body").select("div.tooltip")
				div.transition().duration(250).style("opacity", 0);
			});
	}
	
	return tooltip;
	
};

		
Array.prototype.shuffle = function() {
	var i = this.length, j, tempi, tempj;
	if (i === 0) 
		return false;
	while (--i) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		tempi = this[i];
		tempj = this[j];
		this[i] = tempj;
		this[j] = tempi;
	}
	return this;
}
	