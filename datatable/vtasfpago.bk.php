<?php


//	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin'])){


	   // Se recuperan los parámetros
	   $fecini= "2021-01-26";
	   $fecfin= "2021-02-01";
	   $tipo = "S";
   	   require '../datos/vtasfpago_dt.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos_dt($fecini, $fecfin, $tipo);

	   //genera la salida de los datos en formato json
	   header('Content-type: application/json');
	   echo json_encode($consulta);
	   
  //  }
  


?>
