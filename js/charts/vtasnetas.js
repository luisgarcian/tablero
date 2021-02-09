const vtas_scales = {
    yAxes: [{
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
           return '$' + formatoMX(value);
        }
      },
      scaleLabel: {
         display: true,
         labelString: 'Importe'
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
        labelString: 'Unidades'
     }
    }],
    xAxes: [{
      maxBarThickness: 30,
      maxBarLength: 2,  
      display:true,
      gridLines: {
        //display:false
      },
      ticks: {
          fontSize : 10,
          autoSkip : false,
          maxRotation: 45,
          minRotation:45
      }
    }]
 }
 
 
function CreaChartVtasNetas(myCtx, Data) {
    //Obtiene un objetos con los valores de las columnas
    const vals = ObtieneColumnas(Data);
    //Inicializa los valores de la primera Columna como Labels
    yAxisLabels = vals[0];
    //Crea una variable tipo arreglo para cada valor de columna
    for (i in vals) {
        var str ="dataSeries"+ i +" = vals[" + i + "]";
        eval(str);
    }
  
    var chartdata = {
      labels: yAxisLabels,
      datasets: [
        {
          type : 'bar',
          label: 'IMPORTE',
          fill : false,
          borderColor: '#204a58',
          backgroundColor:  '#204a58',
          yAxisID: 'y-axis-1',
          data: dataSeries1
        }, //dataset1
        {
          type : 'line',
          label: 'UNIDADES',
          fill : false,
          borderWidth:4,
          
          borderColor: '#0DDCE3',
          backgroundColor:  '#0DDCE3',
          data: dataSeries2,
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          yAxisID: 'y-axis-2'
        } //dataset2
      ] //datasets
    }; //var chartdata
  
   
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
          text: 'Ventas Netas',
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
              fontColor: 'white',
              fontSize : 2
          }
        },
        tooltips: {
          backgroundColor: '#31302D',
          titleFontSize :14,
          titleFontColor : '#FFFFFF',
          bodyFontColor : 'white',
          opacity: 2,
          xPadding: 20,
          yPadding: 10,
          bodyFontSize:14,
          bodySpacing: 5,
          mode: 'label', // point/label
          callbacks: {
            label: function(tooltipItem, data) {
                let label = data.labels[tooltipItem.index];
                let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return formatoMX(value) ;
            }
        }
      },
       scales: vtas_scales
      },
    }) 
  
    return myChart;
  
  } // Function CreaChartVtasNetas