$(function () {

    $("#concepto").select2();

    $(".mdl-requisitos").on("change",function () {
        verificaCheckModal("requisitos","btnGenerar");
    });

    $(".btnvolverentradamac").click(function () {
        $("#mdldeseamac").modal("show");
        $("#btnsalir").click(function () {
            $("#opciones").hide();
            $("#panelentrada").show();
            $("#panellista").hide();
            $("#panelregistro").hide();
            $('#mdldeseamac').modal('hide');
            limpiarMedicina();
            $("#medicinaagregada").parents('tr').eq(0).remove();
                $("#cajamedicina").slideUp();
        });
    });

    llenarmedicina();

});


function agregarMedicina(){
    if(Util.ValidarFormulario("frmmedicina","btnagregarmedicina")){
        var ncomercial = $("#txtNombreCom").val();
        var presentacion = $("#txtPresentacion").val();
        var dosis = $("#txtDosis").val();
        var frecuencia = $("#txtCantidad").val();
        var finicio = $("#txtFechaInicio").val();
        var ffin = $("#txtFechaFin").val();
        var tabla = $("#medicinaagregada");
        var btndelete = "<button class='btn btn-danger borrarconcepto'><i class='glyphicon glyphicon-remove'></i></button>";
        var html = "<tr><td>"+ncomercial+"</td><td>"+presentacion+"</td><td>"+dosis+"</td><td>"+frecuencia+"</td>";
        html += "<td>"+finicio+"</td><td>"+ffin+"</td><td>"+btndelete+"</td></tr>";
        tabla.append(html);

        $(".borrarconcepto").click(function () {
            $(this).parents('tr').eq(0).remove();
            if($("#medicinaagregada tr").length == 0){
                $("#cajamedicina").slideUp();
            }
        });
        limpiarMedicina();
        $.notify("Se ha agregado el Medicamento", "success");
        $("#cajamedicina").slideDown("slow");

    }

    return false;
}

function llenarmedicina(){
    $("#cmbbeneficiario").html('<option selected="selected" value="S"></option>');
    $("#_cargando").hide();
    if(militar.Persona != undefined){
        var ncompleto = militar.Persona.DatoBasico.nombreprimero +" "+militar.Persona.DatoBasico.apellidoprimero;
        $("#txtnombre").val(militar.Persona.DatoBasico.nombreprimero);
        $("#txtapellido").val(militar.Persona.DatoBasico.apellidoprimero);
        $("#ttnombre").text(ncompleto);


        $("#cmbcomponente").val(militar.Componente.descripcion);
        $("#ttcomponente").text(militar.Componente.descripcion);

        $("#cmbgrado").val(militar.Grado.descripcion);
        $("#ttgrado").text(militar.Grado.descripcion);

        $("#txtcedula").val(militar.Persona.DatoBasico.cedula);
        $("#ttcedula").text(militar.Persona.DatoBasico.cedula);

        crearLista();

        var estcivil = Util.GenerarEstadoCivil(militar.Persona.DatoBasico.estadocivil,militar.Persona.DatoBasico.sexo);

        $("#cmbedocivil").val(estcivil);
        $("#ttestadocivil").text(estcivil);

        $("#cmbsituacion").val(militar.situacion);
        $("#ttsituacion").text(Util.ConvertirSitucacion(militar.situacion));

        if (militar.Persona.Telefono != undefined) {
            $("#txtmtelefono").val(militar.Persona.Telefono.domiciliario);
            $("#txtmcelular").val(militar.Persona.Telefono.movil);
            $("#txtmcorreo").val(militar.Persona.Correo.principal);
        }

        if(militar.Persona.DatoFinanciero != undefined){
            $("#txtmnrocuenta").val(militar.Persona.DatoFinanciero.cuenta);
            $("#cmbminstfinanciera").val(militar.Persona.DatoFinanciero.institucion);
            $("#cmbmtipofinanciera").val(militar.Persona.DatoFinanciero.tipo);
        }

        if (militar.Persona.Direccion != undefined) {
            var DIR = militar.Persona.Direccion[0];
            Estados.ObtenerEstados();
            $("#cmbmestado").val(DIR.estado);
            $("#cmbmmunicipio").html('<option selected="selected" value="' + DIR.municipio + '">' + DIR.municipio + '</option>');
            $("#cmbmparroquia").html('<option selected="selected" value="' + DIR.parroquia + '">' + DIR.parroquia + '</option>');
            $("#cmbmciudad").html('<option selected="selected" value="' + DIR.ciudad + '">' + DIR.ciudad + '</option>');
            $("#txtmcalle").val(DIR.calleavenida);
            $("#txtmcasa").val(DIR.casa);
            $("#txtmapto").val(DIR.apartamento);
        }

    }else{
        alert("Cedula no se encuentra registrada como militar dentro del sistema");
        $("#paneldatos").hide();
    }
}

function crearLista(){
    $("#cmbbeneficiario").append(new Option(militar.Persona.DatoBasico.nombreprimero.trim() + "(MILITAR)", "T|" + militar.Persona.DatoBasico.cedula, true, true));
    var ncompleto = militar.Persona.DatoBasico.nombreprimero.trim() + " " + militar.Persona.DatoBasico.apellidoprimero.trim();
    $("#depositar").append(new Option(ncompleto,militar.Persona.DatoBasico.cedula , true, true));
    if(militar.Familiar.length > 0){
        var ipos = 0;
        militar.Familiar.forEach(v => {
            var edad = Util.CalcularEdad(Util.ConvertirFechaHumana(v.Persona.DatoBasico.fechanacimiento));
            var ncompleto2 = v.Persona.DatoBasico.nombreprimero.trim()  + " " + v.Persona.DatoBasico.apellidoprimero.trim();
            if(edad > 18){
                $("#depositar").append(new Option(ncompleto2, v.Persona.DatoBasico.cedula, true, true));
            }
            var parentes = Util.ConvertirParentesco(v.parentesco,v.Persona.DatoBasico.sexo);
            $("#cmbbeneficiario").append(new Option(ncompleto2+"("+parentes+")", ipos + "|" + v.Persona.DatoBasico.cedula, true, true));
            ipos++;
        });
    }
    $("#cmbbeneficiario").append(new Option("Seleccione","|seleccione", true, true));
    $("#depositar").append(new Option("Seleccione","", true, true));

    $("#cmbbeneficiario").on("change",function(){
        var opt = $("#cmbbeneficiario option:selected").val();
        var picado = $("#cmbbeneficiario option:selected").val().split("|");
        if(opt != '|seleccione'){
            cargarFamiliar(picado[0]);
        }else{
            $("#perfilFamiliar").hide();
        }
    });

    $("#cmbbeneficiario").select2({
    });
    historico();
}

function cargarFamiliar(pos){
    if(pos == "T"){
        if (militar.Persona.Telefono != undefined) {
            $("#txtmtelefono").val(militar.Persona.Telefono.domiciliario);
            $("#txtmcelular").val(militar.Persona.Telefono.movil);
            $("#txtmcorreo").val(militar.Persona.Correo.principal);
            $("#ci").val(militar.Persona.DatoBasico.cedula);
        }

        if (militar.Persona.Direccion != undefined) {
            var DIR = militar.Persona.Direccion[0];
            Estados.ObtenerEstados();
            $("#cmbmestado").val(DIR.estado);
            $("#cmbmmunicipio").html('<option selected="selected" value="' + DIR.municipio + '">' + DIR.municipio + '</option>');
            $("#cmbmparroquia").html('<option selected="selected" value="' + DIR.parroquia + '">' + DIR.parroquia + '</option>');
            $("#cmbmciudad").html('<option selected="selected" value="' + DIR.ciudad + '">' + DIR.ciudad + '</option>');
            $("#txtmcalle").val(DIR.calleavenida);
            $("#txtmcasa").val(DIR.casa);
            $("#txtmapto").val(DIR.apartamento);
        }
        $("#perfilFamiliar").hide();
        return true;
    }
    $("#perfilFamiliar").show();
    var fami = militar.Familiar[pos];
    $("#lblcedulaf").text(fami.Persona.DatoBasico.cedula);
    $("#ci").val(fami.Persona.DatoBasico.cedula);
    var ncf = fami.Persona.DatoBasico.nombreprimero+" "+fami.Persona.DatoBasico.apellidoprimero;
    $("#lblnombref").text(ncf);
    var parente = Util.ConvertirParentesco(fami.parentesco,fami.Persona.DatoBasico.sexo)
    $("#lblparentesco").text(parente);
    var fnac = Util.ConvertirFechaHumana(fami.Persona.DatoBasico.fechanacimiento);
    $("#lblfnac").text(fnac);

    if (fami.Persona.Telefono != undefined) {
        $("#txtmtelefono").val(fami.Persona.Telefono.domiciliario);
        $("#txtmcelular").val(fami.Persona.Telefono.movil);
        $("#txtmcorreo").val(fami.Persona.Correo.principal);
    }
    Estados.ObtenerEstados();
    if (fami.Persona.Direccion != undefined) {
        var DIR = fami.Persona.Direccion[0];

        $("#cmbmestado").val(DIR.estado);
        $("#cmbmmunicipio").html('<option selected="selected" value="' + DIR.municipio + '">' + DIR.municipio + '</option>');
        $("#cmbmparroquia").html('<option selected="selected" value="' + DIR.parroquia + '">' + DIR.parroquia + '</option>');
        $("#cmbmciudad").html('<option selected="selected" value="' + DIR.ciudad + '">' + DIR.ciudad + '</option>');
        $("#txtmcalle").val(DIR.calleavenida);
        $("#txtmcasa").val(DIR.casa);
        $("#txtmapto").val(DIR.apartamento);
    }
}


function generarMedicina() {
  if (Util.ValidarFormulario("frmmedicinat", "_btnSalvar")) {

  	var bene = $("#cmbbeneficiario option:selected").val().split('|');
  	var beneficiario = bene[1]+"-"+$("#cmbbeneficiario option:selected").text();
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

    var lstmedicina = new Array();
    if ($("#medicinaagregada tr").length > 0) {
      $("#medicinaagregada tr").each(function () {
          lstmedicina.push(CargarMedicina(this));
      });

      var wmedicina = new WMedicina();
      wmedicina.id = militar.Persona.DatoBasico.cedula;
      wmedicina.idf = bene[1];
      wmedicina.Direccion = dir;
      wmedicina.Telefono = tele;
      wmedicina.Medicina = lstmedicina;
      wmedicina.afiliado = beneficiario;
      // console.log(JSON.stringify(wmedicina));
     var urlGuardar = Conn.URL + "wmedicina";
     var promesa = CargarAPI({
         sURL: urlGuardar,
         metodo: 'POST',
         valores: wmedicina,
     });

     promesa.then(function (xhRequest) {
         respuesta = JSON.parse(xhRequest.responseText);
         msj2Respuesta("Se proceso con exito....");
         $("#medicinaagregada").html("");
         llenarmedicina();
         var idm = militar.Persona.DatoBasico.cedula;
         var ventana = window.open("rpt/medicina/medicinaAltoCosto.html?id="+idm+"&num="+respuesta.msj, "_blank");
     });
   }
  } else {
      $.notify("Debe ingresar todos los datos para realizar el reembolso");
  }
}

function CargarMedicina(OMedicina){
    var medicina = new Medicina();

    medicina.nombrecomercial = $(OMedicina).find("td").eq(0).html();
    medicina.presentacion = $(OMedicina).find("td").eq(1).html();
    medicina.dosis = $(OMedicina).find("td").eq(2).html();
    medicina.cantidad = $(OMedicina).find("td").eq(3).html();
    medicina.fechainicio = new Date(Util.ConvertirFechaUnix($(OMedicina).find("td").eq(4).html())).toISOString();
    medicina.fechavencimiento = new Date(Util.ConvertirFechaUnix($(OMedicina).find("td").eq(5).html())).toISOString();
    return medicina;
}

function limpiarMedicina(){
    $('#frmmedicina').each(function(){
        this.reset();
    });
}

function habilitarDireccion(estatus){
    $("#collapseTree select").attr("disabled",estatus);
    $("#collapseTree :input").attr("disabled",estatus);
    if(estatus == false){
        $("#btnhabdire").hide();
        $("#btndhabdire").show();
    }else{
        $("#btnhabdire").show();
        $("#btndhabdire").hide();
    }
}
