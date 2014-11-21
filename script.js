window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1yf246lvn3AR24QU1YH-3GX-Cb10L8PsJDdOaNGjsBTQ/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  // console.log(data);
  window.data = data;
  drawChart(data);
}

var container = d3.select("#container");

var margin = {top: 0, right: 0, bottom: 0, left: 0};

var width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .domain([0, 8008278])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var y = d3.scale.linear()
    .domain([2000, 1850])
    .range([height, 0]);

svg.append("g")
    .call(xAxis);

function drawChart(data){
  var barGroup = svg.selectAll("g.barGroup")
    .data(data)
    .enter()
    .append("g")
    .attr("class", function(d){ return "barGroup y-" + d.year; })
    .attr("transform", function(d){ return "translate(0," + y(d.year) + ")"; });

  var bars = barGroup
    .append("rect")
    .attr("height", 20)
    .attr("width", function(d){ return x(d.totalpop); })
    .style("fill", "#446abc");

  var barText = barGroup
    .append("text")
    .text(function(d){ return d.year; });

  d3.select("button").on("click", function(d){
    bars
    .transition()
    .duration(function(d, i){ return d.totalpop/1000; } )
    // .delay(function(d, i){ return d.totalpop/1000; })
    .attr("width", function(d){ return x(d.foreignborn); })
    .style("fill", "cyan");
  });


}














