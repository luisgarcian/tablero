function DTable_vtasnetas(data_orig) {
    var columns = [];
    
    if (miTabla) {
      miTabla.destroy();
      $("#myTable").empty();
    } 

    data = TotalizarVtasNetas(data_orig);
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

  
  
  
  
  
  