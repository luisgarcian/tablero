

function getTree() {

   opcs = Object.values(Inicializa_Filtro_VtasNetas()) ;

   //convertir en arbol de jerarquias
   tree = createTree(opcs);
   //quitar propiedad parentId
   obj1 = DeleteProperty(tree,  "parentId" );
  // quitar prefijos de nombre categorias
   obj3 = ModifyProperty(obj1,  "text" );
   //convertir objeto a String
   obj2 =  JSON.stringify(obj1);
   //quitar primer nodo
   var ret = obj2.replace('{"text":"DIVISIONES","nodes":','');
   //quitar ultimo caracter
   var res = ret.substring(0, ret.length-1);
   
   return res;
}



function Llena_Filtro_Adicional() {

nodeData =  getTree();

 $('#treeview').treeview({
     data: nodeData,
     showBorder: false,
     showCheckbox: true,
     multiSelect: true,
     color: "black",
     backColor: "white",
     showBorder: false,
 })

$('#treeview').treeview('uncheckAll', { silent: true });
  //$('#treeview').treeview('collapseAll', { silent: true}); 
    
}

function getStructure(NodeId){
  
  var arbol = $('#treeview').treeview();
  var checked = $('#treeview').treeview('getChecked');

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

function AplicarFiltro() {


   var arbol = $('#treeview').treeview();
   var checked = $('#treeview').treeview('getChecked');

   $('#Cerrar')[0].click();

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

function getAllNodes(){
  var treeViewObject = $('#tree').data('treeview'),
      allCollapsedNodes = treeViewObject.getCollapsed(),
      allExpandedNodes = treeViewObject.getExpanded(),
      allNodes = allCollapsedNodes.concat(allExpandedNodes);

  return allNodes;
}
