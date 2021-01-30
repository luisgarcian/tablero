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
         maxBarThickness: 30,
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
     
  } // Function CreaChartVFP
  

  
function CreaChartVFP_Donut(TituloAdic, myCtx, Data) {

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

// var myChart = new Chart(myCtx, {
//   type: 'pie',
//   data: {
//     labels: yAxisLabels,
//     datasets: [{
//       backgroundColor: [
//         "#2ecc71",
//         "#3498db",
//         "#95a5a6",
//         "#9b59b6",
//         "#f1c40f",
//         "#e74c3c",
//         "#34495e"
//       ],
//       data: dataSeries1
//     }]
//   },
//   options:{
//     animation: {
//           onComplete: function() {
//             var chartInstance = this.chart;
//             var ctx = chartInstance.ctx;
//             ctx.textAlign = "left";
//             ctx.font = "9px sans-serif";
//             ctx.fillStyle = "#000";
//             Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
//               var meta = chartInstance.controller.getDatasetMeta(i);
//               Chart.helpers.each(meta.data.forEach(function(bar, index) {
//                 data = dataset.data[index];
//                   if (i === 0) {
//                   ctx.fillText(data, bar._model.x - 25, bar._model.y - 5);
//                 } else {
//                   ctx.fillText(data, bar._model.x - 25, bar._model.y - 5);
//                 }
//               }), this)
//             }), this);
//           }
//         }
//     }
//   })


//pie chart
var config = {
  type: "pie",
  data: {
    datasets: [
      {
        data: dataSeries1,
        backgroundColor: ["#F1912B", "#FFC000", "#989ABE", "#009D78", "#376092"],
        label: "Dataset 1"
      }
    ],
    labels: yAxisLabels
  },
  options: {
    responsive: true,
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Chart.js Pie Chart"
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};

colors=[];
for(let i=0;i<this.yAxisLabels.length;i++){
  this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
}
var poolColors = function (n) {
  var pool = [];
  for(i=0;i<n;i++){
      pool.push(dynamicColors());
  }
  return pool;
}

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

const myChart = new Chart(myCtx, {
      type: 'pie',
      data: {
        labels: yAxisLabels,
        datasets: [{
          label: 'Formas de Pago',
          data: dataSeries1,
          backgroundColor: poolColors(80),
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

//window.myDoughnut = new Chart(myCtx, config);


}



function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function createChart( data) {

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
  const chartElement = document.getElementById("chartCanvas");
  const dataLength = chartData.data.length;
  const colorScale = d3.interpolateSpectral;  

  const colorRangeInfo = {
    colorStart: 0,
    colorEnd: 1,
    useEndAsStart: true,
  };

  /* Create color array */
  var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

  /* Create chart */
  const myChart = new Chart(chartElement, {
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
      responsive: true,
      legend: {
        display: true,
        position: "left"        
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
