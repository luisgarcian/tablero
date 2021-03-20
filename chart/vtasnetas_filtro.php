<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin'])  && ! empty($_POST['fecini_ant']) && ! empty($_POST['fecfin_ant'])   ){
	   // Se recuperan los parámetros
	   $fecini     =($_POST['fecini']);
	   $fecfin     =($_POST['fecfin']);
	   $fecini_ant =($_POST['fecini_ant']);
	   $fecfin_ant =($_POST['fecfin_ant']);

	   $params     =($_POST['params']);
	   
   	   require '../datos/vtasnetas_filtro.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($fecini, $fecfin, $fecini_ant, $fecfin_ant, $params) ; 
	   
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
