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
var data = [600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000,600,1200,600,800,20000,15000,1000,5000,8000];
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
    .on('mouseover',function(){

        tooltip.style.display='block';

        if(window.innerWidth>1000){
            tooltip.style.left= parseInt(d3.select(this).attr('x'),10)+100+barWidth+(window.innerWidth-1000)/2+'px';
        }
        else tooltip.style.left= parseInt(d3.select(this).attr('x'),10)+110+barWidth+'px';

        })
    .on('mouseout',function(){

        tooltip.style.display='none';

    })
    .on('mousemove',function(d,i){

        tooltip.style.top= d3.mouse(this)[1]+50+'px';

        tooltip.innerHTML=data[i]+' Billion';

    });

d3.select('.axes')
    .selectAll('g')
    .data(dataReferencies)
  .enter().append('g')
  .append('text')
    .text(function(d){return d})
    .attr('x',92)
    .attr('y',function(d){return parseInt(scale(d),10)+54;})
            
d3.select('.axes')
    .selectAll('g')
    .selectAll('line')
    .data(dataReferencies)
  .enter().append('line')
    .attr('x1','92')
    .attr('x2','97')
    .attr('y1',function(d){return parseInt(scale(d),10)+50;})
    .attr('y2',function(d){return parseInt(scale(d),10)+50;})

d3.select('svg')
  .append('text')
    .text('Gross Domestic Product, USA')
    .attr('class','blue big')
    .attr('x',500)
    .attr('y',25)

d3.select('svg')
  .append('text')
    .text('Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA)')
    .attr('class','blue small')
    .attr('x',500)
    .attr('y',470)

d3.select('svg')
  .append('text')
    .text('(http://www.bea.gov/national/pdf/nipaguid.pdf)')
    .attr('class','blue small')
    .attr('x',500)
    .attr('y',484)