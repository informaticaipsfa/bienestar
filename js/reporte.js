
function crearReporte(){
  $("#lista").html(`<table id="lstReporte" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
          <tr>
              <th>#</th>
              <th>Caso</th>
              <th>Nombre y Apellido</th>
              <th>Cedula</th>
              <th>Tipo Cuenta</th>
              <th>Banco</th>
              <th>Núm. Cuenta</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Acción</th>
          </tr>
      </thead></table>`);
  var t = $('#lstReporte').DataTable(opciones);
  t.clear().draw();

}
