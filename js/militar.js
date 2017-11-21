'use strict';
/**
Desarrollado por  :
Correo            :
Modifcado    por  :
Correo persona mod:
Fecha Creacion    :  11-07-2017
Fecha Modificacion:  11-07-2017
Descripcion       :  Clases, metodos y funciones de Militares
*/
class DatoBasico{
	constructor(){
		this.cedula = "";
		this.nropersona = 0;
		this.nacionalidad = "";
		this.nombreprimero = "";
		this.nombresegundo = "";
		this.apellidoprimero = "";
		this.apellidosegundo = "";
		this.fechanacimiento = "";
		this.fechadefuncion = "";
		this.nropasaporte = "";
		this.sexo = "";
		this.estadocivil = "";

	}

	NombreCompleto(){
		return this.nombreprimero + " " + this.nombresegundo;
	}

	ApellidoCompleto(){
		return this.apellidoprimero + " " + this.apellidosegundo;
	}

	NombreApellido(){
		return this.NombreCompleto() + " " + this.ApellidoCompleto();
	}

	Sexo(){
		return (this.sexo == "F")?"FEMENINO":"MASCULINO";
	}

	Nacionalidad(){
		let nacionalidad = "VENEZOLANA";
		if (this.nacionalidad == "E"){
			nacionalidad = "EXTRANJERA"
		}
		return nacionalidad;
	}

	GenerarEstadoCivil(){
		let estadocivil= "";
		switch(this.estadocivil) {
			case "C":
			estadocivil =(this.Persona.DatoBasico.sexo=="F")?"CASADA":"CASADO";
			break;
			case "D":
			estadocivil = (this.Persona.DatoBasico.sexo=="F")?"DIVORCIADA":"DIVORCIADO";
			break;
			case "S":
			estadocivil = (this.Persona.DatoBasico.sexo=="F")?"SOLTERA":"SOLTERO";
			break;
			case "V":
			estadocivil = (this.Persona.DatoBasico.sexo=="F")?"VIUDA":"VIUDO";
			break;
			default:
			estadocivil = "";
			break;
		}
		return estadocivil;
	}

}

class DocumentoCivil{
	constructor(){
		this.archivo = "";
	}

	ActaMatrimonio(){
		this.registrocivil = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
		this.archivo = "";
		return this;
	}

	ActaDivorcio(){
		this.tribunal = "";
		this.numerosentencia = "";
		this.fechasentencia = "";
		this.archivo = "";
		return this;
	}

	CartaSolteria(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

	ConstanciaViudez(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

	ActaDefuncion(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

}

class  DatoFisico{
	constructor(){
		this.peso = 0.0;
		this.talla = 0.0;
	}
}

class DatoFisionomico{
	constructor(){
		this.colorpiel = "";
		this.colorojos = "";
		this.colorcabello = "";
		this.estatura = "";
		this.senaParticular = "";
		this.gruposanguineo = "";
	}

	ObtenerCabello(){
		var cad = "";
		switch (this.colorcabello){
			case "NE":cad = "NEGRO";break;
			case "BA":cad = "BLANCO";break;
			case "CA":cad = "CASTAÑO";break;
			case "MA":cad = "MARRON";break;
			case "AM":cad = "AMARILLO";break;
			case "AZ":cad = "AZUL";break;
			case "VI":cad = "VIOLETA";break;
			case "CV":cad = "CALVO";break;
			case "GR":cad = "GRIS";break;
			default: cad = "********";break;
		}
		return cad;
	}
	ObtenerPiel(){
		var cad = "";
		switch (this.colorpiel){
			case "NE":cad = "NEGRA";break;
			case "BL":cad = "BLANCA";break;
			case "CA":cad = "CANELA";break;
			case "MO":cad = "MORENA";break;
			case "TR":cad = "TRIGUEÑA";break;
			case "MO":cad = "MORENA";break;
			case "RO":cad = "ROSADA";break;
			default: cad = "********";break;
		}
		return cad;
	}

	ObtenerOjo(){
		var cad = "";
		switch (this.colorojos){
			case "AM":cad = "ÁMBAR";break;
			case "AV":cad = "AVELLANA";break;
			case "CA":cad = "CASTAÑO";break;
			case "VE":cad = "VERDE";break;

			case "AZ":cad = "AZUL";break;
			case "GR":cad = "GRIS";break;
			case "NE":cad = "NEGRO";break;
			case "MA":cad = "MARRON";break;
			case "PA":cad = "PARDO";break;

			default: cad = "********";break;
		}
		return cad;
	}
}

class Correo{
	constructor(){
		this.principal = "";
		this.alternativo = "";
		this.institucional = "";
	}
}


class RedSocial{
	constructor(){
		this.twitter = "";
		this.facebook = "";
		this.instagram = "";
		this.linkedin = "";
	}
}

class Telefono{
	constructor(){
		this.movil = "";
		this.domiciliario = "";
		this.emergencia = "";
	}
}


class Direccion{
	constructor(){
		this.tipo = 0;
		this.estado = "";
		this.ciudad = "";
		this.municipio = "";
		this.parroquia = "";
		this.calleavenida = "";
		this.casa = "";
		this.apartamento = "";
		this.numero = 0;
	}
}

class Carnet{
	constructor(){
		this.idcarnet = "";
		this.tipo = "";
		this.condicion = "";
		this.serial = "";
		this.codigocomponente = "";
		this.fechacreacion = "";
		this.fechavencimiento = "";
		this.responsable = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
	}
}


class Familiar{
	constructor(){
		this.id = "";
		this.Persona = new Persona();
		this.parentesco = "";
		this.esmilitar = "";
		this.condicion = 0;
		this.estudia = 0;
		this.beneficio = true;
		this.documento = 0;
		this.documentopadre = "";
		this.historiamedica = "";
		this.donante = "";
		this.serial = "";
	}
	GenerarParentesco(){
		var parentesco= "";
		switch(this.parentesco) {
			case "PD":
			parentesco =(this.Persona.DatoBasico.sexo=="F")?"MADRE":"PADRE";
			break;
			case "HJ":
			parentesco = (this.Persona.DatoBasico.sexo=="F")?"HIJA":"HIJO";
			break;
			case "EA":
			parentesco = (this.Persona.DatoBasico.sexo=="F")?"ESPOSA":"ESPOSO";
			break;
			default:
			parentesco = "";
			break;
		}
		return parentesco;
	}

}

class Tim{
	constructor(){
		this.fechacreacion = "";
		this.fechavencimiento = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
		this.firma = "";
		this.huella = "";
	}
}

class Componente{
	constructor(){
		this.nombre = "";
		this.descripcion = "";
		this.abreviatura = "";
	}
	Crear(componente){
		var grado = $("#cmbgrado").val();
		$("#cmbgrado").html('<option selected="selected" value="S"></option>');
		componente.Grado.forEach( v => {
			$("#cmbgrado").append('<option selected="selected" value="' + v.codigo + '">' + v.descripcion + '</option>')
		});

		$("#cmbgrado").val('S');
		if (grado != "" || grado != "S"){
			$("#cmbgrado").val(grado);
		}
	}
	GenerarComponente(){
		let abreviatura= "";
		switch(this.abreviatura) {
			case "EJ":
			descripcion ="EJÉRCITO BOLIVARIANO";
			nombre ="EJÉRCITO";
			break;
			case "AV":
			descripcion ="AVIACION MILITAR BOLIVARIANA";
			nombre ="AVIACION";
			break;
			case "GN":
			descripcion ="GUARDIA NACIONAL BOLIVARIANA";
			nombre ="GUARDIA NACIONAL";
			break;
			case "AR":
			descripcion ="ARMADA BOLIVARIANA";
			nombre ="ARMADA";
			break;
			default:
			descripcion = "";
			break;
		}
		return abreviatura;
	}



}

class Grado{
	constructor(){

		this.nombre = "";
		this.descripcion = "";
		this.abreviatura = "";
	}
	Obtener(){
		return this;
	}
}

class DatoFinanciero{
	constructor(){
		this.tipo = "";
		this.institucion = "";
		this.cuenta = "";
	}
}

class Persona{
	constructor(){
		this.DatoBasico = new DatoBasico();
		this.CuentaBancaria = new CuentaBancaria();
		this.DatoFisico = new DatoFisico();
		this.Correo = new Correo();
		this.DatoFisionomico = new DatoFisionomico();
		this.Direccion = [];
		this.DatoFinanciero = [];
		this.Telefono = new Telefono();
		this.PartidaNacimiento = new PartidaNacimiento();
		this.Defuncion = new Defuncion();
		this.DocumentoCivil = new DocumentoCivil();
		this.RedSocial = new RedSocial();
		this.foto = "";
		this.huella = "";
		this.firma = "";

		this.CondicionEspecial = new CondicionEspecial();
	}
}

class PartidaNacimiento{
	constructor(){
		this.registro = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
	}
}

class Defuncion{
	constructor(){
		this.registrocivil = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
	}
}

class Recibo{
	constructor(){
		this.id = "";
		this.idf = "";
		this.motivo = "";
		this.numero = 0;
		this.canal = "";
		this.fecha = "";
		this.monto = 0.0;
	}

}


class Medicina {
	constructor() {
		this.nombrecomercial = '';
		this.presentacion = '';
		this.dosis = "";
		this.cantidad="";
		this.fechainicio='';
		this.fechavencimiento='';
	}
}


class WMedicina{
	constructor(){
		this.id = "";
		this.idf = "";
		this.Medicina = new Array();
		this.afiliado = "";
		this.Direccion = new Direccion();
		this.Telefono = new Telefono();
		this.Correo = new Correo();
	}
}



class Factura2{
	constructor() {
		this.Beneficiario = new Beneficiario();
	}
}

class ConceptoCarta{
	constructor(){
		this.motivo = "";
		this.diagnostico = "";
		this.descripcion = '';
		this.DatoFactura = new Factura2();
		this.afiliado = '';
		this.requisito = new Array();
		this.montoafiliado = 0.00;
		this.porcentajeafi = 0.00;
	}
}

class Carta {
	constructor() {
		this.estatus = 0;
		this.montosolicitado = 0.00;
		this.cuentabancaria = new CuentaBancaria2();
		this.Concepto = new Array();
		this.montoaprobado = 0.00;
		this.requisito = new Array();
		//this.observaciones = "";
		this.Direccion = new Direccion();
		this.Telefono = new Telefono();
		this.Correo = new Correo();
		this.Seguimiento = new Seguimiento();
		this.fondo = "";
	}
}

class WCarta{
	constructor(){
		this.id = "";
		this.Carta = new Carta();
		this.nombre = "";
	}
}

class WReembolso {
	constructor() {
		this.id = "";
		this.Reembolso = new Reembolso();
		this.nombre = "";
		this.posicion = 0;
		this.observaciones = "";
	}
}

class WApoyo {
	constructor() {
		this.id = "";
		this.Apoyo = new Apoyo();
		this.nombre = "";
		this.posicion = 0;
		this.observaciones = "";
	}
}

class WFedeVida {
	constructor () {
		this.id = "";
		this.nombre = "";
		this.Direccion = new Direccion();
		this.Telefono = new Telefono();
		this.Correo = new Correo();
		this.idf = "";
		this.direccionex = "";
		this.paisex = "";
		this.residenciadoex = "";
		this.fechaex = "";
	}
}



class Militar{
	constructor(){
		this.id = "";
		this.tipodato = 0;
		this.Persona = new Persona();
		this.categoria = "";
		this.situacion = "";
		this.clase = "";
		this.fingreso = "";
		this.fascenso = "";
		this.areconocido = 0;
		this.mreconocido = 0;
		this.dreconocido = 0;
		this.posicion = 0;
		this.fresuelto = "";
		this.nresuelto = 0;
		this.descripcionhistorica = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
		this.urlsimbolo = "";
		this.urlfirmaministro = "";
		this.urlpresidenteipsfa = "";
		this.urlfoto = "";
		this.urlhuella = "";
		this.urlfirma = "";
		this.urlcedula = "";
		this.codigocomponente = "";
		this.numerohistoria = "";
	}

	Cargar(militar){

		this.id = militar.id;
		this.tipodato = militar.tipodato;

		this.Persona.DatoBasico = militar.Persona.DatoBasico;
		var DFis = militar.Persona.DatoFisionomico;


		this.Persona.DatoFisionomico.colorojos = DFis.colorojos;
		this.Persona.DatoFisionomico.colorpiel = DFis.colorpiel;
		this.Persona.DatoFisionomico.colorcabello = DFis.colorcabello;
		this.Persona.DatoFisionomico.estatura = DFis.estatura;
		this.Persona.DatoFisionomico.gruposanguineo = DFis.gruposanguineo;

		this.categoria = militar.categoria;
		this.situacion = militar.situacion;
		this.clase = militar.clase;
		this.fingreso = militar.fingreso ;
		this.fascenso = militar.fascenso;
		this.areconocido = militar.areconocido;
		this.mreconocido = militar.mreconocido;
		this.dreconocido = militar.dreconocido;
		this.posicion = militar.posicion ;
		this.fresuelto = militar.fresuelto;
		this.nresuelto = militar.nresuelto;
		this.descripcionhistorica = militar.descripcionhistorica;
		this.Componente.abreviatura = militar.Componente.abreviatura;
		this.Componente.descripcion = militar.Componente.descripcion;
		this.Grado.abreviatura = militar.Grado.abreviatura;
		this.Grado.descripcion = militar.Grado.descripcion;
		this.urlsimbolo = "";
		this.urlfirmaministro = "";
		this.urlpresidenteipsfa = "";
		this.urlfoto = "";
		this.urlhuella = "";
		this.urlfirma = "";
		this.urlcedula = "";
		this.codigocomponente = militar.codigocomponente;
		this.numerohistoria = militar.numerohistoria;
	}
	Obtener(){
		var fingreso = new Date(Util.ConvertirFechaUnix($("#txtfechagraduacion").val())).toISOString();
		var fnacimiento = new Date(Util.ConvertirFechaUnix($("#txtnacimiento").val())).toISOString();
		var fresuelto = new Date(Util.ConvertirFechaUnix($("#txtmfecharesuelto").val())).toISOString();
		var fascenso = new Date(Util.ConvertirFechaUnix($("#txtmfechaultimoascenso").val())).toISOString();

		this.id = $("#txtcedula").val();
		this.Persona.DatoBasico.nacionalidad = "V";

		this.Persona.DatoBasico.cedula = $("#txtcedula").val();
		this.Persona.DatoBasico.nombreprimero = $("#txtnombre").val().toUpperCase();
		this.Persona.DatoBasico.apellidoprimero = $("#txtapellido").val().toUpperCase();
		this.Persona.DatoBasico.fechanacimiento = fnacimiento;
		this.Persona.DatoBasico.sexo = $("#cmbsexo option:selected").val();
		this.Persona.DatoBasico.estadocivil = $("#cmbedocivil").val();
		this.fingreso = fingreso;
		this.fascenso = fascenso;
		this.fresuelto = fresuelto;
		this.nresuelto = $("#txtnresuelto").val().toUpperCase()	;
		this.posicion = parseInt($("#txtposicion").val());
		this.situacion = $("#cmbsituacion option:selected").val();
		this.categoria = $("#cmbcategoria option:selected").val();
		this.clase = $("#cmbclase option:selected").val();
		this.Componente.descripcion = $("#cmbcomponente option:selected").text();
		this.Componente.abreviatura = $("#cmbcomponente option:selected").val();
		this.Grado.descripcion = $("#cmbgrado option:selected").text();
		this.Grado.abreviatura = $("#cmbgrado option:selected").val();
		this.Persona.CuentaBancaria.banco = $("#cmbinstfinanciera option:selected").val();
		this.Persona.CuentaBancaria.tipocuenta = $("#cmbtipofinanciera option:selected").val();
		this.Persona.CuentaBancaria.numerocuenta = $("#txtnrocuenta").val();

		var dir = new Direccion();
		dir.tipo = 0;
		dir.estado = $("#cmbmestado option:selected").val();
		dir.municipio = $("#cmbmmunicipio option:selected").val();
		dir.parroquia = $("#cmbmparroquia option:selected").val();
		dir.ciudad = $("#cmbmciudad").val();
		dir.calleavenida = $("#txtmcalle").val().toUpperCase();
		dir.casa = $("#txtmcasa").val().toUpperCase();
		dir.apartamento = $("#txtmapto").val().toUpperCase();
		this.Persona.Direccion[0] = dir;

		var banco = new DatoFinanciero();
		banco.tipo = $("#cmbmtipofinanciera option:selected").val();
		banco.cuenta = $("#txtmnrocuenta").val();
		banco.institucion = $("#cmbminstfinanciera option:selected").val();
		this.Persona.DatoFinanciero[0] = banco;

		this.Persona.Correo.principal = $("#txtmcorreo").val().toUpperCase();
		this.Persona.Telefono.domiciliario = $("#txtmtelefono").val();
		this.Persona.Telefono.movil = $("#txtmcelular").val();
		this.Persona.PartidaNacimiento.registro= $("#txtpregistrocivil").val();
		this.Persona.PartidaNacimiento.ano = $("#txtpano").val();
		this.Persona.PartidaNacimiento.acta = $("#txtpacta").val();
		this.Persona.PartidaNacimiento.folio = $("#txtpfolio").val();
		this.Persona.PartidaNacimiento.libro = $("#txtplibro").val();
		this.Persona.DatoFisico.peso = $("#txtmpeso").val();
		this.Persona.DatoFisico.talla = $("#txtmtalla").val();
		this.Persona.DatoFisionomico.colorpiel = $("#cmbmpiel option:selected").val();
		this.Persona.DatoFisionomico.colorojos = $("#cmbmojos option:selected").val();
		this.Persona.DatoFisionomico.colorcabello = $("#cmbmcolorcabello option:selected").val();
		this.Persona.DatoFisionomico.estatura = parseFloat($("#txtmestatura").val());
		this.Persona.DatoFisionomico.senaParticular = $("#txtmsenaparticular").val().toUpperCase();
		this.Persona.DatoFisionomico.gruposanguineo = $("#cmbmgruposanguineo").val().toUpperCase();
		this.Persona.RedSocial.twitter = $("#txtmtwitter").val().toUpperCase();
		this.Persona.RedSocial.facebook = $("#txtmfacebook").val().toUpperCase();
		this.Persona.RedSocial.instagram = $("#txtminstagran").val().toUpperCase();
		this.codigocomponente = $("#txtcodigocomponente").val();
		this.numerohistoria =   $("#txtnumhistoriaclinica").val();
		return this;
	}
	ObtenerCategoria(){
		var cad = "";
		switch (this.categoria){
			case "EFE":cad = "EFECTIVO";break;
			case "ASI":cad = "ASIMILADO";break;
			default: cad = "********";break;
		}

		if(this.situacion != "ACT"){
			cad = "RESERVA ACTIVA";
		}
		return cad;
	}

}

class CuentaBancaria{
	constructor(){
		this.banco = "";
		this.tipocuenta = "";
		this.numerocuenta = "";
	}
}

class CondicionEspecial{
	constructor(){
		this.fecha = "";
		this.tipodiscapacidad = 0;
		this.diagnostico = "";
		this.nombrehospitalmilitar="";
	}
}
class Clave {
	constructor(){
		this.login = "";
		this.clave = "";
		this.nueva = "";
		this.repetir = "";
	}
	Obtener(){
		this.login = Usuario.usuario;
		this.clave = $("#claveA").val();
		this.nueva = $("#claveN").val();
		this.repetir = $("#claveN2").val();
		return this;
	}
	Salvar(){
		var url = Conn.URL + "wusuario";
		var promesa = CargarAPI({
			sURL: url,
			metodo: 'PUT',
			valores: this.Obtener()
		});
		promesa.then(function (xhRequest) {
			var respuesta = JSON.parse(xhRequest.responseText);
			if ( respuesta.tipo == 1){
				$.notify({
        	title: '<strong>Felicitaciones: </strong>',
        	message: 'Su clave ha sido cambiada exitosamente'

        },{
        	type: 'success',
          animate: {
        		enter: 'animated rollIn',
        		exit: 'animated rollOut'
        	}
        });
			}else{
				$.notify({
        	title: '<strong>Error: </strong>',
        	message: 'Su clave no ha sido cambiada, verifique los datos he intente nuevamente'

        },{
        	type: 'danger',
          animate: {
        		enter: 'animated rollIn',
        		exit: 'animated rollOut'
        	}
        });
			}
		});
	}
}


function CerrarSession(){
	sessionStorage.removeItem('ipsfaToken');
	$(location).attr("href","../index.html");
}

$(function (){

	if (sessionStorage.getItem('ipsfaToken') == undefined ){
		$(location).attr("href","../index.html");
	}else{
		$("#_body").show();
	}
});

let militar = new Militar();
