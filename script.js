window.onload = function() { init() };

//links to public google spreadsheet
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

//select the container div and define it as a variable
var container = d3.select("#container");

//this is where you define the margin of the SVG rectangle
var margin = {top: 0, right: 0, bottom: 0, left: 0};

//dimension of the SVG rectangle
var width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//create the SVG rectangle
var svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//this adds the scale and axis
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














