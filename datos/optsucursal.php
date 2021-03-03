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
	   
	   function Trae_Datos() {
		   
		   $arreglo = array();
		   $sql = "exec usp_Sucursales";
		   
		   $stmt = $this->conexion->query($sql);

		   while ( $row = odbc_fetch_array($stmt) ) { 
				array_push($arreglo, $row);
     		};

   	       return $arreglo;
		   $this->conexion->cerrar();	   
	   }    
	}   
	
?>	
