function GenChartVFP() {

  // Primer Nivel por Sucursal
  sel_chart.nivel = 0;
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';

  // Sucursal, FPago, Importe, %
  vtas_data  = TraeDatos_tb(myPar1, myPar2, myPar3, myPar4, myPar5); // Todas las Sucursales

  
  if (sel_chart.seltipo == 0) {
      // Sucursal, FPago, Importe, %
      vtasfp_dt  = AplicaFiltro(vtas_data); // Se aplica el Filtro de Sucursales, se eliminan Totales
      // Sucursal, FPago, Importe, %
      vtasfp_tot = TotalizarCreditoContado(vtasfp_dt); // Se recalculan totales y porc para cada periodo
      //DataTable
      DTable_vtasfpago( vtasfp_tot );
      //Totales
      Totales_vtasfpago(vtasfp_tot);

      //Chart Credito-Contado
      divCharts(1); // Area para un Chart 
      myCtx   = $("#chartCanvas")[0];  
      myCtx.width  = window.innerWidth;
      myCtx.height  = window.innerHeight;

      parms = { "fecini": myPar1, "fecfin": myPar2, "fecini_ant": myPar3, "fecfin_ant": myPar4, "tipo": myPar5, }
      Datos_hc  = TraeDatos("chart/vtasfpago_hc.php", parms);
      Chart_ventasformapago(Datos_hc);

      myCtx.addEventListener("click", function(evento){
        //VFP_DrillDown(evento);
      }); 

  } else {

      //DataTable
      CreaDataTableVFP(vtas_data);

      
      divCharts(0);  // Area para 2 Chart uno para cada periodo
      DividirAreaChartCanvas(1);

      //Formas de Pago Todas las Sucursales
      //***** Chart 1
      
      // filtrar para quitar las sucursales segun filtro y sin Totales
      let SucursalSelected = vtas_data.filter(item => Filtro.includes(item.Sucursal) );
      // filtrar para quitar peridodo ant
      var SucursalSelectedPeriodo1 = SucursalSelected.filter((ren) => !ren['FPago'].includes("_ant") );
      // Agrupar y Acumular Importe por Forma de Pago
      FormasdePagoSUM = groupAndSum(SucursalSelectedPeriodo1, ['FPago'], ['Importe']);
      // Obtener el total de la suma de los importes
      FPagoTot = FormasdePagoSUM.reduce(function(a, b) {
        return a + b.Importe;
      }, 0);
      //Calcular el % por cada Forma de Pago en cada importe y agregarlo como propiedad
      FormasdePagoSUM.forEach(function(itm){
        itm.porc = 100.0 * itm.Importe / FPagoTot;
      });
      //Crear Chart Periodo1
      myCtx    = $("#chartCanvas")[0];  
      periodo1 = LetreroPeriodo(myPar1, myPar2);
      myChart  = createChart(myCtx, "TODAS LAS SUCURSALES", FormasdePagoSUM, periodo1);
      
      //Formas de Pago Todas las Sucursales
      //****** Chart 2
      
      // filtrar para quitar peridodo actual
      var SucursalSelectedPeriodo2 = SucursalSelected.filter((ren) => ren['FPago'].includes("_ant") );
      // Agrupar y Acumular Importe por Forma de Pago
      FormasdePagoSUM2 = groupAndSum(SucursalSelectedPeriodo2, ['FPago'], ['Importe']);
      // Obtener el total de la suma de los importes
      FPagoTot2 = FormasdePagoSUM2.reduce(function(a, b) {
        return a + b.Importe;
      }, 0);
      //Calcular el % por cada Forma de Pago en cada importe y agregarlo como propiedad
      FormasdePagoSUM2.forEach(function(itm){
        itm.porc = 100.0 * itm.Importe / FPagoTot2;
      });
      //Crear Chart Periodo2
      myCtx2   = $("#chartCanvas2")[0];  
      periodo2 = LetreroPeriodo(myPar3, myPar4);
      myChart  = createChart(myCtx2, "TODAS LAS SUCURSALES", FormasdePagoSUM2, periodo2);

  }

  Llena_Filtro(vtas_data, false);
  Check_Filtro(TFiltro);


};

 
function Chart_ventasformapago(data, titulo, subtitulo)
{  

    let filtered = data.filter(item => Filtro.includes(item.sucursal) );
    const vals = ObtieneColumnas(filtered);

    yAxisLabels = vals[0];
    numberArray1 = [];
    numberArray2 = [];
    numberArray3 = [];
    numberArray4 = [];
    
    if (vals.length > 0 ) { 
       for (i=1; i <vals.length; i++) {
           str ="dataSeries"+ i +" = vals[" + i + "]";
           eval(str);
           num = "numberArray" + i + "= dataSeries" + i + ".map(el=>parseInt(el)||0)";
           eval (num);
       }
    } 

    
    let Subtitulo = "<b>Actual : </b>" + LetreroPeriodo(myPar1, myPar2) +'<br>' + "<b>Anterior     : </b>" +LetreroPeriodo(myPar3, myPar4);
    Highcharts.setOptions({
        lang: {
          thousandsSep: ','
      }
    })

    Highcharts.chart('Chart-Container', {
        chart: {
            type: 'column'
        },
        colors : ['#FFE440','#CACCCE','#00BBF9','#6E7072'],
        title: {
            text: 'Ventas por Forma de Pago',
            style: {
              fontSize: '24px',
              fontFamily:'Lucida Grande',             }
            },
        subtitle: {
            text: Subtitulo,
            align: 'center',
            y:50,
        },
        xAxis: [{
            categories: yAxisLabels,
        }],
        yAxis: [{ // Primary yAxis
            title: {
                text: 'Importe de Ventas',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
              formatter: function () {
                return '$' + this.axis.defaultLabelFormatter.call(this);
              },
              style: { color: Highcharts.getOptions().colors[10] }
            },
        }],
        tooltip: {
            shared: true,
            backgroundColor: '#FCFFC5',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 2,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: <b>{point.y}</b></br>',
            positioner: function(labelWidth, labelHeight, point) {
                var tooltipX = point.plotX + 20;
                var tooltipY = point.plotY - 30;
                return {
                    x: tooltipX,
                    y: tooltipY
                };
            }
        },
        plotOptions: {
            column: {
              stacking: 'normal'
            }
        },
        series: [{
            name: 'Crédito Anterior',
            data: numberArray1,
            stack: 'anterior'
          },  {
            name: 'Contado Anterior',
            data: numberArray2,
            stack: 'anterior'
          },{
            name: 'Crédito Actual',
            data: numberArray3,
            stack: 'actual'
          }, {
            name: 'Contado Actual',
            data: numberArray4,
            stack: 'actual'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }
    });
    
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


function DTable_vtasfpago(data) {

  var columns = [];
  
  if (data && data.length) {
 
    var keys = Object.keys(data[0]);
    for (var i = 0; i < keys.length; i++) {
      columns.push( { data : keys[i],  title: keys[i] });
    }
  }
  else {
    columns.push({data: [], title: ""});
  }

  if (miTabla) {
    miTabla.destroy();
    $("#myTable").empty();
  } 
  
  // Credito, Contado por Sucursal 
  //Sucursal, Total, Credito, %Cred, Contado, %Cont
  //    0       1       2       3       4       5
  if (columns.length > 3) { 

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
        scrollY:        false,
        scrollX:        true,
        scrollX: "100%",
        fixedColumns:   true,
        language : {
          "emptyTable": "No se encuentran datos disponibles"
        },
        columnDefs: [
          { targets: [0,1,2,3,4,5], className: 'dt-body-right' },
          { targets: [3,5],
            render: $.fn.dataTable.render.number(',', '.', 1,'','%')
          },
          { targets: [1,2,4],
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
    var head_item = miTabla.columns(2).header();
    $(head_item).html('Crédito');

  }
  else {
    // Formas de Pago Todas las Sucursales o una en específico
    // Forma de pago, Importe, %
    //    0       1       2       
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
        { targets: [0,1,2], className: 'dt-body-right' },
        { targets: [2],
          render: $.fn.dataTable.render.number(',', '.', 1,'','%')
        },
        { targets: [1],
          render: $.fn.dataTable.render.number(',', '.', 0)
        }
      ],
      fnRowCallback: function( nRow, aData, iDisplayIndex ) {
        /* All cells in first row will be bolded  */
        if ( iDisplayIndex == 0 || iDisplayIndex == 1) {
            $('td', nRow).each(function(){
                $(this).addClass('bold');
            });
        }
        return nRow;
      },   
  }).draw();

  miTabla.columns.adjust().draw();
  var head_item = miTabla.columns(0).header();
  $(head_item ).html('Forma de Pago');
  var head_item = miTabla.columns(2).header();
  $(head_item ).html('%');
}



  $('#myTable tbody').on('click', 'tr', function () {
  
    //Drill_Down Chart VFP por Sucursal
    if ( sel_chart.nivel == 0 && sel_chart.seltipo == 0 ) { 
      
      var suc = this.children[0].innerText;
      parms =  {
        "fecini":  myPar1,
        "fecfin":  myPar2,
        "tipo"  :  suc
      }
      if (suc != 'TOTAL') {  
         VFP_Sucursal(suc, parms);
      }
    }
  }) 

}


function Totales_vtasfpago(datosfp) {
  // Totales    -----------------------------
  let Total = parseFloat(datosfp[0].Contado) + parseFloat(datosfp[0].Credito);
  let Credito = parseFloat(datosfp[0].Credito);
  let Contado = parseFloat(datosfp[0].Contado);
  let PorcTot = 100;
  let PorcCre = 0;
  let PorcCon = 0;
  if (Total) { 
    PorcCre = 100 * Credito / Total ;
    PorcCon = 100 * Contado / Total ;
  }
  ActualizaTotales('Total', 'Credito', 'Contado', Total, Credito, Contado, PorcTot, PorcCre, PorcCon );

}
