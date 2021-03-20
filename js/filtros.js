

function getTree() {

  ObjChecked = [];
  todosNodos = Object.values(TraeDatos("config/estructura.php",[]));

   //convertir en arbol de jerarquias
   tree = createTree(todosNodos);
   //quitar propiedad parentId
   obj1 = DeleteProperty(tree,  "parentId" );
  // quitar prefijos de nombre
   obj3 = ModifyProperty(obj1,  "text" );
   //convertir objeto a String
   obj2 =  JSON.stringify(obj1);
   //quitar primer nodo
   var ret = obj2.replace('{"text":"DIVISIONES","href":"","nodes":','');
   //quitar ultimo caracter
   var res = ret.substring(0, ret.length-1);
   
   return res;
};


function Muestra_Filtro_Estructura() {

  $('#treeview').treeview({
    data: getTree(),
    //showBorder: false,
    showCheckbox: true,
    multiSelect: true,
    //color: "black",
    //backColor: "white",
  });

  //  $('#treeview').treeview('uncheckAll', { silent: true });
  // //$('#treeview').treeview('collapseAll', { silent: true}); 
  
  $('#treeview').on('nodeChecked', function(event, data) {
      getStructure();
  });

  //  // Triggered when a node is unchecked 
  $('#treeview').on('nodeUnChecked', function(event, data) {
      getStructure();
  });
};


function getStructure(){
ObjChecked = $('#treeview').treeview('getChecked');
};

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

function AplicarFiltro() {

  let unicos = [];
  //Revisar nodos con check y seleccionar solo los padres que incluyan a todos sus hijos
  if (ObjChecked.length > 0 ) {  
    for (num=0; num < ObjChecked.length; num++  ) {
      str = ObjChecked[num].href;
      if ( str !== 'undefined' || str.length>0 ) {
        // Si no existe el nodo agregarlo
        if ( !SiyaExiste( unicos, str ) ) {
          unicos.push(str);
        }
      }
    }
  }
  //cambiar los "|" por comas 
  filtroNodos = unicos.map( param => param.replace(/\|/g,','));
  
  actualizaChartVtasNetas(filtroNodos);
  mostrarFiltro(filtroNodos);
    
  $('#Cerrar')[0].click();
};

function actualizaChartVtasNetas(selecciones) {

  let filtro = "";
  for (i=0; i<selecciones.length;i++) {
      filtro += "|" + selecciones[i];
  }
  let parms =  { "fecini": myPar1, "fecfin"  : myPar2,   "fecini_ant": myPar3, "fecfin_ant": myPar4, "params" : filtro }
  let datosFiltro = TraeDatos("chart/vtasnetas_filtro.php", parms);
  GenChartVtas(datosFiltro);

}


function mostrarFiltro(arr) {
  //Remove select list if exists
  var myDiv = document.getElementById("FiltroAplicado");
  var list = document.getElementById("mySelect");
  if (list) {
    document.getElementById("mySelect").remove();
  }

  if (!arr.length) {
    return;
  }

  arr = arr.map( param => param.replace(/\,/g,'->'));
  arr.unshift('TODOS LOS FILTROS');
  arr.push('NINGUN FILTRO');
  
  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.appendChild(selectList);
  $('#mySelect').css({ 'font-size': '10px', 'color': 'black', 'margin':'8px'});
  $('.btn-open-dialog').css({ 'color': 'black', 'margin':'5px'});

    //Create and append the options
  for (var i = 0; i < arr.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.text = arr[i];
      selectList.appendChild(option);
  }

  selectList.onchange = function(event) {
    switch (this.value) {
      case "0":  
        actualizaChartVtasNetas(filtroNodos);
        break;
      case arr.length-1 :
        actualizaChartVtasNetas([]);
        break;
      default: 
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


