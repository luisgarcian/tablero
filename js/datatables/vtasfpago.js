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
        }
    }).draw();
  
  
 /*   $('table.display td').hover(function(){
         $(this).css('background-color','#EC932F'); 
    });
  
    $('table.display td').mouseout(function(){
         $(this).css('background-color','#f9f9f9'); 
    });   */
  
    $('#myTable tbody').on('click', 'tr', function () {
  
      $(document).find('tr').removeClass("dtSelected");
      $(miTabla.row(this).selector.rows).addClass("dtSelected");
    
      //Drill_Down Chart VFP por Sucursal
      if ( sel_chart.nivel == 0 && sel_chart.seltipo == 0 ) { 
        
        var suc = this.children[0].innerText;
        parms =  {
          "fecini":  myPar1,
          "fecfin":  myPar2,
          "tipo"  :  suc,
        }
        if (suc != 'TOTAL') {  
           VFP_Sucursal(suc, parms);
        }
      }
  
    } );
  
  }
  
  