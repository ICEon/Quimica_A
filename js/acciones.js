// JavaScript Document
 
$(document).ready(function(e) {
var pulsado ="";
var primera = 0;
var mostrarCual = 0;
var simboloCorrecto="";
var bandera=0;
var	ancho = $('#principal').width();	 
var	alto = $('body').height();	
var botonCorrecto = "";
var    velocidad = 2800 -(alto*.4);
    $('.boton').css('width', ancho*.20);
	$('.boton').css('height', ancho*.20);
    $('.boton').css('font-size', ancho*.15);
	$('#elementoEncontrar').css('font-size', ancho*.1);
	$('.carril').css('width', ancho*.20);
    $('.carril').css('height', alto*.80);
	$('.adivinar').css('height', ancho*.20);    	
    $('#tablero span').css('font-size', ancho*.11);
var	alto_footer = $('#comandos').height();	
    //alert (alto + "footer " + alto_footer);

var elementoEncontrar = 0;
var aciertos = 0;
var db;
var otroElemento1 = 0;
var otroElemento2 = 0;
var inicial = $('#uno').position().top;

var opcionesJSON = '{"opcion": [ {"uno":"uno", "dos":"dos","tres":"tres"},{"uno":"uno", "dos":"tres","tres":"dos"},{"uno":"dos", "dos":"tres","tres":"uno"},{"uno":"dos", "dos":"uno","tres":"tres"},{"uno":"tres", "dos":"uno","tres":"dos"},{"uno":"tres", "dos":"dos","tres":"uno"}]}';


var azar = JSON.parse(opcionesJSON);


//*************************


function conectar_base()
 {
  db = window.sqlitePlugin.openDatabase({name: "quimica_b.db", createFromLocation: 1});
 }
 
 
$(document).ready(function(e) {
	
document.addEventListener("deviceready", onDeviceReady, false);


 function onDeviceReady() {
	 audio = window.plugins.LowLatencyAudio;	
audio.preloadFX('error', 'recursos/sonidos/error.mp3', function(msg){}, function(msg){ alert( 'Error: ' + msg ); });	
audio.preloadFX('acierto', 'recursos/sonidos/acierto.mp3', function(msg){}, function(msg){ alert( 'Error: ' + msg ); });	
 conectar_base();

 $('#btnjugar').on('tap', function(){
	 primera = 0;
	 nuevoElemento();
 });// tap btnjugar
 
 
 function nuevoElemento()
  {
	  
	 /* $('.carril span').each(function() {
		   $(this).html("");
	 });*/
		   botonCorrecto="";
					  $("#quien").popup();
   elementoEncontrar = Math.floor((Math.random() * 118) + 1);
			//alert (elementoEncontrar); 
			
   db.transaction(function(tx) {
        tx.executeSql("select numeroAtomico, nombreElemento from elementos where numeroAtomico = " + elementoEncontrar + ";", [], function(tx, res) {

			$("#elementoEncontrar").html(res.rows.item(0).nombreElemento);			
			$("#elementoActual").html(res.rows.item(0).nombreElemento);
			
        });
      });
	  if (primera == 0)
	   {
	$(':mobile-pagecontainer').pagecontainer('change', '#juego',{
            transition: 'pop'
			}); 
		primera=1;	
	   }
  $('#encontrados').html(aciertos);
  $("#quien").popup("open",{transition: "flip"});
  donde = Math.floor((Math.random() * 6) + 1);
   // alert (donde + "," + azar.opcion[donde].uno);
/*  do 
   {
	 otrosElementos();  
	 alert (elementoEncontrar + " "+otroElemento1 + " " +otroElemento2);
	 alert ("dentro");
   }

   while (((elementoEcontrar != otroElemento1) && (otroElemento1 != otroElemento2) && (otroElemento2 != elementoEncontrar)));
*/
   	 otrosElementos();  


      if (azar.opcion[donde].uno == "uno")
	 {

	   botonCorrecto = "buno";
	 }
	 else if (azar.opcion[donde].uno == "dos")
	  {

	   botonCorrecto = "bdos";
	  }
	  
	  	 else if (azar.opcion[donde].uno == "tres")
	  {

	   botonCorrecto = "btres";
	  }
  
  

   db.transaction(function(tx) {
        tx.executeSql("select simbolo from elementos where numeroAtomico = " + elementoEncontrar + ";", [], function(tx, res) {
			
			$("#" + azar.opcion[donde].uno).html(res.rows.item(0).simbolo);
			simboloCorrecto = res.rows.item(0).simbolo;

			
        });
      });
      db.transaction(function(tx) {
        tx.executeSql("select simbolo from elementos where numeroAtomico = " + otroElemento1 + ";", [], function(tx, res) {
			$("#" + azar.opcion[donde].dos).html(res.rows.item(0).simbolo);
			
        });
      });


   db.transaction(function(tx) {
        tx.executeSql("select simbolo from elementos where numeroAtomico = " + otroElemento2 + ";", [], function(tx, res) {
			$("#" + azar.opcion[donde].tres).html(res.rows.item(0).simbolo);
			
        });
       });

  
  
  
  }

function otrosElementos()
 {
	otroElemento1 = Math.floor((Math.random() * 118) + 1);
	otroElemento2 = Math.floor((Math.random() * 118) + 1);
 }

 $('#btncontinuar').on('tap', function (){
  pulsado="";
  bandera=0;
  $('.boton').removeClass('elementoCorrecto');
  $("#quien").popup("close",{transition: "flip"});
  

animarCaida();
 });
 

$('.boton').on('tap', function(){
	//alert (botonCorrecto+"--"+$(this).attr('id'));
	
   
   if (botonCorrecto == $(this).attr('id'))
    {
    pulsado = $(this).attr('id');
	
	}

 });

$('#btn_otro_elemento').on('tap', function(){
   $("#acierto").popup('close', {transition: "flip"});	
   
	
});

$('#btn_error_elemento').on('tap', function(){
   $("#error").popup('close', {transition: "flip"});	
   
	
});


$(document).on("popupafterclose", "#acierto", function () {
	nuevoElemento();

});

$(document).on("popupafterclose", "#error", function () {
	nuevoElemento();

});


 function revisar()
  {
   if (bandera==0)
    {	  
	  $('.simbolo_elemento').html(simboloCorrecto);
	  $('.nombre_elemento').html($("#elementoActual").html());
	if (pulsado!="")
	 {
	  aciertos = aciertos + 1;
	  
      $("#acierto").popup();
  	  audio.play('acierto');
	  $("#acierto").popup('open', {transition: "slide"});	
	 }
	 else
	  {
      $("#error").popup();
      navigator.notification.vibrate(500);
	  $("#error").popup('open', {transition: "slide"});	
	  }
	 	bandera=1; 
	}
  }
 

 function animarCaida(){
  //	alert (velocidad); 	 

  $('#uno').css('top', inicial -100);
  $('#tres').css('top', inicial -50);
  $('#dos').css('top', inicial -10);
  $("#tablero span")
  //.css({top:0,position:'relative'})
  .animate({top: alto*.80}, velocidad, function() {
    revisar();
	 
  });



 }//animar caida
 
 
 
 
 }


$("#btn_sonido").on('click',function(){
		if($("#btn_sonido").hasClass('ui-icon-audio'))
			{
			 db.transaction(function(tx) {

              tx.executeSql("UPDATE configuracion SET sonido = (?) WHERE id = 1", [0], function(tx, res) {
				  sonido=0;
			  			$("#btn_sonido").removeClass('ui-icon-audio');
			$("#btn_sonido").addClass('ui-icon-delete');
			alert('El sonido se apagó');
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });


			}
		else
			{
			 db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET sonido = (?) WHERE id = 1", [1], function(tx, res) {
				  sonido=1;
			$("#btn_sonido").removeClass('ui-icon-delete');
			$("#btn_sonido").addClass('ui-icon-audio');
			alert('El sonido se aprendió');
								audio.play('acierto');
			  
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });

			}
	});//click btn_sonido
	
	$("#btn_vibrar").on('click',function(){
		if($("#btn_vibrar").hasClass('ui-icon-power'))
			{db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET vibrar = (?) WHERE id = 1", [0], function(tx, res) {
				  vibrar = 0;
			  			$("#btn_vibrar").removeClass('ui-icon-power');
			$("#btn_vibrar").addClass('ui-icon-delete');
			alert('Se apagó la vibracion');
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });

			}
		else
			{
			db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET vibrar = (?) WHERE id = 1", [1], function(tx, res) {
				  vibrar = 1;
			  			$("#btn_vibrar").removeClass('ui-icon-delete');
			$("#btn_vibrar").addClass('ui-icon-power');
			alert('Se aprendió la vibracion');
			navigator.notification.vibrate(500);

			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });
			}
	});//click btn_vibrar

  $('#btn_cerrar_mostrar').on('tap', function(){
   $("#elementoMostrar").popup('close', {transition: "flip"});	
   
	
});

  
  
$('.elementoT').on('click', function(){
	
		mostrarCual = $(this).attr('id').substring(9);


			//alert (elementoEncontrar); 
			
   db.transaction(function(tx) {
        tx.executeSql("select * from elementos where numeroAtomico = " + mostrarCual + ";", [], function(tx, res) {
			$("#numeroAtomicoMostrar").html(res.rows.item(0).numeroAtomico);
			$("#nombreMostrar").html(res.rows.item(0).nombreElemento);			
			$("#simboloMostrar").html(res.rows.item(0).simbolo);			
			$("#masaMostrar").html(res.rows.item(0).masaAtomica);			
			$("#grupoMostrar").html(res.rows.item(0).grupo);			
			$("#periodoMostrar").html(res.rows.item(0).periodo);			
			$("#electroMostrar").html(res.rows.item(0).electronegatividad);			
			$("#configMostrar").html(res.rows.item(0).configuracionElectronica);			
			$("#estadoMostrar").html(res.rows.item(0).estado);			
			$("#familiaMostrar").html(res.rows.item(0).familia);
			$("#descripcionMostrar").html(res.rows.item(0).descripcion);			
          $("#elementoMostrar").popup('open', {transition: "slide"});
			
        });
      });
	
	
});



});



		
		
});

