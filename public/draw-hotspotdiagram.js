$( document ).ready(function() {
  data.sort(function(a, b) { return a.MCOUNT - b.MCOUNT} )
  var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 1000)
    .attr("height", 1000);
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.MCOUNT })])
    .range([0, 100]);
  var f = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.LOC })])
    .range([100, 0]);
  var xp = 2;
  var xp2 = 2
  var yp = 0;
  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { 
      var w = x(d.MCOUNT)
      xp += w + 2; 
      if (xp > 1000) {
        xp = w + 4; 
      }
      return xp - (w + 2)
    })
    .attr("y", function(d, i) { 
      var w = x(d.MCOUNT)
      xp2 += w + 2; 
      if (xp2 > 1000) {
        xp2 = w + 4; 
        yp += w + 2;
      }
      return yp
    })
    .attr("width", function(d) { return x(d.MCOUNT) })
    .attr("height", function(d) { return x(d.MCOUNT) })
    .style("fill", function(d) { return "hsl(200, 80%, " + f(d.LOC) + "%)" });
 });
