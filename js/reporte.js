class WReembolsoReporte{
  constructor(){
    this.sucursal = "";
    this.componente = "";
    this.grado = "";
    this.situacion = "";
    this.fechadesde = "";
    this.fechahasta = "";
    this.reporte = "";
  }
}
function crearReporte(){
  $("#lista").html(`<table id="lstReporte" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
          <tr>

              <th>Caso</th>
              <th>Nombre y Apellido</th>
              <th>Cedula</th>
              <th>Tipo Cuenta</th>
              <th>Banco</th>
              <th>Núm. Cuenta</th>
              <th>Fecha</th>
              <th>Monto</th>
          </tr>
      </thead></table>`);
      ConsultarReembolsoReporte();

}

function ConsultarReembolsoReporte(){
  var WRR = new WReembolsoReporte();
  WRR.sucursal = $("#cmbsucursalwrr").val();
  WRR.componente = $("#cmbcomponentewrr").val();
  WRR.grado = $("#cmbgradowrr").val();
  WRR.situacion = $("#cmbsituacionwrr").val();
  WRR.fechadesde = $("#txtfechadesdewrr").val();
  WRR.fechahasta = $("#txtfechahastawrr").val();
  WRR.reporte = $("#cmbreportewrr").val();

  var urlConsultar = Conn.URL + "wreembolsoreporte";
  var promesa = CargarAPI({
      sURL: urlConsultar,
      metodo: 'POST',
      valores: WRR,
  });

  var t = $('#lstReporte').DataTable(opciones);
  t.clear().draw();
  promesa.then(function(xhRequest) {
      respuesta = JSON.parse(xhRequest.responseText);
      var i = 0;
      var mnt = 0;
      respuesta.forEach( v => {
        i++;
        mnt += parseFloat(v.montoaprobado);
        t.row.add(
          [
            v.numero,
            v.nombre,
            v.cedula,
            v.tipo,
            v.institucion,
            v.cuenta,
            Util.ConvertirFechaHumana(v.fechaaprobado),
            v.montoaprobado
          ]
        ).draw(false);
      });
      $("#txtnumwrr").val(i);
      $("#txtmontwrr").val(mnt);
  });

  $('#lstReporte').on( 'click', 'tbody tr', function () {
    t.row( this ).remove().draw( false );
    // $(this).toggleClass('selected');
  });

}

function GenerarOficio(){
  var t = $('#lstReporte').DataTable();
  var num = t.rows().data().length;
  var mont = 0;
  for(i = 0; i <= t.rows().data().length - 1; i++) {
    t.rows( i ).data().each( function ( value, index ) {
          mont += parseFloat(value[7])
      } );
  }
  var oficio = `rpt/reembolso/oficiofinanzare.html?num=${num}&mont=${mont}`;
  if ($("#cmbreportewrr").val() == "apoyo")
    oficio = `rpt/reembolso/oficiofinanza.html?num=${num}&mont=${mont}`;

  var ventana = window.open(oficio, "_blank");
}
function GenerarReporte(){
  var t = $('#lstReporte').DataTable();
  var tabla = $('#lstReporte').html();
  var num = t.rows().data().length;
  var mont = 0;
  var desde = $("#txtfechadesdewrr").val();
  var hasta = $("#txtfechahastawrr").val();

  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var f = new Date();
  var fecha = "Caracas, " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();

  for(i = 0; i <= t.rows().data().length - 1; i++) {
    t.rows( i ).data().each( function ( value, index ) {
          mont += parseFloat(value[7])
      } );
  };
  var cabecera = `
    <table width="100%">
        <tr>
            <td width="106" height="102"><img src="images/lg.png" width="106" height="100"></td>
            <td width="288" style="font-size: 10px;">REPÚBLICA BOLIVARIANA DE VENEZUELA <br>
                MINISTERIO DEL PODER POPULAR PARA LA DEFENSA<br>
                VICEMINISTERIO DE SERVICIOS<br>
                DIRECCIÓN GENERAL DE EMPRESAS Y SERVICIOS<br>
                INSTITUTO DE PREVISIÓN SOCIAL DE LA FUERZA ARMADA<br>
                GERECIA DE BIENESTAR Y SEGURIDAD
          </td>
            <td width="350" >
          </td>
            <td width="236">
          </td>
        </tr>
    </table>
    <br><br><p align="right">` + fecha + `</p><br>RELACION DE CASOS APROBADOS<br>
    POR LA GERENCIA DE BIENESTAR SOCIAL NUMERO: __________<br><br>`;
  var pie = `<br><br><br>
  <b>EDUARDO JOSÉ MARTÍNEZ SALAS</b><br><br>

  <center style="font-size: 10px;">“CHAVEZ VIVE LA PATRIA SIGUE”<br>
  “INDEPENDENCIA Y PATRIA SOCIALISTA... “¡VIVIREMOS Y VENCEREMOS!</center>`;

  var html = `<center><div style="width: 1000px;">` + cabecera + `<table width="100%" border=1>` + tabla + `</table>` + pie + `</div></center>`;
  var ventana = window.open("", "_blank");
  ventana.document.write(html);
  ventana.document.head.innerHTML = ``;


}
