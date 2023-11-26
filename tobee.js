// cart
// var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
// var closeCart = document.querySelector("#close-cart");

// open cart
function show_cart(){

    cart.classList.add("active");

}

// close cart
function close_cart(){
    cart.classList.remove("active");

}

// cart working

    ready();

// Making function
function ready(){
    // remove items from 
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    
    for(var i = 0 ;i <removeCartButtons.length;i++){
        var button = removeCartButtons[i]
        button.addEventListener('click' , removeCartItem)

    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0 ;i <quantityInputs.length;i++){
       var input = quantityInputs[i];
       input.addEventListener('change',quantityChanged)

    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for(var i  = 0 ;i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click',addCartClicked);
    }
    // buy 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
    function buyButtonClicked(){
        alert('your order is on treatment');
        var cartContent = document.getElementsByClassName('cart-content')[0];
        while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
        }
        upDateTotal();

    }

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    upDateTotal();
}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    upDateTotal()

}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product_img')[0].src; 
    addProductToCart(title, price, productImg);
    upDateTotal(); 
}


function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have added this item to the cart");
            return;
        }
    }
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

var cartBoxContent = `

<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}<span> DH</span></div>
    <input type="number" value="0" class="cart-quantity" min="0"> 
</div>

<i class='bx bx-x cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent;

cartItems.appendChild(cartShopBox);

cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);



    upDateTotal();
}

function upDateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        
        var priceText = priceElement.innerText.trim().replace(/\D+/g, '');//replace(/\D+/g, '') replace char whit num
        var price = parseFloat(priceText);
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = total + "DH";
    
}


}
// search


// function searching() {
//     var product = document.getElementById('search').value;

//     for (let i = 1; i <= 24; i++) {
//         var productClass = 'product' + i;
//         var productContent = document.getElementsByClassName(productClass)[0];

//         if (productContent) {
//             var productTitle = productContent.querySelector('.product-title').innerText;
//             var productImg = productContent.querySelector('.product_img').src;
//             var productPrice = productContent.querySelector('.price').innerText;

//             if (product === productTitle) {
               
//                 var popup = document.querySelector(".popup_container");
//                 if (!popup) {
                    
//                     popup = document.createElement('div');
//                     popup.classList.add('popup_container');
//                     document.body.appendChild(popup);
//                 }

//                 // Update popup content and show it
//                 var popupBoxContent = `
//                     <img src="${productImg}" alt="" class="popup_img">
//                     <h2 class="popup_title">${productTitle}</h2>
//                     <h4 class="popup_price">${productPrice}</h4>
//                     <i class='bx bx-x popup_remove' onclick="close_popup()"></i>
//                 `;
//                 popup.innerHTML = popupBoxContent;
//                 popup.classList.add("show");


//                 return;
//             }
//         }
//     }

//     alert('Product not found');
// }

function close_popup() {
    var popup = document.querySelector(".popup_container");
    if (popup) {
        popup.classList.remove("show");
    }
}
async function searching() {
    var product = document.getElementById('search').value;

    // Array of page URLs
    var pageUrls = ['beewax.html', 'beauty.html', 'honey.html'];

    for (let i = 0; i < pageUrls.length; i++) {
        try {
            // Fetch the content of each page
            const response = await fetch(pageUrls[i]);
            const pageContent = await response.text();

            // Create a temporary element to parse the HTML content
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = pageContent;

            // Assuming each product has a unique identifier
            for (let j = 1; j <= 24; j++) {
                var productClass = 'product' + j;
                var productContent = tempDiv.getElementsByClassName(productClass)[0];

                if (productContent) {
                    var productTitle = productContent.querySelector('.product-title').innerText;
                    var productImg = productContent.querySelector('.product_img').src;
                    var productPrice = productContent.querySelector('.price').innerText;

                    if (product === productTitle) {
               
                                        var popup = document.querySelector(".popup_container");
                                        if (!popup) {
                                            
                                            popup = document.createElement('div');
                                            popup.classList.add('popup_container');
                                            document.body.appendChild(popup);
                                        }
                        
                                        // Update popup content and show it
                                        var popupBoxContent = `
                                            <img src="${productImg}" alt="" class="popup_img">
                                            <h2 class="popup_title">${productTitle}</h2>
                                            <h4 class="popup_price">${productPrice}</h4>
                                            <i class='bx bx-x popup_remove' onclick="close_popup()"></i>
                                        `;
                                        popup.innerHTML = popupBoxContent;
                                        popup.classList.add("show");
                        
                        
                                        return;
                                    }
                }
            }
        } catch (error) {
            console.error('Error fetching page:', pageUrls[i], error);
        }
    }

    alert('Product not found on any page');
}

// You can call searchProductsAcrossPages() when needed, for example, in response to a button click.

