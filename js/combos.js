function cargacombos() {

    parms =  { "fecini":  myPar1,  "fecfin":  myPar2,    "fecini_ant":  myPar3, "fecfin_ant":  myPar4, "plaza": '', "division" : '', 
                "depto": '',  "familia" : '', "linea": '', "l1" :'', "l2" : '', "l3" : '', "l4" : '', "l5" : '', "l6" : '',
                "marca":'', "modelo" : ''
      }
    
    Consulta_Filtro   = TraeDatos("chart/vtasnetas_est.php", parms);
    Select_Opcs       = Consulta_Filtro;

    limpiar_filtro();
    
    $('input[name=lstdiv]').focusin(function() {
        $('input[name=lstdiv]').val('');
    });

    $('input[name=lstdep]').focusin(function() {
        $('input[name=lstdep]').val('');
    });

    $('input[name=lstfam]').focusin(function() {
        $('input[name=lstfam]').val('');
    });

    $('input[name=lstlin]').focusin(function() {
        $('input[name=lstlin]').val('');
    });

    $('input[name=lstl1]').focusin(function() {
        $('input[name=lstl1]').val('');
    });

    $('input[name=lstl2]').focusin(function() {
        $('input[name=lstl2]').val('');
    });

    $('input[name=lstl3]').focusin(function() {
        $('input[name=lstl3]').val('');
    });

    $('input[name=lstl4]').focusin(function() {
        $('input[name=lstl4]').val('');
    });

    $('input[name=lstl5]').focusin(function() {
        $('input[name=lstl5]').val('');
    });

    $('input[name=lstl6]').focusin(function() {
        $('input[name=lstl6]').val('');
    });

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

    $('input[name=lstdiv]').val('');
    $('input[name=lstdep]').val('');
    $('input[name=lstfam]').val('');
    $('input[name=lstlin]').val('');
    $('input[name=lstl1]').val('');
    $('input[name=lstl2]').val('');
    $('input[name=lstl3]').val('');
    $('input[name=lstl4]').val('');
    $('input[name=lstl5]').val('');
    $('input[name=lstl6]').val('');

    ActualizarList(Select_Opcs);

}


function get_div(elem) {

    if (  elem.value.replace(/\s/g,"").length &&  Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.division == elem.value);
        ActualizarList(Datos);
    }

}

function get_dep(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.depto == elem.value);
        ActualizarList(Datos);
    }

}

function get_fam(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.familia == elem.value);
        ActualizarList(Datos);
    }

}

function get_lin(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.linea == elem.value);
        ActualizarList(Datos);
    }

}

function get_l1(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l1 == elem.value);
        ActualizarList(Datos);
    }

}
function get_l2(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l2 == elem.value);
        ActualizarList(Datos);
    }

}
function get_l3(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l3 == elem.value);
        ActualizarList(Datos);
    }

}
function get_l4(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l4 == elem.value);
        ActualizarList(Datos);
    }

}
function get_l5(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l5 == elem.value);
        ActualizarList(Datos);
    }

}
function get_l6(elem) {

    if ( elem.value.replace(/\s/g,"").length && Select_Opcs.length > 0 ) {  
        Datos = Select_Opcs.filter(item => item.l6 == elem.value);
        ActualizarList(Datos);
    }

}


function ActualizarList(datos) {

    divList = datos.map(o => o.division);
    let uniqueDivs = [...new Set(divList)];
    
    depList = datos.map(o => o.depto);
    let uniqueDeps = [...new Set(depList)];

    famList = datos.map(o => o.familia);
    let uniqueFams = [...new Set(famList)];

    linList = datos.map(o => o.linea);
    let uniqueLineas = [...new Set(linList)];

    l1List = datos.map(o => o.l1);
    let uniqueL1s = [...new Set(l1List)];

    l2List = datos.map(o => o.l2);
    let uniqueL2s = [...new Set(l2List)];

    l3List = datos.map(o => o.l3);
    let uniqueL3s = [...new Set(l3List)];

    l4List = datos.map(o => o.l4);
    let uniqueL4s = [...new Set(l4List)];

    l5List = datos.map(o => o.l5);
    let uniqueL5s = [...new Set(l5List)];

    l6List = datos.map(o => o.l6);
    let uniqueL6s = [...new Set(l6List)];

    
    var listadivs = document.getElementById('divisiones');
    listadivs.innerHTML = "";
    uniqueDivs.forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        listadivs.appendChild(option);
    });

    
    var listadeptos = document.getElementById('deptos');
    listadeptos.innerHTML = ""
    uniqueDeps.forEach(function(item, index){
        var option = document.createElement('option');

        option.value = item
        listadeptos.appendChild(option);
    })

    
    var listafams = document.getElementById('familias');
    listafams.innerHTML = ""
    uniqueFams.forEach(function(item, index){
        var option = document.createElement('option');

        option.value = item
        listafams.appendChild(option);
    })

    var listalineas = document.getElementById('lineas');
    listalineas.innerHTML = ""
    uniqueLineas.forEach(function(item, index){
        var option = document.createElement('option');

        option.value = item
        listalineas.appendChild(option);
    })


    var listal1s = document.getElementById('l1s');
    listal1s.innerHTML = ""
    uniqueL1s.forEach(function(item, index){
        var option = document.createElement('option');

        if (item.replace(/\s/g,"")) {
            option.value = item
            listal1s.appendChild(option);
        }
        
    })

    var listal2s = document.getElementById('l2s');
    listal2s.innerHTML = ""
    uniqueL2s.forEach(function(item, index){
        var option = document.createElement('option');

        if (item.replace(/\s/g,"")) {
            option.value = item
            listal2s.appendChild(option);
        }
    })

    var listal3s = document.getElementById('l3s');
    listal3s.innerHTML = ""
    uniqueL3s.forEach(function(item, index){
        var option = document.createElement('option');
        
        if (item.replace(/\s/g,"")) {
            option.value = item
            listal3s.appendChild(option);
        }
        
    })

    var listal4s = document.getElementById('l4s');
    listal4s.innerHTML = ""
    uniqueL4s.forEach(function(item, index){
        var option = document.createElement('option');
        if (item.replace(/\s/g,"")) {
            option.value = item
            listal4s.appendChild(option);
         }
    })

    var listal5s = document.getElementById('l5s');
    listal5s.innerHTML = ""
    uniqueL5s.forEach(function(item, index){
        var option = document.createElement('option');

        if (item.replace(/\s/g,"")) {
            option.value = item
            listal5s.appendChild(option);
         }
    })

    var listal6s = document.getElementById('l6s');
    listal6s.innerHTML = ""
    uniqueL6s.forEach(function(item, index){
        var option = document.createElement('option');

        if (item.replace(/\s/g,"")) {
            option.value = item
            listal6s.appendChild(option);
        }
    })

}