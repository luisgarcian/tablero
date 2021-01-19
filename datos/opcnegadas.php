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
	   
	   function Trae_Datos($fecini, $fecfin, $gpo) {
		   
		   $arreglo = array();
		   $parms=array($fecini,$fecfin, $gpo);
		   $sql = "exec usp_TraeOpcBodega '$fecini', '$fecfin', '$gpo' ";

		   $stmt = $this->conexion->query($sql);

		   while ( $row = odbc_fetch_array($stmt) ) { 
			   $ArrayItem = array();
			   $ArrayItem['gpo'] = $row['gpo'];
			   $ArrayItem['opc'] = $row['opc'];
			   $ArrayItem['neg'] = $row['neg'];
			   $ArrayItem['porc'] = $row['porc'];

			   array_push($arreglo, $ArrayItem);
		   };
		   return $arreglo;
		   $this->conexion->cerrar();	   
	   }    
	}   
	
?>	
