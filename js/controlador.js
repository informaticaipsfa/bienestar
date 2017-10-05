let Util = new Utilidad();

class CuentaBancaria2 {
    constructor() {
        this.tipo = "";
        this.institucion = "";
        this.cuenta = "";
        this.titular = '';
        this.cedula = '';
    }
}

class Beneficiario {
    constructor() {
        this.rif = '';
        this.razonsocial = '';
        this.tipo = '';
        this.direccion = '';
        //this.Banco = new CuentaBancaria2();
    }
}

class Factura {
    constructor() {
        this.numero = '';
        this.control = '';
        this.fecha = '';
        this.monto = 0.00;
        this.montoaprobado= 0.00;
        this.porcentaje = 0.00;
        this.montootroaporte = 0.00;
        this.Beneficiario = new Beneficiario();
    }
}


class ConceptoReembolso {
    constructor() {
        this.descripcion = '';
        this.DatoFactura = new Factura();
        this.afiliado = '';
        this.requisito = new Array();
    }
}

class ConceptoApoyo {
    constructor() {
        this.descripcion = '';
        this.DatoFactura = new Factura();
        this.afiliado = '';
        this.patologia = "";
        this.montoaseguradora = 0.00;
        this.montoaportar = 0.00;
        this.requisito = new Array();
    }
}

class Seguimiento{
    constructor(){
        this.Estatus = 0;
        this.Observaciones = new Array();
    }
}

class Reembolso {
    constructor() {
        this.estatus = 0;
        this.montosolicitado = 0.00;
        //this.numero = '';
        //this.fechacreacion = '';
        //this.responsable = '';
        this.cuentabancaria = new CuentaBancaria2();
        this.Concepto = new Array();
        this.montoaprobado = 0.00;
        this.fechaaprobacion = '';
        this.requisito = new Array();
        this.observaciones = "";
        this.Direccion = new Direccion();
        this.Telefono = new Telefono();
        this.Correo = new Correo();
        this.Seguimiento = new Seguimiento();
    }
}

class Apoyo {
    constructor() {
        this.estatus = 0;
        this.montosolicitado = 0.00;
        this.cuentabancaria = new CuentaBancaria2();
        this.Concepto = new Array();
        this.montoaprobado = 0.00;
        this.fechaaprobacion = '';
        this.requisito = new Array();
        this.observaciones = "";
        this.Direccion = new Direccion();
        this.Telefono = new Telefono();
        this.Correo = new Correo();
        this.Seguimiento = new Seguimiento();
        this.tipo = 0;
        this.convenio = "";
    }
}


class Programa {
    constructor() {
        this.Apoyo = new Array();
        this.Reembolso = new Array();
        this.CartaAval = new Array();
        this.Farmacia = new Array();
    }
}

class ServicioMedico {
    constructor() {
        this.Programa = new Array();
    }
}

class CIS {
    constructor() {
        this.ServicioMedico = new Array();
        this.Gasto = new Array();
        this.Equipomedico = new Array();
    }
}

class Estado{
    constructor() {

    }
    Crear(Json) {
        if (sessionStorage.getItem('ipsfaEstado') == undefined ){
            sessionStorage.setItem('ipsfaEstado', JSON.stringify(Json));
        }
    }
    ObtenerEstados(){
        let estado = JSON.parse(sessionStorage.getItem('ipsfaEstado'));

        $("#cmbmestado").html('<option value="S" selected="selected"></option>');
        $("#cmbestadof").html('<option value="S" selected="selected"></option>');
        $.each(estado, function (c, v){
            $("#cmbmestado").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
            $("#cmbestadof").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
        });

    }
    ObtenerCiudadMunicipio(estado, nombre){
        var sciudad = 'cmbmciudad';
        var smunicipio = 'cmbmmunicipio';
        if ( nombre != undefined){
            sciudad = 'cmbciudadf';
            smunicipio = 'cmbmunicipiof';
        }
        var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
        $.each(cm, function(c, v){
            if (v.codigo == estado){

                let ciudad = v.ciudad;
                let municipio = v.municipio;
                $("#" + sciudad).html('<option value="S" selected="selected"></option>');
                $("#" + smunicipio).html('<option value="S" selected="selected"></option>');
                $.each(ciudad, function (c,v){
                    $("#" + sciudad).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
                });
                $.each(municipio, function (c,v){
                    $("#" + smunicipio).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
                });
            }
        });
    }
    ObtenerParroquia(estado, municipio, nombre){
        var sparroquia = 'cmbmparroquia';
        if ( nombre != undefined){
            sparroquia = 'cmbparroquiaf';
        }
        var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
        $.each(cm, function(c, v){
            if (v.codigo == estado){
                var mun = v.municipio;
                $.each(mun, function (c,v){
                    if(v.nombre == municipio){
                        $("#" + sparroquia).html('<option value="S"></option>');
                        $.each(v.parroquia, function(cl, vl){
                            $("#" + sparroquia).append('<option value="' + vl + '">' + vl + '</option>');
                        });
                    }
                });
            }
        });
    }
}

function IniciarSesion(){
  if (sessionStorage.getItem('ipsfaToken') != undefined ){

    var e = sessionStorage.getItem("ipsfaToken");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;


    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);

  }
}






let Usuario = {};
class Menu {
  constructor() {}
  ValidarPrivilegio(Json){
    var Menu = Json.perfil.privilegio;
  }
  //Crear Menu Dinamicamente
  Crear(Json) {

      var e = sessionStorage.getItem("ipsfaToken");
      var s = e.split(".");
      var MenuJS = JSON.parse(atob(s[1]));
      var Menu = MenuJS.Usuario.Perfil.Menu;
      var cadena = "<li class='header'>Menu</li>";
      Menu.forEach(v => {
        if(v.url != undefined){
          cadena += `<li><a href="${v.url}"><i class="${v.icono}"></i><span>${v.nombre}</span></a></li>`;
        }else{
          cadena += `<li><a href="#" onclick="${v.accion}"><i class="${v.icono}"></i><span>${v.nombre}</span></a></li>`;
        }
      });
			$('#_menu').html(cadena);
        verificarPrivilegioUsuario();
  }
}




var Conn = new Conexion();
var Estados = new Estado();
var Mnu = new Menu();
$(function () {


  var promesa = CargarAPI({
      sURL: Conn.URL + "estado",
      metodo: 'GET',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      Estados.Crear(JSON.parse(xhRequest.responseText));
  });
  CargarUrl("opciones","modulo_atencion");
  CargarUrl("_bxBuscar", "buscar");
  CargarUrl("panelperfil", "inc/perfil");
  CargarUrl("panellista", "inc/lstReembolsos");
  CargarUrl("panelentrada", "inc/opcionesPrograma");
  numeral.register('locale', 'es-es', {
      delimiters: {
          thousands: '.',
          decimal: ','
      },
      abbreviations: {
          thousand: 'k',
          million: 'mm',
          billion: 'b',
          trillion: 't'
      },
      ordinal: function (number) {
          var b = number % 10;
          return (b === 1 || b === 3) ? 'er' :
              (b === 2) ? 'do' :
                  (b === 7 || b === 0) ? 'mo' :
                      (b === 8) ? 'vo' :
                          (b === 9) ? 'no' : 'to';
      },
      currency: {
          symbol: 'Bs'
      }
  });
  numeral.locale('es-es');
  IniciarSesion();
  Mnu.Crear("Cargar...");
});


function verificarPrivilegioUsuario(){
    $.each(Usuario.Perfil.Privilegios,function (privilegio) {
        switch (this.nombre){
            case "afiliacion.salvar":
                $(".prvsalvar").attr("disabled",false);
                $(".prvsalvar").removeClass('hide');
                break;
            case "afiliacion.modificar":
                $(".prvmodificar").attr("disabled",false);
                $(".prvmodificar").removeClass('hide');
                break;
            case "afiliacion.carnet":
                $(".prvcarnet").attr("disabled",false);
                $(".prvcarnet").removeClass('hide');
                break;
            case "afiliacion.constancia":
                $(".prvcontancia").attr("disabled",false);
                $(".prvcontancia").removeClass('hide');
                break;

        }
    })
}

function CiudadMunicipio(valor){
    if (valor == undefined){
        Estados.ObtenerCiudadMunicipio($("#cmbmestado option:selected").val());
    }else{
        Estados.ObtenerCiudadMunicipio($("#cmbestadof option:selected").val(), true);
    }
}
function SeleccionarParroquia(valor){
    if (valor == undefined){
        Estados.ObtenerParroquia($("#cmbmestado option:selected").val(), $("#cmbmmunicipio option:selected").val());
    }else{
        Estados.ObtenerParroquia($("#cmbestadof option:selected").val(), $("#cmbmunicipiof option:selected").val(), true);
    }
}

function buzon(est){
    CargarUrl("panelderecho","inc/buzon");
    listaBuzon(est);
}

function msjRespuesta(texto) {
    $("#_contenido").html(texto);
    var botones = '<a type="button" href="starter.html" class="btn btn-primary">Continuar</a>';
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function msj2Respuesta(texto) {
    $("#_contenido").html(texto);
    var botones = '<a type="button" href="starter.html" class="btn btn-primary">Continuar</a>';
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function msjferespuesta(texto) {
    $("#_contenido").html("El militar se encuentra Activo.");
    var botones = '<a type="button" href="starter.html" class="btn btn-primary">Continuar</a>';
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function Principal(){

}

function PanelEntrada(){
  $("#opciones").show();
  $("#panelentrada").hide();
  $("#panellista").hide();
  $("#panelregistro").hide();
}

function PanelOpciones(){
  $("#opciones").hide();
  $("#panelentrada").show();
  $("#panellista").hide();
  $("#panelregistro").hide();
  $("#panelperfil").show();
}

function PanelListadoDetallado(){
  $("#tblTodos").show();
  $("#tblreembolsos").slideDown();
  $("#tblapoyos").slideDown();
  $("#tblcartas").slideDown();
  $("#lstDetalle").hide();
  $("#lstDetalleApoyo").hide();
  $("#lstDetalleCarta").hide();
}

function ConsultarID(e){
  if (e.keyCode == 13) {
      Buscar();
  }
}
