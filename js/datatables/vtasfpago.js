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
  /////////
  
  // var oTable = $('#myTable').DataTable({
  //   fnFooterCallback: function(row, data, start, end, display) {
  //     var api = this.api();
  //     var footer = $(this).append('<tfoot><tr></tr></tfoot>');
  //      this.api().columns().every(function () {
  //        var column = this;
  //        $(footer).append('<th><input type="text" style="width:100%;"></th>');
  //      });
  //   }
  // });
  
  /////////
    
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
  
  
  
  /*
  
  $(document).ready(function() {
      $('#example').DataTable( {
          "footerCallback": function ( row, data, start, end, display ) {
              var api = this.api(), data;
   
              // Remove the formatting to get integer data for summation
              var intVal = function ( i ) {
                  return typeof i === 'string' ?
                      i.replace(/[\$,]/g, '')*1 :
                      typeof i === 'number' ?
                          i : 0;
              };
   
              // Total over all pages
              total = api
                  .column( 4 )
                  .data()
                  .reduce( function (a, b) {
                      return intVal(a) + intVal(b);
                  }, 0 );
   
              // Total over this page
              pageTotal = api
                  .column( 4, { page: 'current'} )
                  .data()
                  .reduce( function (a, b) {
                      return intVal(a) + intVal(b);
                  }, 0 );
            
  
              // Total filtered rows on the selected column (code part added)
              var sumCol4Filtered = display.map(el => data[el][4]).reduce((a, b) => intVal(a) + intVal(b), 0 );
            
              // Update footer
              $( api.column( 4 ).footer() ).html(
                  '$'+pageTotal +' ( $'+ total +' total) ($' + sumCol4Filtered +' filtered)'
              );
          }
      } );
  } );
  
  */
  
  /*
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
  */
  
  /*
  $(document).ready(function() {
    $('#example').DataTable( {
  
      "columnDefs": [ {
        "targets": [3],
        "render": function() { return "30"}
      }], 
      "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api();
  
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            var ncolumn = 1;
            rendered = api
                .cells( null, ncolumn, { page: 'current'} )
                .render('display')
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
  
            pageTotal = api
                .column( ncolumn, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
  
            // Update footer
            $( api.column( ncolumn ).footer() ).html(
              'Total: '+pageTotal + '(' + rendered +')'
            );
        }
  
  
  
    } );
  } );
  */
  ////////////////
  /*
  var table = $('#tableID').DataTable( {
                      "dom": '<"top"if>t<"bottom"><"clear">',
                      "bSort": false,
                      "paging": false,
                      "bFilter": false,
                  "footerCallback": function(row, data, start, end, display) {
                    var api = this.api();
                   var rcnt=0;
                    api.columns('.sum', {
                      page: 'current'
                    }).every(function() {
                      var sum = this
                        .data()
                        .reduce(function(a, b) {
                          var x = parseFloat(a) || 0;
                          var y = parseFloat(b) || 0;
                          return x + y;
                        }, 0);
                      console.log(sum); //alert(sum);
  
                      if(rcnt==0){
                          $("#foot").append('<td style="background:#a1eaed;color:black; text-align: center;">Total</td>');
                      }else{
                          $("#foot").append('<td style="background:#a1eaed;color:black; text-align: center;">'+sum+'</td>');
                      }
                      rcnt++;
                      //$(this.footer()).html(sum);
                    });
                  }
              } );
  */
  //////////////////
  
  /*
  $(document).ready(function() { $('#example').dataTable( { "footerCallback": function ( row, data, start, end, display ) { var api = this.api(), data; // Remove the formatting to get integer data for summation var intVal = function ( i ) { return typeof i === 'string' ? i.replace(/[\$,]/g, '')*1 : typeof i === 'number' ? i : 0; }; // Total over all pages data = api.column( 4 ).data(); total = data.length ? data.reduce( function (a, b) { return intVal(a) + intVal(b); } ) : 0; // Total over this page data = api.column( 4, { page: 'current'} ).data(); pageTotal = data.length ? data.reduce( function (a, b) { return intVal(a) + intVal(b); } ) : 0; // Update footer $( api.column( 4 ).footer() ).html( '$'+pageTotal +' ( $'+ total +' total)' ); } } ); } );
  */
  