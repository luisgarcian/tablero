<?php

if ($_POST){
   
	if(! empty($_POST['fecini']) && ! empty($_POST['fecfin']) && ! empty($_POST['fecini_ant']) && ! empty($_POST['fecfin_ant']) )
	{
	   // Se recuperan los parámetros
	   $fecini=($_POST['fecini']);
	   $fecfin=($_POST['fecfin']);
	   $fecini_ant=($_POST['fecini_ant']);
	   $fecfin_ant=($_POST['fecfin_ant']);
	   $tipo=($_POST['tipo']);
	
   	   require '../datos/vtasfpago_hc.php';

	   $Chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $Chart -> Trae_Datos($fecini, $fecfin, $fecini_ant, $fecfin_ant, $tipo );

	   //genera la salida de los datos en formato json
       header('Content-type: application/json');
	   echo json_encode($consulta);
    }
  
}

?>
