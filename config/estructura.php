<?php

require_once("const.php");
require_once("odbc.php");

//$return_arr = array();
$return_arr = array();
// se crea una instancia de la clase conexion
$cnn = new conexion(tserver);
// se hace la conexion a la base de datos
$cnn->conectar();

$sql =  "exec usp_Estructura";
$result = $cnn->query($sql);

while ( odbc_fetch_array($result ) ) {
  $text     = $cnn->result('text');
  $href     = $cnn->result('href');
  $parentId = $cnn->result('parentId');

  $return_arr[] = array(
                     'text' => $text, 
                     'href' => $href,
                     'parentId' => $parentId);
}


// Encoding array in JSON format
header('Content-type: application/json');
echo json_encode(utf8ize($return_arr), JSON_FORCE_OBJECT);

$cnn->cerrar();

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
