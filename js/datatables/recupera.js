function Recupera_DTable(data_orig) {
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

  
  
  
  
  
  