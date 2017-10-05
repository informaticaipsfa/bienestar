$(function () {
    $("#concepto").select2();

    $(".mdl-requisitos").on("change",function () {
        verificaCheckModal("requisitos","btnGenerar");
    });

    $(".btnvolverentradaema").click(function () {
        $("#mdldeseamac").modal("show");
        $("#btnsalir").click(function () {
            $("#opciones").hide();
            $("#panelentrada").show();
            $("#panellista").hide();
            $("#panelregistro").hide();
            $('#mdldeseamac').modal('hide');
            limpiarEquipo();
        });
    });

    llenarEquipo();
});

class Equipo {
    constructor() {
        this.diagnostico = '';
        this.equipo='';
        this.fechainforme='';
        this.serial='';
        this.fechainicio='';
        this.fechavencimiento='';
        this.fechaprorroga='';
        this.afiliado = '';
        this.Direccion = new Direccion();
        this.Telefono = new Telefono();
        this.Correo = new Correo();
    }
}

class WEquipo{
    constructor(){
        this.id = "";
        this.Equipo = new Equipo();
        this.nombre = "";
    }
}

function cargarFamiliar(pos){

    if(pos == "T"){
        if (militar.Persona.Telefono != undefined) {
            $("#txtmtelefono").val(militar.Persona.Telefono.domiciliario);
            $("#txtmcelular").val(militar.Persona.Telefono.movil);
            $("#txtmcorreo").val(militar.Persona.Correo.principal);
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
    $("#perfilMilitar").hide();

    $("#perfilFamiliar").show();

    var fami = militar.Familiar[pos];
    $("#lblcedulaf").text(fami.Persona.DatoBasico.cedula);
    var rutaimg = Conn.URLIMG;
    url = rutaimg + fami.Persona.DatoBasico.cedula + ".jpg";
    if (fami.Persona.foto != undefined) {
        rutaimg = Conn.URLTEMP;
        url = rutaimg + $("#_cedula").val() + "/foto"  + fami.Persona.DatoBasico.cedula  + ".jpg";
    }
    $("#fotoperfilf").attr("src", url);
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

function llenarEquipo(){
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
        if(opt != '|seleccione' && picado[0]!="T"){
            cargarFamiliar(picado[0]);
            $("#perfilFamiliar").show();
        }else{
            $("#perfilFamiliar").hide();
            $("#perfilMilitar").show();
        }
    });

    $("#cmbbeneficiario").select2({
    });
}

function generarEquipo(){

  if (Util.ValidarFormulario("frmequipo", "_btnSalvar")) {

    var equipo = new Equipo();
    var bene = $("#cmbbeneficiario option:selected").val().split('|');
    var beneficiario = bene[1]+"-"+$("#cmbbeneficiario option:selected").text();
    equipo.equipo = $("#cmbEquipo option:selected").text();
    equipo.diagnostico = $("#txtDiagnostico").val();
    equipo.fechainforme = $("#txtFechaInfM").val();
    equipo.serial = $("#txtSerial").val();

    equipo.afiliado = beneficiario;
    equipo.fechainicio = $("#txtFechaIniP").val();
    equipo.fechavencimiento = $("#txtFechaFinP").val();
    equipo.fechaprorroga = $("#txtFechaProrrogaP").val();

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

    equipo.Direccion = dir;

    equipo.Telefono.domiciliario = tele.domiciliario;
    equipo.Telefono.movil = tele.movil;

    equipo.Correo.principal = $("#txtmcorreo").val().toUpperCase();

    var bene = $("#cmbbeneficiario option:selected").val().split('|');
    var beneficiario = bene[1]+"-"+$("#cmbbeneficiario option:selected").text();

    var wequipo = new WEquipo();

    wequipo.id = militar.Persona.DatoBasico.cedula;
    wequipo.Equipo = equipo;
    wequipo.nombre = militar.Persona.DatoBasico.nombreprimero.trim()+' '+militar.Persona.DatoBasico.apellidoprimero.trim();

console.log(wequipo);
			console.log(JSON.stringify(wequipo));
    var urlGuardar = Conn.URL + "wequipo";
    var request2 = CargarAPI({
        sURL: urlGuardar,
        metodo: 'POST',
        valores: wequipo,
    });
    request2.then(function(xhRequest) {
        res = JSON.parse(xhRequest.responseText);
        if (res.msj != "") res.msj2 = "Se proceso con exito....";
          msj2Respuesta(res.msj2);
        var idm = militar.Persona.DatoBasico.cedula;
        var ventana = window.open("actaEquiposMedicos.html?id="+idm + "&nm=" +res.msj , "_blank");
    });
      }else {
        $.notify("Debe ingresar todos los datos para realizar un prestamo de equipo");
    }
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
        $("#btnhabdire").prop('disabled', false);
    }
}

function validaFechaFactura(n){
    var f = new Date();
    var fecha=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    var fecha1=moment(fecha,"DD-MM-YYYY");
    var ff = $("#fechafactura").val();
    var fecha2 = moment(ff,"DD-MM-YYYY");
    var dif=fecha1.diff(fecha2, 'days');
    if(dif>n) {
        $("#alerta_fecha").text("Fecha fuera de rango");
        $("#alert_fecha").show();
    }else{
        $("#alert_fecha").hide();
    }
}

function calcularFechaFin(n){
    var f = new Date();
    var fecha=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    var fecha1=moment(fecha,"DD-MM-YYYY");
    var ff = $("#fechafactura").val();
    var fecha2 = moment(ff,"DD-MM-YYYY");
    var dif=fecha1.diff(fecha2, 'days');
    console.log(fecha1);
    if(dif>n) {
        $("#alerta_fecha").text("Fecha fuera de rango");
        $("#alert_fecha").show();
    }else{
        $("#alert_fecha").hide();
    }
}

function calcularFechaP(n){
    var f = new Date();
    var fecha=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    var fecha1=moment(fecha,"DD-MM-YYYY");
    var ff = $("#fechafactura").val();
    var fecha2 = moment(ff,"DD-MM-YYYY");
    var dif=fecha1.diff(fecha2, 'days');
    if(dif>n) {
        $("#alerta_fecha").text("Fecha fuera de rango");
        $("#alert_fecha").show();
    }else{
        $("#alert_fecha").hide();
    }
}

function limpiarEquipo() {
    $('#frmequipo').each(function () {
        this.reset();
        $("#cmbbeneficiario").select2("val", "");
    });
}
