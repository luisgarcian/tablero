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
    <!-- bootstrap multiselect  -->
    <link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css">
    <!-- Ionic icons Botones Slide bar-->
    <link rel="stylesheet" href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" >
    <!-- awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- DataTables  -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">
    <link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
    <!--  daterangepicker -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="css/sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

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
                

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
				    <form class="form-inline form-horizontal position-relative d-inline-block my-2">

                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Filtro" style="font-size:14px; font-weight: bold;">Sucursales</label>

                            <select id="FiltroSucursales" multiple="multiple" class="selectpicker form-control">
                                <optgroup label="TORREON">
                                    <option selected="selected" value="JUAREZ">JUAREZ</option>
                                    <option selected="selected" value="MATRIZ">MATRIZ</option>
                                    <option selected="selected" value="TRIANA">TRIANA</option>
                                    <option selected="selected" value="HIDALGO">HIDALGO</option>
                                </optgroup>
                                <optgroup label="EN LINEA">
                                    <option selected="selected" value="ELEKTRA">ELEKTRA</option>
                                    <option selected="selected" value="MERCADO LIBRE">MERCADO LIBRE</option>
                                    <option selected="selected" value="FULL ML">FULL ML</option>
                                    <option selected="selected" value="CLAROSHOP">CLAROSHOP</option>
                                    <option selected="selected" value="AMAZON">AMAZON</option>
                                    <option selected="selected" value="LINIO">LINIO</option>
                                    <option selected="selected" value="PAPPOSMX">PAPPOSMX</option>
                                    <option selected="selected" value="PRIME">PRIME</option>
                                    <option selected="selected" value="TR PRIME">TR PRIME</option>
                                </optgroup>
                            </select>
                        </div>

					    <!-- <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecIni">
                        <input type="text" class="form-control mb-2 mr-sm-2" id="PickerFecFin"> -->

                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Tipo"  style="font-size:14px; font-weight: bold;">Tipo</label>
				            <select type="text" class="form-control mb-2 mr-sm-2" class="selectpicker" id="tipo">
                            <option >Sucursal</option>
				            <option >Division</option>
                            </select>
                        </div>

                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="PeriodoAct"  style="font-size:14px; font-weight: bold;">Período Principal</label>
                            <div id="reportrange" class="form-control">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span> <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Compara"  style="font-size:14px; font-weight: bold;">Comparar con</label>
                            <select type="text" class="form-control" class="selectpicker" id="periodo">
                                <option >Período anterior</option>
					            <option >Año Anterior</option>
                                
                                <!-- <option >Mes Anterior</option> -->
                            </select>
                         </div>   

                         <!-- <div class="container-sel" style="display: flex"">
                            <ion-buttons end>
                                <button ion-button (click)="modal_opt()" >
                                    <ion-icon name="options"></ion-icon>
                                </button>
                            </ion-buttons>
                        </div> -->

                  <!-- Filtrar resultados-->
                   <!-- <a href="#openModal"><FONT COLOR="black"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></FONT> <FONT COLOR="black" href="#openModal">Filtrar Resultados</FONT> </a></button>-->
<div class="container-sel" style="float:left;margin-right:20px;">
                            <label for="Compara"  style="font-size:14px; font-weight: bold;">Filtro</label>
                            <button type="button" class="btn btn-light"style='width:145px; height:33px; font-family: Arial; font-size: 10pt;'><FONT COLOR="black"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></FONT><a href="#openModal"><FONT COLOR="black">Filtrar Resultados</FONT> </a></button>
<br>
<div id="openModal" class="modalDialog">
	<div>
		<a href="#close" title="Close" class="close">X</a>
	<h2><strong>Filtrar Resultados</strong></h2>
    <br>
    <div class="container">
    <div class="row">
        <div class="col-md-5">
            <div class="row"> 
                <label asp-for="Division" class="control-label" ><h5>División</h5></label>
                <select asp-for="Division" v-model="iddivision" v-bind:style="iddivision ? '' : 'border: 1px solid orange;'" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option selected="selected" value="0">Seleccionar división</option>
                    <!--<option v-for="d in divisiones" v-bind:value="d.iddivisiones">@{{d.descrip}}</option>-->
                    <option v-for="d in divisiones" v-bind:value="d.iddivisiones">CALZADO</option>
                    <option v-for="d in divisiones" v-bind:value="d.iddivisiones">ACCESORIOS</option>
                    <option v-for="d in divisiones" v-bind:value="d.iddivisiones">ELECTRONICA</option>
                    <option v-for="d in divisiones" v-bind:value="d.iddivisiones">GENERAL</option>
                    
                </select>
                <span asp-validation-for="Division" class="text-danger"></span>
                </div>
                <br>
            <div class="row">  <label asp-for="Division" class="control-label" ><h5>Departamento</h5></label>
                <select asp-for="Division" v-model="iddepto" v-bind:style="iddepto ? '' : 'border: 1px solid orange;'" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option selected="selected" value="0">Seleccionar departamento</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DAMAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CABALLEROS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">NIÑO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">NIÑA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS CALZADO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS ESCOLARES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS CALCETINES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CUIDADO DE CALZADO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS CABALLERO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS DAMA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS DEPORTIVOS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">INFANTIL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BEBES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CELULARES Y TABLETS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">GENERAL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">COMPUTADORAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TV Y VIDEO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">AUDIO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SMART WHATCH</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">OTROS ACCESORIOS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ENTRETENIMIENTO</option>
                </select>
                
                <span asp-validation-for="Division" class="text-danger"></span>
            </div>
            <br>
            <div class="row"> <label asp-for="Division" class="control-label" ><h5>Familia</h5></label>
                <select asp-for="Division" v-model="idfamilia" v-bind:style="idfamilia ? '' : 'border: 1px solid orange;'" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option  selected="selected" value="0">Seleccionar familia</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DESCONTINUADO BASICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MODA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BASICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">PRIMAVERA-VERANO 2013</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">OTOÑO-INVIERNO 2013</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CELULARES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">GENERAL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TABLETS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ESCRITORIO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">LAPTOP</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TELEVISION</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOCINAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOCINAS AMPLIFICADAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">AUDIFONOS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SMART WHATCH</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">JUEGOS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MEMORIAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CONECTIVIDAD</option>
                </select>
                <span asp-validation-for="Division" class="text-danger"></span></div>
                <br>
                
            <div class="row"> <label asp-for="Division" class="control-label" ><h5>Linea</h5></label>
                <select asp-for="Division"  v-model="idlinea" v-bind:style="idlinea ? '' : 'border: 1px solid orange;'" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option selected="selected" value="0">Seleccionar linea</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ZAPATILLA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CONFORT</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TENIS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TIPO CROCS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SUECO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">PLANTILLAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MOCHILA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">LAPICERA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CALCETON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOLSAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BALON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">GORRAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">NIÑA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">NIÑO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BEBO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOTA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOTIN</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SOCCER</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">INDUSTRIAL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">VESTIR</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SOMBREROS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">AGUJETAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DISPLAY4.9"</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DAMAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CABALLEROS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CALCETON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DRONES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">UNIFORMES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">VIDEO JUEGOS</option>
                </select>
                <span asp-validation-for="Division" class="text-danger"></span></div>
                <br>
            <div class="row"> <label asp-for="Division" class="control-label" ><h5>L1</h5></label>
                <select asp-for="Division" v-model="idl1" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option selected="selected" value="0">Seleccionar l1</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">FIESTA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TACON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">PLATAFORMA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CLASICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CLINICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DAMA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CABALLERO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">RECORTABLE</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">GEL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MEMORIA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ZAPATILLA DE TACON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ESPOLONERA DE TALON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ESPONJA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CERA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DESODORANTE</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">REPELENTE</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">JABON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SENCILLA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DOBLE</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TRIPLE</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CASUAL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">FIESTA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MENSAJERO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">VESTIR</option>

                </select>
                <span asp-validation-for="Division" class="text-danger"></span></div>
                <br>
            <div class="row"> <label asp-for="Division" class="control-label" ><h5>L2</h5></label>
                <select asp-for="Division" v-model="idl2" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                    <option selected="selected" value="0">Seleccionar l2</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TACON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DIABETICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DEPORTIVO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">HEBILLA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DEPORTIVO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">URUGUAYO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DANZA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">PANTUNFLAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">JAZZ</option>
                </select>
                <span asp-validation-for="Division" class="text-danger"></span></div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5">
            <div class="row">
                <label class="control-label" ><h5>L3</h5></label>
                <select v-model="idl3" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDepartamento>()">
                    <option selected="selected" value="0">Seleccionar l3</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CLASICO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CARRITO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOTIN</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CHOCLO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">HEBILLA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SKATO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CINTAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">VELCRO</option>
                </select>
                <span asp-validation-for="Departamento" class="text-danger"></span></div>
                <br>
            <div class="row">   <label class="control-label" ><h5>L4</h5></label>
                <select v-model="idl4" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDepartamento>()">
                    <option selected="selected" value="0">Seleccionar l4</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CINTAS</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">VELCRO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">PATA DE GALLO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CRUZADA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CERRADA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">MOCASÍN</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">ACCESORIOS CALCETINES</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">BOCA DE PESCADO</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">DESTALONADA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">TALON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SIN TALON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CON TALON</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">GENERAL</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CLASICO</option>
                </select>
                <span asp-validation-for="Departamento" class="text-danger"></span>
            </div>
            <br>
                <div class="row"> <label class="control-label"><h5>L5</h5></label>
                    <select v-model="idl5" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                        <option selected="selected" value="0">Seleccionar l5</option>
                        <option v-for="d in departamentos" v-bind:value="d.iddepto">CON TALÓN</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">SIN TALÓN</option>
                    </select>
                    <span class="text-danger"></span></div>
                    <br>
                <div class="row"> <label class="control-label"><h5>L6</h5></label>
                    <select v-model="idl6" class="form-control dropdown-toggle col-lg-12" asp-items="Html.GetEnumSelectList<TipoDivision>()">
                        <option selected="selected" value="0">Seleccionar l6</option>
                        <option v-for="d in departamentos" v-bind:value="d.iddepto">TRABA</option>
                    <option v-for="d in departamentos" v-bind:value="d.iddepto">CERRADA</option>
                    </select>
                    <span class="text-danger"></span></div>
                

<br>
<br>
    
<button type="button" class="btn btn-secondary" style='width:145px; height:33px; font-family: Arial; font-size: 10pt;'>Aplicar</button>
<br>
<br>
<button type="button" class="btn btn-info"      style='width:145px; height:33px; font-family: Arial; font-size: 10pt;'>Limpiar filtros</button>
               
         
        </div>
    </div>

        

	</div>
</div>
                            
</div>   

<!--fin de filtro de resultados-->

                    
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
                            <div class="row" style="height:110px">
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
                                    <div class="mx-auto">
                                        <h6 id = "tit0" class="text-muted fe-arrow-up text-success mr-1">Total</h6>
                                        <h3 id = "num0" class="font-weight">$0</h3>
                                        <h6 id = "porc0"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
                                    <div class="mx-auto">
                                        <h6 id = "tit1" class="text-muted fe-arrow-up text-success mr-1" >Ventas Netas</h6>
                                        <h3 id = "num1" class="font-weight">$0</h3>
                                        <h6 id = "porc1"class="text-success"><i class="icon ion-md-arrow-dropup-circle"></i>0.0%</h6>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 d-flex stat my-2">
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
                                     <div class="row" id= "info-chart">
                                           <h6 id = "Chart" class="font-weight-bold mb-0"><ion-icon name="arrow-dropup"></ion-icon></h6>
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
                                    <h6 class="font-weight-bold mb-0"><ion-icon name="arrow-dropup"></ion-icon></h6>
                                </div>
                                <div class="datatable-container">
                                    <div id="divTit1"> 
                                       <h6 class="mb-0 ml-4" id ="TituloTabla1">Periodo Actual</h6>
                                    </div>
                                    <div class="card-body pt-2">
                                        <table id="myTable" class="display table-hover" style="width:100%" ></table>
                                    </div>
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
<script type="text/javascript" src="https://code.highcharts.com/modules/exporting.js"></script> 
<!-- jstree -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
<!-- daterangepicker -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>


<!-- multiselect -->
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>


<!-- app-js        -->
<script type="text/javascript" src="js/charts/edocartera.js"></script>
<script type="text/javascript" src="js/charts/opnegadas.js"></script>
<script type="text/javascript" src="js/charts/vtasnetas.js"></script>
<script type="text/javascript" src="js/charts/vtasfpago.js"></script>
<script type="text/javascript" src="js/charts/recupera.js"></script>
<script type="text/javascript" src="js/datatables/edocartera.js"></script>
<script type="text/javascript" src="js/datatables/opnegadas.js"></script>
<script type="text/javascript" src="js/highcharts.js"  ></script>

<script type="text/javascript" src="js/app.js"  ></script>

<script >

    var numchart = <?php  echo $_SESSION['chart']; ?>; 
    var tipousr  = <?php  echo $_SESSION['tipo']; ?>; 
    var tfiltro  = <?php  echo $_SESSION['filtro']; ?>; 

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
