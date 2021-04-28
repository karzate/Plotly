function metadataTable(x){
    var PANEL=d3.select("#sample-metadata");
    PANEL.html("");
    //find metadata = x names
    d3.json("samples.json").then((data)=>{
        var metaVar = data.metadata;
        var metaArray = metaVar.filter(sampleN=>sampleN.id==x);
        var meta = metaArray[0];
        Object.entries(meta).forEach(([key,value])=>{
            PANEL.append("h6").text(`${key}   ${value}`);
        });
        });
}

function chartDraw(x){
    d3.json("samples.json").then((data)=>{
        var samplesVar = data.samples;
        var sampleArray = samplesVar.filter(sampleN=>sampleN.id==x);
        var sample = sampleArray[0];
        
    //built bar chart
        var ids = sample.otu_ids;
        var labels = sample.otu_labels;
        var values = sample.sample_values;

        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "Id's" },
            hovermode: "closest",
            };
      
        var DataBubble = [
            {
              x: ids,
              y: values,
              text: labels,
              mode: "markers",
              marker: {
                color: ids,
                size: values,
                }
            }
          ];
      
          Plotly.plot("bubble", DataBubble, LayoutBubble);

        var bar_data  =[
            {
                y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x:values.slice(0,10).reverse(),
                text:labels.slice(0,10).reverse(),
                type:"bar",
                orientation:"h"
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria cultures found",
            margin: { t: 30, l:150}

        };
        Plotly.newPlot("bar", bar_data, barLayout )
    });
}


function inicialization(){
    //populate drop down
    var dropDown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var namesVar = data.names;
        namesVar.forEach(element => {
            dropDown.append("option")
            .text(element)
            .property("value",element)
        });

        var firstSample = namesVar[0];
        metadataTable(firstSample);
        chartDraw(firstSample);
    }); 
}

function optionChanged(x){
    metadataTable(x);
    chartDraw(x);

}



inicialization();