// ==UserScript==
// @name        Añadir Reply
// @description Añadir flechas
 
// @include     *://chat.stackexchange.com/*
 
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
 
// @version     1.1
 
// ==/UserScript==
 
var icono = "<img src='https://i.stack.imgur.com/fvR5F.png'> ";

//https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-reply-all-16.png

unsafeWindow.responder =  function(elem){
   elem.click();
   var content = $('#input').val();
   if(content === ""){
       $('#input').val(":"+elem.id +" ");
   }else{
       if(content.startsWith(":")){
           $('#input').val(":"+elem.id + content.replace(/(:\d+)/, ""));
       }else{
           $('#input').val(":"+elem.id +" " +content);
       }
   }
   $('#input').focus();
};

unsafeWindow.colocarFlecha = function(){
   $('div[id^="message-"]').each(function(){
       var id = $(this).attr('id');

       var value = id.substring(id.lastIndexOf("-")+1);
       if(!$(this).hasClass("flecha")){
           $(this).find('div[class="content"]').before("<div name='flecha' id='" + value +"' title='responder' onclick='responder(this)' style='visibility:hidden'>" +icono+ "</div>");

           $(this).addClass("flecha");

           $(this).mouseenter(function(event)
           {
               event.stopPropagation();
               $("#"+ value).css('visibility','visible');
           }).mouseleave(function(event)
           {
               event.stopPropagation();
               $("#"+ value).css('visibility','hidden');
           });
       }

       if($(this).hasClass("removed")){
          $('#'+ value).remove();
       }

   });

   $('span[class="deleted"]').each(function(){
       $(this).parent().parent().addClass("removed");
   });
};

$( document ).ready(function() {

       setInterval(function() {
           colocarFlecha();
       }, 500);

});