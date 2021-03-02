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
	   
	   function Trae_Datos($fecini, $fecfin, $fecini_ant, $fecfin_ant) {
		   
		   $arreglo = array();
		   $parms=array($fecini,$fecfin, $fecini_ant, $fecfin_ant);
		   $sql = "exec usp_TraeRecuperacion '$fecini', '$fecfin', '$fecini_ant', '$fecfin_ant' ";
		   
		   $stmt = $this->conexion->query($sql);

		   while ( $row = odbc_fetch_array($stmt) ) { 
				array_push($arreglo, $row);
     		};

   	       return $arreglo;
		   $this->conexion->cerrar();	   
	   }    
	}   
	
?>	
