<?php
    class Conecta_Datos_sp{
	   private $conexion;
	   private $stmt;

       function __construct()
  	   {
		   require_once('../config/odbc.php');
		   require_once('../config/const.php');
		   
		   $this->conexion = new conexion(tserver );
		   $this->conexion->conectar();
	   }
	   
	   function Trae_Datos_tb($fecini, $fecfin, $fecini_ant, $fecfin_ant, $tipo) {
		   
		   $arreglo = array();
		   
		   $sql = "exec usp_FP_dt '$fecini', '$fecfin', '$fecini_ant', '$fecfin_ant','$tipo' ";
		   $stmt = $this->conexion->query($sql);
           
		   while ( $row = odbc_fetch_array($stmt) ) { 
			   array_push($arreglo, $row);
		   };

		   return $arreglo;
		   $this->conexion->cerrar();	   
	   }    
	}   
	
?>	
