//Adding The SVG and The 2 main Groups
d3.select('#app')
  .append('svg')
    .attr('height',500)
    .attr('width',1000)
  .append('g')
    .attr('class','axes')
  .append('line')
    .attr('x1',99)
    .attr('x2',99)
    .attr('y1',50)
    .attr('y2',450);

d3.select('svg')
  .append('g')
    .attr('class','chart')
    .attr('transform','translate(100,50)')
    .attr('height',400)
    .attr('width',800);
////////////////////////////////////////
//Setting some arrays of data
var data = [600,1200,600,800,20000,15000,1000,5000,8000];
var dataReferencies = [0,3000,6000,9000,12000,15000];

var tooltip = document.getElementById('tooltip');
var chart = d3.select('.chart');

var width = 800;
var height = 400;
var barWidth = width / data.length;

var scale=d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([height,0]);
        
var scale2=d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([0,height]);

chart.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('y',function(d){return scale(d)})
    .attr('x',function(d,i){return barWidth*i})
    .attr('width',barWidth)
    .attr('height',function(d){return scale2(d)})
