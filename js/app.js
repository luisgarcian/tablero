
//Variables Globales
var myTitulo = "";
var myTit1 = "";
var myTit2 = "";
var myNum1 = "";
var myNum2 = "";
var myPorc = "";
var myUser = "";
var myChart = "";
var NChart = 0; 
var myPar1 = "";
var myPar2 = "";
var myPar3  = "";
var miTabla = "";
var myCtx  = "";

var Charts = [
  {"titulo" : "Ventas Netas",     
   "funcion": "GenChartVtas", 
   "Tit1"   : "Ventas Totales", "Tit2": "Unidades Totales"
  },
  {"titulo" : "Opciones Negadas", 
   "funcion": "GenChartOpcs", 
   "Tit1"   : "Opciones", "Tit2": "Negadas"
  },
];

$(function () {
  CreaVarsHTML();
  ActualizaParms();

  //Generar el Chart Default dependiendo del valor de NChart = 0
  window[Charts[NChart].funcion]();

  const boton = document.querySelector("#BtnUpdate");
  boton.addEventListener("click", function(evento){
        evento.preventDefault();

        ActualizaParms();
        window[Charts[NChart].funcion]();
  });

  //Generar Chart en cambio de seleccion combo
  $('#tipo').on('change', function () {
     myPar3   = $('#tipo').val().substring(0, 1);
     myTitulo.innerText = Charts[NChart].titulo + " por " + $('#tipo').val(); 
     window[Charts[NChart].funcion]();
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
  InitTable(Datos);

  myCtx   = $("#chartCanvas")[0];  
  myCtx.height = 380;
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
  InitTable(Datos);

  myCtx   = $("#chartCanvas")[0];  
  myCtx.height = 380;
  myChart = CreaChartOpcNeg(myCtx,  Datos) ;
  myCtx.addEventListener("click", function(evento){
       Neg_DrillDown(evento);
  }); 

};

function Neg_DrillDown (evt) {
  var activePoint = myChart.getElementAtEvent(evt)[0];
  if (activePoint !== undefined) {
     const chartData = activePoint['_chart'].config.data;
     var  idx = activePoint._index;
     //var data = activePoint._chart.data;
     //var datasetIndex = activePoint._datasetIndex;
     //var datasetname = data.datasets[datasetIndex].label;
     //var value = data.datasets[datasetIndex].data[idx];
     var label = chartData.labels[idx];
     Parms =  {
      "fecini":  myPar1,
      "fecfin":  myPar2,
      "tipo"  :  label,
    }
    myTitulo.innerText = Charts[NChart].titulo + " por vendedor en " + label; 
    Opciones = document.querySelector("#Tipo");
    Opciones.innerHTML = "<option>Sucursal</option>";
    Opciones.children[0].selected=true;

    Datos   = TraeDatos("chart/opnegadas.php", Parms);
    TotalesOpc(Datos);
    InitTable(Datos);

    document.querySelector("#chartReport").innerHTML = '<canvas id="chartCanvas"></canvas>';
    myCtx   = $("#chartCanvas")[0];  
    myCtx.height = 380;
    myChart = CreaChartOpcNeg(myCtx,  Datos)
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
            success: function(data) {
            result = data;
            },
            error: function(error) {
              console.log(error);
            }
   })
   return result;
};

 
function CreaChartVtasNetas(myCtx, Data) {
  var yAxisLabels  = [];
  var dataSeries1  = [];
  var dataSeries2  = [];
  
  for (var i in Data) {
    yAxisLabels.push(Data[i].suc);
    dataSeries1.push(Data[i].vta);
    dataSeries2.push(Data[i].uni);
  }
  
  var chartdata = {
    labels: yAxisLabels,
    datasets: [
      {
        type : 'bar',
        label: 'PESOS',
        fill : false,
        borderColor: '#042f66',
        backgroundColor:  '#042f66',
        yAxisID: 'y-axis-1',
        data: dataSeries1
      }, //dataset1
      {
        type : 'line',
        label: 'UNIDADES',
        fill : false,
        borderWidth:4,
        borderColor: '#44bcd8',
        backgroundColor:  '#44bcd8',
        data: dataSeries2,
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        yAxisID: 'y-axis-2'
      } //dataset2
    ] //datasets
  }; //var chartdata

 
  var myChart = new Chart(myCtx, {
    type : 'bar',
    data: chartdata,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {fill:false}
      },
      title: {
        display: true,
        fontSize:18,
        fontColor: '#111B54'
      },
      legend:{
        display: true,
        position: 'bottom',
        label:{
            padding:5,
            boxwidth:15,
            fontFamily:'sans-serif',
            fontColor: 'black',
            fontSize : 2
        }
      },
      tooltips: {
        backgroundColor: '#F8AC23',
        titleFontSize :14,
        titleFontColor : '#2C3179',
        bodyFontColor : 'black', 
        xPadding: 20,
        yPadding: 10,
        bodyFontSize:14,
        bodySpacing: 5,
        mode: 'label', // point/label
        callbacks: {
          label: function(tooltipItem, data) {
              let label = data.labels[tooltipItem.index];
              let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return formatoMX(value) ;
          }
      }
    },
     scales: vtas_scales
    },
  }) 

  return myChart;

} // Function CreaChartVtasNetas


function CreaChartOpcNeg(myCtx,Data) {
  
  var yAxisLabels  = [];
  var dataSeries1  = [];
  var dataSeries2  = [];
  var dataSeries3  = [];
  
  // for (var i in Data) {
  //   yAxisLabels.push(Data[i].gpo);
  //   dataSeries1.push(Data[i].opc);
  //   dataSeries2.push(Data[i].neg);
  //   dataSeries3.push(Data[i].porc);
  // }

    arr = Object.keys(data).filter( function(item){
         if ( item.indexOf ) {
          return data[item];
         }
         
    })
  
    var column1 = [];
    var column2 = [];
    var column3 = [];
    for(var i=0; i<Data.length; i++){
       column1.push(Data[i][0]);
       column2.push(Data[i][1]);
       column3.push(Data[i][2]);
    }
     

 var array = [new Array(20), new Array(20), new Array(20)]; //..your 3x20 array
 getCol(array, 0); //Get first column
  
  


  //const serie1 = Data.map(serie => Data[keys[0]]);
  //const serie2 = Data.map(serie => Data[keys[1]]);
  //const serie3 = Data.map(serie => Data[keys[2]]);
  

  var chartdata = {
    labels: yAxisLabels,    
    datasets: [
      {
        type : 'bar',
        label: 'OPCIONES',
        fill : false,
        borderColor: '#042f66',
        backgroundColor:  '#042f66',
        yAxisID: 'y-axis-1',
        data: dataSeries1
      }, //dataset1
      {
        type : 'bar',
        label: 'NEGADAS',
        fill : false,
        borderColor: '#44bcd8',
        backgroundColor:  '#44bcd8',
        yAxisID: 'y-axis-2',
        data: dataSeries2
      }, //dataset2

    ] //datasets
  }; //var chartdata

  const tooltips = {
    backgroundColor: '#F8AC23',
    titleFontSize :14,
    titleFontColor : '#2C3179',
    bodyFontColor : 'black', 
    xPadding: 20,
    yPadding: 10,
    bodyFontSize:14,
    bodySpacing: 5,
    mode: 'label', // point/label
    callbacks: {
      label: function(tooltipItem, data) {
          //let label = data.labels[tooltipItem.index];
          let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return formatoMX(value) ;
      }
    }
  };

  var myChart = new Chart(myCtx, {
    type : 'bar',
    data: chartdata,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {fill:false}
      },
      title: {
        display: true,
        fontSize:18,
        fontColor: '#111B54'
      },
      legend:{
        display: true,
        position: 'bottom',
        label:{
            padding:5,
            boxwidth:15,
            fontFamily:'sans-serif',
            fontColor: 'black',
            fontSize : 2
        }
      },
      tooltips: tooltips,
      scales: negadas_scales,
    },
  }) 
  return myChart;
   
} // Function CreaChartOpcNegadas


function TotalesOpc(Data){
  if (Datos && Datos.length) {
    let totOpc = Data.reduce((total, item) => total + parseInt(item.opc), 0);
    let totNeg = Data.reduce((total, item) => total + parseInt(item.neg), 0);
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
  myPorc.style.display = "block";
  myPorc.innerText = dosDecimales(porc) + " %" ;
}


function TotalesVta(Data){
  if (Datos && Datos.length) {  
    let totPesos = Data.reduce((total, item) => total + parseFloat(item.vta), 0);
    let totUnits = Data.reduce((total, item) => total + parseInt(item.uni), 0);

    pesos = totPesos.toLocaleString("es-MX", { style: 'currency', currency: 'MXN' });
    unidades = formatoMX(totUnits);
  }
  else {
    pesos = "0";
    unidades = "0";
  }
  MyNum1.innerText = pesos;
  MyNum2.innerText = unidades;
  myPorc.style.display = "none";
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
  Inicializa(NChart);
  
}

function ChartOpc(){
  NChart = 1;
  
  Opciones = document.querySelector("#Tipo");
  Opciones.innerHTML = "<option>Sucursal</option>"

  Inicializa(NChart);
  
}

function CreaVarsHTML() {
  //Crea variables para manejo JavaScript conectadas a elementos HTML
  myTitulo = $('#Titulo')[0];
  MyNum1   = $("#num1")[0];
  MyNum2   = $("#num2")[0];
  myPorc   = $("#porc")[0];
  myTit1   = $("#tit1")[0];
  myTit2   = $("#tit2")[0];
  myCtx    = $("#chartCanvas")[0];
}

function Inicializa(NChart) {
  
  ActualizaParms();

  myTitulo.innerText = Charts[NChart].titulo + " por " + $('#tipo').val(); 
  myTit1.innerText = Charts[NChart].Tit1;
  myTit2.innerText = Charts[NChart].Tit2;
  
  MyNum1.innerText = "0";
  MyNum2.innerText = "0";
  myPorc.innerText = "";
    
  // Genera Chart
  window[Charts[NChart].funcion]();
}

function ActualizaParms() {
  myPar1   = $('#PickerFecIni').val().split("-").reverse().join("-");
  myPar2   = $('#PickerFecFin').val().split("-").reverse().join("-");
  myPar3   = $('#tipo').val().substring(0, 1);
  myTitulo.innerText = Charts[NChart].titulo + " por " + $('#tipo').val();
}


function InitTable(data) {
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
      ordering : false,
      bFilter  : false,
      bDestroy : true,
      language : {
        "emptyTable": "No se encuentran datos disponibles"
      }
  }).draw();

}
