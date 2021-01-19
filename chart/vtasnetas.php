<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin'])){
	   // Se recuperan los parámetros
	   $fecini=($_POST['fecini']);
	   $fecfin=($_POST['fecfin']);
	   $div=($_POST['div']);
	
   	   require '../datos/vtasnetas.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($fecini, $fecfin, $div);

	   //genera la salida de los datos en formato json
	   header('Content-type: application/json');
	   echo json_encode($consulta);
	   
    }
  
}

?>
