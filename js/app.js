let products = [];

$.get('https://fakestoreapi.com/products',function (data) {
    products = data ;
    show(data)
})

let toShort = (str,max = 30) => {
    if(str.length > max){
        return str.substring(0,max)+'...'
    }
    return str
}

function show(x) {
    $('#show-case').empty()
    x.map(product => {
        $('#show-case').append(`
        <div class="card card-bg shadow my-3">
            <div class="row no-gutters">
                <div class="col-5">
                    <div class="">
                        <img src="${product.image}" class="img-card-top custom-img" alt="">
                    </div>
                </div>
                 <div class="col-7">
                    <div class="card-body card-show shadow-sm" style="background-color:#eee">
                        <div class="card-title text-uppercase">${toShort(product.title)}</div>
                        <div class="card-text text-black-50">${toShort(product.description,50)}</div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                           <div class="">
                                <p class="font-weight-bold mb-0">$<span>${product.price}</span></p>
                           </div>
                            <button class="btn btn-primary add-cart-btn" data-id="${product.id}">Add-Cart</button>
                        </div>
                    </div>
                 </div>
            </div>     
        </div>
    `)
    })  
}

$('#search').on('keyup',function () {
    let typVal = $(this).val().toLowerCase();
    if (typVal.trim()) {
        let searchItem = products.filter(product =>{
            if(product.title.toLocaleLowerCase().indexOf(typVal)>-1 || product.description.toLocaleLowerCase().indexOf(typVal)>-1 || product.price === typVal){
                return product;
            }  
        }) 
        show(searchItem)
    } 
})

//category section
$.get("https://fakestoreapi.com/products/categories",function (data) {
    data.map(el => {
        $("#category").append(`
            <option value="${el}">${el}</option>
        `)
    })
})

$("#show-case").delegate(".add-cart-btn","click",function () {
    let currentId = $(this).attr("data-id");
    let productInfo = products.filter(el => el.id == currentId)[0];

    $("#cart").append(`
    
    <div class="card border-0 item-in-cart" data-id="${productInfo.id}">
       <div class="card-body">
           <div class="d-flex justify-content-between">
                <img src="${productInfo.image}" class="img-in-cart" alt="">
                <button class="btn btn-outline-danger" id="remove-cart"><i class="fas fa-trash-alt"></i></button>
           </div>
           <p class='mt-2 text-black-50'>${productInfo.title}</p>
           <div class="d-flex justify-content-between justify-content-end align-items-baseline">
               <div class="form-row">
                   <button class="btn btn-outline-primary minus-btn">
                       <i class="fas fa-minus"></i>
                   </button>
                   <input type="number" class="form-control mx-2 w-25 quantity" unitPrice="${productInfo.price}" min='1' value='1'>
                   <button class="btn btn-outline-primary plus-btn">
                       <i class="fas fa-plus"></i>
                   </button>
               </div>
                <p class="mb-0 font-weight-bold price-cost">${productInfo.price}</p>
           </div>
       </div>
       <hr>
    </div>
    `)
})

$("#cart-shop").delegate("#remove-cart","click",function () {
    $(this).parentsUntil('#cart').remove();
})

$("#category").on("change",function () {
    let changedVal = $(this).val();
    console.log(changedVal);
    if (changedVal != 0) {
        let searchItem = products.filter(product =>{
            if(product.category === changedVal){
                return product;
            }  
        }) 
        show(searchItem)
    }else{
        show(products)
    }
});

