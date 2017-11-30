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
      // console.log(respuesta);

      //
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
    t.rows( i )
      .data()
      .each( function ( value, index ) {
          // var valor = value.split(",");
          //console.log( value[7] );

          mont += parseFloat(value[7])
      } );
  }
  var ventana = window.open(`rpt/reembolso/oficiofinanza.html?num=${num}&mont=${mont}`, "_blank");
}
function GenerarReporte(){

}
