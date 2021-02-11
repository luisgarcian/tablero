const VFP_scales = {
    yAxes: [
      {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          labels: { 
              show:true,
          },
          ticks: {
            beginAtZero:true,
            callback: function(value, index, values) {
              return  formatoMX(value);
            }
          },
          scaleLabel: {
             display: true,
             labelString: 'Crédito'
          }
      }, 
      {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          labels: {
              show:true,
          },
          ticks: {
                 callback: function(value, index, values) {
                     return  formatoMX(value);
                  }
          },
          scaleLabel: {
              display: true,
              labelString: 'Contado'
          }
      },
   ], //fin yAxes
   xAxes: [
     {
         display:true,
         maxBarThickness: 28,
         maxBarLength: 2,  
         gridLines: {
           //display:false
         },
         ticks: {
             fontSize : 10,
             autoSkip : false,
             maxRotation: 45,
             minRotation:45
         }
      }
   ] //fin xAxes
  };
  
// Chart Bar Stacked
function ChartVFP(TituloAdic, myCtx, Data) {
  var dataSeries1 = "";
  var dataSeries2 = "";
  const vals = ObtieneColumnas(Data);

  yAxisLabels = vals[0];
  //Crea una variable tipo arreglo para cada valor de columna
  if (vals.length > 0 ) { 
     for (i in vals) {
         str ="dataSeries"+ i +" = vals[" + i + "]";
         eval(str);
     }
  } 
  var txtTitle1 = "Período Actual del " + myPar1 + " al " + myPar2 + "    " + 
  "Período Anterior del " + myPar3 + " al " + myPar4;
  var config = {
    type: 'bar',
    data: {
        labels: yAxisLabels,
        datasets: [{
            label: "Crédito",  
            backgroundColor: '#104C60',
            data: dataSeries1,
            //backgroundColor: ["#5e4fa2", "#5e4fa2", "#745998", "#745998", "#8a638d", "#8a638d", "#a06d83", "#a06d83", "#b57678", "#b57678", "#cb806e","#cb806e", "#e18a63", "#e18a63"],
            backgroundColor: ["#2C3179","#2C3179", "#407ED3", "#407ED3", "#414799", "#414799", "#121FBC", "#121FBC", "#28CEC5", "#28CEC5", "#6B70BC",  "#77F1EB", "#77F1EB" ],
        }, {
            label: "Contado",
            backgroundColor: '#03CFFC',
            data: dataSeries2,
            //backgroundColor: ["#b57678", "#b57678", "#cb806e","#cb806e", "#e18a63", "#e18a63", "#5e4fa2", "#5e4fa2", "#745998", "#745998", "#8a638d", "#8a638d", "#a06d83", "#a06d83"],
            backgroundColor: ["#EBB40C","#EBB40C", "#DDAF28", "#DDAF28", "#D3AE40", "#D3AE40", "#F2D50B", "#F2D50B", "#DBC630", "#DBC630", "#D1C04A", "#D1C04A", "#CFC26A", "#CFC26A"],
        } ]
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                barPercentage: 0.8,
                categoryPercentage: .95,
                stacked: true,
                ticks: {
                    min: 0,
                    max: 100,
                    padding : 10,
                    autoSkip : false,
                    maxRotation: 90,
                    minRotation:90,
                    callback: function(value){return value }
                }
            }],
            yAxes: [{
                stacked: true
            }]
        },
        title: {
          display: true,
          text:  [ "Ventas por Forma de Pago ", txtTitle1],
          fontSize: 14,
          //fontFamily: 'sans-serif' 
        },

        legend:{
          display: true,
          position: 'bottom',
          label:{
              padding:5,
              boxwidth:15,
              fontFamily:'sans-serif',
              fontColor: 'white',
              fontSize : 2
          }
        },
        tooltips: {
            enabled: true,
            mode: 'index',
            callbacks: {
                label: function(tooltipItems, data) {
                   
                    const type = data.datasets[tooltipItems.datasetIndex].label;
                    const value = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                    valor = "";
                    if (formatoMX(value)  == ".00") { valor = "0"} else { valor = formatoMX(value)};
                    return type + " : " + valor;
                    
                }
            }
        }
    }
  };
  
  var myChart = new Chart(myCtx, config);
 

}



function CreaChartVFP(TituloAdic, myCtx, Data) {

    var dataSeries1 = "";
    var dataSeries2 = "";
    
    //Obtiene un objetos con los valores de las columnas
    const vals = ObtieneColumnas(Data);
    //Inicializa los valores de la primera Columna como Labels
    yAxisLabels = vals[0];
    //Crea una variable tipo arreglo para cada valor de columna
    if (vals.length > 0 ) { 
       for (i in vals) {
           str ="dataSeries"+ i +" = vals[" + i + "]";
           eval(str);
       }
    } 
  
    var chartdata = {
      labels: yAxisLabels,    
      datasets: [
        {
          type : 'bar',
          label: 'CREDITO',
          fill : false,
          borderColor: '#204a58',
          backgroundColor:  '#204a58',
          yAxisID: 'y-axis-1',
          data: dataSeries1
        }, //dataset1
        {
          type : 'bar',
          label: 'CONTADO',
          fill : false,
          borderColor: '#44bcd8',
          backgroundColor:  '#44bcd8',
          yAxisID: 'y-axis-2',
          data: dataSeries2
        }, //dataset2
  
      ] //datasets
    }; //var chartdata
  
    const tooltips = {
      backgroundColor: '#F8AC23',
      titleFontSize :14,
      titleFontColor : '#2C3179',
      bodyFontColor : 'black', 
      xPadding: 20,
      yPadding: 10,
      bodyFontSize:14,
      bodySpacing: 5,
      mode: 'label', // point/label
      callbacks: {
        label: function(tooltipItem, data) {
            //let label = data.labels[tooltipItem.index];
            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return formatoMX(value) ;
        }
      }
    };

    var TxtChart = "Ventas x Forma de Pago " + TituloAdic;
    var myChart = new Chart(myCtx, {
      type : 'bar',
      data: chartdata,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {fill:false}
        },
        title: {
          display: true,
          text: TxtChart,
          fontSize:16,
          fontFamily: 'system-ui' 
        },
        legend:{
          display: true,
          position: 'bottom',
          label:{
              padding:5,
              boxwidth:15,
              fontFamily:'sans-serif',
              fontColor: 'black',
              fontSize : 2
          }
        },
        tooltips: tooltips,
        scales: VFP_scales,
      },
    }) 
    return myChart;
     
  } 
  
// Chart tipo DONA
function createChart( ctx, suc, data, subtitulo) {

  const cols = ObtieneColumnas(data);
  //Inicializa los valores de la primera Columna como Labels
  labels = cols[0];
  //Crea una variable tipo arreglo para cada valor de columna
  if (cols.length > 0 ) { 
     for (i in cols) {
         str ="dataseries"+ i +" = cols[" + i + "]";
         eval(str);
     }
  } 
  const chartData = {
    labels: labels,
    data: dataseries1,
  };
  
  /* Grab chart element by id */
  //const chartElement = document.getElementById("chartCanvas");
  const dataLength = chartData.data.length;
  const colorScale = d3.interpolateSpectral;  

  const colorRangeInfo = {
    colorStart: 0,
    colorEnd: 1,
    useEndAsStart: true,
  };

  /* Create color array */
  var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);
  var Title = "FORMAS DE PAGO " + suc;
  /* Create chart */
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          backgroundColor: COLORS,
          hoverBackgroundColor: COLORS,
          data: chartData.data
        }
      ],
    },
    options: {
      animation: {
        onProgress: function(animation) {
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';

            // Set the font size and text position for the 2nd row in the Chart title
            ctx.font = "bold 14px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.fillStyle = "#666";
            //ctx.fillText(subtitulo, 610, 32);

            // Set the font size and text position for the 3rd row in the Chart title
            //ctx.font = "bold 12px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            //ctx.fillStyle = "#666";
            //ctx.fillText("Local Time | Limit=None", 610, 53);
        }
      }, 
      title: {
        display : true,
        position: 'top',
        text: [  Title, subtitulo ],
        fontSize: 14,
      },
      responsive: true,
      legend: {
        display: true,
        position: "left"        
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return formatoMX(currentValue) + ' (' + percentage + '%)';

          },
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      },
      hover: {
        onHover: function(e) {
          var point = this.getElementAtEvent(e);
          e.target.style.cursor = point.length ? 'pointer' : 'default';
        },

        title: {
          display: true,
          text: "Formas de Pago"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
    
        
      },
    }
  });

  return myChart;
}

function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var { colorStart, colorEnd } = colorRangeInfo;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}

function calculatePoint(i, intervalSize, colorRangeInfo) {
  var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return (useEndAsStart
    ? (colorEnd - (i * intervalSize))
    : (colorStart + (i * intervalSize)));
}
//createChart(Data);
