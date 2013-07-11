
MSE = {}

MSE.parse = function(source) {
	var packagesById = {};
	var packagesByName = {};
	var classes = [];
	var classesById = {};
	var anchorsById = {};
	
	var model = MSEPARSER.parse(source);
	$(model).each(function(idx, node) {
		switch(node.type) {
		case "Package":
			if(node.name != "_unknown_package_") {
				var existing = packagesByName[node.name];
				if(!existing) {
					node.items = [];
					packagesById[node.id] = node;
					packagesByName[node.name] = node;
				} else {
					existing.id = node.ie;
					packagesById[node.id] = existing;
				}
				var child = node;
				var path = node.name.split("::").slice(0, -1);
				while(path.length > 0) {
					var name = path.join("::");
					var p = packagesByName[name];
					if(p) {
						p.items.push(child);
						child.parentPackage = p;
						break;
					}
					p = { type: "Package", name: name, items: [] };
					packagesByName[name] = p
					p.items.push(child);
					child.parentPackage = p;
					child = p;
					path = path.slice(0, -1);
				}
			}
			break;
		case "Class":
			if(node.isStub != "true") {
				node.path = anchorsById[node.sourceAnchor.ref].fileName;
				node.package = packagesById[node.parentPackage.ref];
				node.package.items.push(node);
				node.subclasses = [];
				node.LOC = 0;
				node.WMC = 0;
				classesById[node.id] = node;
				classes.push(node);
			}
			break;
		case "Inheritance":
			var superclass = classesById[node.superclass.ref];
			var subclass = classesById[node.subclass.ref];
			if((superclass != null) && (subclass != null)) {
				subclass.superclass = superclass;
				superclass.subclasses.push(subclass);
			}
			break;
		case "Method":
			var cnode = classesById[node.parentType.ref];
			if(cnode != null) {
				cnode.WMC += node.CYCLO || 0;
				cnode.LOC += node.LOC || 0;
			}
			break;
		case "FileAnchor":
			anchorsById[node.id] = node;
			break;
		}
	});
	return classes;
}

MSE.createNode = function(type, attrs) { // <- this is defined in msegrammar.js and gets called for each node when parsed
	var metrics = [
		/* class  */ "CBO", "NOA", "NOM", "NOPUBM",
		/* method */ "LOC", "CYCLO" 							
	];
	var node = { type: type };
	$(attrs).each(function(i, a) {
		if(a.name.charAt(0).isLowercase()) {
		 	node[a.name] = (a.values.length > 1) ? a.values : a.values[0];
		} else if(metrics.indexOf(a.name) >= 0) {
			node[a.name] = parseFloat(a.values[0]);
		}
	});
	return node;	
};


CPM = {}

CPM.findRoots = function(items) {
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
	return roots;
}

CPM.calcTotalItems = function (item) {
	item.totalItems = 1;
	if("items" in item) {
		$.each(item.items, function(idx, i) {
			item.totalItems += CPM.calcTotalItems(i);
		});
	}
	return item.totalItems;
}

CPM.getv = function(data, metric) {
	var mi = metric.split("/")
	if(mi.length == 1) {
		return data[metric]
	} else {
		return (data[mi[1]] != 0) ? (data[mi[0]] / data[mi[1]]) : 0
	}
}


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
				div.append("p").attr("class", "filename").text(d.path);
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
				div.style("left", Math.max(ttx - 20, $(window).scrollLeft() + 5) + "px")     
	  		   .style("top", Math.max(tty, $(window).scrollTop() + 5) + "px");
 				div.transition().duration(100).style("opacity", 0.95);
			})
			.on("mouseout", function(d) {       
				div = d3.select("body").select("div.tooltip")
				div.transition().duration(250).style("opacity", 0);
			});
	}
	
	return tooltip;
	
};

String.prototype.isLowercase = function() {
	return this.toLowerCase() == this;
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
};
	