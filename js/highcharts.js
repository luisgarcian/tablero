function HighChart(data, titulo, subtitulo)
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
                fontSize: '26px',
               fontFamily:'Franklin Gothic'
             }
        },
        subtitle: {
            text: Subtitulo,
            align: 'right',
            x:-30
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