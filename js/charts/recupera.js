function GenChartRecupera() {

  parms =  { "fecini":  myPar1, "fecfin":  myPar2, "fecini_ant":  myPar3, "fecfin_ant":  myPar4  };
  datos   = TraeDatos("chart/recupera.php", parms);
  
  // Genera Chart
  Chart_recupera(datos, "Titulo", "SubTitulo");
  // Genera Tabla de datos
  DTable_recupera(datos);
  // Despliega Totales
  DespliegaTotales_recupera(datos)

};


function Chart_recupera(data_orig, titulo, subtitulo)
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
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          },
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


function DTable_recupera(data_orig) {
  var columns = [];
  
  if (miTabla) {
    miTabla.destroy();
    $("#myTable").empty();
  } 

  data = TotalizarRecupera(data_orig);
  if (data && data.length) {
 
    var keys = Object.keys(data[0]);
    for (var i = 0; i < keys.length; i++) {
      columns.push( { data : keys[i],  title: keys[i] });
    }
  }
  else {
    columns.push({data: [], title: ""});
  }

  
  miTabla = $("#myTable").DataTable( {
      data     : data,
      columns  : columns,
      paging   : false,
      info     : false,
      searching: false,
      autoWidth: true,
      ordering : false,
      bFilter  : false,
      bDestroy : true,
      fixedColumns: {
        leftColumns: 2
      },
      scrollY:        400,
      scrollX:        true,
      fixedColumns:   true,
      language : {
        "emptyTable": "No se encuentran datos disponibles"
      },
      columnDefs: [
        { targets: [0,1,2,3], className: 'dt-body-center' },
        { targets: [3],
          render: $.fn.dataTable.render.number(',', '.', 1,'','%')
        },
        { targets: [1,2],
          render: $.fn.dataTable.render.number(',', '.', 0)
        }
      ],
      fnRowCallback: function( nRow, aData, iDisplayIndex ) {
        /* All cells in first row will be bolded  */
        if ( iDisplayIndex == 0 ) {
            $('td', nRow).each(function(){
                $(this).addClass('bold');
            });
        }
        return nRow;
        },   
  }).draw();


  miTabla.columns.adjust().draw();
  var TipoDist = miTabla.columns(0).header();
  var Neto_ant = miTabla.columns(1).header();
  var Neto_act = miTabla.columns(2).header();
  var Incremento = miTabla.columns(3).header();
  $(TipoDist).html('Tipo Distribuidor');
  $(Neto_ant).html('Neto Anterior');
  $(Neto_act).html('Neto Actual');
  $(Incremento).html('% Incremento');
  
}



function TotalizarRecupera(data) {
  var objTotal = [];
  var total_importe_act = 0;
  var total_importe_ant = 0;
  $.each(data, function(index, value) {
      total_importe_act += parseFloat(value.neto);
      total_importe_ant += parseFloat(value.neto_ant);
  });
  var Inc_Importe  = 0;
  if (total_importe_ant) {
      Inc_Importe  =  100.0 * (total_importe_act - total_importe_ant) / total_importe_ant;
  }
  
  objTotal  = {
    "tipodistrib" : "TOTAL",
    "neto_ant"    : total_importe_ant.toFixed(2),
    "neto"        : total_importe_act.toFixed(2),
    "inc"         : Inc_Importe.toFixed(6),
  }
  
  // Se agregan totales al principio 
  data.unshift(objTotal);
  
  return data;
}





function DespliegaTotales_recupera(datos) {
    // Totales    -----------------------------
    let Total_ant = parseFloat(datos[0].neto_ant);
    let Total_act = parseFloat(datos[0].neto);
    let Porc = parseFloat(datos[0].inc);
    
    ActualizaTotales('', 'Neto Actual', 'Neto Anterior', 0, Total_ant, Total_act, 0, 0, Porc );
}

