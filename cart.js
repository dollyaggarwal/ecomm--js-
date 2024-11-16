import { cartItems } from "./cartArray.js";


document.addEventListener('DOMContentLoaded', () =>{
    // initialiseCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('total');
    const checkout = document.getElementById('checkout');

    function loadCartItems(){
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if(cart.length > 0) {
        cartItemsContainer.innerHTML='';
        cart.forEach((item,index)=>{
            const cartItem = document.createElement('div');
            cartItem.className='cart-item';
            
        cartItem.innerHTML=`    
  <img src="${item.image}" class="card-img-top" alt="${item.name}">
  <div class="cart-items-details">
    <h3 class="cart-item-title">${item.name}</h3>
     <p class="cart-item-price">$${item.price.toFixed(2)}</p>
     <div class="cart-item-actions">
    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
    <button class="btn btn-danger remove-btn">Remove</button>
    </div>
  </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        const quantityInput = cartItem.querySelector('.quantity-input');
        const removeButton = cartItem.querySelector('.remove-btn');

        removeButton.addEventListener('click',()=>{
         
           cart.splice(index,1);
           localStorage.setItem('cart', JSON.stringify(cart));
           loadCartItems();
           updateCartTotal();
        });

        quantityInput.addEventListener('change', (event)=>{
            item.quantity = parseInt(event.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartTotal();
        });

        }) ;
        updateCartTotal();
    }
    else{
        cartItemsContainer.innerHTML = '<p class="card-text fw-bold">Your cart is empty.</p>'
    }
}
function updateCartTotal(){
    let total =0;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.forEach((item)=>{
        total += item.quantity * item.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

loadCartItems();

checkout.addEventListener('click',()=>{
    alert('Proceeding to checkout');
});
});



