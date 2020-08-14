
function redirect(){
    /*Obtener datos almacenados en el sessionstorage*/
  var user = sessionStorage.getItem("Nombre");
  var pass = sessionStorage.getItem("Contraseña");
   /*Si la variables user y pass estan vacias redirecciona a login.html, esto es para dejar como pagina de inicio a login, 
   una vez logueado esta variables dejan de estar vacias y se corta el bucle, es decir el index.html no te vuelve a redirigir a login.html */
  if (user==null  && pass==null) {
    window.location.href= "login.html";
  }
}
redirect();

  
  
  