$(function () {
    console.log("Medicina de Alto Costo");
    console.log(militar);

    $("#concepto").select2();

    $(".mdl-requisitos").on("change",function () {
        verificaCheckModal("requisitos","btnGenerar");
    });

  /*  $(".btnvolverentrada2").click(function(){
        $("#opciones").hide();
        $("#panelentrada").show();
        $("#panellista").hide();
        $("#panelregistro").hide();
    });*/

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

class Medicina {
    constructor() {
        console.log("Creando Tratamiento Alto Costo");
        this.nombrecomercial = '';
        this.presentacion = '';
        this.dosis = "";
        this.cantidad="";
        this.fechainicio='';
        this.fechavencimiento='';
        this.afiliado = '';
    }
}

class Wmedicina{
    constructor(){
        this.id = "";
        this.Medicina = new Medicina();
    }
}

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

        $("#cmbgrado").val(militar.Grado.descripcion)
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
    $("#cmbbeneficiario").append(new Option(militar.Persona.DatoBasico.nombreprimero+"(MILITAR)", "T|"+militar.Persona.DatoBasico.cedula, true, true));
    var ncompleto = militar.Persona.DatoBasico.nombreprimero+ " " + militar.Persona.DatoBasico.apellidoprimero;
    $("#depositar").append(new Option(ncompleto,militar.Persona.DatoBasico.cedula , true, true));
    if(militar.Familiar.length > 0){
        $.each(militar.Familiar,function(v){
            var edad = Util.CalcularEdad(Util.ConvertirFechaHumana(this.Persona.DatoBasico.fechanacimiento));
            var ncompleto2 = this.Persona.DatoBasico.nombreprimero+ " " + this.Persona.DatoBasico.apellidoprimero;
            if(edad > 18){

                $("#depositar").append(new Option(ncompleto2, this.Persona.DatoBasico.cedula, true, true));
            }
            var parentes = Util.ConvertirParentesco(this.parentesco,this.Persona.DatoBasico.sexo);
            $("#cmbbeneficiario").append(new Option(ncompleto2+"("+parentes+")", v+"|"+this.Persona.DatoBasico.cedula, true, true));
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
    console.log(pos);

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
    console.log(fami);
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

function generarMedicina(){

    var medicina = new Medicina();

    medicina.nombrecomercial = $("#txtNombreCom").val();
    medicina.presentacion = $("#txtPresentacion").val();
    medicina.dosis = $("#txtDosis").val();
    medicina.cantidad = $("#txtCantidad").val();
    medicina.fechainicio = $("#txtFechaInicio").val();
    medicina.fechavencimiento = $("#txtFechaFin").val();
    var bene = $("#cmbbeneficiario option:selected").val().split('|');
    var beneficiario = bene[1]+"-"+$("#cmbbeneficiario option:selected").text();
    medicina.afiliado = beneficiario;

    if($("#medicinaagregada tr").length >0) {
        $("#medicinaagregada tr").each(function () {
            var medicinas = new Medicina();
            medicinas.nombrecomercial=$(this).find("td").eq(0).html();
            medicinas.presentacion=$(this).find("td").eq(1).html();
            medicinas.dosis=$(this).find("td").eq(2).html();
            medicinas.cantidad=$(this).find("td").eq(3).html();
            medicinas.fechainicio=$(this).find("td").eq(4).html();
            medicinas.fechavencimiento=$(this).find("td").eq(6).html();
        });
    }else{
        $.notify("Debe ingresar todos los datos para realizar el informe médico");}

    var datos = new Wmedicina();
    datos.id = militar.Persona.DatoBasico.cedula;
    datos.Medicina = medicina;

    console.log(JSON.stringify(datos));

    $("#medicinaagregada").html("");
    llenarmedicina();

    $("#opciones").hide();
    $("#panelentrada").show();
    $("#panellista").hide();
    $("#panelregistro").hide();
    var ventana = window.open("medicinaAltoCosto.html?id="+militar.Persona.DatoBasico.cedula, "_blank");
    var urlGuardar = Conn.URL + "wmedicina";
    var request2 = CargarAPI({
        sURL: urlGuardar,
        metodo: 'POST',
        valores: datos,
    });

    request2.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if (respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        msjRespuesta(respuesta.msj);
        $("#medicinaagregada").html("");
        llenarmedicina();

        $("#opciones").hide();
        $("#panelentrada").show();
        $("#panellista").hide();
        $("#panelregistro").hide();
    });
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
