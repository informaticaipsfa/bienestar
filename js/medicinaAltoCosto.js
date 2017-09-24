/*class MedicoAvala {
    constructor() {
        console.log("Creando Medico que Avala");
        this.centrosa = '';
        this.medicoa = '';
        this.cedulaa = '';
        this.especialidada = '';
        this.codigocma="";
        this.codigocmppsa="";
    }
}

class Tratamiento {
    constructor() {
        console.log("Creando Medico que Trtatamiento");
        this.principioactivo = '';
        this.nombrecomercial = '';
        this.presentacion = '';
        this.dosis = "";
        this.cantidad="";
        this.fechav='';
    }
}
class Patologia {
    constructor() {
        console.log("Creando patologia");
        this.patologiaagregada='';
    }
}

class Farmacia {
    constructor() {
        console.log("Creando objeto Farmacia");
        this.fechaI='';
        this.tipoc ="";
        this.nombrec="";
        this.medicot="";
        this.cimt="";
        this.especialidad="";
        this.codigocm="";
        this.codigocmpps="";
        this.prestadors='';
        this.zonadedistribucion='';
        this.MedicoAvala = new MedicoAvala();
        this.Tratamiento= new Tratamiento();
        this.Patologia=new Patologia();
        this.estatus = 0;
        this.requisito = new Array();
        this.Direccion = new Direccion();
        this.Telefono = new Telefono();
        this.Correo = new Correo();
        this.Seguimiento = new Seguimiento();
    }
}
class Wfarmacia{
    constructor(){
        this.id = "";
        this.Farmacia = new Farmacia();
        this.nombre = "";
    }
}*/

$(function () {
    console.log("Medicina de Alto Costo");
    console.log(militar);

    $("#concepto").select2();

    $(".mdl-requisitos").on("change",function () {
        verificaCheckModal("requisitos","btnGenerar");
    });

    $(".btnvolverentrada2").click(function(){
        $("#opciones").hide();
        $("#panelentrada").show();
        $("#panellista").hide();
        $("#panelregistro").hide();
    });
    llenarmedicina();

});

/*function consultarRif(){
    var rif = $("#rif").val();
    var rz = '';
    var encontrado = 0;
    console.log(lstProveedores);
    $.each(lstProveedores,function () {
        if(this.rif == rif){
            rz= this.razonsocial;
            encontrado = 1;
        }
    });
    if(encontrado == 1){
        $("#razonsocial").val(rz);
    }else{
        $("#mdlEmpresa").modal("show");
    }
}*/

/*function agregarMedico(){
    if(Util.ValidarFormulario("frmmedico","btnagregarmedico")){
        var centro =$("#centromedico").val();
        var medicoa  = $("#medicoA").val();
        var cedula = $("#ciA").val();
        var especialidad=$("#especialidad").val();
        var codigoc = $("#codigocolegio").val();
        var codigom = $("#codigompps").val();
        var tabla = $("#medicoagregado");
        var btndelete = "<button class='btn btn-danger borrarmedico'><i class='glyphicon glyphicon-remove'></i></button>";
        var html = "<tr><td>"+centro+"</td><td>"+medicoa+"</td><td>"+cedula+"</td><td>"+especialidad+"</td><td>"+codigoc+"</td><td>"+codigom+"</td>";
        html += "<td>"+btndelete+"</td></tr>";
        tabla.append(html);

        $(".borrarmedico").click(function () {
            $(this).parents('tr').eq(0).remove();
            if($("#medicoagregado tr").length == 0){
                $("#cajamedico").slideUp();
            }
        });
        $.notify("Se ha agregado el Médico", "success");
        $("#cajamedico").slideDown("slow");
        limpiarMedico();
    }
    return false;
}*/

function agregarMedicina(){
    if(Util.ValidarFormulario("frmmedicina","btnagregarmedicina")){
        var pactivo  = $("#pactivo").val();
        var ncomercial = $("#ncomercial").val();
        var presentacion = $("#presentacion").val();
        var dosis = $("#dosis").val();
        var frecuencia = $("#frecuencia").val();
        var fvencimiento = $("#fechaVencimiento").val();
        var periodo = $("#periodotrat").val();
        var tabla = $("#medicinaagregada");
        var btndelete = "<button class='btn btn-danger borrarconcepto'><i class='glyphicon glyphicon-remove'></i></button>";
        var html = "<tr><td>"+pactivo+"</td><td>"+ncomercial+"</td><td>"+presentacion+"</td><td>"+dosis+"</td><td>"+frecuencia+"</td>";
        html += "<td>"+fvencimiento+"</td><td>"+btndelete+"</td></tr>";
        tabla.append(html);

        $(".borrarconcepto").click(function () {
            $(this).parents('tr').eq(0).remove();
            if($("#medicinaagregada tr").length == 0){
                $("#cajamedicina").slideUp();
            }
        });
        $.notify("Se ha agregado el Medicamento", "success");
        $("#cajamedicina").slideDown("slow");
        limpiarMedicina();
    }
    return false;
}

/*function agregarPatologia(){
    if(Util.ValidarFormulario("frmpatologia","btnAgpatologia")){
        var pat = $("#cmbpatologia option:selected").text();
        if(pat=="Otra"){
            var pat = $("#otrapatologia").val();
        }
        var tabla = $("#patologiaagregada");
        var btndelete = "<button class='btn btn-danger borrarpatologia pull-right'><i class='glyphicon glyphicon-remove'></i></button>";
        var html = "<tr><td>"+pat+"</td>";
        html += "<td>"+btndelete+"</td></tr>";
        tabla.append(html);

        $(".borrarpatologia").click(function () {
            $(this).parents('tr').eq(0).remove();
            if($("#patologiaagregada tr").length == 0){
                $("#cajapatologia").slideUp();
            }
        });
        $.notify("Se ha agregado la Patologia", "success");
        $("#cajapatologia").slideDown("slow");
        limpiarPatologia();
    }
    return false;
}
*/
/*function salvarEmpresa(){
    var rifn = $("#rifnuevo").val();
    var rznuevo = $("#rsocialnuevo").val();
    var tenuevo = $("#tipoenuevo").val();
    var direc = $("#direcnueva").val();
    var cuenta = $("#numerocuentanueva").val();
    var banco = $("#_cmbmtipofinanciera option:selected").val();
    var tipoc = $("#_cmbmtipocuentaranueva option:selected").val();
    if(rifn == "" || rznuevo == "" || tenuevo == "S" || direc == "" || cuenta == "" || banco == "S" || tipoc == "S"){
        alert(rifn +"**"+rznuevo+"**"+tenuevo+"**"+direc+"**"+cuenta+"**"+banco+"**"+tipoc)
        $.notify("Debe ingresar todos los datos de la empresa a registrar");
        return false;
    }
    $.notify("Proceso de registro pendiente");
    $("#rif").val(rifn);
    $("#razonsocial").val(rznuevo);
    $("#emptipo").val(tenuevo);
    $("#empdirec").val(direc);
    $("#empcuenta").val(cuenta);
    $("#empbanco").val(banco);
    $("#emptipoc").val(tipoc);
    $("#mdlEmpresa").modal('hide');
}*/

function llenarmedicina(){
    $("#cmbbeneficiario").html('<option selected="selected" value="S"></option>');
    //$("#datosbancarios").html('<option selected="selected" value="S">Escoja</option>');
    $("#_cargando").hide();
    if(militar.Persona != undefined){
        //$("#cuerporeembolsos").html("");
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
          //  listaCuentas();
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

/*function listaCuentas(){
    $("#datosbancarios").html("");
    $.each(militar.Persona.DatoFinanciero,function(){
        $("#datosbancarios").append(new Option(this.cuenta,this.cuenta+"|"+this.institucion+"|"+this.tipo, true, true));
    });
    $("#datosbancarios").append(new Option("OTRA","otra", true, true));
    $("#datosbancarios").append(new Option("Selecione","", true, true));
}
*/
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
        templateResult: formatoCombo
    });
    historico();
}
/*

function cedulaDepositar(){
    var ced = $("#depositar").val();
    $("#cibancario").val(ced);
}
*/
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

/*function validadDatosBancarios(){
    var tipoc = $("#tipodecuenta").val();
    var banco = $("#banco").val();
    var cuenta = $("#numerocuenta").val();
    var cedula = $("#cibancario").val();
    var depositar = $("#depositar").val();
    if(tipoc == "S" || banco == "S" || cuenta == "" || cedula == "" || depositar == ""){
        $.notify("Debe ingresar todos los datos financieros","warn");
        return false;
    }
    return true;
}*/

function generarMedicina(){


    /*var farmacia = new Farmacia();
    farmacia.fechaI=$("#fechainformemedico").val();
    farmacia.tipoc=$("#cmbtipo option:selected").text();
    farmacia.nombrec=$("#nombrecS").val();
    farmacia.medicot=$("#medicot").val();
    farmacia.cimt=$("#cedulam").val();
    farmacia.especialidad=$("#especialidadt").val();
    farmacia.codigocm=$("#codigoclgm").val();
    farmacia.codigocmpps=$("#codigomppst").val();
    farmacia.prestadors=$("#cmbprestadors option:selected").text();
    farmacia.zonadedistribucion=$("#cmbzona option:selected").text();*/


    /*var dir = new Direccion();
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
    tele.movil = $("#txtmcelular").val();*/

    /*farmacia.Direccion = dir;
    farmacia.Telefono.domiciliario = tele.domiciliario;
    farmacia.Telefono.movil = tele.movil;

    farmacia.Correo.principal = $("#txtmcorreo").val().toUpperCase();*/


  /*  var prov = new Beneficiario();
    prov.rif = $("#rif").val();
    prov.razonsocial = $("#razonsocial").val();
    prov.tipoempresa = 'J';
    prov.direccion = $("#empdirec").val();
    //prov.Banco = 'Pora cargar banco';*/

  /*  var medicosavala = new Array();
    if($("#medicoagregado tr").length >0) {
        $("#medicoagregado tr").each(function () {
            //console.log($(this).html());
            var medicoA = new MedicoAvala();
            medicoA.centrosa= $(this).find("td").eq(0).html();
            medicoA.medicoa=$(this).find("td").eq(1).html();
            medicoA.cedulaa=$(this).find("td").eq(2).html();
            medicoA.especialidada=$(this).find("td").eq(3).html();
            medicoA.codigocma=$(this).find("td").eq(4).html();
            medicoA.codigocmppsa=$(this).find("td").eq(5).html();


            medicosavala.push(medicoA);
        });
    }*/
  /*  var tratamientoafi = new Array();
    if($("#medicinaagregada tr").length >0) {
        $("#medicinaagregada tr").each(function () {
            var tratamientos = new Tratamiento();
            tratamientos.principioactivo=$(this).find("td").eq(0).html();
            tratamientos.nombrecomercial=$(this).find("td").eq(1).html();
            tratamientos.presentacion=$(this).find("td").eq(2).html();
            tratamientos.dosis=$(this).find("td").eq(3).html();
            tratamientos.cantidad=$(this).find("td").eq(4).html();
            tratamientos.fechav=$(this).find("td").eq(5).html();
            tratamientoafi.push(tratamientos);
        });
    }else{
        $.notify("Debe ingresar todos los datos para realizar el informe médico");}*/


  /*  var patologiaag = new Array();
    if($("#patologiaagregada tr").length >0) {
        $("#patologiaagregada tr").each(function () {
            var patologias = new Patologia();
            patologias.patologiaagregada=$(this).find("td").eq(0).html();
            patologiaag.push(patologias);
        });
    }else{
        $.notify("Debe ingresar todos los datos para realizar el informe médico");}*/

    /*var datos = new Wfarmacia();
    datos.id = militar.Persona.DatoBasico.cedula;

    datos.nombre = militar.Persona.DatoBasico.nombreprimero.trim()+' '+militar.Persona.DatoBasico.apellidoprimero.trim();
    farmacia.MedicoAvala = medicosavala;
    farmacia.Tratamiento=tratamientoafi;
    farmacia.Patologia=patologiaag;
    datos.Farmacia = farmacia;
    console.log(JSON.stringify(datos));*/


    //probar
    $("#medicinaagregada").html("");
    llenarmedicina();

    $("#opciones").hide();
    $("#panelentrada").show();
    $("#panellista").hide();
    $("#panelregistro").hide();
    var ventana = window.open("medicinaAltoCosto.html?id="+militar.Persona.DatoBasico.cedula, "_blank");
    var urlGuardar = Conn.URL + "wcarta";
    var request2 = CargarAPI({
        sURL: urlGuardar,
        metodo: 'POST',
        valores: datos,
    });

    /*request2.then(function (xhRequest) {
        respuesta = JSON.parse(xhRequest.responseText);
        if (respuesta.msj == "") respuesta.msj = "Se proceso con exito....";
        msjRespuesta(respuesta.msj);
        $("#medicoagregado").html("");
        $("#medicinaagregada").html("");
        $("#patologiaagregada").html("");
        llenarmedicina();

        $("#opciones").hide();
        $("#panelentrada").show();
        $("#panellista").hide();
        $("#panelregistro").hide();
        var ventana = window.open("PlanillaApoyo.html?id="+militar.Persona.DatoBasico.cedula, "_blank");
    });*/
}

function limpiarMedicina(){
    $('#frmmedicina').each(function(){
        this.reset();
    });
}

/*function requisitosConcepto(){
    var modal = $("#cmbconcepto option:selected").attr("desplegar");
    if(modal != undefined){
        inactivarCheck(modal);
        $("#btnGenerar").attr("disabled",true);
        $("#"+modal).modal("show");
    }else{
        $("#btnGenerar").attr("disabled",false);
    }
}

function requisitosMonto(){
    var modal = "requisitosmonto";
    if(modal != undefined){
        inactivarCheck(modal);
        $("#btnGenerar").attr("disabled",true);
        $("#"+modal).modal("show");
    }
}*/

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
