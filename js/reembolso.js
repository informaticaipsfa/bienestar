

$(function () {
    $("#rif").on("blur", function () {
        consultarRif();
    });
    $("#concepto").select2();

    $(".mdl-requisitos").on("change", function () {
        verificaCheckModal("requisitos", "btnAgconcepto");
    });

    $(".mdl-requisitos0").on("change", function () {
        verificaCheckModal("requisitostratamiento", "btnAgconcepto");
    });
    
    $(".mdl-requisitos2").on("change", function () {
        verificaCheckModal("requisitosconsultas", "btnAgconcepto");
    });
    $(".mdl-requisitos3").on("change", function () {
        verificaCheckModal("requisitosortopedia", "btnAgconcepto");
    });
    $(".mdl-requisitos4").on("change", function () {
        verificaCheckModal("requisitosmedicos", "btnAgconcepto");
    });
    
    $(".mdl-requisitos6").on("change", function () {
        verificaCheckModal("requisitosgeriatrico", "btnAgconcepto");
    });
    $(".mdl-requisitos7").on("change", function () {
        verificaCheckModal("requisitoshosp", "btnAgconcepto");
    });
    $(".mdl-requisitos9").on("change", function () {
        verificaCheckModal("requisitoslentes", "btnAgconcepto");
    });
    $(".mdl-requisitos10").on("change", function () {
        verificaCheckModal("requisitosintervencion", "btnAgconcepto");
    });
    $(".mdl-requisitos11").on("change", function () {
        verificaCheckModal("requisitofunerario", "btnAgconcepto");
    });
    $(".mdl-requisitos12").on("change", function () {
        verificaCheckModal("requisitoshospitalizacion", "btnAgconcepto");
    });
    $(".mdl-requisitos13").on("change", function () {
        verificaCheckModal("requisitospsicopedagogico", "btnAgconcepto");
    });


    llenarReembolso();
    $(".btnvolverentradar").click(function () {
        $("#mdldesea").modal("show");
        $("#btnsalir").click(function () {
            $("#opciones").hide();
            $("#panelentrada").show();
            $("#panellista").hide();
            $("#panelregistro").hide();
            $('#mdldesea').modal('hide');
            limpiarReembolso();
            limpiarmdlempresa();
            limpiarReembolso2()
            $("#rifnuevo").remove();
            $("#sefue").remove();
            $("#conceptoagregado").parents('tr').eq(0).remove();
                $("#cajaConceptos").slideUp();
        });
    });
    $(".btncancelare").click(function () {
        limpiarmdlempresa();
        $("#rifnuevo").remove();
        $("#sefue").remove();
    });
    $(".close").click(function () {
        limpiarmdlempresa();
        $("#rifnuevo").remove();
        $("#sefue").remove();
    });
    $(".btnguardar").click(function () {
        limpiarmdlempresa();
        $("#rifnuevo").remove();
        $("#sefue").remove();
    });
});

function consultarRif() {
    var rif = $("#rif").val();
    var rz = '';
    var encontrado = 0;
    lstProveedores.forEach( v => {
        if (v.rif == rif) {
        rz = v.razonsocial;
        encontrado = 1;
    }
});
    if (encontrado == 1) {
        $("#razonsocial").val(rz);
    } else {
        $("#mdlEmpresa").modal("show");
        var modalemp = "";
        modalemp = `<label id="sefue">Rif:</label>\n<input class="form-control" id="rifnuevo" value="${rif}" required="required">`;
        $("#rifnuevo2").append(modalemp);
    }
}

function salvarEmpresa() {
    var rifn = $("#rifnuevo").val();
    var rznuevo = $("#rsocialnuevo").val();
    var tenuevo = $("#tipoenuevo").val();
    var direc = $("#direcnueva").val();
    if (rifn == "" || rznuevo == "" || tenuevo == "S" || direc == "") {
        $.notify("Debe ingresar todos los datos de la empresa a registrar");
        return false;
    }
    $.notify("Proceso de registro pendiente");
    $("#rif").val(rifn);
    $("#razonsocial").val(rznuevo);
    limpiarmdlempresa();
    $("#rifnuevo").remove();
    $("#sefue").remove();
    $("#mdlEmpresa").modal('hide');
}

function llenarReembolso() {

    $("#datosbancarios").html('<option selected="selected" value="S"></option>');

    $("#_cargando").hide();
    if (militar.Persona != undefined) {
        var ncompleto = militar.Persona.DatoBasico.nombreprimero + " " + militar.Persona.DatoBasico.apellidoprimero;
        $("#txtnombre").val(militar.Persona.DatoBasico.nombreprimero);
        $("#txtapellido").val(militar.Persona.DatoBasico.apellidoprimero);
        $("#ttnombre").text(ncompleto);
        $("#cmbcomponente").val(militar.Componente.descripcion);
        $("#ttcomponente").text(militar.Componente.descripcion);

        $("#cmbgrado").val(militar.Grado.descripcion)
        $("#ttgrado").text(militar.Grado.descripcion);

        $("#txtcedula").val(militar.Persona.DatoBasico.cedula);
        $("#ttcedula").text(militar.Persona.DatoBasico.cedula);

        crearLista();

        var estcivil = Util.GenerarEstadoCivil(militar.Persona.DatoBasico.estadocivil, militar.Persona.DatoBasico.sexo);

        $("#cmbedocivil").val(estcivil);
        $("#ttestadocivil").text(estcivil);

        $("#cmbsituacion").val(militar.situacion);
        $("#ttsituacion").text(Util.ConvertirSitucacion(militar.situacion));

        if (militar.Persona.Telefono != undefined) {
            $("#txtmtelefono").val(militar.Persona.Telefono.domiciliario);
            $("#txtmcelular").val(militar.Persona.Telefono.movil);
            $("#txtmcorreo").val(militar.Persona.Correo.principal);
        }

        if (militar.Persona.DatoFinanciero != undefined) {
            $("#txtmnrocuenta").val(militar.Persona.DatoFinanciero.cuenta);
            $("#cmbminstfinanciera").val(militar.Persona.DatoFinanciero.institucion);
            $("#cmbmtipofinanciera").val(militar.Persona.DatoFinanciero.tipo);
            listaCuentas();
        }else{
          $("#datosbancarios").append(new Option("OTRA", "otra", true, true));
        }
        Estados.ObtenerEstados();
        if (militar.Persona.Direccion != undefined) {
            var DIR = militar.Persona.Direccion[0];

            $("#cmbmestado").val(DIR.estado);
            $("#cmbmmunicipio").html(`<option selected="selected" value="${DIR.municipio}">${DIR.municipio}</option>`);
            $("#cmbmparroquia").html(`<option selected="selected" value="${DIR.parroquia}">${DIR.parroquia}</option>`);
            $("#cmbmciudad").html(`<option selected="selected" value="${DIR.ciudad}">${DIR.ciudad}</option>`);
            $("#txtmcalle").val(DIR.calleavenida);
            $("#txtmcasa").val(DIR.casa);
            $("#txtmapto").val(DIR.apartamento);
        }
    } else {
        alert("Cedula no se encuentra registrada como militar dentro del sistema");
        $("#paneldatos").hide();
    }

}

function listaCuentas() {
    $("#datosbancarios").html("");
    $.each(militar.Persona.DatoFinanciero, function () {
        if(this.institucion != "0003"){
          $("#datosbancarios").append(new Option(this.cuenta, this.cuenta + "|" + this.institucion + "|" + this.tipo, true, true));
        }
    });

    if(militar.Fideicomiso.cuentabancaria != undefined && militar.Fideicomiso.cuentabancaria != ""){
      var descripcioncuenta = militar.Fideicomiso.cuentabancaria.substring(0, 4);
      $("#datosbancarios").append(new Option(militar.Fideicomiso.cuentabancaria, militar.Fideicomiso.cuentabancaria + "|" + descripcioncuenta + "|CA", true, true));
    }
    if(militar.Pension.DatoFinanciero.cuenta != undefined && militar.Pension.DatoFinanciero.cuenta != ""){
      var cuenta = militar.Pension.DatoFinanciero.cuenta;
      var descripcioncuenta = cuenta.substring(0, 4);
      var tipo = militar.Pension.DatoFinanciero.tipo;
      $("#datosbancarios").append(new Option(cuenta, cuenta + "|" + descripcioncuenta + "|" + tipo, true, true));
    }

    $("#datosbancarios").append(new Option("OTRA", "otra", true, true));
    $("#datosbancarios").append(new Option("Selecione", "", true, true));
}

function crearLista() {
    $("#cmbbeneficiario").append(new Option(militar.Persona.DatoBasico.nombreprimero.trim() + " " + militar.Persona.DatoBasico.apellidoprimero.trim()  + " (MILITAR)", "T|" + militar.Persona.DatoBasico.cedula, true, true));
    var ncompleto = militar.Persona.DatoBasico.nombreprimero.trim() + " " + militar.Persona.DatoBasico.apellidoprimero.trim();
    $("#depositar").append(new Option(ncompleto, militar.Persona.DatoBasico.cedula, true, true));
    if (militar.Familiar.length > 0) {
        var iposicion = 0;
        militar.Familiar.forEach(v => {
          var edad = Util.CalcularEdad(Util.ConvertirFechaHumana(v.Persona.DatoBasico.fechanacimiento));
          var ncompleto2 = v.Persona.DatoBasico.nombreprimero.trim() + " " + v.Persona.DatoBasico.apellidoprimero.trim();
          if (edad > 18) {
              $("#depositar").append(new Option(ncompleto2, iposicion + "|" + v.Persona.DatoBasico.cedula, false, false));
          }
          var parentes = Util.ConvertirParentesco(v.parentesco, v.Persona.DatoBasico.sexo);
          $("#cmbbeneficiario").append(new Option(ncompleto2 + "(" + parentes + ")", iposicion + "|" + v.Persona.DatoBasico.cedula, true, true));
          iposicion++;
        });
    }
    $("#depositar").append(new Option("Seleccione", "", true, true));

    $('#cmbbeneficiario').val("S").trigger('change');
    $('#concepto').val("S").trigger('change')

    $("#cmbbeneficiario").on("change", function () {
        var opt = $("#cmbbeneficiario option:selected").val();
        var picado = $("#cmbbeneficiario option:selected").val().split("|");

        if (opt != '|seleccione' && picado[0] != "T" && picado[0] != "S") {
            cargarFamiliar(picado[0]);
            $("#perfilFamiliar").show();
        } else {
            $("#perfilFamiliar").hide();
        }
    });

    $("#cmbbeneficiario").select2({
        templateResult: formatoCombo
    });


}

function cedulaDepositar() {
    var ced = $("#depositar").val();
    $("#cibancario").val(ced);
}

function cargarFamiliar(pos) {
    var fami = militar.Familiar[pos];
    var rutaimg = Conn.URLIMG;
    url = rutaimg + fami.Persona.DatoBasico.cedula + ".jpg";
    if (fami.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + $("#_cedula").val() + "/foto"  + fami.Persona.DatoBasico.cedula  + ".jpg";
    }
    $("#fotoperfilf").attr("src", url);

    $("#lblcedulaf").text(fami.Persona.DatoBasico.cedula);
    var ncf = fami.Persona.DatoBasico.nombreprimero + " " + fami.Persona.DatoBasico.apellidoprimero;
    $("#lblnombref").text(ncf);
    var parente = Util.ConvertirParentesco(fami.parentesco, fami.Persona.DatoBasico.sexo)
    $("#lblparentesco").text(parente);
    var fnac = Util.ConvertirFechaHumana(fami.Persona.DatoBasico.fechanacimiento);
    $("#lblfnac").text(fnac)
}

function agregarConcepto() {
    if (Util.ValidarFormulario("frmreembolso", "btnAgconcepto")) {
        var bene = $("#cmbbeneficiario option:selected").val().split('|');
        var beneficiario = bene[1] + "-" + $("#cmbbeneficiario option:selected").text();
        var concepto = $("#concepto option:selected").text();
        var monto = $("#txtmonto").val();
        var rif = $("#rif").val();
        var razon = $("#razonsocial").val();
        var factura = $("#nfactura").val();
        var fechaf = $("#fechafactura").val();
        var tabla = $("#conceptoagregado");
        var btndelete = "<button class='btn btn-danger borrarconcepto'><i class='glyphicon glyphicon-remove'></i></button>";
        var html = `<tr>
            <td>${beneficiario}</td>
            <td>${concepto}</td>
            <td class="detfactconcep">${rif}</td>
            <td class="detfactconcep">${razon}</td>
            <td>${factura}</td>
            <td class="mntAcumulado">${monto}</td>
            <td class="detfactconcep">${fechaf}</td>
            <td>${btndelete}</td>
          </tr>`;
        tabla.append(html);

        $(".borrarconcepto").click(function () {
            $(this).parents('tr').eq(0).remove();
            if ($("#conceptoagregado tr").length == 0) {
                $("#cajaConceptos").slideUp();
            }
            calcularAcumulado();
        });

        calcularAcumulado();
        $.notify("Se ha agregado el concepto", "success");
        $("#cajaConceptos").slideDown("slow");
        $('#cmbbeneficiario').val("S").trigger('change');
        $('#concepto').val("S").trigger('change');
        limpiarReembolso();
    }
    return false;
}

function calcularAcumulado() {
    var acumulado = 0;
    $("#conceptoagregado tr").each(function () {
        var mnt = $(this).find("td.mntAcumulado").eq(0).html();
        acumulado = parseFloat(acumulado) + parseFloat(mnt);
    });
    $("#mntAcumulado").html(parseFloat(acumulado).toFixed(2));
}

function validadDatosBancarios() {
    var tipoc = $("#tipodecuenta").val();
    var banco = $("#banco").val();
    var cuenta = $("#numerocuenta").val();
    var cedula = $("#cibancario").val();
    var depositar = $("#depositar").val();
    if (tipoc == "S" || banco == "S" || cuenta == "" || cedula == "" || depositar == "") {
        $.notify("Debe ingresar todos los datos financieros", "warn");
        return false;
    }
    return true;
}


function cargarDatos() {
    if (Util.ValidarFormulario("frmtodoreembolso", "_btnSalvar")) {
        var reembolso = new Reembolso();
        reembolso.montosolicitado = parseFloat($("#mntAcumulado").html());

        var cuenta = new CuentaBancaria2();
        cuenta.cuenta = $("#numerocuenta").val();
        cuenta.institucion = $("#banco").val();
        cuenta.tipo = $("#tipodecuenta option:selected").val();
        cuenta.cedula = $("#cibancario").val();
        cuenta.titular = $("#depositar option:selected").text();
        reembolso.cuentabancaria = cuenta;

        var dir = new Direccion();
        dir.tipo = 0;
        dir.estado = $("#cmbmestado option:selected").val();
        dir.municipio = $("#cmbmmunicipio option:selected").val();
        dir.parroquia = $("#cmbmparroquia option:selected").val();
        dir.ciudad = $("#cmbmciudad").val();
        dir.calleavenida = $("#txtmcalle").val().toUpperCase();
        dir.casa = $("#txtmcasa").val().toUpperCase();
        dir.apartamento = $("#txtmapto").val().toUpperCase();
        var tele = new Telefono();
        tele.domiciliario = $("#txtmtelefono").val();
        tele.movil = $("#txtmcelular").val();
        tele.emergencia = $("#txtmtelefonoe").val();

        reembolso.Direccion = dir;
        reembolso.Telefono.domiciliario = tele.domiciliario;
        reembolso.Telefono.movil = tele.movil;
        reembolso.Telefono.emergencia = tele.emergencia;
        reembolso.Correo.principal = $("#txtmcorreo").val().toUpperCase();

        var conceptos = new Array();
        if ($("#conceptoagregado tr").length > 0 && validadDatosBancarios()) {
            $("#conceptoagregado tr").each(function () {
                conceptos.push(CargarConceptos(this));
            });
            reembolso.Concepto = conceptos;
            reembolso.grado = militar.Grado.descripcion;
            reembolso.componente = militar.Componente.descripcion;
            var wreembolso = new WReembolso();
            wreembolso.id = militar.Persona.DatoBasico.cedula;
            wreembolso.Reembolso = reembolso;
            wreembolso.nombre = militar.Persona.DatoBasico.nombreprimero.trim() + " " + militar.Persona.DatoBasico.apellidoprimero.trim();
            wreembolso.observaciones = $("#txtobservaciones").val().toUpperCase();

            var urlGuardar = Conn.URL + "wreembolso";
            var promesa = CargarAPI({
                sURL: urlGuardar,
                metodo: 'POST',
                valores: wreembolso,
            });

            promesa.then(function (xhRequest) {
                respuesta = JSON.parse(xhRequest.responseText);
                msjRespuesta("Su solicitud se ha procesado con exito...");
                $("#conceptoagregado").html("");
                llenarReembolso();
                var ventana = window.open(`rpt/reembolso/reciboReembolso.html?id=${militar.Persona.DatoBasico.cedula}&num=${respuesta.msj}`, "_blank");
            });
        }
    } else {
        $.notify("Debe ingresar todos los datos para realizar el reembolso");
    }

}
function CargarConceptos(Concepto){
    var concep = new ConceptoReembolso();
    var facturaD = new Factura();
    facturaD.fecha = new Date(Util.ConvertirFechaUnix($(Concepto).find("td").eq(6).html())).toISOString();
    facturaD.monto = parseFloat($(Concepto).find("td").eq(5).html());
    facturaD.numero = $(Concepto).find("td").eq(4).html();
    facturaD.control = $(Concepto).find("td").eq(4).html();

    var prov = new Beneficiario();
    prov.rif = $(Concepto).find("td").eq(2).html();
    prov.razonsocial = $(Concepto).find("td").eq(3).html();
    prov.tipoempresa = 'J';
    prov.direccion = 'Por cargar';
    facturaD.Beneficiario = prov;

    concep.DatoFactura = facturaD;
    concep.afiliado = $(Concepto).find("td").eq(0).html();
    concep.descripcion = $(Concepto).find("td").eq(1).html();
    return concep;
}
function verificaBeneficiarioCuenta() {
    var opt = $("#datosbancarios").val();
    if (opt == "otra") {
        $("#numerocuenta").attr("disabled", false);
        $("#depositar").attr("disabled", false);
        $("#banco").attr("disabled", false);
        $("#tipodecuenta").attr("disabled", false);
        $("#cibancario").val('');
        $("#numerocuenta").val('');
        $("#tipodecuenta").val('S');
        $("#depositar").val('S');
        $("#banco").val('S');
    } else {
        $("#numerocuenta").attr("disabled", true);
        $("#depositar").attr("disabled", true);
        $("#banco").attr("disabled", true);
        $("#tipodecuenta").attr("disabled", true);
        var datosBancario = opt.split('|');
        $("#numerocuenta").val(datosBancario[0]);
        $("#banco").val(datosBancario[1]);
        $("#tipodecuenta").val(datosBancario[2]);
        $("#cibancario").val(militar.Persona.DatoBasico.cedula);
        $("#depositar").val(militar.Persona.DatoBasico.cedula);
    }
}

function limpiarReembolso() {
    $('#frmreembolso').each(function () {
        this.reset();

    });
}
function limpiarReembolso2() {
    $('#frmreembolsobanco').each(function () {
        this.reset();
    });
}

function limpiarmdlempresa() {
    $('#frmmdlempresa').each(function () {
        this.reset();
    });
}

function requisitosConcepto() {

    var modal = $("#concepto option:selected").attr("desplegar");
    inactivarCheck(modal);
    $("#btnAgconcepto").attr("disabled", true);
    $("#" + modal).modal("show");
}

function habilitarDireccion(estatus) {
    $("#collapseTree select").attr("disabled", estatus);
    $("#collapseTree :input").attr("disabled", estatus);
    if (estatus == false) {
        $("#btnhabdire").hide();
        $("#btndhabdire").show();
    } else {
        $("#btnhabdire").show();
        $("#btndhabdire").hide();
        $("#btnhabdire").prop('disabled', false);
    }
}

function validaFechaFactura(n) {
    var f = new Date();
    var fecha = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    var fecha1 = moment(fecha, "DD-MM-YYYY");
    var ff = $("#fechafactura").val();
    var fecha2 = moment(ff, "DD-MM-YYYY");
    var dif = fecha1.diff(fecha2, 'days');
    // if (dif > n) {
    //     $("#alerta_fecha").text("Fecha fuera de rango");
    //     $("#alert_fecha").show();
    // } else {
    //     $("#alert_fecha").hide();
    // }
}

function conviertEstatus(est) {
    var estatus = "";
    switch (est) {
        case -1:
            estatus = "Rechazado";
            break;
        case 0:
            estatus = "Recepción";
            break;
        case 1:
            estatus = "J. Seccion";
            break;
        case 2:
            estatus = "J. Departamento";
            break;
        case 3:
            estatus = "Gerencia";
            break;
        case 4:
            estatus = "Presidencia";
            break;
        case 5:
            estatus = "Aprobado";
            break;
    }
    return estatus;
}


function ValidarFactura(){
  var Factura = {
    rif: $("#rif").val(),
    numero: $("#nfactura").val()
  };
  var promesa = CargarAPI({
      sURL: Conn.URL + "wfactura",
      metodo: 'POST',
      valores: Factura
  });

  promesa.then(function (xhRequest) {
      res = JSON.parse(xhRequest.responseText);
      if(res.tipo == 1){
        $("#rif").val("");
        $("#nfactura").val("");
        $("#razonsocial").val("");
        $.notify(res.msj, "warn");
      }
  });
}


function SeleccionarCuenta(){
  $("#numerocuenta").val($("#banco").val());
}
