<?php

$rango  = ($_POST['rango']);
$periodo= ($_POST['periodo']);

require_once("const.php");
require_once("odbc.php");

$return_arr = array();

$cnn = new conexion(tserver);
$cnn->conectar();

$query =  "exec usp_TraeUltimasVtas  '$rango', '$periodo'  ";
$result = $cnn->query($query);
 
$fecini = $cnn->result('fecini');
$fecfin = $cnn->result('fecfin');
$fecini_ant = $cnn->result('fecini_ant');
$fecfin_ant = $cnn->result("fecfin_ant");

$return_arr[] = array("fecini" => $fecini,
                    "fecfin" => $fecfin,
                    "fecini_ant" => $fecini_ant,
                    "fecfin_ant" => $fecfin_ant);

// Encoding array in JSON format
header('Content-type: application/json');
echo json_encode($return_arr);
$cnn->cerrar();