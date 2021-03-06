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
	   
	   function Trae_Datos($fecini, $fecfin, $fecini_ant, $fecfin_ant, $plaza, $division, $depto, $familia, $linea, $l1, $l2, $l3, $l4, $l5, $l6, $marca, $modelo) { 

		   
		   $arreglo = array();

		   if ($plaza == '') { $plaza = '0' ;}
		   if ($division == '') { $division = '0' ;}
		   if ($depto == '') { $depto = '0' ;}
		   if ($familia == '') { $familia = '0' ;}
		   if ($linea == '') { $linea = '0' ;}
		   if ($l1 == '') { $l1 = '0' ;}
		   if ($l2 == '') { $l2 = '0' ;}
		   if ($l3 == '') { $l3 = '0' ;}
		   if ($l4 == '') { $l4 = '0' ;}
		   if ($l5 == '') { $l5 = '0' ;}
		   if ($l6 == '') { $l6 = '0' ;}
		   if ($marca  == '') { $marca  = '0' ;}
		   if ($modelo == '') { $modelo = '0' ;}


		   $sql = "exec usp_TraeVtasNetas_est '$fecini', '$fecfin', '$fecini_ant', '$fecfin_ant', $plaza, $division, $depto, $familia, $linea, $l1, $l2, $l3, $l4, $l5, $l6, $marca, $modelo ";
		   
		   
		   $stmt = $this->conexion->query($sql);

		   while ( $row = odbc_fetch_array($stmt) ) { 
				array_push($arreglo, $row);
     		};

   	       return $arreglo;
		   $this->conexion->cerrar();	   
	   }    


	}   
	
?>	
