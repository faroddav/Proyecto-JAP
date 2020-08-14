//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});

document.getElementById("bottonselector").addEventListener("click", validate);

function validate() {
        /*Captura de datos escrito en los inputs*/  
        var usuario = document.getElementById("inputUser").value; 
        var password = document.getElementById("inputPassword").value; 
        /*Guardando los datos en el sessionStorage*/
        sessionStorage.setItem("Nombre", usuario);
        sessionStorage.setItem("Contraseña", password);
    
}

