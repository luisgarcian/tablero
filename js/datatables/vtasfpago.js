
//Tabla de datos para período actual 
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
  
    }
    else {
      // Formas de Pago Todas las Sucursales o una en específico
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
          if ( iDisplayIndex == 0 ) {
              $('td', nRow).each(function(){
                  $(this).addClass('bold');
              });
          }
          return nRow;
        },   
    }).draw();

  }

  var table = $('#myTable').DataTable();
  table.columns.adjust().draw();
  
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


//Tabla de datos para período anterior
function DTable_vtasfpago2(data) {
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

    if (miTabla2) {
      miTabla2.destroy();
      $("#myTable2").empty();
    } 

    if (columns.length > 3) { 

      miTabla2 = $("#myTable2").DataTable( {
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
  
    }
    else {
      
      miTabla2 = $("#myTable2").DataTable( {
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
          if ( iDisplayIndex == 0 ) {
              $('td', nRow).each(function(){
                  $(this).addClass('bold');
              });
          }
          return nRow;
        }
    }).draw();

    }

    var table = $('#myTable2').DataTable();
    table.columns.adjust().draw();
   
  }

   
   

  
  
  
  
  
  