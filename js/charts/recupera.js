function GenChartRecupera() {

  //Seleccion =   $('#FiltroSucursales option:selected').map(function(a, item){return item.value;});
  //GeneraFiltroSucursales(Seleccion, false);
  
  parms =  { "fecini":  myPar1, "fecfin":  myPar2, "fecini_ant":  myPar3, "fecfin_ant":  myPar4  };
  datos   = TraeDatos("chart/recupera.php", parms);
  
  // Genera Chart
  Recupera_Chart(datos, "Titulo", "SubTitulo");
  // Genera Tabla de datos
  Recupera_DTable(datos);
  // Despliega Totales
  Recupera_DespliegaTotales(datos)

};


function Recupera_Chart(data_orig, titulo, subtitulo)
{  
  divCharts(1); // Area para un Chart 

  //Quitar las columnas de porcentaje
  //var data = data_orig.map(({IncI,IncU, ...item}) => item);
  
  //quitar columna de incremento
  var data = data_orig.map(({inc, ...item}) => item);

  const vals = ObtieneColumnas(data);

  yAxisLabels = vals[0];
  numberArray1 = [];
  numberArray2 = [];
  
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
      text: 'Recuperacion de Cartera',
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
      }
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


function Recupera_DespliegaTotales(datos) {
    // Totales    -----------------------------
    let Total_ant = parseFloat(datos[0].neto_ant);
    let Total_act = parseFloat(datos[0].neto);
    let Porc = parseFloat(datos[0].inc);
    
    ActualizaTotales('', 'Neto Actual', 'Neto Anterior', 0, Total_ant, Total_act, 0, 0, Porc );
}

