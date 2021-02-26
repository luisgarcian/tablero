function GenChartVtas() {
  // document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "fecini_ant":  myPar3,
    "fecfin_ant":  myPar4,
    "div"   :  myPar5,
  }
  datos   = TraeDatos("chart/vtasnetas.php", Parms);
  let sucursales = datos.filter(item => Filtro.includes(item.Sucursal) );

  // Genera Chart
  VentasNetas_Chart(sucursales, "Titulo", "SubTitulo");
  // Genera Tabla de datos
  DTable_vtasnetas(sucursales);
  // Despliega Totales
  VtasNetas_DespliegaTotales(sucursales)
  
};


function VentasNetas_Chart(data_orig, titulo, subtitulo)
{  
  divCharts(1); // Area para un Chart 

  //Quitar las columnas de porcentaje
  var data = data_orig.map(({IncI,IncU, ...item}) => item);
  
  const vals = ObtieneColumnas(data);

  yAxisLabels = vals[0];
  numberArray1 = [];
  numberArray2 = [];
  numberArray3 = [];
  numberArray4 = [];
  
  //Genera Series de Datos para Chart
  if (vals.length > 0 ) { 
     for (i=1; i <vals.length; i++) {
         str ="dataSeries"+ i +" = vals[" + i + "]";
         eval(str);
         num = "numberArray" + i + "= dataSeries" + i + ".map(el=>parseInt(el)||0)";
         eval (num);
     }
  } 
  
  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });

  let Subtitulo = "<b>Actual : </b>" + LetreroPeriodo(myPar1, myPar2) +'<br>' + "<b>Anterior     : </b>" +LetreroPeriodo(myPar3, myPar4);
  Highcharts.chart('Chart-Container', {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Ventas Netas por Sucursal',
      align: 'center',
      style: {
        fontSize: '20px' 
      }
    },
    subtitle: {
      text: Subtitulo,
      align: 'right',
      x:-30
    },
    xAxis: [{
      gridLineWidth: 1,
      tickWidth: 1,
      categories: yAxisLabels,
      //crosshair: true
    }],
  
    yAxis: [
      { 
        gridLineWidth: 2,
        title: {
          text: 'Importe',
          style: { color: Highcharts.getOptions().colors[10] }
        },
        labels: {
          format: '$ {value}',
          style: { color: Highcharts.getOptions().colors[10] }
        },
      },
      { 
        gridLineWidth: 2,
        title: {
          text: 'Unidades',
          style: { color: Highcharts.getOptions().colors[10] }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[10]
          }
        },
        opposite: true,
      }, 
    ],
    legend: {
      layout: 'horizontal',
      align: 'center',
      x: 10,
      verticalAlign: 'bottom',
      y: 20,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
    },
    plotOptions: {
      series: {
          lineWidth: 2
      }
    },
    tooltip: {
      backgroundColor: '#FCFFC5',
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2,
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: <b>{point.y:,.0f}</b></br>',
      shared: true
    },
    series: [
      {
        name: 'Importe Anterior',
        type: 'column',
        yAxis: 0,
        data: numberArray1,
        maxPointWidth:20,
       color: '#50A5F1',
        tooltip: {
          valuePrefix: '$ '
        }
      },
      {
        name: 'Importe Actual',
        type: 'column',
        yAxis: 0,
        data: numberArray2,
        maxPointWidth:26,
        color: '#F1B44C',  
        tooltip: {
          valuePrefix: '$ '
        }
      },
      {
        name: 'Unidades Anterior',
        type: 'spline',
        yAxis: 1,
        lineWidth :2,
        data: numberArray3,
        color : '#F46A6A',
        marker: {
          enabled: true
        },
        //dashStyle: 'shortdot',
        tooltip: {
          valueSuffix: ' '
        }
      }, 
      {
        name: 'Unidades Actual',
        type: 'spline',
        yAxis: 1,
        lineWidth :3,
        data: numberArray4,
        color : '#34C38F',
        marker: {
          enabled: true
        },
        tooltip: {
          valueSuffix: ' '
        }
      }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 600
        },
        chartOptions: {
          legend: {
            floating: false,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0
          },
          yAxis: [{
            labels: {
              align: 'right',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            labels: {
              align: 'left',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            visible: false
          }]
        }
      }]
    }
  });
  
}



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
        fontSize : 14,
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
        fontSize : 14,
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
          fontSize : 11,
          fontStyle: 'bold',
          autoSkip : false,
          maxRotation: 90,
          minRotation:90
      }
    }]
 }
 
 
function CreaChartVtasNetas(myCtx, Data) {
    //Obtiene un objetos con los valores de las columnas
    
    const vals = ObtieneColumnas(Data);
    //Inicializa los valores de la primera Columna como Labels
    yAxisLabels = vals[0];
    dataSeries1 = [];
    dataSeries2 = [];
    //Crea una variable tipo arreglo para cada valor de columna
    if (vals.length > 0 ) { 
      for (i in vals) {
        var str ="dataSeries"+ i +" = vals[" + i + "]";
        eval(str);
      }
    }
    var chartdata = {
      labels: yAxisLabels,
      datasets: [
        {
          type : 'bar',
          label: 'IMPORTE',
          fill : false,
          borderColor: '#2C3179',
          backgroundColor:  '#2C3179',
          yAxisID: 'y-axis-1',
          data: dataSeries1
        }, //dataset1
        {
          type : 'line',
          label: 'UNIDADES',
          fill : false,
          borderWidth:4,
          
          borderColor: '#F8AC23',
          backgroundColor:  '#F8AC23',
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

  function VtasNetas_DespliegaTotales(datosvta) {
    // Totales    -----------------------------
    let Total_Importe = parseFloat(datosvta[0].Importe_Act);
    let Total_Unidades = parseFloat(datosvta[0].Unidades_Act);
    let PorcImp = parseFloat(datosvta[0].IncI);
    let PorcUni = parseFloat(datosvta[0].IncU);
    ActualizaTotales('', 'Importe', 'Unidades', 0, Total_Importe, Total_Unidades, 0, PorcImp, PorcUni );
  }