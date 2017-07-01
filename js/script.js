function callback(Data){
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
////////////////////////////////////////s
//Setting array of data
var data = Data.data.data.map(function(info){return info[1]});
//setting the axes's values
var dataReferencies = [0,3000,6000,9000,12000,15000,18000];

//selecting
var tooltip = document.getElementById('tooltip');
var chart = d3.select('.chart');

//setting the barWidth and adding the width and height of the chart on variables
var width = 800;
var height = 400;
var barWidth = width / data.length;

//Making the scale functions
var scale=d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([height,0]);
        
var scale2=d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([0,height]);

//using the data to make the charts
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
        //setting the tooltip position based on the mouse Y position
        tooltip.style.top= d3.mouse(this)[1]+50+'px';

        var month;
        switch (Data.data.data[i][0][5] + Data.data.data[i][0][6]) {
            case "01":
                month = "January";
                break;
            case "02":
                month = "February";
                break;
            case "03":
                month = "March";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "May";
                break;
            case "06":
                month = "June";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "August";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;
        }

        tooltip.innerHTML=data[i]+' Billion <br/>'+Data.data.data[i][0].slice(0,4)+' '+month;

    });

//setting the axes numbers
d3.select('.axes')
    .selectAll('g')
    .data(dataReferencies)
  .enter().append('g')
  .append('text')
    .text(function(d){return d})
    .attr('x',92)
    .attr('y',function(d){return parseInt(scale(d),10)+54;});

//setting the axes lines     
d3.select('.axes')
    .selectAll('g')
    .selectAll('line')
    .data(dataReferencies)
  .enter().append('line')
    .attr('x1','92')
    .attr('x2','97')
    .attr('y1',function(d){return parseInt(scale(d),10)+50;})
    .attr('y2',function(d){return parseInt(scale(d),10)+50;});

//setting the text
d3.select('svg')
  .append('text')
    .text('Gross Domestic Product, USA')
    .attr('class','blue big')
    .attr('x',500)
    .attr('y',25);

d3.select('svg')
  .append('text')
    .text('Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA)')
    .attr('class','blue small')
    .attr('x',500)
    .attr('y',470);

d3.select('svg')
  .append('text')
    .text('(http://www.bea.gov/national/pdf/nipaguid.pdf)')
    .attr('class','blue small')
    .attr('x',500)
    .attr('y',484);
}
//making the call to get the data
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then(callback);