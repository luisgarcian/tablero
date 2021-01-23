<?php
                // se incluye el codigo de la clase para conexion
                require_once("config/const.php");
                require_once("config/odbc.php");
                // se crea una instancia de la clase conexion
                $cnn = new conexion(tserver);
                // se hace la conexion a la base de datos
                $cnn->conectar();
                // se ejecuta la consulta para traerse las opciones de menu del usuario

                $usuarioid = $_SESSION['tipo'] ;

                $sql = "exec usp_TraeOpcUsr ".strval($usuarioid) ;
                // se trae el resultado de la consulta
                $result = $cnn->query($sql);

                $ul_1 = 0;
                $ul_2 = 0;

                $h3_1 = '<h3><span class=""';
                $h3_2 = '"></span>';
                $h3_3 = '</h3>';
                $active = 'class="active"';
                $li1   = '><a href="#">';
                $li2   = '</a></li>';
                $ul_txt1 = chr(13).'<li>';
                $ul_txt2 = "</li>".chr(13);
                $menu_activo = 0;
                // menu dinamico
                while ( $row = odbc_fetch_array($result )) { 
                    $idChart = $cnn->result("idchart");
                    $nombre = $cnn->result("nombre");
                    $onclick = $cnn->result("onclick");
                    $icon = $cnn->result("icon");
                    $tagicon = '<ion-icon name='.$icon.'></ion-icon> ';
                    $h3 = chr(13).$h3_1.$h3_2.$tagicon.$nombre.$h3_3.chr(13);
                    $li = '<li onClick="'.$onclick.'()"'.$li1.$nombre.$li2.chr(13);
                    
                    if ($idChart == 0 )   {
                        //Lista Principal con icono
                        if ($ul_2 > 0) {   // ul sec pendiente de cerrar?
                            echo "</ul>".chr(13); // se cierra el ul sec
                            --$ul_2 ;      // ul sec cerrado
                        }
                        if ($ul_1 > 0) {   // ul principal pendiente de cerrar?
                            echo $ul_txt2; // se cierra el ul principal
                            --$ul_1 ;      // ul principal cerrado
                        }
                        echo '<li '; // se abre li de grupo
                        if ($menu_activo==0) { // li activa
                            echo $active;  
                            $menu_activo = 1;
                        }
                        echo '>';
                        echo $h3;     // <-- h4 encabezado de lista
                        ++$ul_1 ;     // ul principal pendiente de cerrar
                    } else {
                        //Lista secundaria
                        if ($ul_2 > 0) {  //ul sec pendiente de cerrar?
                            echo $li;     // <-- lista nivel 1                            
                        } else {
                            echo "<ul>".chr(13);    // se abre ul secundario
                            echo $li;       // <-- lista nivel 1
                            ++$ul_2 ;       // <-- ul sec pendiente de cerrar
                        }
                    }
                } //while 

                if ($ul_2 > 0) {
                    echo "</ul>".chr(13); // cierra el ul sec
                }
                if ($ul_1 > 0) {
                    echo $ul_txt2.chr(13); // cierra el ul principal
                }

              ?>
