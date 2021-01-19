<?php
	class conexion{
		private $servidor;
        private $basedatos;		
        private $usuario;
        private $contrasena;
		private $driver ;
		
		public $conexion;
		public $num_rows = 0;
		private $result;

		public function __construct($tipo)
		{
			$local  = array();
			$remoto = array();
			
			if ($tipo == 'l')  {
			   $local  = array ( "ZTSISPC03-PC\SQLEXPRESS", "Sirco", "", "", "{SQL Server}" );
			   list($this->servidor, $this->basedatos, $this->usuario, $this->contrasena, $this->driver) 
			   = $local;
   
			} else {
			   $remoto = array ( "zapateriastorreon.database.windows.net", "SircoDWH", "pappos",  "SirCo_33", "{SQL Server}" );
			   list($this->servidor, $this->basedatos, $this->usuario, $this->contrasena, $this->driver) 
			   = $remoto;
			}
		
	    }	
		
        function conectar() {
			$connectionString = "Driver=".$this->driver.";Server=".$this->servidor.";Database=".$this->basedatos.";charset=utf8";
            try {
				 // odbc_connect: resource|false
				 $this->conexion = odbc_connect( $connectionString, $this->usuario, $this->contrasena);
				 if ($this->conexion == false) {
                     echo "ERROR conexion";
				 }
			}catch (Exception $e) {
	           $this->conexion = 'Error de conexión' ;
	           echo "ERROR: ". $e->getMessage();
	        }	   
        }
		
		function query($sql) {
			try {
				// odbc_exec returns: resource|false
				$this->result    = odbc_exec($this->conexion, $sql);
				
				if (! $this->result == false) {
					$this->num_rows  = odbc_num_rows($this->result);
				} 
		    }catch (Exception $e) {
		  	    $this->conexion = 'Error de conexión' ;
			    echo "ERROR: ". $e->getMessage();
			}	   
			return $this->result;
		}

		public function fetch_row() {
			if ($this->num_rows >0) {
                 return(odbc_fetch_row($this->result));
			}
		}

		public function result($campo) {
            return(odbc_result($this->result, $campo));
		}

        function cerrar() {
		  odbc_close( $this->conexion );
        }
	}
?>
