let lstProveedores;

function ActivarBuscar() {
    $(location).attr('href','starter.html');
}

function Buscar(id) {
    if (id != undefined) {
        $("#_cedula").val(id);
    }
    if ($("#_cedula").val() == "") {
        $("#_contenido").html("Debe introducir una cédula");
        $("#_botonesmsj").html('<button type="button" class="btn btn-default" data-dismiss="modal" id="_aceptar" onClick="IrCedula()">Aceptar</button>');
        $("#modMsj").modal("show");
        return false;
    }
    $("#_cargando").show();
    var url = Conn.URL + "militar/crud/" + $("#_cedula").val();
    var promesa = CargarAPI({
        sURL: url,
        metodo: 'GET',
        valores: '',
        Objeto: militar
    });
    promesa.then(function (xhRequest) {

        militar = JSON.parse(xhRequest.responseText);
        ficha();
    });
    var promesaPro = CargarAPI({
        sURL: 'js/proveedores.js',
        metodo: 'GET',
        valores: '',
    });
    promesaPro.then(function (xhRequest) {
        lstProveedores = JSON.parse(xhRequest.responseText);

    });
}

function ficha() {
    $("#_cargando").hide();
    if (militar.Persona != undefined) {
        var ncompleto = militar.Persona.DatoBasico.nombreprimero + " " + militar.Persona.DatoBasico.apellidoprimero;
        $("#lblnombre").text(ncompleto);
        url = "images/grados/" + militar.Grado.abreviatura + ".png";
        url = url.toLowerCase();
        $("#imgrango").attr("src", url);
        var rutaimg = Conn.URLIMG;
        url = rutaimg + $("#_cedula").val() + ".jpg";
        if (militar.Persona.foto != undefined) {
            rutaimg = Conn.URLTEMP;
            url = rutaimg + $("#_cedula").val() + "/foto.jpg";
        }

        $("#fotoperfil").attr("src", url);
        $("#lblcomponente").text(militar.Componente.descripcion);

        $("#lblgrado").text(militar.Grado.descripcion);

        $("#lblcedula").text(militar.Persona.DatoBasico.cedula);
        $("#lblnombrex").text(militar.Persona.DatoBasico.nombreprimero);
        $("#lblapellidox").text(militar.Persona.DatoBasico.apellidoprimero);


        var estcivil = Util.GenerarEstadoCivil(militar.Persona.DatoBasico.estadocivil, militar.Persona.DatoBasico.sexo);

        $("#lblfnacimiento").html(Util.ConvertirFechaHumana(militar.Persona.DatoBasico.fechanacimiento));
        $("#lblestcivil").text(estcivil)
        $("#lblsituacion").text(Util.ConvertirSitucacion(militar.situacion));
        var CIS = militar.CIS;
        if (militar.CIS.Investigacion.FeDeVida != undefined){
          var ffevida = "";
          militar.CIS.Investigacion.FeDeVida.forEach(v => { ffevida = v.fechacreacion; });
          if(ffevida != ""){
            $("#lblfevida").html(Util.ConvertirFechaHumana(ffevida));
          }
        }
        // if(CIS.ServicioMedico.Programa.Reembolso != undefined)$("#_Crm").html(CIS.ServicioMedico.Programa.Reembolso.length);
        // if(CIS.ServicioMedico.Programa.Apoyo != undefined)$("#_Cam").html(CIS.ServicioMedico.Programa.Apoyo.length);
        // if(CIS.ServicioMedico.Programa.CartaAval != undefined)$("#_Cca").html(CIS.ServicioMedico.Programa.CartaAval.length);

        $("#paneldatos").show();
        $("#panelperfil").show();
        $("#opciones").show();
        $("#_bxBuscar").hide();
    } else {
        alert("Cedula no se encuentra registrada como militar dentro del sistema");
        $("#paneldatos").hide();
    }
    historico();
    historicoApoyo();
    historicoCarta();
    historicoBadan();
    historicoFeDeVida();
}

function formatoCombo(state) {
    if (!state.id) {
        return state.text;
    }
    var text = state.text.split("(");
    if (text[1] != undefined) {
        var $state = $(
            '<div class="row"><div class="col-sm-6">' + text[0] + '</div><div class="col-sm-4">(' + text[1] + '</div></div>'
        );
    } else {
        var $state = $(
            '<span>' + state.text + '</span>'
        );
    }

    return $state;
};

/**
* Rechazos del Buzon de los estados del Reembolso
*
* @param {int}
* @param {int}
* @param {string}
* @return void
*/

function HDetalleBuzon(numero, tipo) {

    switch (tipo){
        case "A":
          HCargarBuzonApoyo(numero);
          break;
        case "R":
          HCargarBuzonReembolso(numero);
          break;
        default:
          break;
    }

}

function HCargarBuzonApoyo(numero) {
    $('#lblcedulaApoyo').text(militar.Persona.DatoBasico.cedula);
    var ncompleto = militar.Persona.DatoBasico.nombreprimero.trim() + " " + militar.Persona.DatoBasico.apellidoprimero.trim();
    $('#lblnombreApoyo').text(ncompleto);
    $('#lblgradoApoyo').text(militar.Grado.descripcion);
    $('#lblsituacionApoyo').text(Util.ConvertirSitucacion(militar.situacion));
    $('#lblnumeroApoyo').text(numero);
    $('#lblcomponenteApoyo').text(militar.Componente.descripcion);

    var rutaimg = Conn.URLIMG;
    url = rutaimg + militar.Persona.DatoBasico.cedula + ".jpg";
    if (militar.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + militar.Persona.DatoBasico.cedula + "/foto.jpg";
    }
    $("#fotoperfilApoyo").attr("src", url);

    HCrearTablaConceptosApoyo(numero);
    //
    // mostrarTextoObservacion(est);

    $("#lstDetalleApoyo").show();
    $("#tblTodos").hide();
    $("#panelperfil").hide();
}



function HCrearTablaConceptosApoyo(numero,est){
    var fila = "";
    var pos = 0;
    var lst = militar.CIS.ServicioMedico.Programa.Apoyo;
    var i = 0;
    lst.forEach(v => {
        if (v.numero == numero) {
            pos = i;
            posicionModificar = i;
        }
        i++;
    });
    copia = lst[pos];
    $("#estSeguimiento").val(copia.Seguimiento.Estatus);

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
        var acciones = "";
        if (copia.estatus > 3 ){
          acciones = `<td style="width: 30px;">
               <button type="button" class="btn btn-default btn-sm cerrarcaso"
               title="Cerrar Caso"><i class="fa fa-check-square" style="color: red;"></i></button></td>`
        }
        fila = `<tr>
                    <td>${parent}</td>
                    <td>${nombre}</td>
                    <td>${cedula}</td>
                    <td>${v.descripcion}</td>
                    <td>${v.DatoFactura.Beneficiario.rif}</td>
                    <td>${v.DatoFactura.numero}</td>
                    <td>${fecha}</td>
                    <td style="text-align:right">${v.DatoFactura.monto}</td>
                    <td style="text-align:right">${v.montoaseguradora}</td>
                    <td style="text-align:right">${v.montoaportar}</td>
                    <td style="text-align:right">${montoipsfa}</td>
                    ${acciones}
                </tr>`;
        $("#cuerpoEditarConceptosApoyo").append(fila);
    });

    $("#totalaproApoyo").html(mntIPSFA);
    if( copia.montoaprobado != mntIPSFA ){
      $("#txtPresidenciaApoyo").val(copia.montoaprobado);
    }else{
      $("#txtPresidenciaApoyo").val("0.00");
    }
    $("#cmbFondoApoyo").val(copia.responsable);

    $(".cerrarcaso").click(function () {
        // $(this).parents('tr').eq(0).remove();
        $("#mdlcerrarcaso").modal("show");
        if ($("#cuerpoEditarConceptos tr").length == 0) {

        }
        // calcularAcumulado("r");
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
}


function HCargarBuzonReembolso(numero, est){

    $('#lblcedulaReembolso').text(militar.Persona.DatoBasico.cedula);
    var ncompleto = militar.Persona.DatoBasico.nombreprimero + " " + militar.Persona.DatoBasico.apellidoprimero;
    $('#lblnombre').text(ncompleto);
    $('#lblgradoReembolso').text(militar.Grado.descripcion);
    $('#lblsituacionReembolso').text(Util.ConvertirSitucacion(militar.situacion));
    $('#lblcomponenteReembolso').text(militar.Componente.descripcion);
    $('#lblnumero').text(numero);
    militar.CIS.ServicioMedico.Programa.Reembolso.forEach(v => {

      if(v.numero == numero){
        $("#lblfechasolicitud").html(Util.ConvertirFechaHumana(v.fechacreacion));
      }
    });


    var rutaimg = Conn.URLIMG;
    url = rutaimg + militar.Persona.DatoBasico.cedula + ".jpg";
    if (militar.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + militar.Persona.DatoBasico.cedula + "/foto.jpg";
    }
    $("#fotoperfilReembolso").attr("src", url);
    HCrearTablaConceptosReembolso(numero,est);
    // mostrarTextoObservacion(est);

    $("#lstDetalle").show();
    $("#tblTodos").hide();
    $("#panelperfil").hide();

}


function HCrearTablaConceptosReembolso(numero,est) {
    var fila = "";
    var pos = 0;
    var lst = militar.CIS.ServicioMedico.Programa.Reembolso;
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
        $("#cuerpoEditarConceptos").append(HCargarDetalleConcepto(v, est));
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
    $("#cmbFondoReembolso").val(CReembolso.responsable);

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
}

function HCargarDetalleConcepto(v, est){
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
            <td>${v.DatoFactura.numero}</td>
            <td style="display: none">${v.DatoFactura.Beneficiario.rif}</td>
            <td style="display: none">${v.DatoFactura.Beneficiario.razonsocial}></td>
            <td>${fecha}</td>
            <td style="text-align:right">${montosolic}</td>
            <td>${porcentaje}</td>
           <td style="text-align:right">${mntApo}</td>
        </tr>`;

}



function cargaPrograma(tipo) {
    switch (tipo) {
        case "r":
            CargarUrl("modalgeneral", "inc/modals");
            CargarUrl("panelregistro", "inc/crearReembolso");
            titulos("reembolso")
            break;
        case "a":
            CargarUrl("modalgeneral", "inc/modalsapoyo");
            CargarUrl("panelregistro", "inc/crearApoyoEconomico");
            titulos("Apoyo <br> Economico");
            break;
        case "pen":
            CargarUrl("modalgeneral", "inc/modals");
            CargarUrl("panelregistro", "inc/crearPension");
            titulos("Pension");
            break;
        case "far":
            CargarUrl("modalgeneral", "inc/modalsfarmacia");
            CargarUrl("panelregistro", "inc/crearFarmacia");
            titulos("Tto. <br> Prolongado");
            break;
        case "equipo":
            CargarUrl("modalgeneral", "inc/modalsequipos");
            CargarUrl("panelregistro", "inc/crearEquipos");
            titulos("Prestamo <br> de Equipo");
            break;
        case "fdv":
            //CargarUrl("modalgeneral", "inc/modalsfdv");
            // CargarUrl("panelentrada", "inc/opcionesFedeVida");
            CargarUrl("panelregistro", "inc/crearFedeVida");
            titulos("Fe de Vida");
            break;
        case "ca":
            CargarUrl("modalgeneral", "inc/modalscarta");
            CargarUrl("panelregistro", "inc/crearCartaAval");
            titulos("Carta Aval");
            break;
        case "badan":
            CargarUrl("modalgeneral", "inc/modalsmedicina");
            CargarUrl("panelregistro", "inc/crearMedicinaAltoCosto");
            titulos("Medicina <br> Alto Costo");
            break;
    }
    $("#opciones").hide();
    $("#panelentrada").show();
}

function titulos(t) {
    $(".lbltituloopt").html(t);
}

function verificarNuevo(val) {

    if(militar.CIS.ServicioMedico.Programa.Apoyo != undefined){
        apoyo = militar.CIS.ServicioMedico.Programa.Apoyo;
        var icant = 0;
        apoyo.forEach(v => {
            if (apoyo.estatus != 8){
              icant++;
            }
        });
        if(icant > 0 ){
          $.notify("Este afiliado tiene apoyos pendientes por culminar.", "error");
        }
    }
    if (val == false || $(".lbltituloopt").html() == "Fe de Vida") {
      crearPrograma();
    } else {
      $("#requisitos").modal("show");
    }
}

function verificaCheckModal(mdl, btn) {
    var falta = false;
    $("#" + mdl + " :input[type=checkbox]").each(function () {
        if ($(this)[0].checked == false) {
            falta = true;
        }
    });
    if (falta == true) {
        $("#" + mdl + " button.btnrequisitos").attr("disabled", true);
        $("#" + btn).attr("disabled", true);
    } else {
        $("#" + mdl + " button.btnrequisitos").attr("disabled", false);
        $("#" + btn).attr("disabled", false);
    }
}

function inactivarCheck(mdl) {
    $("#" + mdl + " :input[type=checkbox]").each(function () {
        $(this)[0].checked = false;
        $("#" + mdl + " button.btnrequisitos").attr("disabled", true);
    });
    $("#" + mdl).modal("hide");
}

function crearPrograma() {
    $("#panellista").hide();
    $("#paneldatos").show();
    $("#panelentrada").hide();
    $("#panelregistro").show();
}

function verPrograma() {
    $("#panelregistro").hide();
    $("#paneldatos").show();
    $("#panelentrada").hide();
    $("#panellista").show();
    $("#panelperfil").hide();
}

function imprimirrecibore(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.Reembolso.length;
        pos--;
    }
    var ventana = window.open("rpt/reembolso/reciboReembolso.html?id=" + militar.Persona.DatoBasico.cedula + "&pos=" + pos, "_blank");
}

function imprimirreciboapo(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.Apoyo.length;
        pos--;
    }
    var ventana = window.open("rpt/apoyo/reciboApoyo.html?id=" + militar.Persona.DatoBasico.cedula +"&pos="+ pos, "_blank");
}

function imprimirrecibocarta(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.CartaAval.length;
        pos--;
    }
    var idm = militar.Persona.DatoBasico.cedula;
    var ventana = window.open("rpt/carta/cartaAval.html?id="+idm + "&pos=" +pos , "_blank");
}


function historico() {

    $("#historicoReembolso").html(`<thead>
         <tr class="bg-info">
          <td class="pbuscar">#Reembolso</td>
          <td>F. Solicitud</td>
          <td class="pbuscar">Facturas</td>
          <td>Monto Sol.</td>
          <td>Monto Apro.</td>
          <td>Estado</td>
         </tr>
        </thead>
        <tbody id="cuerporeembolsos">
        </tbody>`);

    var t = $('#historicoReembolso').DataTable({
        destroy: true,
        'paging': false,
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
    });
    t.clear().draw();

    if (militar.CIS.ServicioMedico.Programa.Reembolso != undefined && militar.CIS.ServicioMedico.Programa.Reembolso.length > 0) {
        var html = "";
        var i = 0;
        militar.CIS.ServicioMedico.Programa.Reembolso.forEach( v => {
            var est = conviertEstatus(v.estatus);
            var fcrea = Util.ConvertirFechaHumana(v.fechacreacion, true);
            var listaFact = "";
            var nfac = v.Concepto[0].DatoFactura.numero;
            if (v.Concepto[0].DatoFactura.numero == "") {
                nfac = "Sin factura";
            }
            if (v.Concepto.length > 1) {
                listaFact =  `<div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button"
                      id="dropdownMenu${i}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${nfac}
                      <span class="fa fa-plus"></span>
                    </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu${i}">`;
                v.Concepto.forEach( w => {
                    var nfac2 = w.DatoFactura.numero;
                    if (nfac2 == "") nfac2 = "Sin Factura"
                    listaFact += `<li class='bg-info'>${nfac2}</li>`;
                });
                listaFact += "</ul></div>";
            } else {
                listaFact = nfac;
            }

            t.row.add([
                `<a href='#cuerpoLstConceptos' onclick="HDetalleBuzon('${v.numero}', 'R')">${v.numero}</a>
                  <button type='button' class='btn btn-default btn-sm pull-right'
                    onclick="imprimirrecibore(${i})"><i class='fa fa-print'></i></button>`,
                `<b>${fcrea}</b>`,
                listaFact,
                numeral(parseFloat(v.montosolicitado)).format('0,0[.]00 $'),
                numeral(parseFloat(v.montoaprobado)).format('0,0[.]00 $'),
                est
            ]).draw(false);
            i++;
        });
        $('#historicoReembolso thead td.pbuscar').each(function () {
            var title = $(this).text();
            $(this).html(title + '<br><input class="form-group" type="text" placeholder="Buscar" />');
        });
        t.columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    }

}

function detalleVisible(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.Reembolso.length;
        pos--;
    }

    var re = militar.CIS.ServicioMedico.Programa.Reembolso[pos];
    $("#lbldetnumero").text(re.numero);
    $("#lblfechasoli").text(Util.ConvertirFechaHumana(re.fechacreacion));

    var tconcepto = ``;
    $.each(militar.CIS.ServicioMedico.Programa.Reembolso[pos].Concepto, function () {
        var ffact = Util.ConvertirFechaHumana(this.DatoFactura.fecha);
        tconcepto += "<tr><td>" + this.afiliado + "</td><td>" + this.descripcion + "</td><td>" + this.DatoFactura.Beneficiario.rif + "|" + this.DatoFactura.Beneficiario.razonsocial + "</td> " +
            "<td>" + this.DatoFactura.numero + "</td><td>" + ffact + "</td><td>" + numeral(parseFloat(this.DatoFactura.monto)).format('0,0[.]00 $') + "</td></tr>";
    })
    tconcepto += "</table>";
    $("#cuerpoLstConceptos").html(tconcepto);
    $("#lstDetalle").show();
    $("#tblTodos").hide();
}


function historicoApoyo() {
    $("#historicoApoyos").html(`<thead>
          <tr class="bg-info">
            <td class="pbuscar">#Apoyo</td>
            <td>F. Solicitud</td>
            <td class="pbuscar">Factura</td>
            <td style="width: 20%">Monto a Cubrir por el IPSFA.<td>Estado</td>
          </tr>
          </thead>
          <tbody id="cuerporeembolsos">
          </tbody>`);

    var t = $('#historicoApoyos').DataTable({
        destroy: true,
        'paging': false,
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
    });
    t.clear().draw();


    if (militar.CIS.ServicioMedico.Programa.Apoyo != undefined && militar.CIS.ServicioMedico.Programa.Apoyo.length > 0) {
        var html = "";
        var i = 0;
        $.each(militar.CIS.ServicioMedico.Programa.Apoyo, function (v, ob) {
            var est = conviertEstatus(this.estatus);
            var fcrea = Util.ConvertirFechaHumana(this.fechacreacion, true);
            var listaFact = "";
            var nfac = this.Concepto[0].DatoFactura.numero;
            if (this.Concepto[0].DatoFactura.numero == "") {
                nfac = "Sin factura";
            }
            if (this.Concepto.length > 1) {
                listaFact = `<div class="dropdown">
                    <button class="btn btn-default dropdown-toggle"
                      type="button" id="dropdownMenu${i}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${nfac}
                      <span class="fa fa-plus"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu${i}">`;
                $.each(this.Concepto, function () {
                    var nfac2 = this.DatoFactura.numero;
                    if (nfac2 == "") nfac2 = "Sin Factura"
                    listaFact += "<li class='bg-info'>" + nfac2 + "</li>";
                });
                listaFact += "</ul></div>";
            } else {
                listaFact = nfac;
            }
            t.row.add([
                `<a href='#cuerpoLstConceptos' onclick="HDetalleBuzon('${this.numero}','A')">${this.numero}</a>
                  <button type='button' class='btn btn-default btn-sm pull-right'
                    onclick="imprimirreciboapo(${i})"><i class='fa fa-print'></i>
                  </button>`, //1
                  `<b>${fcrea}</b>`,
                  listaFact,
                  numeral(parseFloat(this.montosolicitado)).format('0,0[.]00 $'),
                  est
            ]).draw(false);
            i++;
        });
        $('#historicoApoyo thead td.pbuscar').each(function () {
            var title = $(this).text();
            $(this).html(title + '<br><input class="form-group" type="text" placeholder="Buscar" />');
        });
        t.columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    }
}

function detalleVisibleApoyo(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.Apoyo.length;
        pos--;
    }

    var apo = militar.CIS.ServicioMedico.Programa.Apoyo[pos];
    $("#lbldetnumeroApoyo").text(apo.numero);
    var tconcepto = ``;
    $.each(militar.CIS.ServicioMedico.Programa.Apoyo[pos].Concepto, function () {

        var ffact = Util.ConvertirFechaHumana(this.DatoFactura.fecha);
        tconcepto += "<tr><td>" + this.afiliado + "</td><td>" + this.descripcion + "</td><td>" + this.DatoFactura.Beneficiario.rif + "|" + this.DatoFactura.Beneficiario.razonsocial + "</td> " +
            "<td>" + this.DatoFactura.numero + "</td><td>" + ffact + "</td><td>" + numeral(parseFloat(this.DatoFactura.monto)).format('0,0[.]00 $') + "</td>" +
            "<td>" + numeral(parseFloat(this.montoaseguradora)).format('0,0[.]00 $') + "</td><td>" + numeral(parseFloat(this.montoaportar)).format('0,0[.]00 $') + "</td>" +
            "<td>" + numeral(parseFloat(apo.montosolicitado)).format('0,0[.]00 $') + "</td></tr>";
    })
    tconcepto += "</table>";
    $("#cuerpoLstConceptosApoyo").html(tconcepto);
    $("#lstDetalleApoyo").show();
    $("#tblTodos").hide();
    $("#panelperfil").hide();
}

function historicoCarta() {
    $("#historicoCartas").html(`<thead>
        <tr class="bg-info">
          <td class="pbuscar">#Carta</td>
          <td>F. Solicitud</td>
          <td class="pbuscar">N° Presupuesto</td>
          <td style="width: 20%">Monto a cubrir el IPSFA</td>
          <td>Estado</td></tr>
        </thead>
        <tbody id="cuerpocartas">
        </tbody>`);

    var t = $('#historicoCartas').DataTable({
        destroy: true,
        'paging': false,
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
    });
    t.clear().draw();


    if (militar.CIS.ServicioMedico.Programa.CartaAval != undefined && militar.CIS.ServicioMedico.Programa.CartaAval.length > 0) {
        var html = "";
        var i = 0;
        $.each(militar.CIS.ServicioMedico.Programa.CartaAval, function (v, ob) {
            var est = conviertEstatus(this.estatus);
            var fcrea = Util.ConvertirFechaHumana(this.fechacreacion, true);
            var listaFact = "";
            var nfac = this.Concepto[0].numeropresupuesto;
            if (this.Concepto[0].numeropresupuesto == "") {
                nfac = "Sin factura";
            }
            if (this.Concepto.length > 1) {
                listaFact = "<div class=\"dropdown\">\n" +
                    "            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu" + i + "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
                    "            " + nfac +
                    "            <span class=\"fa fa-plus\"></span>\n" +
                    "            </button>\n" +
                    "            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu" + i + "\">";
                $.each(this.Concepto, function () {

                    var nfac2 = this.numeropresupuesto;
                    if (nfac2 == "") nfac2 = "Sin Factura"
                    listaFact += "<li class='bg-info'>" + nfac2 + "</li>";
                });
                listaFact += "</ul></div>";
            } else {
                listaFact = nfac;
            }
            t.row.add([
                "<a href='#cuerpoLstConceptos' onclick=\"detalleVisibleCarta(" + i + ")\">" + this.numero + "</a>" +
                "<button type='button' class='btn btn-default btn-sm pull-right' onclick=\"imprimirrecibocarta(" + i + ")\">" + "<i class='fa fa-print'>" + "</i>" + "</button>", //1
                "<b>" + fcrea + "</b>",
                listaFact,
                numeral(parseFloat(this.montosolicitado)).format('0,0[.]00 $'),
                est
            ]).draw(false);
            i++;
        });
        $('#historicoCarta thead td.pbuscar').each(function () {
            var title = $(this).text();
            $(this).html(title + '<br><input class="form-group" type="text" placeholder="Buscar" />');
        });
        t.columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    }
}

function detalleVisibleCarta(pos) {
    if (pos == null) {
        pos = militar.CIS.ServicioMedico.Programa.CartaAval.length;
        pos--;
    }

    var car = militar.CIS.ServicioMedico.Programa.CartaAval[pos];
    $("#lbldetnumeroCarta").text(car.numero);
    var tconcepto = ``;
    $.each(militar.CIS.ServicioMedico.Programa.CartaAval[pos].Concepto, function () {
        var ffact = Util.ConvertirFechaHumana(this.fechapresupuesto);
        tconcepto += "<tr><td>" + this.afiliado + "</td><td>" + this.motivo + "</td><td>" + this.DatoFactura.Beneficiario.rif + "|" + this.DatoFactura.Beneficiario.razonsocial + "</td> " +
            "<td>" + this.numeropresupuesto + "</td><td>" + ffact + "</td><td>" + this.montopresupuesto + "</td><td>" + this.montoseguro + "</td><td>" + car.montosolicitado + "</td></tr>";

    })
    tconcepto += "</table>";
    $("#cuerpoLstConceptosCarta").html(tconcepto);
    $("#lstDetalleCarta").show();
    $("#tblTodos").hide();
}


function historicoBadan() {
    $("#historicoBadan").html(`<thead>
          <tr class="bg-info">
            <td class="pbuscar">#Solicitud</td>
            <td class="pbuscar">Fecha Solicitud</td>
            <td class="pbuscar">Afiliado</td>
          </tr>
          </thead>
          <tbody id="cuerpoBadan">
          </tbody>`);

    var t = $('#historicoBadan').DataTable({
        destroy: true,
        'paging': false,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': false,
        'autoWidth': false,
        "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
        "bStateSave": true,
        "order": [[1, "desc"]],
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
    });
    t.clear().draw();
    if (militar.CIS.Gasto.MedicinaAltoCosto != undefined && militar.CIS.Gasto.MedicinaAltoCosto.length > 0) {
        var i = 0;
        militar.CIS.Gasto.MedicinaAltoCosto.forEach(v => {
            var fcrea = Util.ConvertirFechaHumana(v.fecha);
            t.row.add([
              `<a href='#FeDeVida' onclick="detalleVisibleBadan(${i})">${v.numero}</a>
                <button type='button' class='btn btn-default btn-sm pull-right'
                  onclick="ImprimirBadanFRM('${militar.id}','${v.idf}','${v.numero}')"><i class='fa fa-print'></i></button>`,
                `<a href='#Badan' onclick="detalleVisibleBadan(${i})">${fcrea}</a>`,
                v.afiliado
            ]).draw(false);
            i++;
        });

    }
}


function ImprimirBadanFRM(id, idf, num){
  var ventana = window.open("rpt/medicina/medicinaAltoCosto.html?id=" + id + "&idf=" + idf + "&num=" + num, "_blank");
}

function detalleVisibleBadan(pos) {
  if (pos == null) {
      pos = militar.CIS.Gasto.MedicinaAltoCosto.length;
      pos--;
  }
  var badan = militar.CIS.Gasto.MedicinaAltoCosto[pos];
  $("#lblfechasolibadan").text(Util.ConvertirFechaHumana(badan.fecha));

  var tconcepto = ``;
  badan.Medicina.forEach(v => {
    var fi = Util.ConvertirFechaHumana(v.fechainicio);
    var ff = Util.ConvertirFechaHumana(v.fechavencimiento);
    var ncomercial = v.nombrecomercial.toUpperCase();
    tconcepto += `<tr>
        <td>${ncomercial}</td>
        <td>${v.presentacion}</td>
        <td>${v.dosis}</td>
        <td>${v.cantidad}</td>
        <td>${fi}</td>
        <td>${ff}</td></tr>`;
  });

  tconcepto += "</table>";
  $("#cuerpoLstBadan").html(tconcepto);
  $("#lstDetalleBadan").show();
  $("#tblTodos").hide();
}



function historicoFeDeVida() {
    $("#historicoFeDeVida").html(`<thead>
          <tr class="bg-info">
            <td>#Fe De Vida</td>
            <td>Cédula</td>
            <td class="pbuscar">Afiliado</td>
            <td>Fecha Creación</td>
          </tr>
          </thead>
          <tbody id="cuerpoFe">
          </tbody>`);

    var t = $('#historicoFeDeVida').DataTable({
        destroy: true,
        'paging': false,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': false,
        'autoWidth': false,
        "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
        "bStateSave": true,
        "order": [[1, "desc"]],
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
    });
    t.clear().draw();


    if (militar.CIS.Investigacion.FeDeVida != undefined && militar.CIS.Investigacion.FeDeVida.length > 0) {
        var i = 0;

        militar.CIS.Investigacion.FeDeVida.forEach(v => {
            var fcrea = Util.ConvertirFechaHumana(v.fechacreacion);
            t.row.add([
              `<a href='#FeDeVida' onclick="detalleVisibleFeDeVida(${i})">${v.numero}</a>
                <button type='button' class='btn btn-default btn-sm pull-right'
                  onclick="ImprimirFeDeVidaFRM('${militar.id}','${v.idf}','${v.numero}')"><i class='fa fa-print'></i></button>`,
                v.DatoBasico.Cedula,
                fcrea,
                v.DatoBasico.NombreCompleto
            ]).draw(false);
            i++;
        });

    }

}


function detalleVisibleFeDeVida(pos) {
  if (pos == null) {
      pos = militar.CIS.Investigacion.FeDeVida.length;
      pos--;
  }
  var fe = militar.CIS.Investigacion.FeDeVida[pos];
  $("#lbldetnumerofe").text(fe.numero);
  $("#lblfechasolife").text(Util.ConvertirFechaHumana(fe.fechacreacion));

  var tconcepto = ``;

  tconcepto += `<tr>
      <td>${fe.DatoBasico.Cedula}</td>
      <td>${fe.DatoBasico.NombreCompleto}</td>`;

  tconcepto += "</table>";
  $("#cuerpoLstFe").html(tconcepto);
  $("#lstDetalleFe").show();
  $("#tblTodos").hide();
}

function ImprimirFeDeVidaFRM(id, idf, num){
  var ventana = window.open("rpt/fe/FedeVidaSobre.html?id="+id+"&idf="+idf+"&num="+num, "_blank");
}




function VerCambiarClave(){
    $("#modCambiarClaveUsuario").modal("show");
}

function cambiarClave(){
    var clave = new Clave();
    if (Util.ValidarFormulario("formcusuario") == false) {
        Util.MensajeFormulario("formcusuario","msjcambio");
    }else{
        clave.Salvar();
    }
}
