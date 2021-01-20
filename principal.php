<?php

session_start();
//revisa si la sesion se inicio desde el login, 
//de lo contrario regresa a pedir usuario y pass

if (empty($_SESSION['active']) ){
    header('location: index.php');
} 

// se incluye el codigo de la clase para conexion
require_once("config/const.php");
require_once("config/odbc.php");
// se crea una instancia de la clase conexion
$cnn = new conexion(tserver);
// se hace la conexion a la base de datos
$cnn->conectar();
// se ejecuta la consulta para traerse las fecha de ultimas ventas
$sql = "EXEC usp_TraeUltimasVtas ";
// se trae el resultado de la consulta
$result = $cnn->query($sql);
// se actualizan las fechas para inicializar el datetimepicker
$fecini = date("Y-m-d", strtotime($cnn->result('fecini')));
$fecfin = date("Y-m-d", strtotime($cnn->result('fecfin')));

?>

<head>
    <title> Tablero Indicadores </title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS v 4.5.3-->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" >
    <!-- datetimepicker-->
    <link rel="stylesheet" type="text/css" href="css/jquery.datetimepicker.min.css" >
    <!-- Ionic icons Botones Slide bar-->
    <link rel="stylesheet" href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" >
    <!-- awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- DataTables  -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css" />
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    
</head>

<body>
   <div class="d-flex" id="content-wrapper">

        <!-- Sidebar -->
        <div id="sidebar-container" class="bg-primary">
            <div class="logo">
                <h4 class="font-weight mb-0">INDICADORES</h4>
            </div>
            <div class="accordion display:inline-block">
              <ul>
                <li class="pagenav">
                  <h4><a href="" class="text-light p-0 border-0"><ion-icon name="stats"></ion-icon> Operaciones</a><i class="fa fa-angle-right"></i></h4>
                  <ul>
                    <li onClick="ChartVta()" class="page_item current_page_item"><a href="#">Ventas Netas</a></li>
                    <li onClick="ChartOpc()" class="page_item"><a href="#">Opciones Negadas</a></li>
                    <li id="tickets" class="page_item"><a href="#"> Tickets</a></li>
                  </ul>
                </li>
              </ul>
              <ul>
              <li class="pagenav">
                <h4><a href="#" class="text-light p-0 border-0"><ion-icon name="paper"></ion-icon> Cobranza</a><i class="fa fa-angle-right"></i></h4>
                <ul>
                  <li class="page_item"><a href="#">Estado Cartera</a></li>
                  <li class="page_item"><a href="#">Antiguedad</a></li>
                  <li class="page_item"><a href="#">Recuperacion</a></li>
                  <li class="page_item"><a href="#">Plazo Promedio</a></li>
                </ul>
              </li>
              </ul>
                <ul>
                <li class="pagenav">
                  <h4><a href="#" class="text-light p-0 border-0"><ion-icon name="pricetag"></ion-icon> Compras</a><i class="fa fa-angle-right"></i></h4>
                  <ul>
                    <li class="page_item"><a href="#">Estado</a></li>
                    <li class="page_item"><a href="#">Rotacion</a></li>
                    <li class="page_item"><a href="#">Recuperacion</a></li>
                    <li class="page_item"><a href="#">Plazo Promedio</a></li>
                  </ul>
                </li>
              </ul>
            </div>        
            
        </div>
        <!-- Fin sidebar -->

        <div class="w-100">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container">
    
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
    
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline position-relative d-inline-block my-2">
                     <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecIni">
                     <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecFin">
                     <select class="selectpicker" id="tipo"  class="btn btn-primary mb-2">
                         <option >Sucursal</option>
                         <option >Division</option>
                      </select>
                      <!-- <button type="button" class="btn btn-primary mb-3" Id="BtnUpdate">Actualizar</button> -->
                      <button class="btn position-absolute btn-search" Id="BtnUpdate"><i class="icon ion-md-search"></i></button>
                 </form>
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li class="nav-item dropdown">
                    <a class="nav-link text-dark dropdown-toggle" href="#" id="navbarDropdown" role="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src="img/user-1.png" class="img-fluid rounded-circle avatar mr-2"/>
                      <?php echo $_SESSION['nombre']; ?>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">Mi perfil</a>
                      <a class="dropdown-item" href="#">Suscripciones</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Cerrar sesión</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <!-- Fin Navbar -->

        <!-- Page Content -->
        <div id="content" class="bg-grey w-100">
              <section class="bg-mix py-1">
                <div class="container">
                    <div class="card rounded-0">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 col-md-12 d-flex stat my-0">
                                    <div class="mx-auto">
                                        <h6 id = "tit1" class="text-muted">Ventas Netas</h6>
                                        <h3 id = "num1" class="font-weight">$0</h3>
                                        <!-- <h6 class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i> 50.50%</h6> -->
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12 d-flex stat my-0">
                                    <div class="mx-auto">
                                        <h6 id = "tit2" class="text-muted">Unidades Totales</h6>
                                        <h3 id = "num2" class="font-weight">0</h3>
                                        <h6 id = "porc"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </section>
              <section>
                  <div class="container">
                      <div class="row">
                          <div class="col-lg-7 my-3">
                              <div class="card rounded-0">
                                  <div class="card-header bg-light">
                                    <h6 id= "Titulo" class="font-weight-bold mb-0">Ventas</h6>
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="chartReport">
                                        <canvas id="chartCanvas"></canvas>
                                     </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-lg-5 my-3">
                            <div class="card rounded-0">
                                <div class="card-header bg-light">
                                    <h6 class="font-weight-bold mb-0">Detalle</h6>
                                </div>
                                <div class="card-body pt-2">
                                  <table id="myTable" class="display" style="width:100%" >
                                  </table>
                                  <button class="btn btn-primary w-100">Ver todas</button>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </section>
        </div> <!--content -->
</div> <!-- content-wrapper -->


<!-- JQuery v 2.1.4-->    
<!--<script type="text/javascript" src="js/jquery-2.1.4.js" ></script>-->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<!-- Chart.Js      -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>

<script src="js/jquery.datetimepicker.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<!-- bootstrap v 4.5.3-->
<script src="js/bootstrap.min.js"></script>
<!-- datatables -->
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.23/datatables.min.js"></script>
<!-- ionocons -->
<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
<!-- app-js        -->
<script type="text/javascript" src="js/charts.js"  ></script>
<script type="text/javascript" src="js/app.js"  ></script>

<!-- Configuracion datetimepicker -->
<script >

  var parts1 ='<?php echo $fecini; ?>'.split('-');
  var parts2 ='<?php echo $fecfin; ?>'.split('-');
  var primerDia = new Date(parts1[0], parts1[1] - 1, parts1[2]); 
  var ultimoDia = new Date(parts2[0], parts2[1] - 1, parts2[2]); 
  
  $('#PickerFecIni').datetimepicker({
      timepicker : false,
      datepicker:true,
      format: 'd-m-Y' ,
      value: primerDia,
      autoclose: true,
      maxDate: "+1D",
      weeks:true,
      icons: {
           time: "far fa-clock",
           date: "far fa-calendar",
           up: "fas fa-arrow-up",
           down: "fas fa-arrow-down"
      }
    })

    $('#PickerFecFin').datetimepicker({
      timepicker : false,
      datepicker:true,
      format: 'd-m-Y' ,
      value: ultimoDia,
      weeks:true,
      maxDate: "+1D"
    })
</script>

</body>
