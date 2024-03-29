let lstBuzon = null;
let militarActivo = null;
let lstBuzonApoyo = null;
let EstatusBusqueda = 0;
let apoyoActivo = null;
let CReembolso = {};
let copia = null;
let posicionModificar = null;

let opciones = {
    destroy: true,
    'paging': true,
    'lengthChange': true,
    'searching': true,
    'ordering': true,
    'info': false,
    'autoWidth': false,
    "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
    "bStateSave": true,
    "order": [[3, "desc"]],
    "language": {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
};


/**
* Tipo de Sucursal
*
* @param int
* @return void
*/
function Sucursal(codigo){
  switch (codigo) {
    case "ccs":
      return "CARACAS";
      break;
    case "car":
      return "CARUPANO";
      break;
    case "may":
      return "MARACAY";
      break;
    case "mar":
      return "MARACAIBO";
      break;
    case "sju":
      return "SAN JUAN";
      break;
    case "san":
      return "SAN CRISTOBAL";
      break;
    case "tuc":
      return "TUCUPITA";
      break;
    case "apu":
      return "APURE";
      break;
    case "mar":
      return "MARACAIBO";
      break;
    case "mag":
      return "MARGARITA";
      break;
    case "bqt":
      return "BARQUISIMETO";
      break;
    case "bar":
      return "BARINAS";
      break;
    case "bac":
      return "BARCELONA";
      break;
    case "pto":
      return "PUERTO AYACUCHO";
      break;
    case "pun":
      return "PUNTO FIJO";
      break;
    case "bol":
      return "CIUDAD BOLIVAR";
      break;
    case "mat":
      return "MATURIN";
      break;
    default:
      return "CARACAS";
      break;
  }
}
/**
* Tipo de Buzón
*
* @param int
* @return void
*/
function TipoBuzon(tipo ){
  switch (tipo) {
    case 0:
      return "Recepción de Documentos";
      break;
    case 1:
      return "Jefe de Sección";
      break;
    case 2:
      return "Jefe de Departamento";
      break;
    case 3:
      return "Gerente de Bienestar y Seguridad Social";
      break;
    case 4:
      return "Aprobado";
      break;
    case 5:
      return "Documentos Pendientes";
      break;
    case 0:
      return "Reportes";
      break;
    default:
      return "Recepción de Documentos";
      break;
  }
}


/**
* Listar Buzones
*
* @param int
* @return void
*/
function listaBuzon() {
    est = EstatusBusqueda;
    //$("#cmbsucursal").select2();
    $("#_cargando").show();
    $("#DistribucionApoyo").hide();
    $("#DistribucionReembolso").hide();
    posicionModificar = est;
    //Reembolso
    $("#lista").html('');
    console.log('Entrando.. ', Conn);
    var url = Conn.URL + "wreembolso/listar/" + est + "/" + $("#cmbsucursal option:selected").val();
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'GET',
        valores: ''
    });
    promesa.then(function (xhRequest) {
        lstBuzon = JSON.parse(xhRequest.responseText);
        if(lstBuzon != null) crearBuzon(est);
        $("#_htitulo").html(TipoBuzon(est));
        if(est > 3)$("#DistribucionReembolso").show();
        $("#_cargando").hide();
    }).catch( function (err) {
      console.error(err)
    });


    //Apoyo
    $("#listaApoyo").html('');
    var url2 = Conn.URL + "wapoyo/listar/" + est + "/" + $("#cmbsucursal option:selected").val();
    var promesaApoyo = CargarAPI({
        sURL: url2,
        metodo: 'GET',
        valores: ''
    });
    promesaApoyo.then(function (xhRequest) {
        lstBuzonApoyo = JSON.parse(xhRequest.responseText);
        if(lstBuzonApoyo != null) crearBuzonApoyo(est);
        $("#_htitulo").html(TipoBuzon(est));
        if(est > 3)$("#DistribucionApoyo").show();
        
    }).catch( function (err) {
      console.error(err)
    }

    );


}

function SeleccionarSucursal(){
  crearBuzon(posicionModificar, $("#cmbsucursal option:selected").val());
  crearBuzonApoyo(posicionModificar, $("#cmbsucursal option:selected").val());
}


/**
* Crear Buzones del sistema
*
* @param int
* @return void
*/
function crearBuzon(est, sucursal) {

    $("#lista").html(`<table id="lstReembolso" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Reembolso</th>
                <th>Sucursal</th>
                <th>Cedula</th>
                <th>Nombre y Apellido</th>
                <th>F. Solicitud</th>
                <th>M. Solicitud</th>
                <th>M. Aprobado</th>
                <th>Estatus</th>
                <th>Detalles</th>
            </tr>
        </thead></table>`);
    var t = $('#lstReembolso').DataTable(opciones);
    t.clear().draw();

    if(lstBuzon != undefined){
      lstBuzon.forEach(v => {
        if(sucursal != undefined){
          if(v.usuario.substr(0,3) == sucursal)t.row.add(CargarBuzonReembolso(v, est)).draw(false);
        }else{
          t.row.add(CargarBuzonReembolso(v, est)).draw(false);
        }
      });
    }
}

/**
* Cargar Datos del Buzones del sistema
*
* @param {object}
* @return void
*/
function CargarBuzonReembolso(v, est){
  var alertSegui = "";
  switch (v.estatusseguimiento){
    case 1:
      alertSegui = '<i class="fa fa-info-circle" style="font-size: 16px; color: red; margin-left: -100px;;"></i>';
      break;
    case 2:
      alertSegui = '<small class="label label-info"><i class="fa fa-comment-o"></i>Recomendacion</small>';
      break;
  }
  var fcreacion = Util.ConvertirFechaHumana(v.fechacreacion);
  var msolicitado = numeral(parseFloat(v.montosolicitado)).format('0,0[.]00 $');
  var maprobado = numeral(parseFloat(v.montoaprobado)).format('0,0[.]00 $');
  var con = conviertEstatus(v.estatus);
  return [
    `<span class="text"><a href="#" onclick="detalleBuzon('${v.id}','${v.numero}','${est}')">${v.numero }</a></span>`,
    Sucursal(v.usuario.substr(0,3)),
    v.id,
    v.nombre,
    fcreacion,
    msolicitado,
    maprobado,
    con,
    alertSegui
  ];
}

/**
* Convertir Estatus del sistema
*
* @param int
* @return int
*/
function conviertEstatus(est){
  var estatus = "";
  switch (est){
      case -1:
        estatus = "Rechazado";
        break;
      case 0:
        estatus = "Inicial";
        break;
      case 1:
        estatus = "Pendiente";
        break;
      case 2:
        estatus = "En Jefatura";
        break;
      case 3:
        estatus = "En Gerencia";
        break;
      case 4:
        estatus = "Aprobado";
        break;
      case 5:
        estatus = "Aprobado";
        break;
  }
  return estatus;
}

function verificarAprobacion(num, esta, id) {
    $("#_contenido").html("¿Está seguro que desea procesar el reembolso " + num + ". Imprimió la planilla de Solicitud?");
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                      onClick="aprobarReembolso('${num}','${esta}','${id}')">Si</button>
                   <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function verificarRechazo(num, esta, id) {
    $("#_contenido").html("¿Está seguro que desea Rechazar el reembolso " + num + "?");
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                      onClick="rechazarReembolso('${num}','${esta}','${id}')">Si</button>
                   <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

/**
* Aprobación del Buzon de los estados del Reembolso
*
* @param {int}
* @param {int}
* @param {string}
* @return void
*/
function aprobarReembolso(num, est, id) {
    var url = Conn.URL + "wreembolso/estatusx";


    var datos = {
      ID: id,
      numero: num,
      posicion: obtenerPosicion(num),
      estatus: parseInt(est) + 1
    };
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'POST',
        valores: datos,
    });
    promesa.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        $.notify(respuesta.msj, "success");
        listaBuzon(est);
        volverLista();
    });
}

function obtenerPosicion(num){
  var pos = 0;
  var ipos = 0;
  militarActivo.CIS.ServicioMedico.Programa.Reembolso.forEach(v => {

    if(v.numero == num){
      pos = ipos;
      return false;
    }
    ipos++;
  });
  return pos;
}

/**
* Rechazos del Buzon de los estados del Reembolso
*
* @param {int}
* @param {int}
* @param {string}
* @return void
*/
function rechazarReembolso(num, est, id) {
    var url = Conn.URL + "wreembolso/estatusx";
    //Object {object} Estatus
    var datos = {
      ID: id,
      numero: num,
      Estatus: -1
    };
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'POST',
        valores: datos
    });
    promesa.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        $.notify(respuesta.msj);
        listaBuzon(est);
        volverLista();

    });

}

function detalleBuzon(id, numero, est,tipo) {
    var url = Conn.URL + "militar/crud/" + id;
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'GET',
        valores: '',
        Objeto: militar
    });
    promesa.then(function (xhRequest) {
        militarActivo = JSON.parse(xhRequest.responseText);
        switch (tipo){
            case "A":
              llenarBuzonApoyo(numero, est);
              break;
            case "C":
              llenarBuzonCarta(numero, est);
              break;
            default:
              llenarBuzonReembolso(numero, est);
        }
    });
}

function llenarBuzonReembolso(numero,est) {
    $('#lblcedula').text(militarActivo.Persona.DatoBasico.cedula);
    var ncompleto = militarActivo.Persona.DatoBasico.nombreprimero + " " + militarActivo.Persona.DatoBasico.apellidoprimero;
    $('#lblnombre').text(ncompleto);
    $('#lblgrado').text(militarActivo.Grado.descripcion);
    $('#lblsituacion').text(Util.ConvertirSitucacion(militarActivo.situacion));
    $('#lblnumero').text(numero);
    militarActivo.CIS.ServicioMedico.Programa.Reembolso.forEach(v => {

      if(v.numero == numero){
        $("#lblfechasolicitud").html(Util.ConvertirFechaHumana(v.fechacreacion));
      }
    });

    $('#lblcomponente').text(militarActivo.Componente.descripcion);

    var rutaimg = Conn.URLIMG;
    url = rutaimg + militarActivo.Persona.DatoBasico.cedula + ".jpg";
    if (militarActivo.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + militarActivo.Persona.DatoBasico.cedula + "/foto.jpg";
    }
    $("#fotoperfil").attr("src", url);
    crearTablaConceptos(numero,est);
    mostrarTextoObservacion(est);
    $('#listasProgramas').hide();
    $('#detalle').slideToggle();
}

function crearTablaConceptos(numero,est) {
    var fila = "";
    var pos = 0;
    var lst = militarActivo.CIS.ServicioMedico.Programa.Reembolso;
    var i = 0;
    lst.forEach( v => {
        if (v.numero == numero) {
            pos = i;
            posicionModificar = i;
        }
        i++;
    });
    CReembolso = lst[pos]; //Cargar detalles del reembolso
    if(CReembolso.Seguimiento.Estatus != undefined) $("#estSeguimiento").val(CReembolso.Seguimiento.Estatus);


    if(est > 2){
      activarCambioEstatus();
    }
    $("#cuerpoEditarConceptos").html('');
    var mntIPSFA = 0;
    CReembolso.Concepto.forEach( v => {
        $("#cuerpoEditarConceptos").append(CargarDetalleConcepto(v, est));
        mntIPSFA +=  parseFloat(v.montosolicitado) - (parseFloat(v.montoaseguradora) + parseFloat(v.montoaportar));;
    });


    var mntformato = numeral(parseFloat(CReembolso.montosolicitado.toFixed(2))).format('0,0.00');
    $("#totalter").html(CReembolso.montosolicitado.toFixed(2));
    $("#totalapro").html(CReembolso.montoaprobado);

    if( CReembolso.montoaprobado != mntIPSFA ){
      $("#txtPresidenciaReembolso").val(CReembolso.montoaprobado);
    }else{
      $("#txtPresidenciaReembolso").val("0.00");
    }

    $(".borrarconcepto").click(function () {
        $(this).parents('tr').eq(0).remove();
        if ($("#cuerpoEditarConceptos tr").length == 0) {

        }
        calcularAcumulado("r");
    });
    $(".mntsoli").on("keypress",function(e){
        var key = e.keyCode || e.which;
        if(key == 13){
            calcularPorcen(this,'r');
        }
    });

    $(".porcentajecalculo").on("keypress",function(e){
        var key = e.keyCode || e.which;
        if(key == 13){
            calcularPorcen(this,'r');
        }
    });
    $(".modconcep").click(function () {
        calcularAcumulado("r");
    });

    //Crear tabla de objservaciones
    if (CReembolso.Seguimiento.Observaciones != undefined) {
        var lstObs = CReembolso.Seguimiento.Observaciones;
        $("#cuerpoObservaciones").html('');
        $("#cuerpoOpiniones").html('');
        lstObs.forEach( v => {

          if( v.contenido != undefined){
            var tipo = v.contenido.split("|||");
            var cestatus = conviertEstatus(CReembolso.estatus);
            var tipo = tipo[0];
            if(tipo[1] != undefined) {
              $("#cuerpoOpiniones").append(`<tr><td>${tipo}</td><td style="width: 10%;text-align: right">${cestatus}</td></tr>`);
            }else {
              $("#cuerpoObservaciones").append(`<tr><td>${v.contenido}</td><td></td></tr>`);
            }
          }


        });
    }
    validarDetalleReembolso(est);
}

function CargarDetalleConcepto(v, est){
  var mntApo = 0;
  if(v.DatoFactura.montoaprobado > 0) mntApo = v.DatoFactura.montoaprobado;
  var ffact = Util.ConvertirFechaHumana(v.DatoFactura.fecha);
  var picar = v.afiliado.split("-");
  var picar2 = picar[1].split("(");
  var tam = picar2[1].length;
  var parent = picar2[1].substr(0,tam-1);
  var nombre = picar[0];
  var cedula = picar2[0];
  var fecha = Util.ConvertirFechaHumana(v.DatoFactura.fecha);
  var desabilitar = "";
  $("#btnImprimirPlanilla").hide();
  if ( est == 0 ) {
    desabilitar = "disabled";
  }else {
    $("#btnImprimirPlanilla").show();
  }
  var porcentaje = parseFloat(v.DatoFactura.porcentaje).toFixed(2);
  var montosolic = parseFloat(v.DatoFactura.monto).toFixed(2);
  return `<tr>
            <td>${parent}</td>
            <td>${nombre}</td>
            <td>${cedula}</td>
            <td>${v.descripcion}</td>
            <td><input type="text" value="${v.DatoFactura.numero}" class="numfact"></td>
            <td style="display: none">${v.DatoFactura.Beneficiario.rif}</td>
            <td style="display: none">${v.DatoFactura.Beneficiario.razonsocial}></td>
            <td><input type="text" class="ffactReembolso" value="${fecha}"></input></td>
            <td><input type="text" onblur="calcularPorcen(this,'r')" class="mntsoli"
                onkeypress="return Util.SoloNumero(event,this,true)" style="text-align: right; width:80px"
                value="${montosolic}"></td>
            <td><input type="number" class="porcentajecalculo" onblur="calcularPorcen(this,'r')" ${desabilitar}
                onkeypress="return Util.SoloNumero(event,this)" style="text-align: right; width:55px"
                value="${porcentaje}"></td>
           <td><input type="text" value="${mntApo}" class="mntAcumulado"
                onkeypress="return Util.SoloNumero(event,this,true)" style="text-align: right;  width:80px"
                onblur="calcularAcumulado('r')" ${desabilitar}></td>
           <td style="width: 7%;">
                <button type="button" class="btn btn-default btn-sm borrarconcepto"
                title="Eliminar"><i class="fa fa-trash-o" style="color: red;"></i></button></td>
        </tr>`;

}

function calcularPorcen(obj, tipo){
    var por = $(obj).parents("tr").eq(0).find("input.porcentajecalculo").val();
    var soli = $(obj).parents("tr").eq(0).find("input.mntsoli").val();
    var nuevoAprobado = soli*por/100;

    $(obj).parents("tr").eq(0).find("input.mntAcumulado").val(nuevoAprobado.toFixed(2));
    calcularAcumulado(tipo);
}

function calcularAcumulado(tipo) {
    var idTabla = "";
    var idTotal = "";
    var idTotalSol = "";
    switch(tipo){
        case "r":
          idTabla = "cuerpoEditarConceptos";
          idTotal = "totalapro";
          idTotalSol = "totalter";
          break;
        case "a":
          idTabla = "cuerpoEditarConceptosApoyo";
          idTotal = "totalaproApoyo";
          idTotalSol="totalterApoyo";
          break;
        case "c":
          idTabla = "cuerpoEditarConceptosCarta";
          idTotal = "totalaproCarta";
          idTotalSol="totalterCarta";
          break;
    }

    var acumulado = 0;
    var acumulado2 = 0;
    $("#"+idTabla+" tr").each(function () {
        var mnt = $(this).find("input.mntAcumulado").eq(0).val();
        var sol = $(this).find("input.mntsoli").eq(0).val();
        if(parseFloat(mnt) > parseFloat(sol)){
            mnt = sol;
            $(this).find("input.mntAcumulado").eq(0).val(mnt);
            $.notify("El  monto aprobado no debe ser mayor al solicitado");
        }
        acumulado2 = parseFloat(acumulado2)+parseFloat(sol);
        acumulado = parseFloat(acumulado) + parseFloat(mnt);
    });
    acumulado = parseFloat(acumulado).toFixed(2);
    acumulado2 = parseFloat(acumulado2).toFixed(2);
    $("#"+idTotal).html(acumulado);
    $("#"+idTotalSol).html(acumulado2);
}

function volverLista() {
    $("#listasProgramas").slideToggle();
    $('#detalle').hide();
    $("#detalleApoyo").hide();
    $("#detalleCarta").hide();
}

function actualizarReembolso(est) {
    var MontoAprobado = 0;
    var MontoSolicitado = 0;
    var conceptos = new Array();
    var datos = null;
    var i = 0;

    if ($("#cuerpoEditarConceptos tr").length > 0) {
        $("#cuerpoEditarConceptos tr").each(function () {
            MontoAprobado = parseFloat($(this).find("input.mntAcumulado").val());
            MontoSolicitado = parseFloat($(this).find("input.mntAcumulado").val());
            conceptos.push(obtenerListadoReembolso(this, i));
            i++;
        });
        CReembolso.Concepto = conceptos;
    } else {
        $.notify("Debe poseer al menos un concpeto para editar o puede rechazar el reembolso");
    }

    //
    CReembolso.montosolicitado = parseFloat($("#totalter").html());
    CReembolso.montoaprobado = parseFloat($("#totalapro").html());
    var observaciones = new Array();
    var tipoObser = "";

    if(CReembolso.estatus > 1) tipoObser = "|||" + CReembolso.estatus;
    if($("#cuerpoObservaciones tr").length > 0){
        $("#cuerpoObservaciones tr.agobs").each(function(){
           observaciones.push($(this).find("td").eq(0).html());
        });
    }
    if($("#cuerpoOpiniones tr").length > 0){
        $("#cuerpoOpiniones tr.agobs").each(function(){
            observaciones.push($(this).find("td").eq(0).html()+tipoObser);
        });
    }
    EnviarReembolso(CReembolso, observaciones);

}

function obtenerListadoReembolso(Concepto, i){
  var concep = new ConceptoReembolso();
  var facturaD = new Factura();
  var ffact = CReembolso.fechacreacion;
  if ($(Concepto).find("input.ffactReembolso").eq(0).val() != "") {
      ffact = new Date(Util.ConvertirFechaUnix($(Concepto).find("input.ffactReembolso").val())).toISOString();
  }
  facturaD.fecha = ffact;
  facturaD.monto = parseFloat($(Concepto).find("input.mntsoli").val());
  facturaD.montoaprobado = parseFloat($(Concepto).find("input.mntAcumulado").val());
  facturaD.porcentaje = parseFloat($(Concepto).find("input.porcentajecalculo").val());
  facturaD.numero = $(Concepto).find("input.numfact").val();
  facturaD.control = $(Concepto).find("input.numfact").val();
  facturaD.Beneficiario = CReembolso.Concepto[i].DatoFactura.Beneficiario;
  concep.DatoFactura = facturaD;
  concep.afiliado = CReembolso.Concepto[i].afiliado;
  concep.descripcion = CReembolso.Concepto[i].descripcion;
  return concep;
}

function EnviarReembolso(OReembolso, observaciones){
  OReembolso.Seguimiento.Estatus = parseInt($("#estSeguimiento").val());
  var wreembolso = new WReembolso();
  wreembolso.id = militarActivo.Persona.DatoBasico.cedula;
  wreembolso.numero = $('#lblnumero').text();
  wreembolso.observaciones = observaciones;
  wreembolso.nombre = militarActivo.Persona.DatoBasico.nombreprimero + " " + militarActivo.Persona.DatoBasico.apellidoprimero;
  OReembolso.responsable = $("#cmbFondoReembolso option:selected").val();
  if(parseFloat($("#txtPresidenciaReembolso").val()) > 0 ){
    OReembolso.montoaprobado = parseFloat($("#txtPresidenciaReembolso").val());
  }
  wreembolso.Reembolso = OReembolso;
  wreembolso.posicion = obtenerPosicion($('#lblnumero').text());
  var urlGuardar = Conn.URL + "wreembolsox";
  var promesa = CargarAPI({
      sURL: urlGuardar,
      metodo: 'POST',
      valores: wreembolso,
  });
  promesa.then(function(xhRequest) {
      respuesta = JSON.parse(xhRequest.responseText);
      if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
      msjRespuesta(respuesta.msj);
      listaBuzon(OReembolso.estatus);
      $('#txtObservacion').val("");
      volverLista();
  });
}

function agObservacion(tipo) {
    var idTexto = "";
    var idTabla = "";
    var idOpi = "";
    var obj = {};

    switch (tipo){
        case "r":
          idOpi = "cuerpoOpiniones";
          idTexto = "txtObservacion";
          idTabla = "cuerpoObservaciones";
          obj = CReembolso;
          break;
        case "a":
          idOpi = "cuerpoOpinionesApoyo";
          idTexto = "txtObservacionApoyo";
          idTabla = "cuerpoObservacionesApoyo";
          obj = copia;
          break;
    }
    if ( $("#" + idTexto ).val() == "" ) return false;
    var texto = $("#" + idTexto).val();
    var tabla = $("#" + idTabla);
    if(obj.estatus > 1) tabla = $("#"+idOpi);
    var rem = `<button type="button" onclick="remObse(this)" class="btn btn-default
                 btn-sm pull-right" data-toggle="tooltip" title="Borrar"><i style="color: red" class="fa fa-trash-o"></i>
               </button>`;

    tabla.append(`<tr class='agobs'><td>${texto}</td><td style='5px'>${rem}</td></tr>`);
}

function remObse(fila) {
    $(fila).parents('tr').eq(0).remove();
}

function activarCambioEstatus(){

    $("#cambioestatus").show();
    $("#cambioestatusApoyo").show();
    $("#cambioestatusCarta").show();
}

function cambiarEstatusReembolso(tipo){
    var estatus = 0;
    switch (tipo){
        case "a":
            verificarAprobacion(CReembolso.numero, CReembolso.estatus, $("#lblcedula").text());
            break;
        case "r":
            verificarRechazo(CReembolso.numero, CReembolso.estatus, $("#lblcedula").text());
            break;
        case "e":
            estatus = $("#cmbcambioestatus").val();
            verificarAprobacion(CReembolso.numero, estatus, $("#lblcedula").text());
            break;
    }
}

function mostrarTextoObservacion(est){
    if(est > 1){
        $(".lblobser").text(" Opinión");
        $("#cabObserbaciones").html("Observaciones");
    }else{
        $(".lblobser").text(" Observación");
        $("#cabObserbaciones").html("Observaciones");
    }
}


/**************************************
* Datos para el Apoyos Económicos
***************************************/

function cambiarEstatusApoyo(tipo){
    var estatus = 0;
    switch (tipo){
        case "a":
            verificarAprobacionApoyo(copia.numero, copia.estatus, $("#lblcedulaApoyo").text());
            break;
        case "r":
            verificarRechazoApoyo(copia.numero, copia.estatus, $("#lblcedulaApoyo").text());
            break;
        case "e":
            estatus = $("#cmbcambioestatusApoyo").val();
            verificarAprobacionApoyo(copia.numero ,estatus,$("#lblcedulaApoyo").text());
            break;
    }
}

function verificarAprobacionApoyo(num, esta,id) {
    $("#_contenido").html(`¿Está seguro que desea procesar el apoyo ${num}. Imprimió la planilla de Solicitud?`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                    onClick="aprobarApoyo('${num}','${esta}','${id}')">Si</button>
                   <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function verificarRechazoApoyo(num, esta, id) {
    $("#_contenido").html(`¿Está seguro que desea Rechazar el apoyo ${num}?`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                    onClick="rechazarApoyo('${num}','${esta}','${id}')">Si</button>
                   <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function aprobarApoyo(num, est, id) {
    var url = Conn.URL + "wapoyo/estatusx";
    var datos = {
      id: id,
      numero: num,
      estatus: parseInt(est) + 1
    };
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'POST',
        valores: datos,
    });
    promesa.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        $.notify(respuesta.msj, "success");
        volverLista();
        var ipos = parseInt(est) - 1;
        listaBuzon( ipos );
    });
}

function rechazarApoyo(num, est, id) {
    var url = Conn.URL + "wapoyo/estatusx";
    var datos = {
      ID: id,
      numero: num,
      estatus: -1
    };
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'POST',
        valores: datos
    });
    promesa.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        volverLista();
        $.notify(respuesta.msj);
        var ipos = parseInt(est) - 1;
        listaBuzon( ipos );
    });

}

function crearBuzonApoyo(est, sucursal){
    $("#listaApoyo").html(`<table id="tblBuzonApoyo" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Apoyo</th>
                <th>Sucursal</th>
                <th>Cedula</th>
                <th>Nombre y Apellido</th>
                <th>F. Solicitud</th>
                <th>M. Solicitud</th>
                <th>M. IPSFA</th>
                <th>Estatus</th>
                <th>Detalles</th>
            </tr>
        </thead></table>`);
    var t = $('#tblBuzonApoyo').DataTable(opciones);
    t.clear().draw();
    lstBuzonApoyo.forEach(v => {
        if(sucursal != undefined){
          if(v.usuario.substr(0,3) == sucursal)t.row.add(CargarBuzonApoyo(v, est)).draw(false);
        }else{
          t.row.add(CargarBuzonApoyo(v, est)).draw(false);
        }
    });
}


function CargarBuzonApoyo(v, est){
  var alertSegui = "";
  switch (v.estatusseguimiento){
    case 1:
      alertSegui = '<small class="label label-danger"><i class="fa fa-info-circle"></i></small>';
      break;
    case 2:
      alertSegui = '<small class="label label-info"><i class="fa fa-comment-o"></i>Recomendacion</small>';
      break;
  }
  var fCrea = Util.ConvertirFechaHumana(v.fechacreacion);
  var montsol = numeral(parseFloat(v.montosolicitado)).format('0,0[.]00 $');
  var montapr = numeral(parseFloat(v.montoaprobado)).format('0,0[.]00 $');
  var estatus = conviertEstatus(v.estatus);

  return [
    `<span class="text"><a href="#" onclick="detalleBuzon('${v.id}','${v.numero}',${est},'A')">${v.numero}</a></span>`,
    Sucursal(v.usuario.substr(0,3)),
    v.id,
    v.nombre,
    fCrea,
    montsol,
    montapr,
    estatus,
    alertSegui
  ];
}

function llenarBuzonApoyo(numero,est) {
    $('#lblcedulaApoyo').text(militarActivo.Persona.DatoBasico.cedula);
    var ncompleto = militarActivo.Persona.DatoBasico.nombreprimero + " " + militarActivo.Persona.DatoBasico.apellidoprimero;
    $('#lblnombreApoyo').text(ncompleto);
    $('#lblgradoApoyo').text(militarActivo.Grado.descripcion);
    $('#lblsituacionApoyo').text(Util.ConvertirSitucacion(militarActivo.situacion));
    $('#lblnumeroApoyo').text(numero);
    $('#lblcomponenteApoyo').text(militarActivo.Componente.descripcion);

    var rutaimg = Conn.URLIMG;
    url = rutaimg + militarActivo.Persona.DatoBasico.cedula + ".jpg";
    if (militarActivo.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + militarActivo.Persona.DatoBasico.cedula + "/foto.jpg";
    }
    $("#fotoperfilApoyo").attr("src", url);

    crearTablaConceptosApoyo(numero,est);

    mostrarTextoObservacion(est);

    $('#listasProgramas').hide();
    $('#detalleApoyo').show();
}

function crearTablaConceptosApoyo(numero,est){
    var fila = "";
    var pos = 0;
    var lst = militarActivo.CIS.ServicioMedico.Programa.Apoyo;
    var i = 0;
    $.each(lst, function () {
        if (this.numero == numero) {
            pos = i;
            posicionModificar = i;
        }
        i++;
    });
    copia = lst[pos];
    $("#estSeguimiento").val(copia.Seguimiento.Estatus);

    if(est > 2){
        activarCambioEstatus("apoyo");
    }
    $("#cuerpoEditarConceptosApoyo").html('');
    var mntIPSFA = 0;
    copia.Concepto.forEach(v => {
        var mntApo = 0;
        if(v.DatoFactura.montoaprobado > 0) mntApo = v.DatoFactura.montoaprobado;
        var ffact = Util.ConvertirFechaHumana(v.DatoFactura.fecha);
        var picar = v.afiliado.split("-");
        var picar2 = picar[1].split("(");
        var tam = picar2[1].length;
        var parent = picar2[1].substr(0,tam-1);
        var nombre = picar[0];
        var cedula = picar2[0];
        var fecha = Util.ConvertirFechaHumana(v.DatoFactura.fecha);
        var montoipsfa = parseFloat(v.montosolicitado) - (parseFloat(v.montoaseguradora) + parseFloat(v.montoaportar));
        mntIPSFA += montoipsfa;
        fila = `<tr>
                    <td>${parent}</td>
                    <td>${nombre}</td>
                    <td>${cedula}</td>
                    <td>${v.descripcion}</td>
                    <td>${v.DatoFactura.Beneficiario.rif}</td>
                    <td><input type="text" style="width: 80px" value="${v.DatoFactura.numero}" class="numfact"></td>
                    <td><input type="text" style="width: 80px" class="ffactApoyo" value="${fecha}"></input></td>
                    <td><input type="text" onblur="CalcularMontoApoyo(this,'a')" class="mntsoli"
                        onkeypress="return Util.SoloNumero(event,this,true)" value="${v.DatoFactura.monto}" style="width:80px"/></td>
                    <td><input type="text" onblur="CalcularMontoApoyo(this,'a')"  class="mntacubrir"
                        onkeypress="return Util.SoloNumero(event,this,true)" style="width: 80px" value="${v.montoaseguradora}" /></td>
                    <td><input type="text" style="width: 80px" onblur="CalcularMontoApoyo(this,'a')"  class="mntaseguradora"
                        onkeypress="return Util.SoloNumero(event,this,true)" value="${v.montoaportar}" ></td>
                    <td style="width:50px"><input type="text" value="${montoipsfa}" class="mntAcumulado" style="width:80px" disabled></td>
                    <td style="width: 40px;">
                      <button type="button" class="btn btn-default btn-sm borrarconcepto" title="Eliminar">
                      <i class="fa fa-trash-o" style="color: red;"></i></button>
                    </td>
                </tr>`;
        $("#cuerpoEditarConceptosApoyo").append(fila);
    });

    if( copia.montoaprobado != mntIPSFA ){
      $("#txtPresidenciaApoyo").val(copia.montoaprobado);
    }else{
      $("#txtPresidenciaApoyo").val("0.00");
    }

    $(".borrarconcepto").click(function () {
        $(this).parents('tr').eq(0).remove();
        if ($("#cuerpoEditarConceptosApoyo tr").length == 0) {

        }
        calcularAcumulado("apoyo");
    });
    $(".mntsoli").on("keypress",function(e){
        var key = e.keyCode || e.which;
        if(key == 13){
            CalcularMontoApoyo(this,'a');
        }
    });
    $(".mntacubrir").on("keypress",function(e){
        var key = e.keyCode || e.which;
        if(key == 13){
            CalcularMontoApoyo(this,'a');
        }
    });
    $(".mntaseguradora").on("keypress",function(e){
        var key = e.keyCode || e.which;
        if(key == 13){
            CalcularMontoApoyo(this,'a');
        }
    });


    /**
     * Crear tabla de objservaciones
     */
    if (copia.Seguimiento.Observaciones != undefined) {
        var lstObs = copia.Seguimiento.Observaciones;
        $("#cuerpoObservacionesApoyo").html('');
        $("#cuerpoOpinionesApoyo").html('');
        lstObs.forEach(v => {
            if( v.contenido != undefined){
              tipo = v.contenido.split("|||");
              if(tipo[1] != undefined) {
                $("#cuerpoOpinionesApoyo").append('<tr><td>' + tipo[0] + '</td><td style="width: 10%;text-align: right">'+conviertEstatus(copia.estatus)+'</td></tr>');
              }else{
                $("#cuerpoObservacionesApoyo").append('<tr><td>' + v.contenido + '</td><td style="width: 10%;text-align: right"></td></tr>');
              }
            }
        });
    }
    calcularAcumuladoApoyo("a");
}


function CalcularMontoApoyo(obj, tipo){
    var solicitado = $(obj).parents("tr").eq(0).find("input.mntsoli").val();
    var cubierto = $(obj).parents("tr").eq(0).find("input.mntacubrir").val();
    var asegurado = $(obj).parents("tr").eq(0).find("input.mntaseguradora").val();

    var montoTotal = parseFloat(solicitado) - (parseFloat(cubierto) + parseFloat(asegurado));

    $(obj).parents("tr").eq(0).find("input.mntAcumulado").val(montoTotal.toFixed(2));
    calcularAcumuladoApoyo(tipo);
}

function calcularAcumuladoApoyo(tipo) {
    var idTabla = "";
    var idTotal = "";
    var idTotalSol = "";
    switch(tipo){
        case "r":
          idTabla = "cuerpoEditarConceptos";
          idTotal = "totalapro";
          idTotalSol = "totalter";
          break;
        case "a":
          idTabla = "cuerpoEditarConceptosApoyo";
          idTotal = "totalaproApoyo";
          idTotalSol="totalterApoyo";
          break;
        case "c":
          idTabla = "cuerpoEditarConceptosCarta";
          idTotal = "totalaproCarta";
          idTotalSol="totalterCarta";
          break;
    }

    var acumulado = 0;
    var acumulado2 = 0;
    $("#"+idTabla+" tr").each(function () {
        var mnt = $(this).find("input.mntAcumulado").eq(0).val();
        var sol = $(this).find("input.mntsoli").eq(0).val();
        if(parseFloat(mnt) > parseFloat(sol)){
            $.notify("El  monto aprobado no debe ser mayor al solicitado");
        }
        acumulado2 = parseFloat(acumulado2)+parseFloat(sol);
        acumulado = parseFloat(acumulado) + parseFloat(mnt);
    });
    acumulado = parseFloat(acumulado).toFixed(2);
    acumulado2 = parseFloat(acumulado2).toFixed(2);
    $("#"+idTotal).html(acumulado);
    $("#"+idTotalSol).html(acumulado2);
}








function planillaReembolso(){
    var ventana = window.open("rpt/reembolso/planillaReembolso.html?id="+militarActivo.Persona.DatoBasico.cedula+"&pos="+posicionModificar, "_blank");
}
function planillaApoyo(){
    var ventana = window.open("rpt/apoyo/PlanillaApoyo.html?id="+militarActivo.Persona.DatoBasico.cedula+"&pos="+posicionModificar, "_blank");
}
function puntodecuenta(){
    var ventana = window.open("rpt/apoyo/Puntodecuenta.html?id="+militarActivo.Persona.DatoBasico.cedula+"&pos="+posicionModificar, "_blank");
}

function actualizarApoyo(est) {
    var conceptos = new Array();
    var datos = null;
    var i = 0;
    var montosolicitado = 0;
    var montoaprobado = 0;
    calcularAcumuladoApoyo("a");

    if ($("#cuerpoEditarConceptosApoyo tr").length > 0) {
        $("#cuerpoEditarConceptosApoyo tr").each(function () {
            var concep = new ConceptoApoyo();
            var facturaD = new Factura();
            var ffact = copia.fechacreacion;
            if ($(this).find("input.ffactApoyo").eq(0).val() != "") {
                ffact = new Date(Util.ConvertirFechaUnix($(this).find("input.ffactApoyo").val())).toISOString();
            }
            facturaD.fecha = ffact;
            facturaD.monto = parseFloat($(this).find("input.mntsoli").val());
            facturaD.montoaprobado = parseFloat($(this).find("input.mntAcumulado").val());
            facturaD.numero = $(this).find("input.numfact").val();
            facturaD.control = $(this).find("input.numfact").val();

            facturaD.Beneficiario = copia.Concepto[i].DatoFactura.Beneficiario;
            concep.DatoFactura = facturaD;
            concep.afiliado = copia.Concepto[i].afiliado;
            concep.descripcion = copia.Concepto[i].descripcion;
            concep.montosolicitado = parseFloat($(this).find("input.mntsoli").val());
            concep.montoaseguradora = parseFloat($(this).find("input.mntacubrir").val());
            concep.montoaportar = parseFloat($(this).find("input.mntaseguradora").val());
            montosolicitado += parseFloat($(this).find("input.mntsoli").val());
            montoaprobado += parseFloat($(this).find("input.mntAcumulado").val());
            i++;

            conceptos.push(concep);
        });

        copia.Concepto = conceptos;
    } else {
        $.notify("Debe poseer al menos un concpeto para editar. O puede rechazar el reembolso");
    }

    copia.montoaprobado = montoaprobado;
    copia.montosolicitado = montosolicitado;

    var obseraciones = new Array();
    var tipoObser = "";
    if(copia.estatus > 1) tipoObser = "|||"+copia.estatus;
    if($("#cuerpoObservacionesApoyo tr").length > 0){
        $("#cuerpoObservacionesApoyo tr.agobs").each(function(){
            obseraciones.push($(this).find("td").eq(0).html());
        });
    }
    if($("#cuerpoOpinionesApoyo tr").length > 0){
        $("#cuerpoOpinionesApoyo tr.agobs").each(function(){
            obseraciones.push($(this).find("td").eq(0).html()+tipoObser);
        });
    }
    copia.Seguimiento.Estatus = parseInt($("#estSeguimientoApoyo").val());
    copia.responsable = $("#cmbFondoApoyo option:selected").val();
    if(parseFloat($("#txtPresidenciaApoyo").val()) > 0 ){
      copia.montoaprobado = parseFloat($("#txtPresidenciaApoyo").val());
    }
    datos = {
      id: militarActivo.Persona.DatoBasico.cedula,
      numero: copia.numero,
      Apoyo: copia,
      Posicion:posicionModificar,
      Observaciones:obseraciones
    };

    // console.log(JSON.stringify(datos));

    var urlGuardar = Conn.URL + "wapoyox";
    var request2 = CargarAPI({
        sURL: urlGuardar,
        metodo: 'POST',
        valores: datos,
    });

    request2.then(function(xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if(respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        msjRespuesta(respuesta.msj);
        listaBuzon(copia.estatus);
        volverLista();
    });
}



function validarDetalleReembolso(est){
    switch (est){
        case 0:
            $(".porcentajecalculo").attr("disabled",true);
            $(".mntAcumulado").attr("disabled",true);
            $(".impPlanillaReembolso").hide();
            break;
        case 1:
            $(".porcentajecalculo").attr("disabled",false);
            $(".mntAcumulado").attr("disabled",false);
            $(".impPlanillaReembolso").show();
            break;
        case 2:
            $(".porcentajecalculo").attr("disabled",false);
            $(".mntAcumulado").attr("disabled",false);
            $(".impPlanillaReembolso").show();
            break;
        case 3:
            $(".porcentajecalculo").attr("disabled",false);
            $(".mntAcumulado").attr("disabled",false);
            $(".impPlanillaReembolso").show();
            break;
        case 4:
            $(".porcentajecalculo").attr("disabled",false);
            $(".mntAcumulado").attr("disabled",false);
            $(".impPlanillaReembolso").show();
            break;
        case 5:
            $(".porcentajecalculo").attr("disabled",false);
            $(".mntAcumulado").attr("disabled",false);
            $(".impPlanillaReembolso").show();
            break;
    }
}
