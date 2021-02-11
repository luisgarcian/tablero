function DTable_vtasfpago(data) {
    var columns = [];
    
    if (miTabla) {
      miTabla.destroy();
      $("#myTable").empty();
    } 
  
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
  
  
   /* $('table.display tr').hover(function(){
         $(this).css('background-color','#c9ced3'); // '#EC932F' naranja
    });
  
    $('table.display tr').mouseout(function(){
         $(this).css('background-color','#f9f9f9'); 
    });   */
   
  }
  

  
  
  
    } );
  
  }
  
  