let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let comissionPercentage = 0.15;
let subTotales = 0;
let dias= 5

function showProductCart(array){
    
    let htmlContentToAppend = "";
   
    
    for(let i = 0; i < array.length; i++){
        let carts = array[i];
        let currency = carts.currency 
        
       if (currency=="USD"){
        convertion = 40 * carts.unitCost
       } else {convertion = carts.unitCost}

       
       totalProd = convertion * carts.count;

        htmlContentToAppend += `
        <div class="row mb-4" id="producto-` + i + `">    
        <div class="col-md-5 col-lg-3 col-xl-3" >
        <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
          <img class="img-fluid w-100"
            src=` + carts.src + ` alt="Sample">  
        </div>
      </div>
      <div class="col-md-7 col-lg-9 col-xl-9">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h5>` + carts.name + `</h5>
              <p class="mb-3 text-muted text-uppercase small">Costo unitario -<strong> ` + carts.currency + `   ` + carts.unitCost + `</strong></p>
              <p class="mb-2 text-muted text-uppercase small">Costo unitario en pesos: <strong>UYU ` + convertion + ` </strong> </p>
              <p class="mb-3 text-muted text-uppercase small"></p>
            </div>
            <div>
              <div class="def-number-input number-input safari_only mb-0 w-100">
              <input type="number" class="form-control" name="totalProduct"  oninput="validity.valid||(value='');" id="countInput-` + i + `"  min="1" onchange="subTotal(` + i + `)"  placeholder=" required " value="` + carts.count + `"  min="0"> 
            </div>
              
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" onclick="removeItem(` + i + `)"<i
                  class="fas fa-trash-alt mr-1"></i> Remover item </a>
              <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                  class="fas fa-heart mr-1"></i> Mover a la lista de deseos </a>
            </div>
            <p class="mb-0" name="totales"> <strong>Total: $ </strong> <span><strong class="subTotalesProd" id="summary-` + i + `"> ` + totalProd + `</strong></span></p class="mb-0">
          </div>
        </div>
        <hr class="mb-4">
      </div>
      </div>
        `
      
    } document.getElementById("cartProduct").innerHTML = htmlContentToAppend;
    
}


function removeItem(number) {
  let productoCarrito = document.getElementById("producto-"+number)
  productoCarrito.innerHTML = ""
  
  
  updateTotalCosts()
  
}



//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let subTotalArray = document.getElementsByClassName("subTotalesProd") // Creo un array con los valores de los totales de los productos
  for (i = 0; i < subTotalArray.length; i++) {
    subTotales += parseInt(subTotalArray[i].textContent); // parseIn comvierte los string en numeros
   }  


  let subtotalCostHTML = document.getElementById("subtotalCost");
  let shippingCostHTML = document.getElementById("shippingCost");
  let totalCostHTML = document.getElementById("totalCost");

  
  let subCostToShow = subTotales    
  let shippingCostToShow = Math.round((comissionPercentage * subCostToShow));
  let totalCostToShow = shippingCostToShow + subCostToShow ;

  subtotalCostHTML.innerHTML = "$ " + subCostToShow;
  shippingCostHTML.innerHTML ="$ " + shippingCostToShow;
  totalCostHTML.innerHTML = "$ " + totalCostToShow;
  subTotales=0;
}



// Funcion que muestra la fecha estimada de envio
function shippingDelivery(){
  var hoy = new Date();
  var entrega = new Date();
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  
  
  entrega.setDate(hoy.getDate() + dias); //Aqui obtiene el dia de hoy y le suma la variable dias, si al umar los dias cambia de mes lo actualiza al que corresponda
  document.getElementById("entrega").innerHTML = diasSemana[entrega.getDay()] + ", " + entrega.getDate() + " de " + meses[entrega.getMonth()] + " de " + entrega.getFullYear()

}


// Funcion que actualiza los subtotales de los productoas a medida que cambio la cantidad (uso onchange cuando cambio la cantidad del producto)
function subTotal(number) {

  var x = document.getElementById("countInput-"+ number)
  
    count = x.value;
    let currency = cart.articles[number].currency 
    

    if (currency=="USD"){
      convertion =40 * cart.articles[number].unitCost
     } else {convertion = cart.articles[number].unitCost}

     sub = count * convertion

     if(count!= ""){  // El if esta hecho para que no actualize el costo del producto si no se ingreso ninguna cantidad
      document.getElementById("summary-"+number).innerHTML =  sub;
     }
    
  
     updateTotalCosts()

}
  
// funcion de forma de pago, si selecciono un metodo de pago bloque el otro
function checkPay() {
   
  let transCount = document.getElementById("countNumber")
  let cardCredit = document.getElementById("cardcredit")
  let cardNumber = document.getElementById("cardNumber")
  let expityMonth = document.getElementById("expityMonth")
  let expityYear = document.getElementById("expityYear")
  let cvCode = document.getElementById("cvCode")

  if(cardCredit.checked){
    transCount.disabled = true;
    cardNumber.disabled = false;
    expityMonth.disabled = false;
    expityYear.disabled = false;
    cvCode.disabled = false;
  } else {
    transCount.disabled = false;
    cardNumber.disabled = true;
    expityMonth.disabled = true;
    expityYear.disabled = true;
    cvCode.disabled = true;
  }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data;
            
            //Muestro los productos cargados en el carrito
            showProductCart(cart.articles);
            
            updateTotalCosts();
            checkPay();

        }
    });
   
    shippingDelivery()
    
    document.getElementById("premiumradio").addEventListener("change", function(){
      comissionPercentage = 0.15;
      dias=5
      shippingDelivery()
      updateTotalCosts();
  });
  
  document.getElementById("expressradio").addEventListener("change", function(){
      comissionPercentage = 0.07;
      dias= 8
      shippingDelivery()
      updateTotalCosts();
  });
  
  document.getElementById("standardradio").addEventListener("change", function(){
      comissionPercentage = 0.05;
      dias= 15
      shippingDelivery()
      updateTotalCosts();
  });


  //Se obtiene el formulario de publicación de producto 
 var shippingForm = document.getElementById("shipping-info");

  //Se agrega una escucha en el evento 'submit' que será
  //lanzado por el formulario cuando se seleccione 'Vender'.
  shippingForm.addEventListener("submit", function(e){

      let streetAddressInput = document.getElementById("streetAddress");
      let numberAddress = document.getElementById("numberAddress");
      let countryAddress = document.getElementById("countryAddress");
      let countNumber = document.getElementById("countNumber");
      let cardNumber = document.getElementById("cardNumber");
      let cardExpityMonth = document.getElementById("expityMonth");
      let cardExpityYear = document.getElementById("expityYear");
      let cardCvCode = document.getElementById("cvCode");
      let infoMissing = false;

      //Quito las clases que marcan como inválidos
      streetAddressInput.classList.remove('is-invalid');
      numberAddress.classList.remove('is-invalid');
      countryAddress.classList.remove('is-invalid');
      

      //Se realizan los controles necesarios,
      //En este caso se controla que se haya ingresado el nombre y categoría.

      //Consulto por la calle en la dirección de envvio
      if (streetAddressInput.value === "")
      {
        streetAddressInput.classList.add('is-invalid');
          infoMissing = true;
      }
      
      //Consulto por el numero en la dirección de envvio
      if (numberAddress.value === "")
      {
        numberAddress.classList.add('is-invalid');
          infoMissing = true;
      }

      //Consulto por el pais en la dirección de envvio
      if (countryAddress.value === "")
      {
        countryAddress.classList.add('is-invalid');
          infoMissing = true;
      }
      
      // Consulta si esta ingreado el numero de cuenta, si se selecciono Transferemcia bancaria como forma de pago
      if (countNumber.value === "" && countNumber.disabled == false)
      {
        alert("Debe completar la forma de pago");
        infoMissing = true;
      }

     // Consulta si estan ingreados los campos correspondientes, si se selecciono Tarjeta de credito como forma de pago
      if (cardNumber.value === "" && cardNumber.disabled == false || cardExpityMonth.value === ""  && cardExpityMonth.disabled == false || cardExpityYear.value === "" && cardExpityYear.disabled == false || cardCvCode.value === "" && cardCvCode.disabled == false )
      {
        alert("Debe completar la forma de pago");
        infoMissing = true;
      }


      if(infoMissing == false)
      {
          //Aquí ingresa si pasó los controles, irá a enviar
          //la solicitud para crear la publicación. 

          getJSONData(CART_BUY_URL).then(function(resultObj){
              let msgToShowHTML = document.getElementById("resultSpan");
              let msgToShow = "";
  
              //Si la publicación fue exitosa, devolverá mensaje de éxito,
              //de lo contrario, devolverá mensaje de error.
              if (resultObj.status === 'ok')
              {
                  msgToShow = resultObj.data.msg;
                  document.getElementById("alertResult").classList.add('alert-success');
              }
              else if (resultObj.status === 'error')
              {
                  msgToShow = ERROR_MSG;
                  document.getElementById("alertResult").classList.add('alert-danger');
              }
  
              msgToShowHTML.innerHTML = msgToShow;
              document.getElementById("alertResult").classList.add("show");
          });
      }

      //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
      if (e.preventDefault) e.preventDefault();
         return false;
  });
    
});




