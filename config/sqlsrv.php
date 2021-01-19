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
		private $auth;

		public function __construct($tipo, $auth )
		{
			$this->auth = $auth;

			if ($tipo = 'l') {
		  	    $local  = array ( "ZTSISPC03-PC\SQLEXPRESS", "Sirco", "", "", "{SQL Server}" );
			}
			if ($tipo = 'r') {
    	  	   $remoto = array ( "zapateriastorreon.database.windows.net", "SircoDWH", "pappos",  "SirCo_33", "" );
            }
			list($this->servidor, $this->basedatos, $this->usuario, $this->contrasena, $this->driver) 
			= $local;
	    }	
		
        function conectar() {
			
			if ($tipo = 'l') {
			   
			   if ($auth = 'w') {
					$connectionInfo = array( "Database"=>$this->basedatos);
				}
			   else {
			        $connectionInfo = array( "Database"=>$this->basedatos, "UID"=>$this->usuario, "PWD"=>$this->contrasena);				   
			   }			   
               try {
  		          $this->conexion = sqlsrv_connect( $this->servidor, $connectionInfo );
			   }catch (Exception $e) {
   	               $this->conexion = 'Error de conexión' ;
	               echo "ERROR: ". $e->getMessage();
	           }	   
			}	 
			else {
			   $connectionInfo = array( "Database"=>$this->basedatos, "UID"=>$this->usuario, "PWD"=>$this->contrasena);
               try {
				    $this->conexion = sqlsrv_connect( $this->servidor, $connectionInfo );
			   }catch (Exception $e) {
   	              $this->conexion = 'Error de conexión' ;
	              echo "ERROR: ". $e->getMessage();
			   }	   
			}
			
        }
		
		function query($sql) {
			$this->result    = sqlsrv_query( $this->conexion, $sql);
			$this->num_rows  = sqlsrv_num_rows($this->result);
			return $this->result;
		}

		public function fetch_row() {
			if ($this->num_rows >0) {
				// Makes the next row in a result set available for reading
                return(sqlsrv_fetch($this->result));
			}
		}

		public function result($index) {
			//Gets field data from the currently selected row.
			// Returns data from the specified field on success. Returns FALSE otherwise
            return(sqlsrv_get_field($this->result, $index));
		}

        function cerrar() {
		  sqlsrv_close( $this->conexion );
        }
	
	}
?>
