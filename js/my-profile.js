//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var showDates = JSON.parse(localStorage.getItem('profile'));
    if (showDates != null) {
        document.getElementById("names").value = showDates.nombres
    document.getElementById("apellidos").value = showDates.apellidos;
    document.getElementById("edad").value = showDates.edad;
    document.getElementById("email").value = showDates.email;
    document.getElementById("telefono").value = showDates.telefono;
    }
   
});

function saveDate() {

let names= document.getElementById("names")
let lastName = document.getElementById("apellidos")
let age = document.getElementById("edad")
let mail = document.getElementById("email")
let phone = document.getElementById("telefono")

    let datesProfile = {
        nombres: names.value ,
        apellidos: lastName.value,
        edad: age.value,
        email: mail.value,
        telefono: phone.value,

    };

    localStorage.setItem("profile", JSON.stringify(datesProfile));

    
    let htmlContentToAppend = `<div class="alert fade alert-success show" role="alert" id="alertResultProfile">
    <span id="resultSpan">Datos guardados con exito!</span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div> `

    document.getElementById("cartel").innerHTML = htmlContentToAppend;

}


// Guardar imagen en localstorage 
var profileFoto = document.getElementById("imgProfile");
var foto = "https://i.ibb.co/nLYjTjZ/124297478-285472772707344-7055360714912784787-n.jpg"   
localStorage.setItem("imgProfile", foto);
profileFoto.src =  localStorage.getItem('imgProfile');


