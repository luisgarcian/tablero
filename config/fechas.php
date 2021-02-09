<?php

if ($_POST){
   
	if(! empty($_POST['rango']) && ! empty($_POST['periodo'])){
		
		
	   // Se recuperan los parámetros
	   $rango=($_POST['rango']);
	   $periodo=($_POST['periodo']);
	   //$rango = '7';
	   //$periodo = '0';
	   	   
   	   require '../datos/fechas.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($rango, $periodo);

	   //genera la salida de los datos en formato json
	   header('Content-type: application/json');
	   echo json_encode($consulta);
	   
    } 
  
}

?>
