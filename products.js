document.addEventListener('DOMContentLoaded', function(){

  class Product{
    constructor(name,description,image,price){
      this.name = name;
      this.description= description;
      this.image = image;
      this.price = price;

    }
    display(){
         
          return `
           <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card" style="width: 18rem;">
          <img src="${this.image}" class="card-img-top" alt="${this.name}">
          <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.description}</p>
          <p class="card-text fw-bold">$${this.price.toFixed(2)}</p>
          <div class="d-flex align-items-center">
          <input type="number" class="quantity-input form-control" value="1" min="1">
          <a href="#" class="btn btn-primary add-to-cart"  data-product='${JSON.stringify(this)}'>Add To Cart</a>
          </div>
          </div>
          </div>
          `;
          productList.appendChild(card);
    }
  }
  class DiscountedProduct extends Product{
    constructor(name,description,image,price,discount){
      super(name,description,image,price)
      this.discount = discount;
    }
    display(){
     let discountedPrice = this.price - (this.price * (this.discount / 100));
      return `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="card" style="width: 18rem;">
      <img src="${this.image}" class="card-img-top" alt="${this.name}">
      <div class="card-body">
      <h5 class="card-title">${this.name}</h5>
      <p class="card-text">${this.description}</p>
      <p class="card-text fw-bold">$${discountedPrice.toFixed(2)}
      <span class="badge badge-danger">${this.discount}%OFF</span></p>
      <div class="d-flex align-items-center">
      <input type="number" class="quantity-input form-control" value="1" min="1">
      <a href="#" class="btn btn-primary add-to-cart"  data-product='${JSON.stringify(this)}'>Add To Cart</a>
      </div>
      </div>
      </div>
      </div>
      `;
      productList.appendChild(card);
}
  }

  const discountedProduct = new DiscountedProduct(
    "Discounted Product",
    "This is a Product in summer sale!",
    "https://via.placeholder.com/400x300?text=Discounted+Product",
    199.00,
    30
  );
 
  fetch('productsArray.json')
  .then(res=>{
    if (!res.ok) {
      throw new Error('Network response was not ok.');
  }
  return   res.json();
  })
  .then(data=>{
    window.products = data;
    displayProducts(data);
    const productList = document.getElementById('product-list');
    productList.innerHTML += discountedProduct.display();

    attachEventListener();

    })
    .catch(error => {
        console.error('Error fetching products:', error);
        document.getElementById('error-message').textContent = 'Failed to load products. Please try again later.';
        });
    });

    function displayProducts(products){
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      products.forEach(product =>{
          const card = document.createElement('div');
          card.classList.add('col-lg-3', 'col-md-4','col-sm-6','mb-4');
          card.innerHTML=`
          <div class="card" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
          <div class="d-flex align-items-center justify-content-between">
          <input type="number" class="quantity-input form-control" value="1" min="1">
         <a href="#" class="btn btn-primary add-to-cart"  data-product='${JSON.stringify(product)}'>Add To Cart</a>
          </div>
          </div>
          </div>
          `;
          productList.appendChild(card);
        });

        attachEventListener();
    }

  function attachEventListener(){
    document.querySelectorAll('.add-to-cart').forEach(button=>{
      button.addEventListener('click', (event)=>{
        event.preventDefault();
        try {
          const product = JSON.parse(event.target.getAttribute('data-product')); // Get product data
          const quantityInput = event.target.previousElementSibling; // Get quantity input
          const quantity = parseInt(quantityInput.value); // Get quantity value
          if (isNaN(quantity) || quantity <= 0) {
              throw new Error('Invalid quantity.');
          }
          addToCart(product, quantity); // Call function to add product to cart
      } catch (error) {
          console.error('Error handling add-to-cart event:', error);
          alert('Error adding product to cart. Please check the quantity and try again.');
      }
  });
});
    }
    function addToCart(product, quantity) {
      try {
          let cart = JSON.parse(localStorage.getItem('cart')) || []; 
          const existingProduct = cart.find(item => item.name === product.name); 
          if (existingProduct) {
              existingProduct.quantity += quantity; 
          } else {
              product.quantity = quantity; 
              cart.push(product); 
          }
          localStorage.setItem('cart', JSON.stringify(cart)); 
          alert('Product added to cart!'); 
      } catch (error) {
          console.error('Error adding product to cart:', error);
          alert('Failed to add product to cart. Please try again.');
      }
  }
   function applyFilters(){
    try{
      const searchQuery = document.getElementById('search').value.toLowerCase();
      const priceRange = document.getElementById('price-range').value;
      let minPrice = 0;
      let maxPrice = Infinity;
      if(priceRange){
        [minPrice,maxPrice] = priceRange.split('-').map(Number);
      }
      const filteredProducts = window.products.filter((product)=>{
        const matchedName = product.name.toLowerCase().includes(searchQuery);
        const matchedDescription =  product.description.toLowerCase().includes(searchQuery);
        const matchedPrice = product.price >= minPrice && product.price <= maxPrice;
          return (matchedName || matchedDescription) && matchedPrice; 
      });
      console.log(filteredProducts)

      displayProducts(filteredProducts);
     
    }catch(error){
      console.error('Error searching products:', error);
      document.getElementById('error-message').textContent = 'Failed to process search. Please try again later.';
    } 
    }

      // Function to handle search
      function handleSearch(query) {
        try {
            const filteredProducts = window.products.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            displayProducts(filteredProducts); // Display only the filtered products
        } catch (error) {
            console.error('Error handling search:', error);
            document.getElementById('error-message').textContent = 'Error processing search. Please try again.';
        }
    }

    // Debounce function
    function debounce(func, delay) {
        let timerId;
        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let lastFunc;
        let lastRan = 0;
        return function (...args) {
            const context = this;
            const now = Date.now();
            if (now - lastRan >= limit) {
                func.apply(context, args);
                lastRan = now;
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    func.apply(context, args);
                    lastRan = now;
                }, limit - (now - lastRan));
            }
        };
    }

    // Get the search input element
    const searchInput = document.getElementById('search');

    // Attach debounced search function to input event
    searchInput.addEventListener('input', debounce(function () {
        handleSearch(this.value);
    }, 300)); // Debounce delay of 300ms

    // Uncomment to use throttling instead of debouncing
    // searchInput.addEventListener('input', throttle(function () {
    //     handleSearch(this.value);
    // }, 300)); // Throttle limit of 300ms

    // Function to attach event listeners to add-to-cart buttons
    function attachEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                try {
                    const product = JSON.parse(event.target.getAttribute('data-product')); // Get product data
                    const quantityInput = event.target.previousElementSibling; // Get quantity input
                    const quantity = parseInt(quantityInput.value); // Get quantity value
                    if (isNaN(quantity) || quantity <= 0) {
                        throw new Error('Invalid quantity.');
                    }
                    addToCart(product, quantity); // Call function to add product to cart
                } catch (error) {
                    console.error('Error handling add-to-cart event:', error);
                    alert('Error adding product to cart. Please check the quantity and try again.');
                }
            });
        });
    }

    document.getElementById('price-range').addEventListener('change',applyFilters);