var Charts = [
  {"titulo" : "Ventas Netas",   "funcion": "GenChartVtas",  "Tit1"   : "Ventas Totales", "Tit2": "Unidades Totales"
  },
  {"titulo" : "Opciones Negadas", "funcion": "GenChartOpcs", "Tit1"   : "Opciones", "Tit2": "Negadas"
  },
  {"titulo" : "Estado Cartera",   "funcion": "GenChartEdoC", "Tit1"   : "Estado", "Tit2": "Cartera"
  },
  {"titulo" : "Ventas por Forma de Pago",  "funcion": "GenChartVFP",  "Tit1"   : "Credito", "Tit2": "Contado"
  },
  {"titulo" : "Recuperacion de Cartera",  "funcion": "GenChartRecupera",  "Tit1"   : "", "Tit2": ""
  },
];

var Filtro = [];
var TFiltro = 0;
var todosNodos = [];
var filtroNodos = [];
var Opcs_Tree = [];
// function changeType(button) {
  
//   var btn = document.getElementById("btnChart");
//     if(btn.innerText=="line"){
//        btn.innerText="bar";
//       }
//     else{
//       btn.innerText="line";
//       }
// }


//Variables Globales
var myTit0 = "";
var myTit1 = "";
var myTit2 = "";
var myNum1 = "";
var myNum1 = "";
var myNum2 = "";
var myPorc0 = "";
var myPorc1 = "";
var myPorc2 = "";
var myUser = "";
var myChart = "";
var NChart = 0; 
var myPar1 = "";
var myPar2 = "";
var myPar3 = "";
var myPar4 = "";
var myPar5 = "";
var miTabla = "";
var miTabla2 = "";
var myCtx  = "";
var sel_chart = {nchart : 0, nivel : 0, seltipo : 0};
var start = new Date();
var end   = new Date();
var fechahoy = moment();
var arrdep_1 = [];
var arrdep_2 = [];
var arrdep_3 = [];
var arrfam_1 = [];
var arrfam_2 = [];
var arrfam_3 = [];
var arrlin_1 = [];
var arrlin_2 = [];
var arrlin_3 = [];
var arrl1_1 = [];
var arrl1_2 = [];
var arrl1_3 = [];
var arrl2_1 = [];
var arrl2_2 = [];
var arrl2_3 = [];
var arrl3_1 = [];
var arrl3_2 = [];
var arrl3_3 = [];
var arrl4_1 = [];
var arrl4_2 = [];
var arrl4_3 = [];
var arrl5_1 = [];
var arrl5_2 = [];
var arrl5_3 = [];
var arrl6_1 = [];
var arrl6_2 = [];
var arrl6_3 = [];
var nomDiv  = ['CALZADO', 'ACCESORIOS', 'ELECTRONICA'];
var selector = ['seldep', 'selfam', 'sellin', 'sell1', 'sell2', 'sell3', 'sell4', 'sell5', 'sell6' ];


$(function () {

  $("#chart2").hide();
  $("#btnChart").hide();
  $("#Chart-Container").hide();

  fechas   = Ajax("config/ajaxfile.php", 7, 0);
  var parts1 = fechas[0].fecini.split('-');
  var parts2 = fechas[0].fecfin.split('-');
  
  var primerDia = new Date(parts1[0], parts1[1] - 1, parts1[2]); 
  var ultimoDia = new Date(parts2[0], parts2[1] - 1, parts2[2]); 

  start = primerDia;
  end   = ultimoDia;

  function cb(start, end) {
    $('#reportrange span').html(start.format('D-MM-YYYY') + ' - ' + end.format('D-MM-YYYY'));
  }

  cb(moment(ultimoDia).subtract(6, 'days'), moment(ultimoDia));

  $('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
      'Hoy': [moment(ultimoDia), moment(ultimoDia)],
      'Ayer': [moment(ultimoDia).subtract(1, 'days'), moment(ultimoDia).subtract(1, 'days')],
      'Ultimos 7 Días': [moment(ultimoDia).subtract(6, 'days'), moment(ultimoDia)],
      'Ultimos 30 Días': [moment(ultimoDia).subtract(29, 'days'), moment(ultimoDia)],
      'Este mes': [moment(ultimoDia).startOf('month'), moment(ultimoDia).endOf('month')],
      'Mes pasado': [moment(ultimoDia).subtract(1, 'month').startOf('month'), moment(ultimoDia).subtract(1, 'month').endOf('month')]
    },
    "locale": {
      "format": "DD/MM/YYYY",
      "separator": " - ",
      "applyLabel": "Aplicar",
      "cancelLabel": "Cancelar",
      "fromLabel": "De",
      "toLabel": "a",
      "customRangeLabel": "Personalizado",
      "daysOfWeek": [
          "Do",
          "Lu",
          "Ma",
          "Mi",
          "Ju",
          "Vi",
          "Sa"
      ],
      "monthNames": [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agusto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
      ],
      "firstDay": 1
  }
  }, cb);


  $('#FiltroSucursales').multiselect({
    collapseOptGroupsByDefault: true,
    enableClickableOptGroups:true,
    enableCollapsibleOptGroups:true,
    nSelectedText: 'Seleccionadas',
    allSelectedText: 'Todas',
    nonSelectedText: 'Ninguna',
    //includeSelectAllOption: true,
    //buttonClass: 'btn btn-default btn-sm',
    //selectedClass: 'text-info bg-info',
    //inheritClass: true,
    //includeSelectAllOption:true
    onChange: function(element, checked) {
        opsel =   $('#FiltroSucursales option:selected').map(function(a, item){return item.value;});
        GeneraFiltroSucursales(opsel, true);
    }
  });

  
  //funcionalidad del menu en el sidebar
  $("#accordian h3").click(function(){
	//slide up all the link lists
	$("#accordian ul ul").slideUp();
	//slide down the link list below the h3 clicked - only if its closed
	if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
		}
  })  

  $(".modal").on("shown.bs.modal", alignModal); 
  
  /* Resizing the modal according the screen size */ 
  $(window).on("resize", function() { 
      $(".modal:visible").each(alignModal); 
  }); 
  
  //Refrescar Chart en cambio de seleccion tipo
  $('#Tipo').on('change', function () {
     myPar5   = $('#Tipo').val().substring(0, 1);
     IndiceOp = $('#Tipo')[0].selectedIndex;
     
     Inicializa(NChart, 0, IndiceOp);
     
  });
 
  
  //Actualizar Chart en cambio rango dias
  $('#rango').on('change', function () {
    
    periodo = $('#periodo')[0].selectedIndex;
    Inicializa(NChart, 0, IndiceOp);
    
  });

  //Actualizar Chart en cambio periodo
  $('#periodo').on('change', function () {
    
    periodo = $('#periodo')[0].selectedIndex;
    Inicializa(NChart, 0, IndiceOp);
    
  });

  $("#reportrange").on('apply.daterangepicker', function (ev, picker) {

    periodo = $('#periodo')[0].selectedIndex;
    Inicializa(NChart, 0, IndiceOp);
  
  });


  $('.btn-open-dialog').on('click', function(){

    iniciaSelectores();
    $('#myModal').modal({
      backdrop: 'static',
      keyboard:false
    });

    $('#myModal').modal('show');
    
  });


  CreaVarsHTML();
  IndiceOp = $('#Tipo')[0].selectedIndex;
  
  NChart =  numchart - 1; //Default Chart segun usuario
  TFiltro = tfiltro;      // Default Filtro segun chart
 
  //Inicializa Filtros de Sucursales
  //Carga_Filtro_Sucursales([], true); //Carga Todas
  //Check_Filtro_Sucursales(TFiltro);  //Check segun default

  //Abre Chart Default del Usuario
  Inicializa(NChart, 0, IndiceOp);

  // $(".chosen-select").chosen();
  //$(".chosen-select").chosen();
  //$(".chosen-select").chosen({width: "95%"});

  //window.multiSelect.refresh();

  $.fn.modal.Constructor.prototype.enforceFocus = function() {};

  //$(".js-example-basic-multiple").select2;

  $(".js-example-basic-multiple").select2({
     dropdownParent: $('#myModal'),
  });

  // add an ajax indicator 
  $('body').append('<div id="loading"><img id="loading-image" src="img/ajax-loader.gif" alt="Cargando..."/></div>');
  $('#ajaxBusy').css({
    //display:"none",
    margin:"0px",
    paddingLeft:"0px",
    paddingRight:"0px",
    paddingTop:"0px",
    paddingBottom:"0px",
    position:"absolute",
    right:"3px",
    top:"3px",
     width:"auto"
  });

  $('#loading').hide();
  
}); // Fin de $(function ()



function openNav() {
  document.getElementById("sidebar-container").style.width = "250px";
  document.getElementById("content").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidebar-container").style.width = "0";
  document.getElementById("content").style.marginLeft= "0";
}


function Ejecuta_Chart() {
  //Se ejecuta en la Seleccion de una opcion del Menu 
  
  //Obtiene Filtro default para el Chart y lo actualiza en TFiltro
  parms =  { "idchart": NChart +1  };
  datos   = TraeDatos("chart/filtro.php", parms);
  TFiltro = parseInt(datos[0].filtro);

  //Si existe el combo de Filtro Estuctura quitarlo
  removeSelect();

  // Llama el Chart
  Inicializa(NChart, 0, IndiceOp);

}


function alignModal() { 
    var modalDialog = $(this).find(".modal-dialog"); 
    modalDialog.css("margin-top", Math.max(0,  
    ($(window).height() - modalDialog.height()) / 2)); 
} 


function Carga_Filtro_Sucursales(datos, incluirtodas) {

  //sucursales en seleccion
  seleccion = [];

  //Todas las sucursales
  todas = Object.values(TraeDatos("config/optsucursal.php",[]));
    
  if (incluirtodas){
    opcs = todas;
  } 
  else { 
    //en Seleccion siempre incluir la Plaza 01

    seleccion = ['JUAREZ','HIDALGO','TRIANA','MATRIZ'];
    for (i=0; i< datos.length; i++) {
      // si datos[i] ya esta en seleccion omitirla, sino agregarla:

      if (!seleccion.includes( datos[i].Sucursal) ) {
        seleccion.push(datos[i].Sucursal);
      }
      
    }

    opcs = todas.filter(item => seleccion.includes(item.nomsucursal) );
  }
  
  optsfiltro = 'optgroups =  [';
  plaza_ant = "";
  gpo = 0;

  // Crea variable para crear el menu de filtro por sucursales
  var optgroups = "";
  for (var i = 0; i < opcs.length; i++)  {
    plaza       = opcs[i].plaza;
    if (plaza != plaza_ant) {
        if (gpo > 0) {
          optsfiltro += ']},'
          gpo = 0;
        }
        optsfiltro +=  '{ label : "' + opcs[i].nomplaza + '", children: [ '; 
        gpo++;
        plaza_ant = plaza
    }
    optsfiltro += '{label: "' + opcs[i].nomsucursal + '", value: "' + opcs[i].nomsucursal + '"},'
  }
  if (gpo > 0) {
    optsfiltro += ']}  ];'
  }
  
  eval(optsfiltro);

  $('#FiltroSucursales').multiselect('dataprovider', optgroups);

}


function Check_Filtro_Sucursales(TFiltro, sucursales) {

  //sucursales en seleccion
  let seleccion = [];

  //Todas las sucursales
  todas = Object.values(TraeDatos("config/optsucursal.php",[]));
  
  let $plaza = "";
  
  //Se filtran todas segun tipo de Filtro Default
  if (TFiltro > 0) {
    if (TFiltro == 1) {
      $plaza = "01";
    }
    else {
      $plaza = "02";
    }
    let search = (list, Suc) => list.filter(i => i.plaza.includes(Suc));
    seleccion = search(todas, $plaza)
  } else {
    seleccion = todas;
  }

  //Se crea arreglo qye contiene las sucursales segun Plaza Seleccionada
  // Por ejemplo: 0 - Todas, 1-Torreon, 2-En Línea
  //Filtro = [];

  // sucursales.map( function( el ){ 
  //   if ($plaza == '00') {
  //     //return el.nomsucursal; 
  //     Filtro.push(el.Sucursal)
  //     Filtro.push(el.Sucursal+ "_ant")
  //   } else   {
  //     if (el.plaza == $plaza ) { 
  //       //return el.nomsucursal; 
  //       Filtro.push(el.Sucursal)
  //       Filtro.push(el.Sucursal+ "_ant")
  //     }   
  //   }  
       
  // });
  
  let Filtro = seleccion.map(a => a.nomsucursal);

  $('#FiltroSucursales').multiselect("deselectAll", false);
  $('#FiltroSucursales').multiselect('select', Filtro );
  $('#FiltroSucursales').multiselect('refresh') ;

};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}



function GenChartOpcs() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "tipo"  :  myPar5,
  }
  Datos   = TraeDatos("chart/opnegadas.php", Parms);
  TotalesOpc(Datos) ;

  Datos_opnegadas   = TraeDatos("datatable/opnegadas.php", Parms);
  DTable_opnegadas(Datos_opnegadas);

  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  myChart = CreaChartOpcNeg("", myCtx,  Datos) ;
  myCtx.addEventListener("click", function(evento){
       Opc_DrillDown(evento);
  }); 
  
};

function GenChartEdoC() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms = [];
  Datos   = TraeDatos2("chart/edocartera.php");
  //TotalesOpc(Datos) ;
  DTable_edocartera(Datos);

  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  myChart = CreaChartEdoC( myCtx,  Datos) ;
    
};

function AplicaFiltro(data) {

  Totales = ['TOTAL','TOTAL_ant'];
  let filtered = [];
  // Filtrar DataSet para incluir las sucursales del Filtro
  if (Filtro.length > 0) { 
    filtered = data.filter(item => Filtro.includes(item.Sucursal) );
  } else {
    filtered = data;
  }
  if (filtered.hasOwnProperty('FPago')) { 
    filtered = filtered.filter(item => !Totales.includes(item.FPago) );
  }
  return (filtered);

}

function TotalizarCreditoContado(data) {
  objTotal = [];
  var total_contado = 0;
  var total_credito = 0;
  var total_contado_ant = 0;
  var total_credito_ant = 0;
  $.each(data, function(index, value) {
      if (!value.Sucursal.includes('_ant') ) {
         total_contado += parseFloat(value.Contado);
         total_credito +=  parseFloat(value.Credito);
       }else {
        total_contado_ant += parseFloat(value.Contado);
        total_credito_ant +=  parseFloat(value.Credito);
       }
  });
  // Periodo Actual
  var total = total_contado + total_credito;
  var porc_cont = (100 * total_contado) / total;
  var porc_cred = (100 * total_credito) / total;
  // Periodo Anterior
  var total_ant = total_contado_ant + total_credito_ant;
  var porc_cont_ant = (100 * total_contado_ant) / total_ant;
  var porc_cred_ant = (100 * total_credito_ant) / total_ant;

  objTotal  = {
    "Sucursal"  : "TOTAL",
    "Total"     : total,
    "Credito"   : total_credito,
    "%Part Cred": porc_cred,
    "Contado"   : total_contado,
    "%Part Cont": porc_cont,
  }
  objTotal_ant  = {
    "Sucursal"  : "TOTAL_ant",
    "Total"     : total_ant,
    "Credito"   : total_credito_ant,
    "%Part Cred": porc_cred_ant,
    "Contado"   : total_contado_ant,
    "%Part Cont": porc_cont_ant,
  }
  // Se agregan totales al principio 
  data.unshift(objTotal_ant);
  data.unshift(objTotal);
  
  return data;
}

function TotalizarFormasPago(data) {
  objTotal = [];
  var total_importe = 0;
  var total_importe_ant = 0;
  $.each(data, function(index, value) {
      if (!value.FPago.includes('_ant') ) {
         total_importe += value.Importe;
       }else {
         total_importe_ant += value.Importe;
       }
  });
  objTotal  = {
    "FPago"  : 'TOTAL',
    "Importe": total_importe
  }
  objTotal_ant  = {
    "FPago"  : 'TOTAL_ant',
    "Importe": total_importe_ant
  }
  // Se agregan totales al principio 
  data.unshift(objTotal_ant);
  data.unshift(objTotal);
  
  return data;
}



function CreaDataTableVFP(DataSuc) {
    //Filtrar por Sucursales y quitar totales
    vtasft_dt = AplicaFiltro(DataSuc);
    //Quitar columna Sucursal 
    var FormasPagoSuc = vtasft_dt.map(({Sucursal, ...item}) => item);
    //Agrupar por Forma de Pago
    FormasPagoSUM = groupAndSum(FormasPagoSuc, ['FPago'], ['Importe']);
    // Incluir renglores con totales
    FP_data = TotalizarFormasPago(FormasPagoSUM);
    // Obtener totales 
    FpagoTot     = FP_data[0].Importe;
    FpagoTot_ant = FP_data[1].Importe;
    // Agregar prorcentaje
    FP_data.forEach(function(itm){
      if (itm.FPago.includes("_ant")) {
        if (FpagoTot_ant) { 
            itm.porc = 100.0 * itm.Importe / FpagoTot_ant;
        } else { itm.porc = 0;}
      } else {
        if (FpagoTot_ant) { 
            itm.porc = 100.0 * itm.Importe / FpagoTot;
        } else { itm.porc = 0;}
      }
    });
    DTable_vtasfpago( FP_data );
}

function groupAndSum(arr, groupKeys, sumKeys){
  return Object.values(
    arr.reduce((acc,curr)=>{
      const group = groupKeys.map(k => curr[k]).join('-');
      acc[group] = acc[group] || Object.fromEntries(groupKeys.map(k => [k, curr[k]]).concat(sumKeys.map(k => [k, 0])));
      sumKeys.forEach(k => acc[group][k] += +curr[k]);
      return acc;
    }, {})
  );
}



function groupByFPago (obj) {
  const map = {};
  let res = [];
  res = obj.reduce((acc, val) => {
     const { FPago, Importe } = val;
     const { length: l } = acc;
     if(map.hasOwnProperty(FPago)){
        acc[map[FPago]]['Importe'] = +parseFloat(Importe);
     }
     else{
        map[FPago] = l;
        acc.push({
           FPago: FPago,
           Importe: +Importe,
        });
     };
     return acc;
  }, []);
  return res;
};

function divCharts(on) {
 if (on) {
  $("#Chart-Container").show();
  $("#Chart-Canvas").hide();
 } else {
  $("#Chart-Container").hide();
  $("#Chart-Canvas").show();
 }
}

function OpNeg_Vendedor (sucursal, parms) {
  
  sel_chart.nivel = 1;
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option>";
  Opciones.children[0].selected=true;
  Datos   = TraeDatos("chart/opnegadas.php", parms);
  TotalesOpc(Datos);

  Datos_opnegadas   = TraeDatos("datatable/opnegadas.php", parms);
  DTable_opnegadas(Datos_opnegadas);

  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  myChart = CreaChartOpcNeg(sucursal, myCtx,  Datos)
}

////////////////////////////////////////
function VFP_Sucursal (sucursal, parms) {
  
  Opciones = document.querySelector("#Tipo");
  
  Opciones.children[1].selected=true;
  Datos   = TraeDatos("chart/vtasfpago_dona.php", parms);
  DTable_vtasfpago(Datos);
  
  
  sel_chart.nivel = 1;

  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;

  var data2 =  Datos.filter(function(renglon) {
    return renglon['Forma de Pago']  != 'TOTAL';
  });
  
  DividirAreaChartCanvas(1);
  // Formas de Pago una Sucursal
  periodo = LetreroPeriodo(parms.fecini, parms.fecfin);
  myChart  = createChart(myCtx, sucursal, data2, periodo);
  parms =  {
    "fecini":  myPar3,
    "fecfin":  myPar4,
    "tipo"  :  sucursal
  }
  Datos   = TraeDatos("chart/vtasfpago_dona.php", parms);
  //DTable_vtasfpago2( Datos );
  
  var data2 =  Datos.filter(function(renglon) {
    return renglon['Forma de Pago']  != 'TOTAL';
  });
  document.querySelector("#chartReport2").innerHTML = '<canvas id="chartCanvas2"></canvas>';
  myCtx2   = $("#chartCanvas2")[0];  
  periodo = LetreroPeriodo(myPar3, myPar4);
  myChart  = createChart(myCtx2, sucursal, data2, periodo);

}

function DividirAreaChartCanvas(activa) {

  if ( activa) {
      $('#chart1').removeClass('col-lg-12 my-3');
      $('#chart1').addClass('col-lg-6 my-3');
      
      $('#chart2').addClass('col-lg-6 my-3');
      $("#chart2").show();
    }
  else {
      $('#chart1').removeClass('col-lg-6 my-3');
      $('#chart1').addClass('col-lg-12 my-3');
      $("#chart2").hide();
      $('#chart2').removeClass('col-lg-6 my-3');
  }
}


function Opc_DrillDown (evt) {
  var activePoint = myChart.getElementAtEvent(evt)[0];
  if (activePoint !== undefined) {
     const chartData = activePoint['_chart'].config.data;
     var  idx = activePoint._index;
     //var data = activePoint._chart.data;
     //var datasetIndex = activePoint._datasetIndex;
     //var datasetname = data.datasets[datasetIndex].label;
     //var value = data.datasets[datasetIndex].data[idx];
     var suc = chartData.labels[idx];
     parms =  {
      "fecini":  myPar1,
      "fecfin":  myPar2,
      "tipo"  :  suc,
    }
    // drill down en una Sucursal 
    OpNeg_Vendedor(suc, parms);

  }
};

function VFP_DrillDown (evt) {
  var activePoint = myChart.getElementAtEvent(evt)[0];
  if (activePoint !== undefined) {
     const chartData = activePoint['_chart'].config.data;
     var  idx = activePoint._index;
     var suc = chartData.labels[idx];
     parms =  {
      "fecini":  myPar1,
      "fecfin":  myPar2,
      "tipo"  :  suc,
    }
    // drill down en una Sucursal 
    VFP_Sucursal(suc, parms);

  }
};

function Ajax(url, rango, periodo) {
  result = false;
  $.ajax({
    url: url,
    type: 'POST',
    async : false,
    data: {"rango"  :rango,
           "periodo":periodo},
    success: function(response){
        result = response;
    }
  })
  return result;  
};


function TraeDatos (url, parms) {
  var result = false;
	$.ajax({
            url   : url,
	          type  : 'POST',
            data  : parms,
            async: false,
            success: function(data) {
              result = data;
            },
            error: function(error) {
              console.log(error);
            }
   })
   return result;
};

function TraeDatos_tb (fecini, fecfin, fecini_ant, fecfin_ant, tipo) {
  var result = false;
	$.ajax({
            url   : 'chart/vtasfpago_dt.php',
	          type  : 'POST',
            async: false,
            data : {
              "fecini" : fecini,
              "fecfin" : fecfin,
              "fecini_ant" : fecini_ant,
              "fecfin_ant" : fecfin_ant,
              "tipo"   : tipo
            },
            success: function(response) {
              result = response;
            },
            error: function(error) {
              console.log(error);
            }
   })
   return result;
};

function TraeDatos2 (url) {
  var result = false;
	$.ajax({
            url   : url,
	          type  : 'POST',
            async: false,
            success: function(data) {
            result = data;
            },
            error: function(error) {
              console.log(error);
            }
   })
   return result;
};
 




function ObtieneColumnas(Data){
  
  const res = {};
  if (Data && Data.length) { 
  // Extrae los nombres de las columnas
  const keys = Object.keys(Data[0]);
  // Crea el objeto que contiene un arreglo para cada Columna
  keys.forEach(key => {
     Data.forEach(el => {
        if(res.hasOwnProperty(key)){
           res[key].push(el[key])
        }else{
           res[key] = [el[key]];
        };
     });
  });
}
  //regresa objeto los arreglos para cada columna
  return Object.values(res);
}



function TotalesOpc(Data){
  if (Datos && Datos.length) {
    let totOpc = Data.reduce((total, item) => total + parseInt(item.opciones), 0);
    let totNeg = Data.reduce((total, item) => total + parseInt(item.negadas), 0);
    let totPorc = totOpc / totNeg * 100;

    opcs = formatoMX(totOpc);
    negs = formatoMX(totNeg);
    porc = formatoMX(totPorc);
  
  }
  else {
     opcs = "0";
     negs = "0";
     porc = "0";
  }
  myNum1.innerText = opcs ;
  myNum2.innerText = negs  ;
  myPorc2.style.display = "block";
  myPorc2.innerText = Decimales(porc,1) + " %" ;
}

function TotalesVFP(datos){
  if (datos && datos.length) {
    let totCre = datos.reduce((total, item) => total + parseFloat(item.Credito), 0);
    let totCon = datos.reduce((total, item) => total + parseFloat(item.Contado), 0);
    var Total  = parseFloat(totCre) +  parseFloat(totCon)
    let Porc1  = 100.0 * totCre / (totCre + totCon) ;
    let Porc2 =  100 - Porc1;
    Porc1 = 100 - Porc2;
    
    tot  = numberWithCommas(Total.toFixed(0));
    cred = numberWithCommas(totCre.toFixed(0)); 
    cont = numberWithCommas(totCon.toFixed(0));
    porc0 = "100 %";
    porc1 = Porc1.toFixed(1);
    porc2 = Porc2.toFixed(1);
  }
  else {
     tot  = "0";
     cred = "0";
     cont = "0";
     porc0 = "0 %"
     porc1 = "0.0";
     porc2 = "0.0";
  }
  myTit0.innerText = "Total";
  myNum0.innerText = tot
  myNum1.innerText = cred ;
  myNum2.innerText = cont  ;

  myPorc0.style.display = "block";
  myPorc0.innerText = "100 %" ;
  myPorc1.style.display = "block";
  myPorc1.innerText = porc1 + " %" ;
  myPorc2.style.display = "block";
  myPorc2.innerText = porc2 + " %" ;
}

function TotalesVta(Data){
  if (Data && Data.length) {  
    let totPesos = Data.reduce((total, item) => total + parseInt(item.Importe), 0);
    let totUnits = Data.reduce((total, item) => total + parseInt(item.Unidades), 0);

    //pesos = totPesos.toLocaleString("es-MX", { style: 'currency', currency: 'MXN' });
    pesos = formatoMX(totPesos);
    unidades = formatoMX(totUnits);
  }
  else {
    pesos = "0";
    unidades = "0";
  }
  myNum0.innerText = "";
  myNum1.innerText = pesos;
  myNum2.innerText = unidades;
  myPorc0.style.display = "none";
  myPorc1.style.display = "none";
  myPorc2.style.display = "none";
  
}

function Decimales(n, decimales) {
  let t=n.toString();
  let regex=/(\d*.\d{0, decimales })/;
  return t.match(regex)[0];
}

const formatoMX = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1,';
  let arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp,rep);
  return arr[1] ? arr.join('.'): arr[0];
}

// In this function every menu which has an active link opens if a link is active. 
// Its ul parent opens itself and adds the class 'open' to its parent (the arrow) so it turns 90 degrees
$('.pagenav li').each(function(i, el) {
  if ($(el).hasClass('current_page_item')) {
    $(el).parent().show().parent().addClass('open');
  };
  
});

// This function ensures that a menu pops open when you click on it. 
//All other menu's automatically close if the user clicks on a ul header. 
//All the opened ul's close except the one clicked on
$('.accordion h4').click(function(event) {
  $('.accordion > ul > li > ul:visible').not($(this).nextAll('ul')).stop().hide(200).parent().removeClass('open'); //
  $(this).nextAll('ul').slideToggle(200, function() {
    $(this).parent('.pagenav').toggleClass('open');
  });
});


function ChartVta(){
  NChart = 0;
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option><option>Division</option>";
  Opciones.children[0].selected=true;

  Ejecuta_Chart();

}

function ChartRecupera(){
  NChart = 4;
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option></option>";
  Opciones.children[0].selected=true;
  
  Ejecuta_Chart();
}


function ChartOpc(){
  NChart = 1;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option>"

  Ejecuta_Chart();
 
}

function ChartEdoC(){
  NChart = 2;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Todas</option>"

  Ejecuta_Chart();
  
}

function ChartVentaFP(){
  NChart = 3;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option><option>F. Pago</option>"

  periodo = $('#periodo')[0].selectedIndex;

  Ejecuta_Chart();
  
}

function CreaVarsHTML() {
  //Crea variables para manejo JavaScript conectadas a elementos HTML
  
  myNum0   = $("#num0")[0];
  myPorc0  = $("#porc0")[0];
  myNum1   = $("#num1")[0];
  myNum2   = $("#num2")[0];
  myPorc1  = $("#porc1")[0];
  myPorc2  = $("#porc2")[0];
  myTit0   = $("#tit0")[0];
  myTit1   = $("#tit1")[0];
  myTit2   = $("#tit2")[0];
  myCtx    = $("#chartCanvas")[0];
  
}

function Inicializa(NChart, Nivel, OpSel) {

  ActualizaParms();

  sel_chart.nchart = NChart;
  sel_chart.seltipo = OpSel;
  if (NChart == 3 ) {
    if (OpSel == 1) {  
        sel_chart.nivel = 1;
    }
    else {
        sel_chart.nivel = 0;
    }
    myTit1.innerText = Charts[NChart].Tit1;
    myTit2.innerText = Charts[NChart].Tit2;

  } else {
    sel_chart.nivel = Nivel;
    if (NChart == 0) {
      myTit0.innerText = "";
      myNum0.innerText = "";
    }

    myNum1.innerText = "0";
    myNum2.innerText = "0";
    myPorc0.innerText = "";
    myPorc1.innerText = "";
    myPorc2.innerText = "";
  
  }
  
  Titulo1 = "<b>Actual: </b>" + LetreroPeriodo(myPar1, myPar2) + "   " + "<b>Anterior: </b>" + LetreroPeriodo(myPar3, myPar4)
  $('#TituloTabla1').html(Titulo1);
  
  // Genera Chart
  window[Charts[NChart].funcion]();

  
}

function ActualizaParms() {
  DividirAreaChartCanvas(0);

  //Actualizar a la opcion de ninguna
  removeSelect(true);

  var drp = $('#reportrange').data('daterangepicker');
  myPar1 = drp.startDate.format("YYYY-MM-DD");
  myPar2 = drp.endDate.format("YYYY-MM-DD");

  parts1 = myPar1.split('-');
  parts2 = myPar2.split('-');
  var primerDia = new Date(parts1[0], parts1[1] - 1, parts1[2]); 
  var ultimoDia = new Date(parts2[0], parts2[1] - 1, parts2[2]); 

  var dif = ultimoDia - primerDia;
  var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
 
  periodo = $('#periodo')[0].selectedIndex;

  switch (periodo)
    {
    case 0:
        myPar3 = formatDate(addDays(primerDia,(dias+1)*-1));
        myPar4 = formatDate(addDays(primerDia, -1));
        break;
    case 1:
        primerDiaAnoAnt = new Date(parts1[0]-1, parts1[1] , parts1[2]); 
        ultimoDiaAnoAnt = new Date(parts2[0]-1, parts2[1] , parts2[2]);
        myPar3 = formatDate(primerDiaAnoAnt);
        myPar4 = formatDate(ultimoDiaAnoAnt);
        break;
    case 2:
        primerDiaAnoAnt = new Date(parts1[0], parts1[1]-1 , parts1[2]); 
        ultimoDiaAnoAnt = new Date(parts2[0], parts2[1]-1 , parts2[2]); 
        myPar3 = formatDate(primerDiaAnoAnt);
        myPar4 = formatDate(ultimoDiaAnoAnt);
        break;
    }
    myPar5 = $('#Tipo').val().substring(0, 1);
}


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function LetreroPeriodo(fecini, fecfin) {
  fecha1 = fecini.split("-").reverse().join("-") ;
  fecha2 = fecfin.split("-").reverse().join("-") ;

  txt = "del " + getFormattedDate(fecha1) + " al " + getFormattedDate(fecha2);
  return txt;
}

function getFormattedDate(input) {
    var str = input.replace(/-/g, '/');
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    var result = str.replace(pattern,function(match,p1,p2,p3){
        var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        return (p1<10? p1:p1) + "-" + months[(p2-1)] + "-" + p3;
    });
    return result;
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}


function GeneraFiltroSucursales(data, genChart) {
  var sucursales = [];
  if (data.length > 0 ) {  
     for (i = 0; i < data.length; i++)    {
         if (!data[i] == "") {
              sucursales.push( data[i])
              sucursales.push( data[i] + "_ant")
         }
     }
  }
  Filtro = sucursales;

  if (genChart) { 
    CreaVarsHTML();
    ActualizaParms();
    window[Charts[NChart].funcion]();
  }
}


function GeneraFiltroAdicional(data) {
  var filtroadic = [];
  if (data.length > 0 ) {  
     for (i = 0; i < data.length; i++)    {
         if (!data[i] == "") {
              filtroadic.push( data[i])
         }
     }
  }

  FiltroAdic = filtroadic;
 }



function GeneraFiltro(data) {
  var sucursales = [];
  if (data.length > 0 ) {  
      var dim = [
          data.length,
          data[0].length
      ];
      for (i = 0; i < dim[0]; i++)    {
        for (j = 0; j < dim[1]; j++)    {
          if (!data[i][j].innerText == "") {
              sucursales.push( data[i][j].innerText)
              sucursales.push( data[i][j].innerText + "_ant")
          }
        }
      }
  }
  Filtro = sucursales;
  window[Charts[NChart].funcion]();
}

function ActualizaTotales(Tit1, Tit2, Tit3, Tot1, Tot2, Tot3, Porc1, Porc2, Porc3) {
  
  myTit0.innerText = Tit1;
  myTit1.innerText = Tit2;
  myTit2.innerText = Tit3;

  // document.getElementById('localbaseurilabel').style.color = "grey";
  // document.getElementById( 'elemtId' ).style.display = 'none';
  // $("#id").css("display", "none");
  // $("#id").css({display: "none"});
  // $("#id").css({display: "block"});

  if (Tot1 == 0) {
     myNum0.style.display = "none";
     myPorc0.style.display = "none"
  } else { 
    myNum0.style.display = "block";
    myPorc0.style.display = "block"
  }


  myNum0.innerText = "$" + numberWithCommas(Tot1.toFixed(0));
  myNum1.innerText = "$"+ numberWithCommas(Tot2.toFixed(0));
  if (NChart > 0) { 
    myNum2.innerText = "$" + numberWithCommas(Tot3.toFixed(0));
  } else {
    myNum2.innerText =  numberWithCommas(Tot3.toFixed(0));
  }
  
  myPorc1.style.display = "block";
  myPorc2.style.display = "block";

  myPorc0.innerText = Porc1.toFixed(1) + "%";
  myPorc1.innerText = Porc2.toFixed(1) + "%";
  myPorc2.innerText = Porc3.toFixed(1) + "%";
 
  if (parseFloat(myPorc1.innerText) < 0) {
    $('#porc1').css("background-color", '#ff0000')
  } else { 
    $('#porc1').css("background-color", '#29ad29')
  }
  
  if (parseFloat(myPorc2.innerText) < 0) {
    $('#porc2').css("background-color", '#ff0000')
  } else { 
    $('#porc2').css("background-color", '#29ad29')
  }
  

}

