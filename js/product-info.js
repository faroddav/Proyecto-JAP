
// funcion que muetra las imagene del producto
function showImagesGallery(array){

    let htmlContentToAppend =""
    let htmlContent =""

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        // El siguiente if es para que la posisicion 0 del arreglo quede con clase active tanto en el carruel como en el indicador.
        if(i==0) {
            htmlContent += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i +  `" class="active"></li>`
            htmlContentToAppend+= `
            <div class="carousel-item active" >
                <img src="` + imageSrc +  `" class="d-block w-100" alt="...">
            </div>
        ` 
        } else {
            htmlContent += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i +  `"></li>`
            htmlContentToAppend += `
            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>`
        }  
    } document.getElementById("productImages").innerHTML = htmlContentToAppend;  // Aqui se inserta el carrusel
    document.getElementById("caruselIndicators").innerHTML = htmlContent  // Aqui se insertan los indicadores de abajo del carrusel
    
}



 // Funcion que muestra lo comentarios  
function showComents(array){
    
    let htmlContentToAppend = "";
    

    for(let i = 0; i < array.length; i++){
        let coments = array[i];
        
        // Estas son las estrellas para despues mostrarlas en los comentarios
        A =  `<span class="fa fa-star checked"></span>`; 
        a = A.repeat(coments.score);
        B = `<span class="fa fa-star"></span>`; 
        b = B.repeat(5 - coments.score);

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="d-block mb-4 h-100">
              <h6 class="mb-1"><strong>`+  coments.user   +": " +`</strong> `+ coments.description+` </h6>
              <p>`+ a + b+ ` </p>
            
            </div>
            <small class="text-muted">` + coments.dateTime + ` </small>
        </div>
        `

        
    } document.getElementById("productComent").innerHTML = htmlContentToAppend;
}




// Funcion que muestra los producto relacionados 
function showProductRelated(array){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

           let htmlContentToAppend = "";
    // Cada elemento del array lo pasa como posicion de product(JSON con la informacion de lo productos)
    for(let i = 0; i < array.length; i++){
        let relatedPosition = array[i];
        let related = product[relatedPosition];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
                <p class="card-text" style="text-align:center;"> <strong> ` + related.name + `</strong> <br> ` + related.currency +" "+ related.cost+` <br> <a href="product-info.html"  >Ver</a> </p> 
                
            </div>
            
        </div>
        
        `

        
    
} document.getElementById("productRelated").innerHTML = htmlContentToAppend;
}
})}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHtml = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
           
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHtml.innerHTML= product.currency + " " + product.cost
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
           

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            // Muestro los productos relacionados
            showProductRelated(product.relatedProducts);

        }
    });

});

// Funcion para mostrar los comentarios
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            coment = resultObj.data;

            //Muestro los comentarios 
            showComents(coment);

        }
    });

});


// Funcion para mostrar un comentario nuevo
function showNewComents(){
    // Obtiene la fecha full
    n =  new Date();
    //Año
    y = n.getFullYear();
     //Mes
    m = n.getMonth() + 1;
    if (m<10) {m= "0" + m};
     //Día
    d = n.getDate();
    //horas
    h = n.getHours();
    //minutos
    min = n.getMinutes();
     if (min<10) {min= "0" + min };
    //segundos
    s = n.getSeconds();

    // Array con la info del comentario nuevo
    var comentNew = [{
        description: document.getElementById("newComents").value,
        score: document.getElementById("comentPunt").value ,
        user: localStorage.getItem("Nombre"),
        dateTime: y +"-"+ m +"-" + d + " " + h +":"+ min + ":"+ s ,
    }];

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            coment = resultObj.data;

            Array.prototype.push.apply(coment, comentNew); // Une el array del JSON con el creado por mi que trae la info del nuevo comentario

            //Muestro los comentarios, ejecutando la funcion de comentarios pero con el JSON + Array del nuevo comentario 
            showComents(coment);
            document.getElementById("newComents").value="";
            document.getElementById("comentPunt").value=0;
            

        }
    }); document.getElementById("comentBotton").disabled= true;

};





