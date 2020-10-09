
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
        
        <div class="col-md-5 col-lg-3 col-xl-3">
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
              <input type="number" class="form-control" name="totalProduct" id="countInput-` + i + `"  onchange="subTotal()"  placeholder=" required " value="` + carts.count + `"  min="0">
              </div>
              
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
                  class="fas fa-trash-alt mr-1"></i> Remover item </a>
              <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                  class="fas fa-heart mr-1"></i> Mover a la lista de deseos </a>
            </div>
            <p class="mb-0" name="totales"> <strong>Total: $ </strong> <span><strong class="subTotalesProd" id="summary-` + i + `"> ` + totalProd + `</strong></span></p class="mb-0">
          </div>
        </div>
        <hr class="mb-4">
      </div>
        `
      
    } document.getElementById("cartProduct").innerHTML = htmlContentToAppend;
    
}


let comissionPercentage = 0.15;

let subTotales = 0;

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


let dias= 5
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
function subTotal() {

  var x = document.getElementsByName("totalProduct")
  
  for (i = 0; i < x.length; i++) {
    count = x[i].value;
    let currency = cart.articles[i].currency 
    

    if (currency=="USD"){
      convertion =40 * cart.articles[i].unitCost
     } else {convertion = cart.articles[i].unitCost}

     sub = count * convertion
     
    document.getElementById("summary-"+i).innerHTML =  sub;
  
   }  updateTotalCosts()

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
    
});




