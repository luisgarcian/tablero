<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin'])  && ! empty($_POST['fecini_ant']) && ! empty($_POST['fecfin_ant'])   ){
	   // Se recuperan los parámetros
	   $fecini     =($_POST['fecini']);
	   $fecfin     =($_POST['fecfin']);
	   $fecini_ant =($_POST['fecini_ant']);
	   $fecfin_ant =($_POST['fecfin_ant']);

	   $plaza      =($_POST['plaza']);
	   $division   =($_POST['division']);
	   $depto      =($_POST['depto']);
	   $familia    =($_POST['familia']);
	   $linea      =($_POST['linea']);
	   $l1         =($_POST['l1']);
	   $l2         =($_POST['l2']);
	   $l3         =($_POST['l3']);
	   $l4         =($_POST['l4']);
	   $l5         =($_POST['l5']);
	   $l6         =($_POST['l6']);
	   $marca      =($_POST['marca']);
	   $modelo     =($_POST['modelo']);
	   
   	   require '../datos/vtasnetas_filtro.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($fecini, $fecfin, $fecini_ant, $fecfin_ant, $plaza, $division, $depto, $familia, $linea, $l1, $l2, $l3, $l4, $l5, $l6, $marca, $modelo) ; 
	   
	   //genera la salida de los datos en formato json
	   header('Content-type: application/json');
	   echo json_encode(utf8ize($consulta));

	   
    }
  
};


function utf8ize($d) {
    if (is_array($d)) 
        foreach ($d as $k => $v) 
            $d[$k] = utf8ize($v);

     else if(is_object($d))
        foreach ($d as $k => $v) 
            $d->$k = utf8ize($v);

     else 
        return utf8_encode($d);

    return $d;
}
 
?>
