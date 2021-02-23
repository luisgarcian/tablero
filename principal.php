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
    <!-- DropDownTree  -->
    <link rel="stylesheet" type="text/css" href="css/dropdowntree.css">
    <!-- Jstree  -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">
    <link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
    <!--  daterangepicker -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/sidebar.css">
</head>

<body>
   <div class="d-flex" id="content-wrapper">

        <!-- Sidebar -->
        <div id="sidebar-container"  style="width: 150px;" class="bg-primary">
        <div class="logo text-center">
                <h4 class="mb-0"><strong>INDICADORES</strong></h4>
            </div>
            <div class="" id="accordian" >
              <ul>
                <?php require_once("config/accordian.php"); ?> 
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
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0 px-3">
				    <li class="nav-item dropdown">

					    <div class="dropdown dropdown-tree" id="firstDropDownTree">  </div> 

					</li>
                </ul>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
				    <form class="form-inline form-horizontal position-relative d-inline-block my-2">


					    <!-- <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecIni">
                        <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecFin"> -->

                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Tipo">Tipo</label>
				            <select type="text" class="form-control mb-2 mr-sm-2" class="selectpicker" id="tipo">
                            <option >Sucursal</option>
				            <option >Division</option>
                            </select>
                        </div>
                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="PeriodoAct">Período Principal</label>
                            <div id="reportrange" class="form-control">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span> <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Compara">Comparar con</label>
                            <select type="text" class="form-control" class="selectpicker" id="periodo">
                                <option >Período anterior</option>
					            <option >Año Anterior</option>
                                <!-- <option >Mes Anterior</option> -->
                            </select>
                         </div>   
                        <button class="btn btn-search form-control mb-2 mr-sm-2" Id="BtnUpdate"><i class="icon ion-md-search" style="height:80px"></i></button>
       	            </form>
                </div>
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
						    <a class="dropdown-item" href="logout.php">Cerrar sesión</a>
						</div>
					</li>
                </ul>
            </div>
         </nav>
        <!-- Fin Navbar -->
	
        <!-- Page Content -->
        <div id="content" class="bg-grey w-100">
              <section class="bg-mix pt-3 pb-1">
                <div class="container">
                    <div class="card rounded-0">
                        <div class="card-body p-0">
                            <div class="row" style="height:90px">
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
                                    <div class="mx-auto">
                                        <h6 id = "tit0" class="text-muted">Total</h6>
                                        <h3 id = "num0" class="font-weight">$0</h3>
                                        <h6 id = "porc0"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
                                    <div class="mx-auto">
                                        <h6 id = "tit1" class="text-muted" >Ventas Netas</h6>
                                        <h3 id = "num1" class="font-weight">$0</h3>
                                        <h6 id = "porc1"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
                                    <div class="mx-auto">
                                        <h6 id = "tit2" class="text-muted">Unidades Totales</h6>
                                        <h3 id = "num2" class="font-weight">0</h3>
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
                                     <div class="row" id= "info-chart">
                                           <h6 id = "Chart" class="font-weight-bold mb-0"><ion-icon name="arrow-dropup"></ion-icon> Gráfica</h6>
                                           <input type="hidden"  id="PickerFecIni_ant">
                                           <input type="hidden"  id="PickerFecFin_ant">
                                           <div class="text-right mb-3"> 
                                              <button type="button" class="btn btn-primary btn-lg float-right tChart" onclick="changeType()" id="btnChart">line</button>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- HighCharts Charts -->
                                  <div id="Chart-Container" style="min-width: 100%; height: 400px; margin: 0 auto"></div>
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
                                    <h6 class="font-weight-bold mb-0"><ion-icon name="arrow-dropup"></ion-icon> Datos</h6>
                                </div>
                                <div class="datatable-container">
                                    <div id="divTit1"> 
                                       <h6 class="mb-0 ml-4" id ="TituloTabla1">Periodo Actual</h6>
                                    </div>
                                    <div class="card-body pt-2">
                                        <table id="myTable" class="display table-hover" style="width:100%" ></table>
                                    </div>
                                    <!-- <div id = "divTit2"> 
                                       <h6 class="text-muted bg-light ml-4" id ="TituloTabla2">Periodo Anterior</h6>
                                    </div>
                                    <div class="card-body pt-2">
                                        <table id="myTable2" class="display table-hover" style="width:100%" ></table>
                                    </div> -->
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

<!-- Import D3 Scale Chromatic via CDN -->
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<!-- bootstrap v 4.5.3-->
<script src="js/bootstrap.min.js"></script>
<!-- datatables -->
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.23/datatables.min.js"></script>
<!-- ionocons -->
<script type="module" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule="" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.js"></script>
<!-- highcharts -->
<script type="text/javascript" src="https://code.highcharts.com/highcharts.js"></script>
<!-- <script type="text/javascript" src="https://code.highcharts.com/modules/exporting.js"></script> -->
<!-- jstree -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
<!-- dropdowntree -->
<script type="text/javascript" src="js/dropdowntree.js"></script>
<!-- daterangepicker -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

<!-- app-js        -->
<script type="text/javascript" src="js/charts/edocartera.js"></script>
<script type="text/javascript" src="js/charts/opnegadas.js"></script>
<script type="text/javascript" src="js/charts/vtasnetas.js"></script>
<script type="text/javascript" src="js/charts/vtasfpago.js"></script>
<script type="text/javascript" src="js/datatables/edocartera.js"></script>
<script type="text/javascript" src="js/datatables/opnegadas.js"></script>
<script type="text/javascript" src="js/datatables/vtasnetas.js"></script>
<script type="text/javascript" src="js/datatables/vtasfpago.js"></script>
<script type="text/javascript" src="js/highcharts.js"  ></script>
<script type="text/javascript" src="js/app.js"  ></script>

<script >

    function openNav() {
     document.getElementById("sidebar-container").style.width = "250px";
     document.getElementById("content").style.marginLeft = "250px";
    }

    function closeNav() {
     document.getElementById("sidebar-container").style.width = "0";
     document.getElementById("content").style.marginLeft= "0";
    }
</script>

</body>
