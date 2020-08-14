//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

  //funcion que tiene como parametro un array
function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <h5>  `+ products.currency  + " " + products.cost + `</h5>    
                    </div>
                    <div> <p>  ` + products.description + ` </p> </div>
                    <small class="text-muted">` + products.soldCount + ` artículos</small>
                </div>
            </div>
        </div>
        `
    }   document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //en este parrafo del prouct.html se va a pegar todo el contenido que va generando el for de la funcion anterior
}


//En esta funcion se crea un objeto a partir del Json de productos
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data; // se vuelca en el array productArray los elementos del Json de productos
            //Muestro los productos ordenados en...
            showProductsList(productsArray);
        }
    });
});