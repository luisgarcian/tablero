

function getTree() {

  ObjChecked = [];
  nodeData = Object.values(TraeDatos("config/estructura.php",[]));

   //convertir en arbol de jerarquias
   tree = createTree(nodeData);
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
}



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
}


function getStructure(){
  
  ObjChecked = $('#treeview').treeview('getChecked');
  
}

function BorrarSels() {

  $('#treeview').treeview('uncheckAll', { silent: true });

}

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
  }

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
  }


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


  function datatree(data) {
    var o = {};

    data.forEach(({ id, intentName: title, parent_id }) => {
        Object.assign(o[id] = o[id] || {}, { title });
        o[parent_id] = o[parent_id] || {};
        o[parent_id].values = o[parent_id].values || [];
        o[parent_id].values.push(o[id]);
    });

    return o.values;

};

  

  


function Inicializa_Filtro_VtasNetas() {

    parms =  { "fecini":  myPar1,  "fecfin":  myPar2,    "fecini_ant":  myPar3, "fecfin_ant":  myPar4, "plaza": '', "division" : '', 
                "depto": '',  "familia" : '', "linea": '', "l1" :'', "l2" : '', "l3" : '', "l4" : '', "l5" : '', "l6" : '',
                "marca":'', "modelo" : ''
      }
    
    return (TraeDatos("chart/vtasnetas_est.php", parms));

}

const recursiveSearch = (obj, searchKey, results = []) => {
  const r = results;
  Object.keys(obj).forEach(key => {
     const value = obj[key];
     if (key === searchKey && typeof value !== 'object'){
        objnew = {
         "check": obj.href //+ '|'+ obj.text,
        }
        r.push(objnew);
     }else if(typeof value === 'object'){
        recursiveSearch(value, searchKey, r);
     }
  });
  return r;
};


function getCategorias (opcs) {
  arr = [];
  for (i=0; i< opcs.length; i++) {
    input = opcs[i];
    const [div, dep, fam, lin, l1, l2, l3, l4, l5, l6] = input.check.split('|') ;
    arr.push ({div , dep, fam, lin, l1, l2, l3, l4, l5, l6});
  }
  newarr = arr.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
  return newarr;
 }
  

function buscaChecked(obj, newarray) {
  numLevel = obj[0].href.split("|").length-1;

  for (i=0; i < obj.length; i++  ) {
     
    str = obj[i].href;
    if (  str.split("|").length-1 == numLevel ) {
             newarray.push(str);
    } else {
      buscaChecked(obj, newarray)
    }
  }
}


function AplicarFiltro() {


  // obj1 = DeleteProperty(ObjChecked,  "state" );
  // obj2 = DeleteProperty(obj1,  "selectable" );
  // obj3 = recursiveSearch(obj2, "text");
  // var myJSON = JSON.stringify(obj2);
  
  // while (~(i = s.indexOf (find,++i))) hacker.push (  s.substring(i+8, s.indexOf("," , i)-1));
  
  //var opcsChk = recursiveSearch(ObjChecked, "text");
  //var arrCateg = getCategorias(opcsChk);

  

  //newArray2 = ObjChecked.map(({selectable, state, nodeId, parentId, ...item}) => item);
  newarray = [];
  if (ObjChecked.length > 0 ) {  
    //Nivel del primer nodo checkeado
    numLevel = ObjChecked[0].href.split("|").length-1;

    //Revisar cada nodo con check
    for (num=0; num < ObjChecked.length; num++  ) {
      
      //Obtenerl el texto del nodo con check
      str = ObjChecked[num].href;
      if ( str !== 'undefined' || str.length>0 ) {

        //Obtener el nivel del nodo con check
        //0-div, 1-dep, 2-fam, 3-lin, 4-lin1, 5-lin2, 6-lin3, 7-lin4, 8-lin5, 9-lin6
        Level = str.split("|").length-1;

        //obtener categ del nivel anterior 
        categ_ant = str.substring(0,str.lastIndexOf("|"));
        //categ_ant = str.substring(0,str.indexOf("|"));
        //agregar el nodo a un nuevo array 
        
        //si el nodo es un hijo de un nodo ya existente en el nuevo array no agregarlo     
        if ( !busca(newarray, str)  ) { 
            newarray.push(str);
        }
        
      }
    }
  }


  var dbase = [];
  for (i=0; i < newarray.length; i++  ) {
    categs = (newarray[i].split("|") || '');
    
    let datos = [];
    datos =  GeneraDatosVtasNetas(categs);
    if (datos.length>0 ) { 
      var dbase = dbase.concat(datos);
    }
  }

  // Agrupar y Sumar por Sucursal 
  datosFiltro = groupAndSum(dbase, ['Sucursal'], ['Importe_Act', 'Importe_Ant', 'unidades_Act', 'Unidades_Ant']);
  //calcular porcentajes

  // Actualizaar Chart, DataTable y Totales
  GenChartVtas(datosFiltro);

  
  $('#Cerrar')[0].click();


}

function busca (arr, str) {
  res = false;
  for (indice=0; indice < arr.length; indice++) {

    //determinar que categoria es cada elemento del array 
    //para asi mismo compararlo con el que se pasa de parametro
    nivel_elem = arr[indice].split("|").length;
    
    nivel_str  = indexOfNth(str,"|",nivel_elem)  ;
    //tomar la misma categoria en el elem buscado para comparar
    
    //la categoria del buscado ya existe en el arreglo?
    if (arr[indice] == str.substring(0,nivel_str)) {
       res = true;
       break;
    }
    else {
      res = false
    }
  }
  return res;

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
}




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
}


function limpiar_filtro() {


    ActualizarList(Select_Opcs);

}

function getAllNodes(){
  var treeViewObject = $('#tree').data('treeview'),
      allCollapsedNodes = treeViewObject.getCollapsed(),
      allExpandedNodes = treeViewObject.getExpanded(),
      allNodes = allCollapsedNodes.concat(allExpandedNodes);

  return allNodes;
}
