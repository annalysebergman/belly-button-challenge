// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
d3.json(url).then(data=>{console.log(data)})


// extract data from json
var bio_data = d3.json(url).then(d => d);

function init() {
  // Drop down menu
  let dropdownMenu = d3.select("#selDataset");
  
  bio_data.then((data) => {
    let ind_names = data.names;
    ind_names.forEach((individual) => {
      dropdownMenu
        .append("option")
        .text(individual)
        .property("value", individual);
    });
  
    createCharts(940);
    demographicInfo(940);
  });
  }

// Initialize the html
 init();

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function createCharts(individual) {

let data = [
  {
    x:values.slice(0,10).reverse(),
    y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    text:labels.slice(0,10).reverse(),
    type:"bar",
    orientation:"h"

  }
];
  
  let layout = {
    title: 'Top 10 OTUs found'
  };
  
  Plotly.newPlot("bar", data, layout);
  
// Create a bubble chart that displays each sample.
let bubbleData = [ 
  {
    x: ids,
    y: values,
    text: labels,
    mode: "markers",
    marker: {
      color: ids,
      size: values,
      colorscale: 'Portland'
      }
  }
];
//create bubble chart layout
let bubbleLayout = {
    xaxis: { title: "OTU ID" },
    hovermode: "closest",
    };


Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  }

// Metadata
function metadata(name) {

  d3.select('#sample-metadata')
      .selectAll('p')
      .remove();

  bio_data.then(function(d) {
      let results = d.metadata.filter(subject => subject.id == name)[0];

      for (const [key, value] of Object.entries(results)) {
          
          d3.select('#sample-metadata')
              .append('p')
              .text(`${key}: ${value}`)
              .property('value', value)
      };
  });
};

// Reset
function optionChanged(newsample) {

  createCharts(newsample);
}