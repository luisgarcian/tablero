<?php

//if ($_POST){
   
   require '../datos/edocartera.php';

	$Chart = new Conecta_Datos(); 
	
	//Se trae los datos
	$consulta = $Chart -> Trae_Datos();

	//genera la salida de los datos en formato json
	header('Content-type: application/json');
	echo json_encode($consulta);
	   
    
  
//}

?>
