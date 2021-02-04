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
  
              footerCallback : function ( row, data, start, end, display ) {
                  var api = this.api();
                  nb_cols = api.columns().nodes().length;
                  var j = 2;
                  while(j < nb_cols){
                      var pageTotal = api
                  .column( j, { page: 'current'} )
                  .data()
                  .reduce( function (a, b) {
                      return Number(a) + Number(b);
                  }, 0 );
            // Update footer
            $( api.column( j ).footer() ).html(pageTotal);
                      j++;
                  } 
              },   
  
        language : {
          "emptyTable": "No se encuentran datos disponibles"
        }
    }).draw();
  
  
    $('table.display td').hover(function(){
         $(this).css('background-color','#EC932F'); 
    });
  
    $('table.display td').mouseout(function(){
         $(this).css('background-color','#f9f9f9'); 
    });   
  
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
  
  
  
