<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin']) && ! empty($_POST['fecini_ant']) && ! empty($_POST['fecfin_ant']) )
	{
	   // Se recuperan los parámetros
	   $fecini=($_POST['fecini']);
	   $fecfin=($_POST['fecfin']);
	   $tipo=($_POST['tipo']);
	
   	   require '../datos/vtasfpago.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($fecini, $fecfin,  $tipo );

	   //genera la salida de los datos en formato json
       header('Content-type: application/json');
	   echo json_encode($consulta);
    }
  
}

?>
