
$(function () {

  // $('.depto').select2({
  //   placeholder: {
  //     id: '-1', // the value of the option
  //     text: 'Seleccione un Departamento'
  //   }
  // });

  //deptos
  $('#seldep1').on('select2:select', function (e) {
    arrdep_1 = actualizaSeleccion($('#seldep1'));
    LlenarOpciones (1, 3);
  });
  $("#seldep1").select2({theme: 'paper'});
  
  $('#seldep1').on('select2:unselect', function (e) {
    arrdep_1 = actualizaSeleccion($('#seldep1'));
    LlenarOpciones (1, 3);
  });

  $('#seldep2').on('select2:select', function (e) {
    arrdep_2 = actualizaSeleccion($('#seldep2'));
    LlenarOpciones (2, 3);
  });
  $('#seldep2').on('select2:unselect', function (e) {
    arrdep_2 = actualizaSeleccion($('#seldep2'));
    LlenarOpciones (2, 3);
  });
  $('#seldep3').on('select2:select', function (e) {
    arrdep_3 = actualizaSeleccion($('#seldep3'));
    LlenarOpciones (3, 3);
  });
  $('#seldep3').on('select2:unselect', function (e) {
    arrdep_3 = actualizaSeleccion($('#seldep3'));
    LlenarOpciones (3, 3);
  });
  // familias
  $('#selfam1').on('select2:select', function (e) {
    arrfam_1 = actualizaSeleccion($('#selfam1'));
    LlenarOpciones (1, 4);
  });
  $('#selfam1').on('select2:unselect', function (e) {
    arrfam_1 = actualizaSeleccion($('#selfam1'));
    LlenarOpciones (1, 4);
  });
  $('#selfam2').on('select2:select', function (e) {
    arrfam_2 = actualizaSeleccion($('#selfam2'));
    LlenarOpciones (2, 4);
  });
  $('#selfam2').on('select2:unselect', function (e) {
    arrfam_2 = actualizaSeleccion($('#selfam2'));
    LlenarOpciones (2, 4);
  });
  $('#selfam3').on('select2:select', function (e) {
    arrfam_3 = actualizaSeleccion($('#selfam3'));
    LlenarOpciones (3, 4);
  });
  $('#selfam3').on('select2:unselect', function (e) {
    arrfam_3 = actualizaSeleccion($('#selfam3'));
    LlenarOpciones (3, 4);
  });
  // lineas
  $('#sellin1').on('select2:select', function (e) {
    arrlin_1 = actualizaSeleccion($('#sellin1'));
    LlenarOpciones (1, 5);
  });
  $('#sellin1').on('select2:unselect', function (e) {
    arrlin_1 = actualizaSeleccion($('#sellin1') );
    LlenarOpciones (1, 5);
  });
  $('#sellin2').on('select2:select', function (e) {
    arrlin_2 = actualizaSeleccion($('#sellin2') );
    LlenarOpciones (2, 5);
  });
  $('#sellin2').on('select2:unselect', function (e) {
    arrlin_2 = actualizaSeleccion($('#sellin2') );
    LlenarOpciones (2, 5);
  });
  $('#sellin3').on('select2:select', function (e) {
    arrlin_3 = actualizaSeleccion($('#sellin3'));
    LlenarOpciones (3, 5);
  });
  $('#sellin3').on('select2:unselect', function (e) {
    arrlin_3 = actualizaSeleccion($('#sellin3'));
    LlenarOpciones (3, 5);
  });
  // L1
  $('#sell11').on('select2:select', function (e) {
    arrl1_1 = actualizaSeleccion($('#sell11')); 
    LlenarOpciones (1, 6);
  });
  $('#sell11').on('select2:unselect', function (e) {
    arrl1_1 = actualizaSeleccion($('#sell11'));
    LlenarOpciones (1, 6);
  });
  $('#sell12').on('select2:select', function (e) {
    arrl1_2 = actualizaSeleccion($('#sell12'));
    LlenarOpciones (2, 6);
  });
  $('#sell12').on('select2:unselect', function (e) {
    arrl1_2 = actualizaSeleccion($('#sell12'));
    LlenarOpciones (2, 6);
  });
  $('#selll3').on('select2:select', function (e) {
    arrl1_3 = actualizaSeleccion($('#sell13'));
    LlenarOpciones (3, 6);
  });
  $('#selll3').on('select2:unselect', function (e) {
    arrl1_3 = actualizaSeleccion($('#sell13'));
    LlenarOpciones (3, 6);
  });
  //L2
  $('#sell21').on('select2:select', function (e) {
    arrl2_1 = actualizaSeleccion($('#sell21')); 
    LlenarOpciones (1, 7);
  });
  $('#sell21').on('select2:unselect', function (e) {
    arrl2_1 = actualizaSeleccion($('#sell21'));
    LlenarOpciones (1, 7);
  });
  $('#sell22').on('select2:select', function (e) {
    arrl2_2 = actualizaSeleccion($('#sell22'));
    LlenarOpciones (2, 7);
  });
  $('#sell22').on('select2:unselect', function (e) {
    arrl2_2 = actualizaSeleccion($('#sell22'));
    LlenarOpciones (2, 7);
  });
  $('#sell23').on('select2:select', function (e) {
    arrl2_3 = actualizaSeleccion($('#sell23'));
    LlenarOpciones (3, 7);
  });
  $('#sell23').on('select2:unselect', function (e) {
    arrl2_3 = actualizaSeleccion($('#sell23'));
    LlenarOpciones (3, 7);
  });
  //L3
  $('#sell31').on('select2:select', function (e) {
    arrl3_1 = actualizaSeleccion($('#sell31')); 
    LlenarOpciones (1, 8);
  });
  $('#sell31').on('select2:unselect', function (e) {
    arrl3_1 = actualizaSeleccion($('#sell31'));
    LlenarOpciones (1, 8);
  });
  $('#sell32').on('select2:select', function (e) {
    arrl3_2 = actualizaSeleccion($('#sell32'));
    LlenarOpciones (2, 8);
  });
  $('#sell32').on('select2:unselect', function (e) {
    arrl3_2 = actualizaSeleccion($('#sell32'));
    LlenarOpciones (2, 8);
  });
  $('#sell33').on('select2:select', function (e) {
    arrl3_3 = actualizaSeleccion($('#sell33'));
    LlenarOpciones (3, 8);
  });
  $('#sell33').on('select2:unselect', function (e) {
    arrl3_3 = actualizaSeleccion($('#sell33'));
    LlenarOpciones (3, 8);
  });
  //L4
  $('#sell41').on('select2:select', function (e) {
    arrl4_1 = actualizaSeleccion($('#sell41')); 
    LlenarOpciones (1, 9);
  });
  $('#sell41').on('select2:unselect', function (e) {
    arrl4_1 = actualizaSeleccion($('#sell41'));
    LlenarOpciones (1, 9);
  });
  $('#sell42').on('select2:select', function (e) {
    arrl4_2 = actualizaSeleccion($('#sell42'));
    LlenarOpciones (2, 9);
  });
  $('#sell42').on('select2:unselect', function (e) {
    arrl4_2 = actualizaSeleccion($('#sell42'));
    LlenarOpciones (2, 9);
  });
  $('#sell43').on('select2:select', function (e) {
    arrl4_3 = actualizaSeleccion($('#sell43'));
    LlenarOpciones (3, 9);
  });
  $('#sell43').on('select2:unselect', function (e) {
    arrl4_3 = actualizaSeleccion($('#sell43'));
    LlenarOpciones (3, 9);
  });
  //L5
  $('#sell51').on('select2:select', function (e) {
    arrl5_1 = actualizaSeleccion($('#sell51')); 
  });
  $('#sell51').on('select2:unselect', function (e) {
    arrl5_1 = actualizaSeleccion($('#sell51'));
  });
  $('#sell52').on('select2:select', function (e) {
    arrl5_2 = actualizaSeleccion($('#sell52'));
  });
  $('#sell52').on('select2:unselect', function (e) {
    arrl5_2 = actualizaSeleccion($('#sell52'));
  });
  $('#sell53').on('select2:select', function (e) {
    arrl5_3 = actualizaSeleccion($('#sell53'));
  });
  $('#sell53').on('select2:unselect', function (e) {
    arrl5_3 = actualizaSeleccion($('#sell53'));
  });
  //L6
  $('#sell61').on('select2:select', function (e) {
    arrl6_1 = actualizaSeleccion($('#sell61')); 
  });
  $('#sell61').on('select2:unselect', function (e) {
    arrl6_1 = actualizaSeleccion($('#sell61'));
  });
  $('#sell62').on('select2:select', function (e) {
    arrl6_2 = actualizaSeleccion($('#sell62'));
  });
  $('#sell62').on('select2:unselect', function (e) {
    arrl6_2 = actualizaSeleccion($('#sell62'));
  });
  $('#sell63').on('select2:select', function (e) {
    arrl6_3 = actualizaSeleccion($('#sell63'));
  });
  $('#sell43').on('select2:unselect', function (e) {
    arrl6_3 = actualizaSeleccion($('#sell63'));
  });
});

function actualizaSeleccion (select) {

  opcs = select.find(':selected');
  arr = [];
  for (i=0; i < opcs.length; i++) {
    arr.push(opcs[i].innerText);
  }
  return arr;
}



function iniciaSelectores() {
  
  if (!todosNodos.length ) {
  
    todosNodos = Object.values(TraeDatos("config/estructura.php",[]));
  
    LlenarOpciones(1,2);  //Inicializa Division1  a partir de Nivel 2
    LlenarOpciones(2,2);  //Inicializa Division2  a partir de Nivel 2
    LlenarOpciones(3,2);  //Inicializa Division3  a partir de Nivel 2

    }
  
};


function LlenarOpciones (ndiv, nivel) {
  let str1 = '';
  let str2 = '';
    
  // loop niveles
  for ( let sel= nivel; sel <= selector.length+1 ; sel++ ) {

      //omitir si el selector tiene alguna opcion seleccionadas en arr
      str1 = 'arr' + selector[nivel-2].substring(3) + '_' + ndiv + '.length === 0';

      if ( eval(str1) ) {
          str2 = '$("#' + selector[sel-2] + (ndiv) + '")';
          
          actualizaOps( eval(str2),  ndiv, sel );
      }

  }

}


function actualizaOps( selList, numDiv, nivList) {
  // Se pasan como paramteros:

  let opcList = [];
  selList.empty();

  for (var nodo of todosNodos ) {
      let Division  =  nomDiv[numDiv-1];

      let nodoNivel =  parseInt(nodo.nivel);
      let nodos = nodo.href.split('|');
      let nodoDiv = nodos[0] || "";
      let nodoDep = nodos[1] || "";
      let nodoFam = nodos[2] || "";
      let nodoLin = nodos[3] || "";
      let nodoL1  = nodos[4] || "";
      let nodoL2  = nodos[5] || "";
      let nodoL3  = nodos[6] || "";
      let nodoL4  = nodos[7] || "";
      let nodoL5  = nodos[8] || "";
      let arrDep = 'arr' + selector[0].substring(3) + '_' + numDiv;
      let arrFam = 'arr' + selector[1].substring(3) + '_' + numDiv;
      let arrLin = 'arr' + selector[2].substring(3) + '_' + numDiv;
      let arrL1  = 'arr' + selector[3].substring(3) + '_' + numDiv;
      let arrL2  = 'arr' + selector[4].substring(3) + '_' + numDiv;
      let arrL3  = 'arr' + selector[5].substring(3) + '_' + numDiv;
      let arrL4  = 'arr' + selector[6].substring(3) + '_' + numDiv;
      let arrL5  = 'arr' + selector[7].substring(3) + '_' + numDiv;

      if (nodoNivel == nivList && nodoDiv == Division) {
        if (nivList == 2 ) { 
            opcList.push(nodo.text); 
        }
        if (nivList == 3 ) { 
            let includedep  =  '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ))';
            let include     =  includedep;
            if (eval(include)) {
                opcList.push(nodo.text);
            }
        }
        if (nivList == 4 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 5 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 6 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 7 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 8 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 9 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL4  + '.includes("' + nodoL4.trimEnd()  + '") || (' + arrL4  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 10 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL4  + '.includes("' + nodoL4.trimEnd()  + '") || (' + arrL4  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL5  + '.includes("' + nodoL5.trimEnd()  + '") || (' + arrL5  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }

      }
  }

  //quitar duplicados
  let uniq = [...new Set(opcList)];
  // agregar opciones
  for (i=0; i < uniq.length; i++ ) {
    var newOption = new Option(uniq[i], uniq[i], false, false);
    selList.append(newOption).trigger('change');
  }
  
}


function actualizaOpsSel( selList, numDiv, nivList) {
  // Se pasan como paramteros:

  let opcList = [];
  selList.empty();

  for (var nodo of todosNodos ) {
      let Division  =  nomDiv[numDiv-1];
      let nodoNivel =  parseInt(nodo.nivel);
      let nodos = nodo.href.split('|');
      let nodoDiv = nodos[0] || "";

      if (nodoNivel == nivList && nodoDiv == Division) {
        switch (nivList) {
          case 2:
            let include = "true";
            break;
          case (nivList > 2): //3
            let arrDep   = 'arr' + selector[nivList-3].substring(3) + '_' + numDiv;
            include  =  '(' + arrDep + '.includes("' + (nodos[nivList-2].trimEnd() || "" ) + '") || (' + arrDep + '.length === 0 ))';
          case (nivList > 3): //4
            let arrFam   = 'arr' + selector[nivList-3].substring(3) + '_' + numDiv;
            include  +=  ' && (' + arrFam + '.includes("' + nodos[nivList-2] || "".trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
        }

        if (eval(include)) {
            opcList.push(nodo.text);
        }

      }

      
      let nodoFam = nodos[2] || "";
      let nodoLin = nodos[3] || "";
      let nodoL1  = nodos[4] || "";
      let nodoL2  = nodos[5] || "";
      let nodoL3  = nodos[6] || "";
      let nodoL4  = nodos[7] || "";
      let nodoL5  = nodos[8] || "";
      
      
      let arrLin = 'arr' + selector[2].substring(3) + '_' + numDiv;
      let arrL1  = 'arr' + selector[3].substring(3) + '_' + numDiv;
      let arrL2  = 'arr' + selector[4].substring(3) + '_' + numDiv;
      let arrL3  = 'arr' + selector[5].substring(3) + '_' + numDiv;
      let arrL4  = 'arr' + selector[6].substring(3) + '_' + numDiv;
      let arrL5  = 'arr' + selector[7].substring(3) + '_' + numDiv;

      if (nodoNivel == nivList && nodoDiv == Division) {

        if (nivList == 4 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 5 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 6 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 7 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 8 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 9 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL4  + '.includes("' + nodoL4.trimEnd()  + '") || (' + arrL4  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }
        if (nivList == 10 ) { 
          let includedep  =     '(' + arrDep + '.includes("' + nodoDep.trimEnd() + '") || (' + arrDep + '.length === 0 ) )';
              includedep +=  '&& (' + arrFam + '.includes("' + nodoFam.trimEnd() + '") || (' + arrFam + '.length === 0 ) )';
              includedep +=  '&& (' + arrLin + '.includes("' + nodoLin.trimEnd() + '") || (' + arrLin + '.length === 0 ) )';
              includedep +=  '&& (' + arrL1  + '.includes("' + nodoL1.trimEnd()  + '") || (' + arrL1  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL2  + '.includes("' + nodoL2.trimEnd()  + '") || (' + arrL2  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL3  + '.includes("' + nodoL3.trimEnd()  + '") || (' + arrL3  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL4  + '.includes("' + nodoL4.trimEnd()  + '") || (' + arrL4  + '.length === 0 ) )';
              includedep +=  '&& (' + arrL5  + '.includes("' + nodoL5.trimEnd()  + '") || (' + arrL5  + '.length === 0 ) )';
          let include     =  includedep  
          if (eval(include)) {
              opcList.push(nodo.text);
          }
        }

      }
  }

  //quitar duplicados
  let uniq = [...new Set(opcList)];
  // agregar opciones
  for (i=0; i < uniq.length; i++ ) {
    var newOption = new Option(uniq[i], uniq[i], false, false);
    selList.append(newOption).trigger('change');
  }
  
}

function CargaSelect(lista, nivel, division) {
  //$('#seldep3').val(null).trigger('change'); deselect
  lista.empty();
  arr = [];
  let txt = "";
  //Seleccionar segun nivel, division y llenar arreglo
  for(var item of todosNodos){
    n = item.href.split("|").length ;
    lenDiv = (indexOfNth(item.parentId,"|",1) < 0 ? item.parentId.length : indexOfNth(item.parentId,"|",1) );  
    itemDiv = item.parentId.substring(0, lenDiv);
    if ( n == nivel && itemDiv == division) {
        pos = indexOfNth(item.href,"|", n-1) + 1;
        len = (indexOfNth(item.href,"|", n) < 0 ? item.href.length : indexOfNth(item.href,"|", n) );    
        txt = item.href.substring(pos, len);
        arr.push(txt);
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
//$('#treeview').treeview('uncheckAll', { silent: true });
  $('#seldep1').val(null).trigger('change');
  $('#seldep2').val(null).trigger('change');
  $('#seldep3').val(null).trigger('change');
  $('#selfam1').val(null).trigger('change');
  $('#selfam2').val(null).trigger('change');
  $('#selfam3').val(null).trigger('change');
  $('#sellin1').val(null).trigger('change');
  $('#sellin2').val(null).trigger('change');
  $('#sellin3').val(null).trigger('change');
  $('#sell11').val(null).trigger('change');
  $('#sell12').val(null).trigger('change');
  $('#sell13').val(null).trigger('change');
  $('#sell21').val(null).trigger('change');
  $('#sell22').val(null).trigger('change');
  $('#sell23').val(null).trigger('change');
  $('#sell31').val(null).trigger('change');
  $('#sell32').val(null).trigger('change');
  $('#sell33').val(null).trigger('change');
  $('#sell41').val(null).trigger('change');
  $('#sell42').val(null).trigger('change');
  $('#sell43').val(null).trigger('change');
  $('#sell51').val(null).trigger('change');
  $('#sell52').val(null).trigger('change');
  $('#sell53').val(null).trigger('change');
  $('#sell61').val(null).trigger('change');
  $('#sell62').val(null).trigger('change');
  $('#sell63').val(null).trigger('change');
  arrdep_1 = [];
  arrdep_2 = [];
  arrdep_3 = [];
  arrfam_1 = [];
  arrfam_2 = [];
  arrfam_3 = [];
  arrlin_1 = [];
  arrlin_2 = [];
  arrlin_3 = [];
  arrl1_1 = [];
  arrl1_2 = [];
  arrl1_3 = [];
  arrl2_1 = [];
  arrl2_2 = [];
  arrl2_3 = [];
  arrl3_1 = [];
  arrl3_2 = [];
  arrl3_3 = [];
  arrl4_1 = [];
  arrl4_2 = [];
  arrl4_3 = [];
  arrl5_1 = [];
  arrl5_2 = [];
  arrl5_3 = [];
  arrl6_1 = [];
  arrl6_2 = [];
  arrl6_3 = [];
  $("#division1").prop("checked", false);
  $("#division2").prop("checked", false);
  $("#division3").prop("checked", false);
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

function AplicarFiltro() {
  
  $("#loadingoverlay").fadeIn();
  let filtro_1 = [];
  let filtro_2 = [];
  let filtro_3 = [];

  //Agrupar las selecciones en 3 filtros por division
  if (document.getElementById("division1").checked)  {
      filtro_1.push(nomDiv[0]);
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
    filtro_2.push(nomDiv[1]);
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
    filtro_3.push(nomDiv[2]);
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

  $('#Cerrar')[0].click();

  actualizaChartVtasNetas(filtroNodos);
  
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
  arr2 = arr.map( param => param.replace(/\,/g,'->'));
  
  if (arr2.length > 1 ) { 
    arr2.unshift('Todos los Filtros (' + arr.length + ')');
  }
  arr2.push('Ningún Filtro');
  
  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.appendChild(selectList);
  $('#mySelect').css({ 'font-size': '12px', 'color': 'black', 'margin':'2px', 'font-family' : 'Arial'});
  $('.btn-open-dialog').css({ 'color': 'black', 'margin':'5px'});

    //Create and append the options
  for (var i = 0; i < arr2.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.text = arr2[i];
      selectList.appendChild(option);
  }

  selectList.onchange = function(event) {
    switch (parseInt(this.value)) {
      case 0:  
        //Todos los filtros de estructura seleccionados
        actualizaChartVtasNetas(filtroNodos);
        break;
      case arr2.length-1 :
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


