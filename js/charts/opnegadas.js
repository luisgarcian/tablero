
 const negadas_scales = {
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
             labelString: 'Opciones'
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
              labelString: 'Negadas'
          }
      },
      {  
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-3",
          labels: {
              show:true,
          },
          ticks: {
             callback: function(value, index, values) {
                return  formatoMX(value) + "%";
             }
          },
          scaleLabel: {
              display: true,
              labelString: 'Porcentaje'
          }
      }
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
             maxRotation: 90,
             minRotation:90
         }
      }
   ] //fin xAxes
  };

  function CreaChartOpcNeg(TxtNivel, myCtx, Data) {

    var dataSeries1 = "";
    var dataSeries2 = "";
    var dataSeries3 = "";
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
          label: 'OPCIONES',
          fill : false,
          borderColor: '#00acc1',
          backgroundColor:  '#00acc1',
          yAxisID: 'y-axis-1',
          data: dataSeries1
        }, //dataset1
        {
          type : 'bar',
          label: 'NEGADAS',
          fill : false,
          borderColor: '#d7df23',
          backgroundColor:  '#d7df23 ',
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
    var TxtChart = "Opciones Negadas " + TxtNivel;
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
        scales: negadas_scales,
      },
    }) 
    return myChart;
     
  } // Function CreaChartOpcNegadas
  