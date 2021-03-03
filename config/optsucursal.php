<?php

require_once("const.php");
require_once("odbc.php");

//$return_arr = array();
$return_arr = array();
// se crea una instancia de la clase conexion
$cnn = new conexion(tserver);
// se hace la conexion a la base de datos
$cnn->conectar();

$sql =  "exec usp_Sucursales";
$result = $cnn->query($sql);


while ( odbc_fetch_array($result ) ) {
  $plaza    = $cnn->result('plaza');    
  $nomplaza = $cnn->result('nombreplaza');
  $sucursal = $cnn->result('nombresucursal');

  $return_arr[] = array(
                     'plaza' => $plaza, 
                     'nomplaza' => $nomplaza, 
                     'nomsucursal' => $sucursal);
}


// Encoding array in JSON format
header('Content-type: application/json');
echo json_encode($return_arr, JSON_FORCE_OBJECT);

$cnn->cerrar();


?>
