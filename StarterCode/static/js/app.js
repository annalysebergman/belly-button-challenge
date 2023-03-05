// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// extract data from json
var belly_data = d3.json(url).then(d => d);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
let trace1 = {
    x: sample_values,
    y: otu_ids,
    type: 'bar',
    orientation:'h'
  };
  
  let data = [trace1];
  
  let layout = {
    title: 'Top 10 OTUs found'
  };
  
  Plotly.newPlot("plot", data, layout);
  
// Create a bubble chart that displays each sample.
function plotBubble {(

    belly_data.then(function(d) {
        let results = d.samples.filter(subject => subject.id == name)[0];

        let trace1 = {
            x: results.otu_ids,
            y: results.sample_values,
            text: results.otu_labels,
            mode: 'markers',
            marker: {
                size: results.sample_values.map(value => Math.sqrt(value)*8),
                color: results.otu_ids
            }
        };

        let data = [trace1];
        }); 

        Plotly.newPlot('bubble', data, layout);
    )};
