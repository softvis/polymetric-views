
var tooltip = function(a) {
	
	var accessor = arguments.length ? a : undefined;
	
	function tooltip(selection) {
		selection
			.on("mouseover", function(d) {
				if(accessor) {
					d = accessor(d);
				}
			 	var div = d3.select("body").selectAll("div.tooltip");
				if (div.empty()) {
				 	div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
				}
			  div.html("");
				div.append("h2").text(d.name);
				div.append("p").attr("class", "filename").text(d.path.split("/").slice(0, -1).join("/"));
				for (var p in d) {
				  if (d.hasOwnProperty(p) && (p.toUpperCase() == p)) {
						div.append("p").text(p + ": " + d[p]);
				  }
				}
				var ttx = d3.event.pageX;
				var tty = d3.event.pageY - $("div.tooltip").height() - 15;
				var hclip = (ttx + $("div.tooltip").width()) - ($(window).width() + $(window).scrollLeft())
				if (hclip > 0) {
					ttx -= hclip
				}
				div.style("left", (ttx - 20) + "px")     
	  		   .style("top", tty + "px");
 				div.transition().duration(100).style("opacity", 0.95);
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
	