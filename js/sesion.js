
/*Obtener datos almacenados en el localstorage*/
var user = localStorage.getItem("Nombre");
var pass = localStorage.getItem("Contraseña");

function redirect(){
    
   /*Si la variables user y pass estan vacias redirecciona a login.html, esto es para dejar como pagina de inicio a login, 
   una vez logueado esta variables dejan de estar vacias y se corta el bucle, es decir el index.html no te vuelve a redirigir a login.html */
  if (user==null  && pass==null) {
    window.location.href= "login.html";
  }
}
redirect();

// Funcion para cerrar sesion, vuelve a dejar vacias las variables y redirige a login.html
function closeSesion () {
  user =localStorage.removeItem("Nombre");
  pass =localStorage.removeItem("Contraseña");
  redirect();

}

  
  
  