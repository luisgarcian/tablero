function DTable_opnegadas(data) {
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
        columnDefs: [
          { targets: [0],        className: 'dt-body-center'},
          { targets: [1,2,3,4,5],className: 'dt-body-right' },
          { targets: [2,4,5],
            render: $.fn.dataTable.render.number(',', '.', 1, '', '%')
          },
          { targets: [1,3],
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
  
  
<<<<<<< HEAD
   /* $('table.display td').hover(function(){
         $(this).css('background-color','#EC932F'); 
    });
  
    $('table.display td').mouseout(function(){
         $(this).css('background-color','#f9f9f9'); 
    });   */
=======
    $('table.display tr').hover(function(){
      $(this).css('background-color','#c9ced3'); 
    });

    $('table.display tr').mouseout(function(){
      $(this).css('background-color','#f9f9f9'); 
    });   
>>>>>>> 92f36363cd5c565762b5579d7d7e01a1643a5270
  
    $('#myTable tbody').on('click', 'tr', function () {
  
      $(document).find('tr').removeClass("dtSelected");
      $(miTabla.row(this).selector.rows).addClass("dtSelected");
    
      //Drill_Down Chart OpcNeg
      if (NChart == 1 && sel_chart.nivel == 0) { 
        
        var suc = this.children[0].innerText;
        parms =  {
          "fecini":  myPar1,
          "fecfin":  myPar2,
          "tipo"  :  suc,
        }
        OpNeg_Vendedor(suc, parms);
      }
  
    } );
  
  }
  
  
  
