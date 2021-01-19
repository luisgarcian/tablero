<?php
    class Conecta_Datos{
	   private $conexion;
	   private $stmt;

       function __construct()
  	   {
		   require_once('../config/odbc.php');
		   require_once('../config/const.php');
		   
		   $this->conexion = new conexion(tserver);
		   $this->conexion->conectar();
	   }
	   
	   function Trae_Datos($fecini, $fecfin, $div) {
		   
		   $arreglo = array();
		   $parms=array($fecini,$fecfin, $div);
		   $sql = "exec usp_TraeVtasNetas '$fecini', '$fecfin', '$div' ";

		   $stmt = $this->conexion->query($sql);

		   while ( $row = odbc_fetch_array($stmt) ) { 
			   $ArrayItem = array();
			   $ArrayItem['suc'] = $row['sucursal'];
			   $ArrayItem['uni'] = $row['unidades'];
			   $ArrayItem['vta'] = $row['pesos'];

			   array_push($arreglo, $ArrayItem);
		   };
		   return $arreglo;
		   $this->conexion->cerrar();	   
	   }    
	}   
	
?>	
