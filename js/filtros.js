
function Llena_Filtro_Adicional() {

    //opciones en seleccion
    divisiones = [];
    deptos     = [];
    familias   = [];
    lineas     = [];
    l1s        = [];
    l2s        = [];
    l3s        = [];
    l4s        = [];
    l5s        = [];                        
    l6s        = [];

    //Todas las opciones 
    
    opcs = Object.values(Inicializa_Filtro_VtasNetas()) ;
    
    optsfiltro = 'optgroups =  [';
    div_ant = "";
    depto_ant = "";
    fam_ant = "";
    lin_ant = "";

    gpo = 0;
    
      // Crea variable para crear el menu de filtro por sucursales
    var optgroups = "";
    for (var i = 0; i < opcs.length; i++)  {
      division       =  opcs[i].division;
      depto          =  opcs[i].depto;
      familia        =  opcs[i].familia;
      linea          =  opcs[i].linea;
      if (division != div_ant) {
          if (gpo > 0) {
            optsfiltro += ']},'
            gpo = 0;
          }
          optsfiltro +=  '{ label : "' + division + '", children: [ '; 
          gpo++;
          div_ant = division
      }
      if (depto_ant != depto) { 
        optsfiltro += '{label: "' + depto + '", value: "' + depto + '"},'
        depto_ant = depto;
      }
    }
    if (gpo > 0) {
      optsfiltro += ']}  ];'
    }
    
    eval(optsfiltro);
  
    $('#FiltroSucursales').multiselect('dataprovider', optgroups);
  
  }
  
  
  function Check_Filtro_Adicional(TFiltro) {
  
    todas = Object.values(Inicializa_Filtro_VtasNetas()) ;

    //todas = Object.values(TraeDatos("config/optsucursal.php",[]));

    $plaza = "";
    switch (TFiltro)  {
      case 0:
        $plaza = '00';
        break;
      case 1:
        $plaza = '01';
        break;
      case 2:  
        $plaza = '02';
        break;
    }
    Filtro = [];
    todas.map( function( el ){ 
      if ($plaza == '00') {
        //return el.nomsucursal; 
        Filtro.push(el.nomsucursal)
        Filtro.push(el.nomsucursal+ "_ant")
      } else   {
        if (el.plaza == $plaza ) { 
          //return el.nomsucursal; 
          Filtro.push(el.nomsucursal)
          Filtro.push(el.nomsucursal+ "_ant")
        }   
      }  
     
    });
    
    $('#FiltroAdicional').multiselect("deselectAll", false);
    // $('#FiltroAdicional').multiselect('select', Filtro );
    // $('#FiltroAdicional').multiselect('refresh') ;
  
  };
  


function Inicializa_Filtro_VtasNetas() {

    parms =  { "fecini":  myPar1,  "fecfin":  myPar2,    "fecini_ant":  myPar3, "fecfin_ant":  myPar4, "plaza": '', "division" : '', 
                "depto": '',  "familia" : '', "linea": '', "l1" :'', "l2" : '', "l3" : '', "l4" : '', "l5" : '', "l6" : '',
                "marca":'', "modelo" : ''
      }
    
    return (TraeDatos("chart/vtasnetas_est.php", parms));

}

function aplicar_filtro() {

    //actualizar parámetros segun datalist seleccionados
    $plaza = 0;
    $division = "";
    $depto = "";
    $familia = "";
    $linea = "";
    $l1 = "";
    $l2 = "";
    $l3 = "";
    $l4 = "";
    $l5 = "";
    $l6 = "";
    $modelo = "";
    $marca = "";

    $division = $('#indiv').val();
    $depto    = $('#indep').val();
    $familia  = $('#infam').val();
    $linea    = $('#inlin').val();
    $l1       = $('#inl1').val();
    $l2       = $('#inl2').val();
    $l3       = $('#inl3').val();
    $L4       = $('#inl4').val();
    $L5       = $('#inl5').val();
    $L6       = $('#inl6').val();

    parms =  { "fecini": myPar1, "fecfin"  : myPar2,   "fecini_ant": myPar3, "fecfin_ant": myPar4, "plaza"  : $plaza, "division" : $division, 
               "depto" : $depto, "familia" : $familia, "linea"     : $linea, "l1"        : $l1,    "l2"     : $l2,    "l3"          : $l3, 
               "l4"    : $l4,    "l5"      : $l5,      "l6"        : $l6,    "marca"     : $marca, "modelo" : $modelo
    }

    Datos_Filtro   = TraeDatos("chart/vtasnetas_filtro.php", parms);


    //Cerrar Ventana
   $('#Cerrar')[0].click();
   
   //Llamar  GenChartVtas() con datos filtrados
   GenChartVtas(Datos_Filtro);

}

function limpiar_filtro() {


    ActualizarList(Select_Opcs);

}


function get_div(elem) {

    if (  elem.value.replace(/\s/g,"").length &&  Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.division == elem.value);
        ActualizarList(Datos);
    }

}


function ActualizarList(datos) {


}