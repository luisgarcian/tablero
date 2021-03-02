<?php

session_start();

if(!empty($_SESSION['active']))
{
	header('location: logout.php');
}else
{
	if(!empty($_POST))
	{
		if(empty($_POST['username']) || empty($_POST['password']))
		{
			$alert = 'Ingrese su usuario y su contraseña';
        }else
        {
           require_once("config/odbc.php");
           require_once("config/const.php");

           $usuario = $_POST['username'];
           $password = $_POST['password'];

           $cnn = new conexion(tserver);
           $cnn->conectar();
   
           $sql = "SELECT * FROM usuario where usuario = '$usuario' ";
           $result = $cnn->query($sql);
  
           if ($cnn->num_rows>0) 
           {
              //$row = $cnn->fetch_row();
              $password_bd = $cnn->result('password');
              $pass_c = $password;

              if (trim($password_bd) == trim($pass_c)) 
              {
                 $_SESSION['active'] = true;
                 $_SESSION['idUser'] = $cnn->result('idusuario');
                 $_SESSION['nombre'] = $cnn->result('nombre');
                 $_SESSION['user']   = $cnn->result('usuario');
                 $_SESSION['tipo']   = $cnn->result('tipo');
                 $chart = $cnn->result('chart_default');
                 $_SESSION['chart']  = $chart;

                 $sql = "SELECT filtro FROM opc_chart where idchart = $chart ";
                 $result = $cnn->query($sql);
                 if ($cnn->num_rows>0) {
                    $_SESSION['filtro']  = $cnn->result('filtro');
                 } else {
                    $_SESSION['filtro']  = 0;
                 }


                 header("location: principal.php");
              } else
              {
                $alert = 'El usuario o la clave son incorrectos';
                session_destroy();
              }
              $cnn->cerrar();
           }
        }
    }
}
  	
?>	

<!DOCTYPE html>
<html lang="es">
<head>
    <title>Tablero de Indicadores</title>
    <!-- Meta tag Keywords -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> -->
    
    <!-- css files -->
    <link href="css/login.css" rel="stylesheet" type="text/css" media="all">
    <body>
        <div class="agileheader">
            <h1></h1>
        </div>
        <br>
        <div class="main-w3l">
            <div class="layout-main">
                <h2>INDICADORES</h2>
                <form action="#" method="post"action="<?php echo $_SERVER['PHP_SELF']; ?>">
                    <input value="USUARIO" name="username" type="text" required onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Usuario';}" />
                    <input value="PASSWORD" name="password" type="password" required onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'password';}" />
                    <span><input type="checkbox" />Recuerdame</span>
                    <h6><a href="#">Olvidé Password</a></h6>
                    <div class="clear"></div>
                    <input type="submit" value="ENTRAR" name="login">
                </form>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="footer-w3l">
            <p>&copy; 2021 Zapatería Torreón. All rights reserved | Design by <a href="https://pappos.mx/">pappos</a></p>
        </div>
    </body>
</html>
