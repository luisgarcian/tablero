<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin'])  )
	{
	   // Se recuperan los parámetros
	   $fecini=($_POST['fecini']);
	   $fecfin=($_POST['fecfin']);
	   $tipo=($_POST['tipo']);
	
   	   require '../datos/vtasfpago_dt.php';

	   $Chart = new Conecta_Datos_sp(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos_tb($fecini, $fecfin, $tipo );

	   //genera la salida de los datos en formato json
       header('Content-type: application/json');
	   echo json_encode($consulta);
    }
  
}

?>
