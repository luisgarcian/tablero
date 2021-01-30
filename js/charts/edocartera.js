const ecartera_scales = {
    yAxes: [
      {
          type: "bar",
          stacked:true,
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
             labelString: 'Pesos'
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


function CreaChartEdoC(myCtx, Data) {
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
          label: 'PESOS',
          options: 'barOptions_stacked',
          fill : false,
          borderColor: '#204a58',
          backgroundColor:  '#204a58',
          yAxisID: 'y-axis-1',
          data: dataSeries1
        }, //dataset1
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
          text: 'Estado Cartera',
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
        tooltips: {
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
                let label = data.labels[tooltipItem.index];
                let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return formatoMX(value) ;
            }
        }
      },
       scales: ecartera_scales
      },
    }) 
  
    return myChart;
  
  } // Function CreaChartEdoC
  