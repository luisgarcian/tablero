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

//Variables Globales

var myTit1 = "";
var myTit2 = "";
var myNum1 = "";
var myNum2 = "";
var myPorc1 = "";
var myPorc2 = "";
var myUser = "";
var myChart = "";
var NChart = 0; 
var myPar1 = "";
var myPar2 = "";
var myPar3  = "";
var miTabla = "";
var myCtx  = "";
var sel_chart = {nchart : 0, nivel : 0, seltipo : 0};


$(function () {
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
  Inicializa(NChart, 0, 0);

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
     
     Inicializa(NChart, 0, IndiceOp);
     
  });

});


function GenChartVtas() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "div"   :  myPar3,
  }
  Datos   = TraeDatos("chart/vtasnetas.php", Parms);
  TotalesVta(Datos);

  Datos_vtasnetas   = TraeDatos("datatable/vtasnetas.php", Parms);
  DTable_vtasnetas(Datos_vtasnetas);
  
  //DTable_vtasnetas(Datos);

  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  myChart = CreaChartVtasNetas(myCtx,  Datos) ;
};

function GenChartOpcs() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  Parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "tipo"  :  myPar3,
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

function GenChartVFP() {
  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  parms =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "tipo"  :  myPar3,
  }
  Datos   = TraeDatos("chart/vtasfpago.php", parms);
  parmsT =  {
    "fecini":  myPar1,
    "fecfin":  myPar2,
    "tipo"  :  "T",
  }
  DatosT   = TraeDatos("chart/vtasfpago.php", parmsT);
  // Primer Nivel por Sucursal
  sel_chart.nivel = 0;
  if (Opciones.children[0].selected) {  
    TotalesVFP(DatosT) ;
  }
  
  Datos_vtasfpago   = TraeDatos("datatable/vtasfpago.php", parms);
  DTable_vtasfpago(Datos_vtasfpago);

  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;
  if (sel_chart.seltipo == 0) {
      
      //myChart = CreaChartVFP( "", myCtx,  Datos) ;
      
      myChart = ChartVFP( "",myCtx,  Datos) ;
      myCtx.addEventListener("click", function(evento){
        VFP_DrillDown(evento);
      }); 

  } else {

      myChart  = createChart("TODAS LAS SUCURSALES", Datos);
      
  }

    
};

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

function VFP_Sucursal (sucursal, parms) {
  
  Opciones = document.querySelector("#Tipo");
  //Opciones.innerHTML = "<option>Sucursal</option>";
  Opciones.children[1].selected=true;
  Datos   = TraeDatos("chart/vtasfpago.php", parms);
  //TotalesOpc(Datos);

  Datos_vtasfpago   = TraeDatos("datatable/vtasfpago.php", parms);
  DTable_vtasfpago(Datos_vtasfpago);
  sel_chart.nivel = 1;

  document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
  myCtx   = $("#chartCanvas")[0];  
  //myCtx.height = 450;

  myChart  = createChart(sucursal, Datos);
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

function TraeDatos (url, parms) {
  var result = false;
	$.ajax({
            url   : url,
	          type  : 'POST',
            //async : true,
            data  : parms,
            async: false,
            beforeSend: function () {
              $('#loader').removeClass('display-none')
            },
            success: function(data) {
              $('#data-table').removeClass('display-none')
              result = data;
            },
            complete: function () {
              $('#loader').addClass('display-none')
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
  MyNum1.innerText = opcs ;
  MyNum2.innerText = negs  ;
  myPorc2.style.display = "block";
  myPorc2.innerText = dosDecimales(porc) + " %" ;
}

function TotalesVFP(datos){
  if (datos && datos.length) {
    let totCre = datos.reduce((total, item) => total + parseFloat(item.Credito), 0);
    let totCon = datos.reduce((total, item) => total + parseFloat(item.Contado), 0);
    var CreDec = totCre.toFixed(2); 
    var ConDec = totCon.toFixed(2); 
    let Porc1 = parseFloat(CreDec) / (parseFloat(CreDec) + parseFloat(ConDec)) * 100;
    let Porc2 =  100 - Porc1.toFixed(2);
    Porc1 = 100 - Porc2;
    
    cred = formatoMX(CreDec);
    cont = formatoMX(ConDec);
    porc1 = formatoMX(Porc1);
    porc2 = formatoMX(Porc2);
  
  }
  else {
     cred = "0";
     cont = "0";
     porc1 = "0";
     porc2 = "0";
  }
  MyNum1.innerText = cred ;
  MyNum2.innerText = cont  ;
  myPorc1.style.display = "block";
  myPorc1.innerText = dosDecimales(porc1) + " %" ;
  myPorc2.style.display = "block";
  myPorc2.innerText = dosDecimales(porc2) + " %" ;
}

function TotalesVta(Data){
  if (Data && Data.length) {  
    let totPesos = Data.reduce((total, item) => total + parseFloat(item.Importe), 0);
    let totUnits = Data.reduce((total, item) => total + parseInt(item.Unidades), 0);

    pesos = totPesos.toLocaleString("es-MX", { style: 'currency', currency: 'MXN' });
    unidades = formatoMX(totUnits);
  }
  else {
    pesos = "0";
    unidades = "0";
  }
  MyNum1.innerText = pesos;
  MyNum2.innerText = unidades;
  myPorc1.style.display = "none";
  myPorc2.style.display = "none";
}

function dosDecimales(n) {
  let t=n.toString();
  let regex=/(\d*.\d{0,2})/;
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
  Inicializa(NChart, 0, 0);
  
}

function ChartOpc(){
  NChart = 1;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option>"

  Inicializa(NChart, 0, 0 );
  
}

function ChartEdoC(){
  NChart = 2;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Todas</option>"

  Inicializa(NChart, 0, 0);
  
}

function ChartVentaFP(){
  NChart = 3;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option><option>F. Pago</option>"

  Inicializa(NChart, 0, 0);
  
}

function CreaVarsHTML() {
  //Crea variables para manejo JavaScript conectadas a elementos HTML
  
  MyNum1   = $("#num1")[0];
  MyNum2   = $("#num2")[0];
  myPorc1  = $("#porc1")[0];
  myPorc2  = $("#porc2")[0];
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
    
    
    //Inicializa Totales desplegados
    MyNum1.innerText = "0";
    MyNum2.innerText = "0";
    myPorc1.innerText = "";
    myPorc2.innerText = "";
  
  }
  
  
  // Genera Chart
  window[Charts[NChart].funcion]();
}

function ActualizaParms() {
  myPar1   = $('#PickerFecIni').val().split("-").reverse().join("-");
  myPar2   = $('#PickerFecFin').val().split("-").reverse().join("-");
  myPar3   = $('#tipo').val().substring(0, 1);
  
}


