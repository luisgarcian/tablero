var Charts = [
  {"titulo" : "Ventas Netas",   "funcion": "GenChartVtas",  "Tit1"   : "Ventas Totales", "Tit2": "Unidades Totales"
  },
  {"titulo" : "Opciones Negadas", "funcion": "GenChartOpcs", "Tit1"   : "Opciones", "Tit2": "Negadas"
  },
  {"titulo" : "Estado Cartera",   "funcion": "GenChartEdoC", "Tit1"   : "Estado", "Tit2": "Cartera"
  },
  {"titulo" : "Ventas por Forma de Pago",  "funcion": "GenChartVFP",  "Tit1"   : "Credito", "Tit2": "Contado"
  },
];

var Filtro = [];

function changeType(button) {
  
  var btn = document.getElementById("btnChart");
    if(btn.innerText=="line"){
       btn.innerText="bar";
      }
    else{
      btn.innerText="line";
      }
}


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


$(function () {

  $("#chart2").hide();
  $("#btnChart").hide();
  $("#Chart-Container").hide();

  //DropDownTreeOptions();
  DropDownTree();
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


  CreaVarsHTML();

  rango = $('#rango')[0].selectedIndex;
  periodo = $('#periodo')[0].selectedIndex;
  ActualizaFechas(rango, periodo);

  const btnupd = document.querySelector("#BtnUpdate");
  btnupd.addEventListener("click", function(evento){
        evento.preventDefault();

        ActualizaParms();
        window[Charts[NChart].funcion]();
  });
  
  //Refrescar Chart en cambio de seleccion tipo
  $('#tipo').on('change', function () {
     myPar3   = $('#tipo').val().substring(0, 1);
     IndiceOp = $('#tipo')[0].selectedIndex;
     
     Inicializa(NChart, 0, IndiceOp, '', '');
     
  });

  //Actualizar Chart en cambio rango dias
  $('#rango').on('change', function () {
    
    rango = $('#rango')[0].selectedIndex;
    periodo = $('#periodo')[0].selectedIndex;

    ActualizaFechas(rango, periodo)
 });

  //Actualizar Chart en cambio periodo
  $('#periodo').on('change', function () {
    
    rango = $('#rango')[0].selectedIndex;
    periodo = $('#periodo')[0].selectedIndex;

    ActualizaFechas(rango, periodo)
 });

});

function ActualizaFechas(rango, periodo) {
  switch(rango) {
    case 0:
      dias = "7";
      break;
    case 1:
      dias = "15";
      break;
    case 2:
      dias = "30";
  }
  
  //llama a sp para traerse fechas
  fechas   = Ajax("config/ajaxfile.php", dias, periodo);
  var parts1 = fechas[0].fecini.split('-');
  var parts2 = fechas[0].fecfin.split('-');
  
  var fecini = new Date(parts1[0], parts1[1] - 1, parts1[2]); 
  var fecfin = new Date(parts2[0], parts2[1] - 1, parts2[2]); 

  //Actualiza datepicker
  $('#PickerFecIni').datetimepicker({
    value: fecini,
  })
  $('#PickerFecFin').datetimepicker({
    value: fecfin,
  })
  var fecini_ant = fechas[0].fecini_ant
  var fecfin_ant = fechas[0].fecfin_ant
  document.getElementById('PickerFecIni_ant').value = fecini_ant;
  document.getElementById('PickerFecFin_ant').value = fecfin_ant;
  
  IndiceOp = $('#tipo')[0].selectedIndex;
  Inicializa(NChart, 0, IndiceOp, fecini_ant ,fecfin_ant);

  Titulo1 = LetreroPeriodo(myPar1, myPar2) + "  -  " + LetreroPeriodo(myPar3, myPar4)
  $('#TituloTabla1').html(Titulo1);
  
  /*
  if (miTabla2) {
    Titulo2 = LetreroPeriodo(myPar3, myPar4)
    $('#TituloTabla2').html(Titulo2);  
  } else {
    $('#TituloTabla2').html("");  
  }
  */
  
}

function GenChartVtas() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "div"   :  myPar5,
  }
  Datos   = TraeDatos("chart/vtasnetas.php", Parms);
  TotalesVta(Datos);
  
  Datos_vtasnetas   = TraeDatos("datatable/vtasnetas.php", Parms);
  DTable_vtasnetas(Datos_vtasnetas);
  
  //DTable_vtasnetas(Datos);
  divCharts(0);
  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  myChart = CreaChartVtasNetas(myCtx,  Datos) ;

};

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
  // Filtrar DataSet para incluir las sucursales del Filtro
  let filtered = data.filter(item => Filtro.includes(item.Sucursal) );

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

//////////////////////////////////////////////////////
function GenChartVFP() {
  // Primer Nivel por Sucursal
  sel_chart.nivel = 0;
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';

  // Sucursal, FPago, Importe, %
  vtas_data  = TraeDatos_tb(myPar1, myPar2, myPar3, myPar4, myPar5); // Todas las Sucursales

  
  if (sel_chart.seltipo == 0) {
      // Sucursal, FPago, Importe, %
      vtasfp_dt  = AplicaFiltro(vtas_data); // Se aplica el Filtro de Sucursales, se eliminan Totales
      // Sucursal, FPago, Importe, %
      vtasfp_tot = TotalizarCreditoContado(vtasfp_dt); // Se recalculan totales y porc para cada periodo
      DTable_vtasfpago( vtasfp_tot );

      // Totales    -----------------------------
      let Total = parseFloat(vtasfp_tot[0].Contado) + parseFloat(vtasfp_tot[0].Credito);
      let Credito = parseFloat(vtasfp_tot[0].Credito);
      let Contado = parseFloat(vtasfp_tot[0].Contado);
      let PorcTot = 100;
      let PorcCre = 100 * Credito / Total ;
      let PorcCon = 100 * Contado / Total ;
      ActualizaTotales('Total', 'Credito', 'Contado', Total, Credito, Contado, PorcTot, PorcCre, PorcCon );
  
      divCharts(1);
      parms = {
        "fecini": myPar1,
        "fecfin": myPar2,
        "fecini_ant": myPar3,
        "fecfin_ant": myPar4,
        "tipo": myPar5,
      }
      Datos_hc  = TraeDatos("chart/vtasfpago_hc.php", parms);
      myCtx   = $("#chartCanvas")[0];  
      myCtx.width  = window.innerWidth;
      myCtx.height  = window.innerHeight;

      HighChart(Datos_hc);
      myCtx.addEventListener("click", function(evento){
        //VFP_DrillDown(evento);
      }); 

  } else {
      // Dos Chart uno para cada periodo
      divCharts(0);
      DividirAreaChartCanvas(1);

      //Formas de Pago Todas las Sucursales
      //***** Chart 1
      
      // filtrar para quitar las sucursales segun filtro y sin Totales
      let SucursalSelected = vtas_data.filter(item => Filtro.includes(item.Sucursal) );

      // filtrar para quitar peridodo ant
      var SucursalSelectedPeriodo1 = SucursalSelected.filter((ren) => !ren['FPago'].includes("_ant") );
      // Agrupar y Acumular Importe por Forma de Pago
      //FormasdePagoSUM = groupByFPago(SucursalSelectedPeriodo1);
      FormasdePagoSUM = groupAndSum(SucursalSelectedPeriodo1, ['FPago'], ['Importe']);
      // Obtener el total de la suma de los importes
      FPagoTot = FormasdePagoSUM.reduce(function(a, b) {
        return a + b.Importe;
      }, 0);
      //Calcular el % por cada Forma de Pago en cada importe y agregarlo como propiedad
      FormasdePagoSUM.forEach(function(itm){
        itm.porc = 100.0 * itm.Importe / FPagoTot;
      });

      //DataTable
      //Filtrar por Sucursales y quitar totales
      vtasft_dt = AplicaFiltro(vtas_data);
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

      //Crear Chart Periodo1
      myCtx    = $("#chartCanvas")[0];  
      periodo1 = LetreroPeriodo(myPar1, myPar2);
      myChart  = createChart(myCtx, "TODAS LAS SUCURSALES", FormasdePagoSUM, periodo1);
      
      //Formas de Pago Todas las Sucursales
      //****** Chart 2
      
      // filtrar para quitar peridodo actual
      var SucursalSelectedPeriodo2 = SucursalSelected.filter((ren) => ren['FPago'].includes("_ant") );
      // Agrupar y Acumular Importe por Forma de Pago
      //FormasdePagoSUM2 = groupByFPago(SucursalSelectedPeriodo2);
      FormasdePagoSUM2 = groupAndSum(SucursalSelectedPeriodo2, ['FPago'], ['Importe']);
      // Obtener el total de la suma de los importes
      FPagoTot2 = FormasdePagoSUM2.reduce(function(a, b) {
        return a + b.Importe;
      }, 0);
      //Calcular el % por cada Forma de Pago en cada importe y agregarlo como propiedad
      FormasdePagoSUM2.forEach(function(itm){
        itm.porc = 100.0 * itm.Importe / FPagoTot2;
      });
      //Crear Chart Periodo2
      myCtx2   = $("#chartCanvas2")[0];  
      periodo2 = LetreroPeriodo(myPar3, myPar4);
      myChart  = createChart(myCtx2, "TODAS LAS SUCURSALES", FormasdePagoSUM2, periodo1);

  }

};


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
  // Inicializa Objeto para leer los datos
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
  Inicializa(NChart, 0, 0, '', '' );
  
}

function ChartOpc(){
  NChart = 1;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option>"

  Inicializa(NChart, 0, 0, '', '' );
  
}

function ChartEdoC(){
  NChart = 2;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Todas</option>"

  Inicializa(NChart, 0, 0, '', '');
  
}

function ChartVentaFP(){
  NChart = 3;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option><option>F. Pago</option>"

  rango = $('#rango')[0].selectedIndex;
  periodo = $('#periodo')[0].selectedIndex;

  ActualizaFechas(rango, periodo);

  //Inicializa(NChart, 0, 0, '', '');
  
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

function Inicializa(NChart, Nivel, OpSel, FecIni_ant, FecFin_ant) {

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

    //Inicializa Totales desplegados
    
    myNum1.innerText = "0";
    myNum2.innerText = "0";
    myPorc0.innerText = "";
    myPorc1.innerText = "";
    myPorc2.innerText = "";
  
  }
  
  
  // Genera Chart
  window[Charts[NChart].funcion]();
}

function ActualizaParms() {
  DividirAreaChartCanvas(0);
  myPar1 = $('#PickerFecIni').val().split("-").reverse().join("-");
  myPar2 = $('#PickerFecFin').val().split("-").reverse().join("-");
  myPar3 = $('#PickerFecIni_ant').val();
  myPar4 = $('#PickerFecFin_ant').val();
  
  myPar5 = $('#tipo').val().substring(0, 1);

}

function LetreroPeriodo(fecini, fecfin) {
  fecha1 = fecini.split("-").reverse().join("-") ;
  fecha2 = fecfin.split("-").reverse().join("-") ;

  txt = "Período del " + getFormattedDate(fecha1) + " al " + getFormattedDate(fecha2);
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

function DropDownTreeOptions() {

  var nodo1=[
    {title:"JUAREZ"},
    {title:"HIDALGO"},
    {title:"TRIANA"} ,
    {title:"MATRIZ"}
    ];
  
    var nodo2=[
    {title:"AMAZON"},
    {title:"ELEKTRA"},
    {title:"MERCADO LIBRE"},
    {title:"LINIO"},
    {title:"CLAROSHOP"},
    {title:"FULL ML"},
    {title:"PAPPOS MX"},
    {title:"PRIME"},
    {title:"TR PRIME"}

    ];
  
    var opciones=[
    {title:"TORREÓN",href:"#1",dataAttrs:[], data:nodo1},
    {title:"EN LÍNEA",href:"#3",dataAttrs:[],data:nodo2}
    ];
  
    var options = {
      title : "Filtro",
      data: opciones,
      maxHeight: 400,
      clickHandler: function(element){
        //element is the clicked element
        console.log(element);
        //$("#firstDropDownTree").SetTitle($(element).find("a").first().text());
        //console.log("Selected Elements",$("#firstDropDownTree").GetSelected());
      },
      expandHandler: function(element,expanded){
        //console.log("expand",element,expanded);
      },
      checkHandler: function(element,checked){
        //console.log("check",element,checked);
        arreglo = $("#firstDropDownTree").GetSelected();
        GeneraFiltro(arreglo);
      },
      closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
      openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
      multiSelect: true,
      selectChildren: true,
    }
  
    $("#firstDropDownTree").DropDownTree(options);
 
};

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

  myNum0.innerText = numberWithCommas(Tot1.toFixed(0));
  myNum1.innerText = numberWithCommas(Tot2.toFixed(0));
  myNum2.innerText = numberWithCommas(Tot3.toFixed(0));

  
  myPorc0.style.display = "block";
  myPorc1.style.display = "block";
  myPorc2.style.display = "block";

  myPorc0.innerText = Porc1.toFixed(1) + "%";
  myPorc1.innerText = Porc2.toFixed(1) + "%";
  myPorc2.innerText = Porc3.toFixed(1) + "%";


}

function DropDownTree() {
  var nodo1=[
    {title:"JUAREZ"},
    {title:"HIDALGO"},
    {title:"TRIANA"} ,
    {title:"MATRIZ"}
    ];
  
    var nodo2=[
    {title:"AMAZON"},
    {title:"ELEKTRA"},
    {title:"MERCADO LIBRE"},
    {title:"LINIO"},
    {title:"CLAROSHOP"},
    {title:"FULL ML"},
    {title:"PAPPOS MX"},
    {title:"PRIME"},
    {title:"TR PRIME"}

    ];
  
    var opciones=[
    {title:"TORREÓN",href:"#1",dataAttrs:[], data:nodo1},
    {title:"EN LÍNEA",href:"#3",dataAttrs:[],data:nodo2}
    ];
 
  
    var options = {
      title : "Filtro",
      data: opciones,
      maxHeight: 400,
      clickHandler: function(element){
        //element is the clicked element
        console.log(element);
        //$("#firstDropDownTree").SetTitle($(element).find("a").first().text());
        //console.log("Selected Elements",$("#firstDropDownTree").GetSelected());
      },
      expandHandler: function(element,expanded){
        //console.log("expand",element,expanded);
      },
      checkHandler: function(element,checked){
        //console.log("check",element,checked);
        
        arreglo = $("#firstDropDownTree").GetSelected();
        GeneraFiltro(arreglo);
  
      },
      closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
      openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
      multiSelect: true,
      selectChildren: true,
    }
  
    $("#firstDropDownTree").DropDownTree(options);
    

}
