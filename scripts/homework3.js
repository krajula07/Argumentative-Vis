
var leftSvg;

var rightSvg;
var rightWidth;
var rightHeight;
var rightInnerHeight;
var rightInnerWidth;
var lineMargin = { top: 20, right: 60, bottom: 60, left: 100 };
var margin = {top: 20, right: 60, bottom: 60, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var mapData;
var timeData;
var placementData;
var year;

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("changed");
  leftSvg = d3.select('#left');
  rightSvg = d3.select('#right');
  rightWidth = +rightSvg.style('width').replace('px','');
  rightHeight = +rightSvg.style('height').replace('px','');;
  rightInnerWidth = rightWidth - lineMargin.left - lineMargin.right;
  rightInnerHeight = rightHeight - lineMargin.top - lineMargin.bottom;

  // Load both files before doing anything else
  Promise.all([d3.csv('data/Placement_Data_Full_Class.csv')])
          .then(function(values){

    placementData = values[0];
   console.log(placementData)

    drawMap();
    drawLineChart();
  })

});



// Draw the map in the #map svg
function drawMap() {

 let experienceData = placementData.filter( d => d.workex == 'Yes');
 let placedwexpData=experienceData.filter( d => d.status == 'Placed');
 //console.log(placedwexpData)
 var count1= Object.keys(placedwexpData).length;
 let notexperienceData = placementData.filter( d => d.workex == 'No');
 let woexpData=notexperienceData.filter( d => d.status == 'Placed');
 var count2=Object.keys(woexpData).length;
 var data1=[{x:'YES',y:count1},{x:"NO",y:count2}]
 
  var svg = d3.select("#left")
  
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 
 var x = d3.scaleBand()
    .range([ 0, 400 ])
    .domain(data1.map(function(d) { return d.x; }))
    .padding(0.1)
    ;
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([50, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));




  svg.selectAll("mybar")
    .data(data1)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", 50)
      .attr("transform", "translate(60,0)")
      .attr("height", function(d) { return height - y(d.y); })
     // .attr("fill", "['green','red']")
      .attr("fill", function(d, i) { 
      
      let val = d.x;
          if (val == "YES") {
            return "green";
          } else {
            return "red";
          } 
      
      
      })

svg.append("text")
    
    .attr("transform",
      "translate(" + (width /1.5) + " ," +
      ( height + margin.top+20) + ")")
    .style("text-anchor", "middle")
    .text("Work Experience(YES/NO)")
    
    svg.append("text")
    
    .attr("transform",
      "translate(" + (200 ) + " ," +
      ( height + margin.top+100) + ")")
    .style("text-anchor", "middle")
    .style("font-style","italic")
    .style("font-size","10px")
    .text("Experience Doesnt Matter Infact Nonexperience people got placements more.")
     svg.append("text")
    
    .attr("transform",
      "translate(" + (200 ) + " ," +
      ( height + margin.top+80) + ")")
    .style("text-anchor", "middle")
    .style("text-decoration", "underline")
    .style("font-style","italic")
    .style("font-size","10px")
    .style("font-weight", "bold")
    .text("Caption:");
    
    
     svg
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -60)
          .attr("x", 0 - (height /2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Number of people got placed")
          ;

svg.append("text")
    .attr("transform",
      "translate(" + (240 ) + " ," +
      (  margin.top) + ")")
    .style("text-anchor", "middle")
    .style("font-size","14px")
        .style("font-weight", "bold")
        .style("font-family","sans-serif")
        .style("font-weight", "700")
        .style("text-decoration", "underline")
    .text("Placements with experience versus without experience.")  
 //console.log(woexpData)

}


// Draw the line chart in the #linechart svg for
// the country argument (e.g., `Algeria').
function drawLineChart() {
 let experienceData = placementData.filter( d => d.workex == 'Yes');
 var Expcount= Object.keys(experienceData).length;
 //console.log(Expcount)
 let placedwexpData=experienceData.filter( d => d.status == 'Placed');
 //console.log(placedwexpData)
 var PlacedWithExpcount= Object.keys(placedwexpData).length;
 //console.log(PlacedWithExpcount)
 let notexperienceData = placementData.filter( d => d.workex == 'No');
 var noExpcount= Object.keys(notexperienceData).length;
 //console.log(noExpcount)
 let woexpData=notexperienceData.filter( d => d.status == 'Placed');
 var PlacedWithoutExpcount= Object.keys(woexpData).length;
 //console.log(PlacedWithoutExpcount)
// console.log(woexpData)
 
var ratioofexperienceplaced=(PlacedWithExpcount/Expcount)*100;
console.log(ratioofexperienceplaced);
var ratioofNonexperienceplaced=(PlacedWithoutExpcount/noExpcount)*100;
console.log(ratioofNonexperienceplaced);
//var data2=[ratioofexperienceplaced,ratioofNonexperienceplaced]
var data2=[{x:'YES',y:ratioofexperienceplaced},{x:'NO',y:ratioofNonexperienceplaced}]


 var svg = d3.select("#right")
  
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 
 var x = d3.scaleBand()
    .range([ 0, 400 ])
    .domain(data2.map(function(d) { return d.x; }))
    .padding(0.1);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data2)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", 50)
      .attr("transform", "translate(60,0)")
      .attr("height", function(d) { return height - y(d.y); })
      .attr("fill", function(d, i) { 
      
      let val = d.x;
          if (val == "YES") {
            return "green";
          } else {
            return "red";
          } 
      
          } 
      
      
    )
      
        svg.append("text")
    
    .attr("transform",
      "translate(" + (width /1.5) + " ," +
      ( height + margin.top+20) + ")")
    .style("text-anchor", "middle")
    .text("Work Experience(YES/NO)")
    
     svg
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -60)
          .attr("x", 0 - (height /2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Percentage of people got placed")
          ;
          
          
           svg.append("text")
    
    .attr("transform",
      "translate(" + (200 ) + " ," +
      ( height + margin.top+80) + ")")
    .style("text-anchor", "middle")
    .style("text-decoration", "underline")
    .style("font-style","italic")
    .style("font-size","10px")
    .style("font-weight", "bold")
    .text("Caption:");
           svg.append("text")
    
    .attr("transform",
      "translate(" + (200 ) + " ," +
      ( height + margin.top+100) + ")")
    .style("text-anchor", "middle")
    .style("font-style","italic")
    .style("font-size","10px")
    .text("Experience  Matters and experienced  people got placements more.");
    
    svg.append("text")
    .attr("transform",
      "translate(" + (240 ) + " ," +
      (  margin.top) + ")")
    .style("text-anchor", "middle")
    .style("font-size","14px")
        .style("font-weight", "bold")
        .style("font-family","sans-serif")
        .style("font-weight", "700")
        .style("text-decoration", "underline")
    .text("Placements with experience versus without experience.")

}
