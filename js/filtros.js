
$(function () {

  //deptos
  $('#seldep1').on('select2:select', function (e) {
    arrdep_1 = actualizaSeleccion($('#seldep1'), arrdep_1);
  });
  $('#seldep1').on('select2:unselect', function (e) {
    arrdep_1 = actualizaSeleccion($('#seldep1'), arrdep_1);
  });
  $('#seldep2').on('select2:select', function (e) {
    arrdep_2 = actualizaSeleccion($('#seldep2'), arrdep_2);
  });
  $('#seldep2').on('select2:unselect', function (e) {
    arrdep_2 = actualizaSeleccion($('#seldep2'), arrdep_2);
  });
  $('#seldep3').on('select2:select', function (e) {
    arrdep_3 = actualizaSeleccion($('#seldep3'), arrdep_3);
  });
  $('#seldep3').on('select2:unselect', function (e) {
    arrdep_3 = actualizaSeleccion($('#seldep3'), arrdep_3);
  });
  // familias
  $('#selfam1').on('select2:select', function (e) {
    arrfam_1 = actualizaSeleccion($('#selfam1'), arrfam_1);
  });
  $('#selfam1').on('select2:unselect', function (e) {
    arrfam_1 = actualizaSeleccion($('#selfam1'), arrfam_1);
  });
  $('#selfam2').on('select2:select', function (e) {
    arrfam_2 = actualizaSeleccion($('#selfam2'), arrfam_2);
    //actualiza hacia arriba
    //actualizaOps($('seldep2'),  arrdep_2, 2, 'CALZADO' , arrfam_2  ); //2 -Nivel Familia
  });
  $('#selfam2').on('select2:unselect', function (e) {
    arrfam_2 = actualizaSeleccion($('#selfam2'), arrfam_2);
  });
  $('#selfam3').on('select2:select', function (e) {
    arrfam_3 = actualizaSeleccion($('#selfam3'), arrfam_3);
  });
  $('#selfam3').on('select2:unselect', function (e) {
    arrfam_3 = actualizaSeleccion($('#selfam3'), arrfam_3);
  });
  // lineas
  $('#sellin1').on('select2:select', function (e) {
    arrlin_1 = actualizaSeleccion($('#sellin1'), arrlin_1);
  });
  $('#sellin1').on('select2:unselect', function (e) {
    arrlin_1 = actualizaSeleccion($('#sellin1'), arrlin_1);
  });
  $('#sellin2').on('select2:select', function (e) {
    arrlin_2 = actualizaSeleccion($('#sellin2'), arrlin_2);
  });
  $('#sellin2').on('select2:unselect', function (e) {
    arrlin_2 = actualizaSeleccion($('#sellin2'), arrlin_2);
  });
  $('#sellin3').on('select2:select', function (e) {
    arrlin_3 = actualizaSeleccion($('#sellin3'), arrlin_3);
  });
  $('#sellin3').on('select2:unselect', function (e) {
    arrlin_3 = actualizaSeleccion($('#sellin3'), arrlin_3);
  });
  // L1
  $('#sell11').on('select2:select', function (e) {
    arrl1_1 = actualizaSeleccion($('#sell11'), arrl1_1); 
  });
  $('#sell11').on('select2:unselect', function (e) {
    arrl1_1 = actualizaSeleccion($('#sell11'), arrl1_1);
  });
  $('#sell12').on('select2:select', function (e) {
    arrl1_2 = actualizaSeleccion($('#sell12'), arrl1_2);
  });
  $('#sell12').on('select2:unselect', function (e) {
    arrl1_2 = actualizaSeleccion($('#sell12'), arrl1_2);
  });
  $('#selll3').on('select2:select', function (e) {
    arrl1_3 = actualizaSeleccion($('#sell13'), arrl1_3);
  });
  $('#selll3').on('select2:unselect', function (e) {
    arrl1_3 = actualizaSeleccion($('#sell13'), arrl1_3);
  });
  //L2
  $('#sell21').on('select2:select', function (e) {
    arrl2_1 = actualizaSeleccion($('#sell21'), arrl2_1); 
  });
  $('#sell21').on('select2:unselect', function (e) {
    arrl2_1 = actualizaSeleccion($('#sell21'), arrl2_1);
  });
  $('#sell22').on('select2:select', function (e) {
    arrl2_2 = actualizaSeleccion($('#sell22'), arrl2_2);
  });
  $('#sell22').on('select2:unselect', function (e) {
    arrl2_2 = actualizaSeleccion($('#sell22'), arrl2_2);
  });
  $('#sell23').on('select2:select', function (e) {
    arrl2_3 = actualizaSeleccion($('#sell23'), arrl2_3);
  });
  $('#sell23').on('select2:unselect', function (e) {
    arrl2_3 = actualizaSeleccion($('#sell23'), arrl2_3);
  });
  //L3
  $('#sell31').on('select2:select', function (e) {
    arrl3_1 = actualizaSeleccion($('#sell31'), arrl3_1); 
  });
  $('#sell31').on('select2:unselect', function (e) {
    arrl3_1 = actualizaSeleccion($('#sell31'), arrl3_1);
  });
  $('#sell32').on('select2:select', function (e) {
    arrl3_2 = actualizaSeleccion($('#sell32'), arrl3_2);
  });
  $('#sell32').on('select2:unselect', function (e) {
    arrl3_2 = actualizaSeleccion($('#sell32'), arrl3_2);
  });
  $('#sell33').on('select2:select', function (e) {
    arrl3_3 = actualizaSeleccion($('#sell33'), arrl3_3);
  });
  $('#sell33').on('select2:unselect', function (e) {
    arrl3_3 = actualizaSeleccion($('#sell33'), arrl3_3);
  });
  //L4
  $('#sell41').on('select2:select', function (e) {
    arrl4_1 = actualizaSeleccion($('#sell41'), arrl4_1); 
  });
  $('#sell41').on('select2:unselect', function (e) {
    arrl4_1 = actualizaSeleccion($('#sell41'), arrl4_1);
  });
  $('#sell42').on('select2:select', function (e) {
    arrl4_2 = actualizaSeleccion($('#sell42'), arrl4_2);
  });
  $('#sell42').on('select2:unselect', function (e) {
    arrl4_2 = actualizaSeleccion($('#sell42'), arrl4_2);
  });
  $('#sell43').on('select2:select', function (e) {
    arrl4_3 = actualizaSeleccion($('#sell43'), arrl4_3);
  });
  $('#sell43').on('select2:unselect', function (e) {
    arrl4_3 = actualizaSeleccion($('#sell43'), arrl4_3);
  });
  //L5
  $('#sell51').on('select2:select', function (e) {
    arrl5_1 = actualizaSeleccion($('#sell51'), arrl5_1); 
  });
  $('#sell51').on('select2:unselect', function (e) {
    arrl5_1 = actualizaSeleccion($('#sell51'), arrl5_1);
  });
  $('#sell52').on('select2:select', function (e) {
    arrl5_2 = actualizaSeleccion($('#sell52'), arrl5_2);
  });
  $('#sell52').on('select2:unselect', function (e) {
    arrl5_2 = actualizaSeleccion($('#sell52'), arrl5_2);
  });
  $('#sell53').on('select2:select', function (e) {
    arrl5_3 = actualizaSeleccion($('#sell53'), arrl5_3);
  });
  $('#sell53').on('select2:unselect', function (e) {
    arrl5_3 = actualizaSeleccion($('#sell53'), arrl5_3);
  });
  //L6
  $('#sell61').on('select2:select', function (e) {
    arrl6_1 = actualizaSeleccion($('#sell61'), arrl6_1); 
  });
  $('#sell61').on('select2:unselect', function (e) {
    arrl6_1 = actualizaSeleccion($('#sell61'), arrl6_1);
  });
  $('#sell62').on('select2:select', function (e) {
    arrl6_2 = actualizaSeleccion($('#sell62'), arrl6_2);
  });
  $('#sell62').on('select2:unselect', function (e) {
    arrl6_2 = actualizaSeleccion($('#sell62'), arrl6_2);
  });
  $('#sell63').on('select2:select', function (e) {
    arrl6_3 = actualizaSeleccion($('#sell63'), arrl6_3);
  });
  $('#sell43').on('select2:unselect', function (e) {
    arrl6_3 = actualizaSeleccion($('#sell63'), arrl6_3);
  });
});



function Muestra_Filtro_Estructura() {
  
  if (todosNodos.length > 0 ) {
    return;
  }

  todosNodos = Object.values(TraeDatos("config/estructura.php",[]));
  
  //obj1 = createTree(todosNodos);
  //Opcs_Tree = ModifyProperty(obj1,  "text" );

  // $('.depto').select2({
  //   placeholder: {
  //     id: '-1', // the value of the option
  //     text: 'Seleccione un Departamento'
  //   }
  // });
  
  CargaSelect($('#seldep1'), 2, "CALZADO") ;
  CargaSelect($('#seldep2'), 2, "ACCESORIOS") ;
  CargaSelect($('#seldep3'), 2, "ELECTRONICA") ;

  CargaSelect($('#selfam1'), 3, "CALZADO") ;
  CargaSelect($('#selfam2'), 3, "ACCESORIOS") ;
  CargaSelect($('#selfam3'), 3, "ELECTRONICA") ;

  CargaSelect($('#sellin1'), 4, "CALZADO") ;
  CargaSelect($('#sellin2'), 4, "ACCESORIOS") ;
  CargaSelect($('#sellin3'), 4, "ELECTRONICA") ;

  CargaSelect($('#sell11'), 5, "CALZADO") ;
  CargaSelect($('#sell12'), 5, "ACCESORIOS") ;
  CargaSelect($('#sell13'), 5, "ELECTRONICA") ;

  CargaSelect($('#sell21'), 6, "CALZADO") ;
  CargaSelect($('#sell22'), 6, "ACCESORIOS") ;
  CargaSelect($('#sell23'), 6, "ELECTRONICA") ;

  CargaSelect($('#sell31'), 7, "CALZADO") ;
  CargaSelect($('#sell32'), 7, "ACCESORIOS") ;
  CargaSelect($('#sell33'), 7, "ELECTRONICA") ;

  CargaSelect($('#sell41'), 8, "CALZADO") ;
  CargaSelect($('#sell42'), 8, "ACCESORIOS") ;
  CargaSelect($('#sell43'), 8, "ELECTRONICA") ;

  CargaSelect($('#sell51'), 9, "CALZADO") ;
  CargaSelect($('#sell52'), 9, "ACCESORIOS") ;
  CargaSelect($('#sell53'), 9, "ELECTRONICA") ;

  CargaSelect($('#sell61'), 10, "CALZADO") ;
  CargaSelect($('#sell62'), 10, "ACCESORIOS") ;
  CargaSelect($('#sell63'), 10, "ELECTRONICA") ;
  
};

function actualizaOps(lista, arr, nivel, division, arr_nivelinf) {

  
  if (arr.length == 0 || arr_nivelinf.length > 0 ) {

    for (var nodo of todosNodos ) {
      n = item.href.split("|").length ;
      len = (indexOfNth(nodo.parentId,"-",1) < 0 ? nodo.parentId.length : indexOfNth(nodo.parentId,"-",1) );    
      item = nodo.parentId.substring(0, len);


    }

  }
  
}


function CargaSelect(lista, nivel, division) {
  //$('#seldep3').val(null).trigger('change'); deselect
  lista.empty();
  arr = [];
  //Seleccionar segun nivel, division y llenar arreglo
  for(var item of todosNodos){
    n = item.href.split("|").length ;
    lenDiv = (indexOfNth(item.parentId,"-",1) < 0 ? item.parentId.length : indexOfNth(item.parentId,"-",1) );    
    itemDiv = item.parentId.substring(0, lenDiv);
    if ( n == nivel && itemDiv == division) {
        pos = indexOfNth(item.href,"|", n-1) + 1;
        len = (indexOfNth(item.href,"|", n) < 0 ? item.href.length : indexOfNth(item.href,"|", n) );    
        str = item.href.substring(pos, len);
        arr.push(str);
    }
  }
  //quitar duplicados
  uniq = [...new Set(arr)];
  //crear las opciones del select y agragarlos
  for (i=0; i < uniq.length; i++ ) {
    var newOption = new Option(uniq[i], uniq[i], false, false);
    lista.append(newOption).trigger('change');
  }

}




function BorrarSels() {
$('#treeview').treeview('uncheckAll', { silent: true });
};

function DeleteProperty(obj, key) {
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (i == key) {
          delete obj[key];
      } else if (typeof obj[i] == 'object') {
        DeleteProperty(obj[i], key);
      }
  }
  return obj;
};

function ModifyProperty(obj, key) {
  //quitar nombres compuestos 
  //encontrar posicion de ultimo guion de la propiedad texto
  //reemplazar con vacio desde 0 hasta la posicion del ultimo guion
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (i == key) {
          if (obj[i].trim().length > 0) {  
            var pos = obj[i].lastIndexOf('-');
            obj[i] = obj[i].substring(pos+1);
          } 
      } else if (typeof obj[i] == 'object') {
        ModifyProperty(obj[i], key);
      }
  }
  return obj;
};


function createTree(data) {
  let root;
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.text] = i;
    return acc;
  }, {});

  data.forEach(el => {
    // Handle the root element
    if (el.parentId === '') {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[el.parentId]];

    // Add our current el to its parent's `children` array
    parentEl.nodes = [...(parentEl.nodes || []), el];
  });
  
  return root;
};
  

function SiyaExiste (arr, str) {
  res = false;
  for (indice=0; indice < arr.length; indice++) {
    
    parte_str = str.substring(0, indexOfNth(str,"|", arr[indice].split("|").length) );
    if (arr[indice] === parte_str) {
       res = true;
       break;
    }
  }
  return res;
}


function obtenerSeleccion(select ) {
  let sel = [];
  let arr = [];
  arr = select.find(':selected');
  for (i=0; i < arr.length; i++) {
    sel.push(arr[i].innerText);
  }
  return sel;
}

function actualizaSeleccion(select, arr){
  opcs = select.find(':selected');
  arr = [];
  for (i=0; i < opcs.length; i++) {
    arr.push(opcs[i].innerText);
  }
  return arr;
}

function AplicarFiltro() {
  
  $("#loadingoverlay").fadeIn();

  
  //Agrupar las selecciones en 3 filtros por division
  if (document.getElementById("division1").checked)  {
      filtro_1 = ['CALZADO'];
  }
  else {
    filtro_1 = [];
  }
    
  ObtenerFiltro(filtro_1, arrdep_1);
  ObtenerFiltro(filtro_1, arrfam_1);
  ObtenerFiltro(filtro_1, arrlin_1);
  ObtenerFiltro(filtro_1, arrl1_1);
  ObtenerFiltro(filtro_1, arrl2_1);
  ObtenerFiltro(filtro_1, arrl3_1);
  ObtenerFiltro(filtro_1, arrl4_1);
  ObtenerFiltro(filtro_1, arrl5_1);
  ObtenerFiltro(filtro_1, arrl6_1);

  if (document.getElementById("division2").checked)  {
    filtro_2 = ['ACCESORIOS'];
  }
  else {
    filtro_2 = [];
  }
  
  ObtenerFiltro(filtro_2, arrdep_2);
  ObtenerFiltro(filtro_2, arrfam_2);
  ObtenerFiltro(filtro_2, arrlin_2);
  ObtenerFiltro(filtro_2, arrl1_2);
  ObtenerFiltro(filtro_2, arrl2_2);
  ObtenerFiltro(filtro_2, arrl3_2);
  ObtenerFiltro(filtro_2, arrl4_2);
  ObtenerFiltro(filtro_2, arrl5_2);
  ObtenerFiltro(filtro_2, arrl6_2);
  
  if (document.getElementById("division3").checked)  {
    filtro_3 = ['ELECTRONICA'];
  }
  else {
    filtro_3 = [];
  }

  ObtenerFiltro(filtro_3, arrdep_3);
  ObtenerFiltro(filtro_3, arrfam_3);
  ObtenerFiltro(filtro_3, arrlin_3);
  ObtenerFiltro(filtro_3, arrl1_3);
  ObtenerFiltro(filtro_3, arrl2_3);
  ObtenerFiltro(filtro_3, arrl3_3);
  ObtenerFiltro(filtro_3, arrl4_3);
  ObtenerFiltro(filtro_3, arrl5_3);
  ObtenerFiltro(filtro_3, arrl6_3);

  //Agrupar los filtros por division en uno solo
  filtroNodos = [];
  filtroNodos = [...filtro_1] ;
  filtroNodos = filtroNodos.concat(filtro_2);
  filtroNodos = filtroNodos.concat(filtro_3);

  mostrarFiltro(filtroNodos);
  actualizaChartVtasNetas(filtroNodos);
      
  
  //$('#loading').hide();
  $('#Cerrar')[0].click();

  $("#loadingoverlay").fadeOut();
  
};


function ObtenerFiltro(filtro_div, arr) {
  const nivel = [...filtro_div];
  let str = '';
  if (nivel.length == 0 ) {
      if (arr.length == 0) {
        filtro_div.push(',' ) ;
      }
      for (i=0; i < arr.length; i++) {
          filtro_div.push(',' + arr[i]) ;
      }
  }
  for (j=0; j < nivel.length; j++) {
    if (arr.length > 0 ) {
      for (i=0; i < arr.length; i++) {
          str = nivel[j] + ',' + arr[i];
          found = filtro_div.indexOf(nivel[j]);
          if (found == -1) {
              filtro_div.push(str);
          } else { 
              filtro_div[found] += (',' + arr[i]);
          }
      }
    } else {
      str += (nivel[j] + ',') ; 
      found = filtro_div.indexOf(nivel[j]);
      if (found == -1) {
          filtro_div.push(str)
      } else {
          filtro_div[found] += ',';
      }
    }
  }
  
}



function actualizaChartVtasNetas(selecciones) {

    let filtro = "";
    let datosFiltro = [];
    //arma un parametro con todos los filtros seleccionados
    if (selecciones.length > 0) { 
      for (i=0; i<selecciones.length;i++) {
          filtro += "|" + selecciones[i];
      }
    
      let parms =  { "fecini": myPar1, "fecfin"  : myPar2,   "fecini_ant": myPar3, "fecfin_ant": myPar4, "params" : filtro }
      datosFiltro = TraeDatos("chart/vtasnetas_filtro.php", parms);
    } 
    GenChartVtas(datosFiltro);
  }

function removeSelect(refresh) {
  refresh = refresh || false;
  var list = document.getElementById("mySelect");
  if (list) {
    if (refresh) {
      list.value = list.length -1;
    } else { 
    document.getElementById("mySelect").remove();
    }
  }
}

function mostrarFiltro(arr) {
  //Remove select list if exists
  var myDiv = document.getElementById("FiltroAplicado");
  //Si existe quitarlo
  removeSelect();
  
  if (arr.length == 0) {
    return;
  }
  quitarFiltro = [];
  // revisar si un parametro como filtro de articulo no genera datos
  for (i=0; i< arr.length; i++) {
    let parms =  { "fecini": myPar1, "fecfin"  : myPar2,   "fecini_ant": myPar3, "fecfin_ant": myPar4, "params" : arr[i] }
    lendatos = TraeDatos("chart/vtasnetas_filtro.php", parms) .length;
    if (lendatos == 0) {
        quitarFiltro.push(arr[i]);
    }
  }
  // Quitarlo del Selector de Filtros
  arr = arr.filter( ( el ) => !quitarFiltro.includes( el ) );
  if (arr.length == 0) {
    return;
  }
  //Actualizar el Filtro para los que si tienen resultados
  filtroNodos = [...arr];
  arr = arr.map( param => param.replace(/\,/g,'-> '));
  if (arr.length > 1 ) { 
    arr.unshift('TODOS LOS FILTROS (' + arr.length + ')');
  }
  arr.push('NINGUN FILTRO');
  
  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.appendChild(selectList);
  $('#mySelect').css({ 'font-size': '10px', 'color': 'black', 'margin':'5px'});
  $('.btn-open-dialog').css({ 'color': 'black', 'margin':'5px'});

    //Create and append the options
  for (var i = 0; i < arr.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.text = arr[i];
      selectList.appendChild(option);
  }

  selectList.onchange = function(event) {
    switch (parseInt(this.value)) {
      case 0:  
        //Todos los filtros de estructura seleccionados
        actualizaChartVtasNetas(filtroNodos);
        break;
      case arr.length-1 :
        //Sin Filtro
        actualizaChartVtasNetas([]);
        break;
      default: 
         //Segun Filtro Seleccionado
         var sel = filtroNodos.filter( (value, index) => index === this.value-1);
         actualizaChartVtasNetas(sel);
        break;
    }
 }

}



function indexOfNth (string, char, nth, fromIndex=0) {
  let indexChar = string.indexOf(char, fromIndex);
  if (indexChar === -1){
    return -1;
  } else if (nth === 1) {
    return indexChar;
  } else {
    return indexOfNth(string, char, nth-1, indexChar+1);
  }
};

function GeneraDatosVtasNetas(valores) {

  var division = categs[0];
  var depto   = categs[1] || '';
  var familia = categs[2] || '';
  var linea = categs[3] || '';
  var l1 = categs[4] || '';
  var l2 = categs[5] || '';
  var l3 = categs[6] || '';
  var l4 = categs[7] || '';
  var l5 = categs[8] || '';
  var l6 = categs[9] || '';
  var modelo = "";
  var marca = "";
  var plaza = 0;

  parms =  { "fecini": myPar1, "fecfin"  : myPar2,   "fecini_ant": myPar3, "fecfin_ant": myPar4, "plaza"  : plaza, "division" : division, 
  "depto" : depto, "familia" : familia, "linea"     : linea, "l1"        : l1,    "l2"     : l2,    "l3"          : l3, 
  "l4"    : l4,    "l5"      : l5,      "l6"        : l6,    "marca"     : marca, "modelo" : modelo
  }

  datos = TraeDatos("chart/vtasnetas_filtro.php", parms);
  return datos 
};

// function getAllNodes(){
//   var treeViewObject = $('#tree').data('treeview'),
//       allCollapsedNodes = treeViewObject.getCollapsed(),
//       allExpandedNodes = treeViewObject.getExpanded(),
//       allNodes = allCollapsedNodes.concat(allExpandedNodes);

//   return allNodes;
// }


