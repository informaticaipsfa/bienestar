// let lstBuzonCarta = null;



***

// //Carta Aval
// var url3 = Conn.URL + "wcarta/listar/" + est;
// var promesaCarta = CargarAPI({
//     sURL: url3,
//     metodo: 'GET',
//     valores: ''
// });
// promesaCarta.then(function (xhRequest) {
//     lstBuzonCarta = JSON.parse(xhRequest.responseText);
//     if(lstBuzonCarta != null) crearBuzonCarta(est);
// });



/**CARTA AVAL***/
// function crearBuzonCarta(est) {
//     $("#listaCarta").html(`<li style="background-color:#CCCCCC">
//         <div class="row">
//             <div class="col-sm-1"><b>Carta</b></div>
//             <div class="col-sm-1"><b>Cedula</b></div>
//             <div class="col-sm-3"><b>Nombre y Apellido</b></div>
//             <div class="col-sm-1"><b>F.Solicitud</b></div>
//             <div class="col-sm-2"><b>M.Solicitud</b></div>
//             <div class="col-sm-2"><b>M.Aprobado</b></div>
//             <div class="col-sm-1"><b>Estatus</b></div>
//         </div>
//     </li>`);
//
//   lstBuzonCarta.forEach(v => {
//       $("#listaCarta").append(CargarBuzonCarta(v, est));
//   });
// }
//
// /**
// * Cargar Datos del Buzones del sistema
// *
// * @param {object}
// * @return void
// */
// function CargarBuzonCarta(v, est){
//   var alertSegui = "";
//   switch (v.estatusseguimiento){
//       case 1:
//           alertSegui = '<small class="label label-danger"><i class="fa fa-info-circle"></i>Pendientes</small>';
//           break;
//       case 2:
//           alertSegui = '<small class="label label-info"><i class="fa fa-comment-o"></i>Recomendacion</small>';
//           break;
//   }
//   var fcrea =  Util.ConvertirFechaHumana(v.fechacreacion);
//   var msoli = numeral(parseFloat(v.montosolicitado)).format('0,0[.]00 $');
//   var mapro = numeral(parseFloat(v.montoaprobado)).format('0,0[.]00 $');
//   var estatus = conviertEstatus(v.estatus) + alertSegui;
//   return `<li><div class="row">
//             <div class="col-sm-1"><span class="text">
//               <a href="#" onclick="detalleBuzon('${v.id}','${v.numero}','${est}','C')">${v.numero}</a></span></div>
//             <div class="col-sm-1"><span class="text">${v.id}</span></div>
//             <div class="col-sm-3">${v.nombre}</div>
//             <div class="col-sm-1">${fcrea}</div>
//             <div class="col-sm-2">${msoli}</div>
//             <div class="col-sm-2">${mapro}</div>
//             <div class="col-sm-1">${estatus}</div>
//             <div class="tools" style="margin-right: 50px;">
//                 <i class="fa  fa-check-square" style="color: green"
//                   onclick="verificarAprobacion('${v.numero}','${v.estatus}','${v.id}')"></i>
//                 <i class="fa fa-trash-o" onclick="verificarRechazo('${v.numero}','${v.estatus}','${v.id}')"></i>
//                 </div>
//             </div>
//           </li>`;
// }
//
//
//
// function llenarBuzonCarta(numero,est) {
//
//     $('#lblcedulaCarta').text(militarActivo.Persona.DatoBasico.cedula);
//     var ncompleto = militarActivo.Persona.DatoBasico.nombreprimero + " " + militarActivo.Persona.DatoBasico.apellidoprimero;
//     $('#lblnombreCarta').text(ncompleto);
//     $('#lblgradoCarta').text(militarActivo.Grado.descripcion);
//     $('#lblsituacionCarta').text(Util.ConvertirSitucacion(militarActivo.situacion));
//     $('#lblnumeroCarta').text(numero);
//     $('#lblcomponenteCarta').text(militarActivo.Componente.descripcion);
//
//     var rutaimg = Conn.URLIMG;
//     url = rutaimg + militarActivo.Persona.DatoBasico.cedula + ".jpg";
//     if (militarActivo.Persona.foto != undefined) {
//         rutaimg = Conn.URLTEMP;
//         url = rutaimg + militarActivo.Persona.DatoBasico.cedula + "/foto.jpg";
//     }
//     $("#fotoperfilCarta").attr("src", url);
//
//     crearTablaConceptosCarta(numero,est);
//
//     mostrarTextoObservacion(est);
//
//     $('#listasProgramas').hide();
//     $('#detalleCarta').show();
// }
//
// function crearTablaConceptosCarta(numero,est){
//     var fila = "";
//     var pos = 0;
//
//     var lst = militarActivo.CIS.ServicioMedico.Programa.CartaAval;
//     var i = 0;
//     $.each(lst, function () {
//         if (this.numero == numero) {
//             pos = i;
//             posicionModificar = i;
//         }
//         i++;
//     });
//     copia = lst[pos];
//     $("#estSeguimientoCarta").val(copia.Seguimiento.Estatus);
//     if(est > 2){
//         activarCambioEstatus("carta");
//     }
//     $("#cuerpoEditarConceptosCarta").html('');
//     copia.Concepto.forEach(v => {
//         var mntApo = v.DatoFactura.monto;
//         if(v.DatoFactura.montoaprobado > 0) mntApo = v.DatoFactura.montoaprobado;
//
//         fila = `<tr>
//               <td>${v.afiliado}</td>
//               <td>${v.descripcion}</td>
//               <td>${v.DatoFactura.Beneficiario.rif}</td>
//               <td style="display: none">${v.DatoFactura.Beneficiario.razonsocial}</td>
//               <td>${v.DatoFactura.monto}</td>
//               <td><input type="text" value="${v.montoaseguradora}" class="numfact"></td>
//               <td class="mntsoli">${v.montoaportar}</td>
//               <td>
//                 <input type="text" value="${vmntApo}" class="mntAcumulado" onkeypress="return Util.SoloNumero(event,this,true)" onblur="calcularAcumulado()">
//               </td>
//               <td style="width: 7%;">
//                 <button type="button" class="btn btn-default btn-sm borrarconcepto" title="Eliminar"><i class="fa fa-trash-o" style="color: red;"></i></button>
//               </td>
//             </tr>`;
//         $("#cuerpoEditarConceptosCarta").append(fila);
//     });
//     $("#totalterCarta").html(copia.montosolicitado.toFixed(2));
//     $("#totalaproCarta").html(copia.montoaprobado);
//     $(".borrarconcepto").click(function () {
//         $(this).parents('tr').eq(0).remove();
//         if ($("#cuerpoEditarConceptosCarta tr").length == 0) {
//
//         }
//         calcularAcumulado("carta");
//     });
//
//     /**
//      * Crear tabla de objservaciones
//      */
//     if (copia.Seguimiento.Observaciones != undefined) {
//         var lstObs = copia.Seguimiento.Observaciones;
//         $("#cuerpoObservacionesCarta").html('');
//         $("#cuerpoOpinionesCarta").html('');
//         $.each(lstObs, function () {
//             var tipo = this.contenido.split("|||");
//             if(tipo[1] != undefined) $("#cuerpoOpinionesCarta").append('<tr><td>' + tipo[0] + '</td><td>'+conviertEstatus(copia.estatus)+'</td></tr>');
//             else $("#cuerpoObservacionesCarta").append('<tr><td>' + this.contenido + '</td><td></td></tr>');
//         });
//     }
// }
