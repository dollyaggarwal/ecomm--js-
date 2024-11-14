import { products } from "../productsArray.js";

document.addEventListener('DOMContentLoaded', function(){
    const productList = document.getElementById('product-list');
    for(let product of products){
        const card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-4','col-sm-6','mb-4');
        card.innerHTML=`
        <div class="card" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top" alt="${product.name}">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
     <p class="card-text fw-bold">${product.price.toFixed(2)}</p>
    <a href="#" class="btn btn-primary">Add To Cart</a>
  </div>
</div>
        `;
        productList.appendChild(card);
    }
})
