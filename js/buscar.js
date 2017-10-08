let lstProveedores;

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


        var estcivil = Util.GenerarEstadoCivil(militar.Persona.DatoBasico.estadocivil, militar.Persona.DatoBasico.sexo);

        $("#lblfnacimiento").html(Util.ConvertirFechaHumana(militar.Persona.DatoBasico.fechanacimiento));
        $("#lblestcivil").text(estcivil)
        $("#lblsituacion").text(Util.ConvertirSitucacion(militar.situacion));

        if (militar.CIS.Investigacion.FeDeVida != undefined){
          var ffevida = "";
          militar.CIS.Investigacion.FeDeVida.forEach(v => { ffevida = v.fechacreacion; });
          if(ffevida != ""){
            $("#lblfevida").html(Util.ConvertirFechaHumana(ffevida));
          }
        }

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
            CargarUrl("panelentrada", "inc/opcionesFedeVida");
            CargarUrl("modalgeneral", "inc/modals");
            CargarUrl("panelregistro", "inc/crearFedeVida");
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
    if (val == false) {
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
                `<a href='#cuerpoLstConceptos' onclick="detalleVisible(${i})">${v.numero}</a>
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
                `<a href='#cuerpoLstConceptos' onclick="detalleVisibleApoyo(${i})">${this.numero}</a>
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
                `<a href='#Badan' onclick="detalleVisibleBadan(${i})">${fcrea}</a>`,
                v.afiliado
            ]).draw(false);
            i++;
        });

    }
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
                `<a href='#FeDeVida' onclick="detalleVisibleFeDeVida(${i})">${v.numero}</a>`,
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
