//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "Asc.";
const ORDER_DESC_BY_COST = "Desc.";
const ORDER_BY_PROD_REL = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.soldCount);
            let bCost = parseInt(b.soldCount);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}



function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
                    <small class="text-muted">` + products.soldCount + ` vendidos</small>
                </div>
            </div>
        </div>
        `
     }
    }   document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //en esta div del prouct.html se va a pegar todo el contenido que va generando el for de la funcion anterior
}

// La siguiente funcion ordena segun el criterio del filtro y luego lo muestra
function sortAndShowProduct(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


//En esta funcion se crea un objeto a partir del Json de productos
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            sortAndShowProduct(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilterCost").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});

  // Funcion que permite que mientras escribo en la barra de busqueda vaya filtrando y me vaya mostrando los productos que coinciden con lo que escribo
  function searchProd() {
    var input, filter, y, x, i, txtValue;
    input = document.getElementById("buscar");
    filter = input.value.toUpperCase();
    y = document.getElementById("prod-list-container").getElementsByTagName("div");
 
    
    for (i = 0; i < y.length; i++) {
      x = y[i].getElementsByClassName("row")[0];
      if (x) {
        txtValue = x.textContent ;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          y[i].style.display = "";
        } else {
          y[i].style.display = "none";
        }
      }       
    }
  }
