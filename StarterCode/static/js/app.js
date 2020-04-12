function findVirus(samples) {
  
    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;         
        
        var bigData = metadata.filter(meta => meta.id.toString() === samples)[0];      
         
        var panelDemo = d3.select("#sample-metadata"); 
       
        panelDemo.html(""); 
        
        Object.entries(bigData).forEach(([key, value]) => {   
        
            panelDemo.append("h6").text(`${key}: ${value}`);    
       
        });
    });
};

function makeChart(samples) {
    d3.json("samples.json").then((data) => {
        
        var circle = data.samples;

        var getId = circle.filter(meta => meta.id.toString() == samples)[0]; 

        var otuId = getId.otu_ids; 

       
        var otuLabel = getId.otu_labels; 

        var getSample = getId.sample_values; 
            
        var circleLayout = {
          
            xaxis:{title: "Bubble Chart"},
            height: 650,
            width: 1100
        };
        var circleData = [{ 
            x: otuId, 
            y: getSample, 
            text: otuLabel, 
            mode: "markers",
            marker: {
                size: getSample, 
                color: otuId} 
        }];
        Plotly.newPlot("bubble", circleData, circleLayout); 
        
        var barId = otuId.slice(0, 10).map(ID2 => `OTU ${ID2}`).reverse();
      
        var barData = [{ 
            y: barId,
            x: getSample.slice(0, 10).reverse(),
            text: otuLabel.slice(0, 10).reverse(),
            marker: {
                color: ["yellow", "creme","lightblue","lightgreen","maroon", 
                "purple", "lightbrown", "gray", "darkgreen", "salmon"]},
            type:"bar",
            orientation: "h"
        }];
        var barLayout = {
            title: "First 10 OTU data",
            margin: {
                t: 30,
                l: 150
            }
        };
        Plotly.newPlot("bar", barData, barLayout);
    });
};

function init() {

    var dropdown = d3.select("#selDataset"); 

    d3.json("samples.json").then((data) => { 
        
        var sampleNames = data.names;

        sampleNames.forEach((sample) => { 
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });
       
        var firstSample = sampleNames[0]; 
        makeChart(firstSample); 
        findVirus(firstSample);
      
    });
}

function optionChanged(newSample) { 
    makeChart(newSample);
    findVirus(newSample);
    
}

init(); 