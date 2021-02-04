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
  


function createChart( suc, data) {

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
  var Title = "FORMAS DE PAGO " + suc;
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
      title: {
        display : true,
        text: Title,
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
