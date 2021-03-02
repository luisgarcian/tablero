<?php

if ($_POST){
   
	if(! empty($_POST['idchart'])  )
	{
	   // Se recuperan los parámetros
	   $idchart=($_POST['idchart']);
	
   	   require '../datos/filtro.php';
	   $chart = new Conecta_Datos(); 
	
	   //Se trae los datos
	   $consulta = $chart -> Trae_Datos($idchart );

	   //genera la salida de los datos en formato json
       header('Content-type: application/json');
	   echo json_encode($consulta);
    }
  
}

?>
