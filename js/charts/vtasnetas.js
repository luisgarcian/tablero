
function GenChartVtas(datos =[]) {
  $( "#btnFiltro" ).prop( "disabled", false );
  
  if (datos === undefined || datos.length == 0 ) {
    // Obtener datos con fechas sin filtro de estuctura
    Parms =  { "fecini":  myPar1,  "fecfin":  myPar2,  "fecini_ant":  myPar3, "fecfin_ant":  myPar4, "div" :  myPar5 }
    datos   = TraeDatos("chart/vtasnetas.php", Parms);
  } 
  //Filtras sucursales 
  let sucursales = [];
  if (Filtro.length> 0 ) { 
    sucursales = datos.filter(item => Filtro.includes(item.Sucursal) );
  }  
  else {
    sucursales =  datos;
  }

  // Genera Chart
  Chart_ventasnetas(sucursales, "Titulo", "SubTitulo");
  // Genera Tabla de datos
  DTable_vtasnetas(sucursales);
  // Despliega Totales
  Totales_ventasnetas(sucursales);

  if (!Filtro.length) { 
    Carga_Filtro_Sucursales(sucursales, false);
    Check_Filtro_Sucursales(TFiltro, sucursales);
  }

};


function Chart_ventasnetas(data_orig, titulo, subtitulo)
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
        fontSize: '24px',
        fontFamily: 'Work Sans",sans-serif'
        //fontFamily:'Lucida Grande',
      }
    },
    subtitle: {
      text: Subtitulo,
      align: 'center',
      y:50
    },
    xAxis: [{
      gridLineWidth: 1,
      tickWidth: 1,
      categories: yAxisLabels,
      //crosshair: true
    }],
  
    yAxis: [
      { 
        startOnTick: false,
        endOnTick : false,
        showLastlabel: true,
        gridLineWidth: 2,
        title: {
          text: 'Importe',
          style: { color: Highcharts.getOptions().colors[10] }
        },
        labels: {
          //format: '$ {value}',
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          },
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
          overflow: "justify",
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
        maxPointWidth:25,
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
        maxPointWidth:25,
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
        lineWidth :2,
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

  });
  
}


function DTable_vtasnetas(data_orig) {
  var columnas = [];
  
  if (miTabla) {
    miTabla.destroy();
    $("#myTable").empty();
  } 

  data = TotalizarVtasNetas(data_orig);
  if (data && data.length) {
 
    var keys = Object.keys(data[0]);
    for (var i = 0; i < keys.length; i++) {
      columnas.push( { data : keys[i],  title: keys[i] });
    }
  }
  else {
    columnas.push({data: [], title: ""});
  }
 
  columns2 = [
    {
      data: 'Sucursal'
    },
    {
      data: 'Importe_Act'
    },
    {
      data: 'Importe_Ant'
    },
    {
      data: 'IncI',
      render : function(data, type, row) {
        if (type === 'display') {

          var dateSplit = data.split('.');
          var num = dateSplit[0] +'.'+ dateSplit[1].substring(0,1) ;
          
            if (data < 0 ) {
              return '<img src="' +  'img/trending-down.png' + '" alt="' + '' + '"height="16" width="16"/>' + ' ' +  num  + '%';
            }
            else {
              return '<img src="' +  'img/trending-up.png' + '" alt="' + '' + '"height="16" width="16"/>' + ' '+  num + '%';
            }
            //Math.round( ( row.price - row.cost ) / row.price * 100 )+'%';

            /*
            
            
            */
            return data;
        }
      }

    },
    {
      data: 'Unidades_Act'
    },
    {
      data: 'Unidades_Ant',
    },
    {
      data: 'IncU',
      render : function(data, type, row) {
       
        if (type === 'display') {
          var dateSplit = data.split('.');
          var num = dateSplit[0] +'.'+ dateSplit[1].substring(0,1) ;

            if (data < 0 ) {
              return '<img src="' +  'img/trending-down.png' + '" alt="' + '' + '"height="16" width="16"/>' + ' ' +  num + '%';
            }
            else {
              return '<img src="' +  'img/trending-up.png' + '" alt="' + '' + '"height="16" width="16"/>' + ' '+  num + '%';
            }
           
        }
      }
    }
  ];
  
  miTabla = $("#myTable").DataTable( {
      data     : data,
      columns  : columns2,
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
      scrollY:        false,
      scrollX:        true,
      scrollX: "100%",
      fixedColumns:   true,
      language : {
        "emptyTable": "No se encuentran datos disponibles"
      },
      columnDefs: [
        { targets: [0,1,2,3,4,5,6], className: 'dt-body-right' },
        { targets: [3,6],
          render: $.fn.dataTable.render.number(',', '.', 1,'','%')
        },
        { targets: [1,2,4,5],
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
   var head_Inc_Imp = miTabla.columns(3).header();
   var head_Inc_Uni = miTabla.columns(6).header();
   $(head_Inc_Imp).html('Inc %');
   $(head_Inc_Uni).html('Inc %');
   var head_ImpAct = miTabla.columns(1).header();
   var head_ImpAnt = miTabla.columns(2).header();
   $(head_ImpAct).html('Importe Actual');
   $(head_ImpAnt).html('Importe Anterior');
   var head_UniAct = miTabla.columns(4).header();
   var head_UniAnt = miTabla.columns(5).header();
   $(head_UniAct).html('Unidades Actual');
   $(head_UniAnt).html('Unidades Anterior');
}

function TotalizarVtasNetas(data) {
  var objTotal = [];
  var total_importe_act = 0;
  var total_importe_ant = 0;
  var total_unidades_act = 0;
  var total_unidades_ant = 0;
  $.each(data, function(index, value) {
      total_importe_act += parseFloat(value.Importe_Act);
      total_importe_ant += parseFloat(value.Importe_Ant);
      total_unidades_act += parseInt(value.Unidades_Act);
      total_unidades_ant += parseInt(value.Unidades_Ant);
  });
  var Inc_Importe  = 0;
  var Inc_Unidades = 0;
  if (total_importe_ant) {
      Inc_Importe  =  100.0 * (total_importe_act - total_importe_ant) / total_importe_ant;
  }
  if (total_unidades_ant) {
     Inc_Unidades =  100.0 * (total_unidades_act - total_unidades_ant) / total_unidades_ant;
  }
  
  objTotal  = {
    "Sucursal"     : 'TOTAL',
    "Importe_Act"  : total_importe_act.toFixed(2),
    "Importe_Ant"  : total_importe_ant.toFixed(2),
    "IncI"         : Inc_Importe.toFixed(6),
    "Unidades_Act" : total_unidades_act.toFixed(0),
    "Unidades_Ant" : total_unidades_ant.toFixed(0),
    "IncU"         : Inc_Unidades.toFixed(6),
  }
  
  // Se agregan totales al principio 
  data.unshift(objTotal);
  
  return data;
}



function Totales_ventasnetas(datosvta) {
    // Totales    -----------------------------
    let Total_Importe = parseFloat(datosvta[0].Importe_Act);
    let Total_Unidades = parseFloat(datosvta[0].Unidades_Act);
    let PorcImp = parseFloat(datosvta[0].IncI);
    let PorcUni = parseFloat(datosvta[0].IncU);
    ActualizaTotales('', 'Importe', 'Unidades', 0, Total_Importe, Total_Unidades, 0, PorcImp, PorcUni );
}