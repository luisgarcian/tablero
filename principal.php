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
$fecini_ant = date("Y-m-d", strtotime($cnn->result('fecini_ant')));
$fecfin_ant = date("Y-m-d", strtotime($cnn->result('fecfin_ant')));


?>
<?
  session_start();
  unset($_SESSION["idusuario"]); 
  session_destroy();
  header("Location: index.php");
  exit;
?>
<!doctype html>
<html lang="es">
<head>
    <title> Tablero Indicadores </title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- Bootstrap CSS v 4.5.3-->
    <link rel="stylesheet" type="text/css" href="vendor/boostrap/css/bootstrap.min.css" >
    <!-- bootstrap multiselect  -->
    <link rel="stylesheet" type="text/css" href="vendor/multiselect/css/bootstrap-multiselect.css" type="text/css">
    <!-- DataTables  -->
    <link rel="stylesheet" type="text/css" href="vendor/datatables/css/jquery.dataTables.min.css" />
    <!--  daterangepicker -->
    <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/css/daterangepicker.css"/>
    <!-- Select2 -->
    <link rel="stylesheet" type="text/css" href="vendor/select2/css/select2.min.css"/>
    <!-- <link href="/select2-bootstrap-theme/select2-bootstrap.min.css" type="text/css" rel="stylesheet" /> -->

    <!-- awesome icons -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- glyphicons.css 3.0.0 -->
    <link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="css/sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

</head>

<body>
    <div id="loadingoverlay"> 
        <div class="cv-spinner">
              <span class="spinner"></span>
        </div>
    </div>

   <div class="d-flex" id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-container"  style="width: 150px;" class="bg-primary">
            <div class="logo text-center">
                <h4 class="mb-0" style="font-size:14px"><strong>INDICADORES</strong></h4>
            </div>
            <div class="" id="accordian" >
              <ul>
                <?php require_once("config/accordian.php"); ?> 
             </ul>
            </div>        
        </div>
        <!-- Fin sidebar -->

        <div class="w-100">

        <nav class="navbar navbar-expand-lg navbar-light border-bottom" style="background-color: white">
		    <div class="container">
            
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <form class="form-inline form-horizontal position-relative d-inline-block my-2">

                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="float:left">
                        <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style="float:left">
                            <li class="nav-item dropdown">
                                <a class="nav-link text-dark dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                                        style="margin-right:40px" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="img/user-1.png" class="img-fluid rounded-circle avatar mr-2"/>
                                    <?php echo $_SESSION['nombre']; ?>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#" style="font-size:14px">Mi perfil</a>
                                    <a class="dropdown-item" href="#" style="font-size:14px">Suscripciones</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="logout.php" style="font-size:14px">Cerrar sesión</a>
                                </div>
                            </li>
                        </ul>   
                    </div>
                    <div id="divisor" style="float:right" >
                    
                        <div class="container-sel" style="float:left;margin-right:6px;">
                            <label for="Filtro" style="font-size:14px; font-weight: bold;">Sucursales</label>
                            <select id="FiltroSucursales" multiple="multiple" class="selectpicker form-control">
                            </select>
                        </div>

                        <div class="container-sel" style="float:left;margin-right:6px;">
                            <label for="Tipo"  style="font-size:14px; font-weight: bold;">Tipo</label>
                            <select type="text" class="form-control mb-2 mr-sm-2" class="selectpicker" id="Tipo">
                            <option >Sucursal</option>
                            <option >Division</option>
                            </select>
                        </div>

                        <div class="container-sel" style="float:left;margin-right:6px;">
                            <label for="PeriodoAct"  style="font-size:14px; font-weight: bold;">Período Principal</label>
                            <div id="reportrange" class="form-control">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span> <i class="fa fa-caret-down"></i>
                            </div>
                        </div>

                        <div class="container-sel" style="float:left;margin-right:6px;">
                            <label for="Compara"  style="font-size:14px; font-weight: bold;">Comparar con</label>
                            <select type="text" class="form-control" class="selectpicker" id="periodo">
                                <option >Período anterior</option>
                                <option >Año Anterior</option>
                                
                                <!-- <option >Mes Anterior</option> -->
                            </select>
                        </div>   
                    </div> 
                </form>
                

            </div>
            <!--Fin div class container -->
         </nav>
        <!-- Fin Navbar -->

        <div id="myModal" class="modal fade" tabindex ="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

            <div class="modal-dialog  modal-xl modal-dialog-centered "  role="document" style = "min-width:900px;">
            <!-- modal-dialog-scrollable -->
            <!-- modal-lg -->
                <div class="modal-content">

                    <!-- Modal root -->
                    <div class="modal-header">
                        <h5 class="modal-title">Filtro Estructura Artículo</h5>
                        <button type="button" id = "Cerrar" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>

                    <div class="modal-body" >
                        <!-- load contents here -->
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4 labels">
                                <div >
                                    <input type="checkbox" id="division1" style="float:left; margin-right:8px;height:20px;">
                                    <label for="division1">CALZADO</label>
                                </div>
                            </div>
                            <div class="col-sm-4 labels">
                                <div >
                                    <input type="checkbox" id="division2" style="float:left; margin-right:8px;height:20px;vertical-align:middle;">
                                    <label for="division2">ACCESORIOS</label>
                                </div>
                            </div>
                            
                            <div class="col-sm-4 labels">
                                <div >
                                    <input type="checkbox" id="division3" style="float:left; margin-right:8px;height:20px;">
                                    <label for="division3">ELECTRONICA</label>
                                </div>                            
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <!-- <div class="col-sm-8" style="overflow-x:hidden">
                                <div id="treeview" class="tree"></div>
                            </div> -->
                            <div class="col-sm-4"  >
                                <label for="seldep1">
                                    Seleccione un Departamento
                                    <select class="js-example-basic-multiple depto" multiple="multiple" style="width: 100%" id="seldep1">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4" >
                                <label for="seldep2">
                                    Seleccione un Departamento
                                    <select class="js-example-basic-multiple depto" multiple="multiple" style="width: 100%" id="seldep2">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4" >
                            <label for="seldep3">
                                    Seleccione un Departamento
                                    <select class="js-example-basic-multiple depto" multiple="multiple" style="width: 100%" id="seldep3">
                                    </select>
                                </label>

                            </div>

                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="selfam1">
                                    Seleccione una Familia
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="selfam1">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="selfam2">
                                    Seleccione una Familia
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="selfam2">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="selfam3">
                                    Seleccione una Familia
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="selfam3">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sellin1">
                                    Seleccione una Linea
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sellin1">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sellin2">
                                    Seleccione una Linea
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sellin2">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sellin3">
                                    Seleccione una Linea
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sellin3">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell11">
                                    Seleccione una L1
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell11">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell12">
                                    Seleccione una L1
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell12">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell13">
                                    Seleccione una L1
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell13">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell21">
                                    Seleccione una L2
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell21">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell22">
                                    Seleccione una L2
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell22">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell23">
                                    Seleccione una L2
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell23">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell31">
                                    Seleccione una L3
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell31">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell32">
                                    Seleccione una L3
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell32">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell33">
                                    Seleccione una L3
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell33">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell41">
                                    Seleccione una L4
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell41">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell42">
                                    Seleccione una L4
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell42">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell43">
                                    Seleccione una L4
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell43">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell51">
                                    Seleccione una L5
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell51">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell52">
                                    Seleccione una L5
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell52">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell53">
                                    Seleccione una L5
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell53">
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center"> 
                            <div class="col-sm-4"  >
                                <label for="sell61">
                                    Seleccione una L6
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell61">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell62">
                                    Seleccione una L6
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell62">
                                    </select>
                                </label>
                            </div>
                            <div class="col-sm-4"  >
                                <label for="sell63">
                                    Seleccione una L6
                                    <select class="js-example-basic-multiple" multiple="multiple" style="width: 100%" id="sell63">
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer " "> -->
                    <div class="modal-footer " >
                        
                        <button type="button" class="btn-modal" onclick="BorrarSels()" >Borrar Selecciones</button>
                        <button type="button" class="btn-modal" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn-modal" onclick="AplicarFiltro()" >Aplicar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            <div id="content" class="bg-grey w-100 content">
            
                <section class="bg-mix pt-3 pb-1">
                    <div class="container">
                        <div class="card rounded-0">
                            <div class="card-body p-0">
                                <div class="row" style="height:110px width:100px">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-1 d-flex stat my-2">
                                        <div class="mx-auto">
                                            <h6 id = "tit0" class="text-muted fe-arrow-up text-success mr-1">Total</h6>
                                            <h3 id = "num0" class="font-weight">$0</h3>
                                            <h6 id = "porc0"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-1  d-flex stat my-2">
                                        <div class="mx-auto">
                                            <h6 id = "tit1" class="text-muted fe-arrow-up text-success mr-1" >Ventas Netas</h6>
                                            <h3 id = "num1" class="font-weight">$0</h3>
                                            <h6 id = "porc1"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-1 d-flex stat my-2">
                                        <div class="mx-auto">
                                            <h6 id = "tit2" class="text-muted fe-arrow-up text-success mr-1">Unidades Totales</h6>
                                            <h3 id = "num2" class="font-weight ">0</h3>
                                            <h6 id = "porc2"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
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
                            <div id= "charts" class="col-lg-12 my-3">
                                <div class="card rounded-0">

                                    <div class="card-header bg-light">
                                        <div class="container-sel" style="float:left;margin-right:10px;">

                                        <button id= "btnFiltro" class="btn-open-dialog" type="button" title="Filtro Estructura" style="border:none;padding:3;font-size: 15pt">
                                            <span class="iconify" data-icon="ion:filter-outline" data-inline="false"></span>
                                        </button>

                                        <br>

                                    </div>

                                        <div class="row" id= "info-chart">
                                            <div id="FiltroAplicado">  </div>
                                            <!-- <h6 id = "Chart" class="font-weight-bold mb-0"></h6> -->
                                            <!-- <div class="text-right mb-3"> 
                                                <button type="button" class="btn btn-primary btn-lg float-right tChart" onclick="changeType()" id="btnChart">line</button>
                                            </div> -->
                                        </div>
                                        </div>
                                        <!-- HighCharts Charts -->
                                        <div id="Chart-Container" style="width:100%; max-width: 900px; margin: 0 auto"></div>

                                            <div id= "Chart-Canvas" class="card-body bg-light">
                                                <div class="row">
                                                    <div id="chart1" class ="col-lg-6 my-3">
                                                        <div id="chartReport">
                                                            <canvas id="chartCanvas"></canvas>
                                                        </div>
                                                    </div>
                                            <div id="chart2" class = "col-lg-6 my-3">
                                                <div id="chartReport2">
                                                    <canvas id="chartCanvas2"></canvas>
                                                </div>
                                            </div>
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class= "row">
                            <div class="col-lg-12 my-3">
                                <div class="card rounded-0">
                                    <div class="card-header bg-light">
                                        <!-- <h6 class="font-weight-bold mb-0"></h6> -->
                                        <div id="divTit1"> 
                                        <h6 class="mb-0 ml-4" id ="TituloTabla1">Periodo Actual</h6>
                                        </div>

                                    </div>
                                    <div class="datatable-container">
                                        <div class="card-body pt-2">
                                            <table id="myTable" class="display table-hover" style="width:100%" ></table>
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
                            <div class="col-lg-12 my-3">
                            </div>
                        </div>
                    </div>
                </section>
            
            </div> <!--content -->

            <!-- Footer Start -->
            <!-- <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            2021 &copy; Tablero Indicadores <a href="">Zapatería Torreón</a> 
                        </div>
                        <div class="col-md-6">
                            <div class="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript:void(0);">Acerca de</a>
                                <a href="javascript:void(0);">Ayuda</a>
                                <a href="javascript:void(0);">Contacto</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> -->
            <!-- end Footer -->

        </div>
        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

        
    </div> <!-- content-wrapper -->


    

    <!-- JQuery -->    
    <script type="text/javascript" src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <!-- Chart.Js      -->
    <script type="text/javascript" src="vendor/chart.js/Chart.min.js"></script>
    <!-- iconify.Js      -->
    <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
    <!-- popper      -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script> -->
    <!-- Import D3 Scale Chromatic via CDN -->
    <script src="https://d3js.org/d3-color.v1.min.js"></script>
    <script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
    <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
    <!-- bootstrap v 4.5.3-->
    <script src="vendor/boostrap/js/bootstrap.min.js"></script>
    <!-- bootstrap-treeview-->
    <!-- <script src="js/bootstrap-treeview.js"></script> -->
    <!-- datatables -->
    <script type="text/javascript" src="vendor/datatables/js/jquery.dataTables.min.js"></script>
    
    <script type="text/javascript" src="vendor/highcharts/highcharts.js"></script>
    <script type="text/javascript" src="vendor/highcharts/exporting.js"></script> 
    <!-- momentJS -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <!-- daterangepicker -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <!-- multiselect -->
    <script type="text/javascript" src="vendor/multiselect/js/bootstrap-multiselect.js"></script>
    
    <!-- app-js        -->
    <script type="text/javascript" src="js/charts/vtasnetas.js"></script>
    <script type="text/javascript" src="js/charts/vtasfpago.js"></script>
    <script type="text/javascript" src="js/charts/recupera.js"></script>
    <script type="text/javascript" src="js/filtros.js"  ></script>
    <script type="text/javascript" src="js/app.js"  ></script>

    <!-- Select2 -->
    <script src="js/select2.min.js"></script>
    
    <script >

        var numchart = <?php  echo $_SESSION['chart']; ?>; 
        var tipousr  = <?php  echo $_SESSION['tipo']; ?>; 
        var tfiltro  = <?php  echo $_SESSION['filtro']; ?>; 

    </script>

</body>

</html>
