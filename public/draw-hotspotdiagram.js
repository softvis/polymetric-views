$( document ).ready(function() {
  data.sort(function(a, b) { return a.MCOUNT - b.MCOUNT} )
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 1000)
    .attr("height", 5000);
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.MCOUNT })])
    .range([5, 50]);
  var f = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.LOC })])
    .range([100, 0]);
  var size = function(x) { return Math.max(x, 5)};
  var xp = 2;
  var xp2 = 2
  var yp = 0;
  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { 
      var w = size(x(d.MCOUNT))
      xp += w + 2; 
      if (i % 20 == 0) {
        xp = w + 4; 
      }
      return xp - (w + 2)
    })
    .attr("y", function(d, i) { 
      var w = size(x(d.MCOUNT))
      xp2 += w + 2; 
      if (i % 20 == 0) {
        xp2 = w + 4; 
        yp += w + 2;
      }
      return yp
    })
    .attr("width", function(d) { return size(x(d.MCOUNT)) })
    .attr("height", function(d) { return size(x(d.MCOUNT)) })
    .style("fill", function(d) { return "hsl(200, 80%, " + f(d.LOC) + "%)" });
 });
