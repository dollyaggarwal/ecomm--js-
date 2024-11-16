
//using fetch then

// document.addEventListener('DOMContentLoaded', function(){
//     const apiUrl = 'https://fakestoreapi.com/products';
//     fetch(apiUrl)
//     .then(
//         res=>res.json()
//     )
//     .then(json=>{
//         const grid = document.getElementById('grid');
//         json.forEach((product)=>{
//             const productElement = document.createElement('div');
//             productElement.className = 'product';
//             productElement.innerHTML=`
//             <img src=${product.image} alt="${product.title}">
//             <h3>${product.title}</h3>
//             <p>$${product.price}</p>
//         `;
//         grid.appendChild(productElement);
//         })
 
//     }
//     ) 
    
// });

//using async await

document.addEventListener('DOMContentLoaded', async()=>{
    const apiUrl = 'https://fakestoreapi.com/products';
    try{ 
    const res = await fetch(apiUrl)
   if(!res.ok){
    throw new Error('Something went wrong');
   }
        const data = await res.json();
        console.log(data)
        const grid = document.getElementById('grid');
         data.forEach((product)=>{
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML=`
            <img src=${product.image} alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        grid.appendChild(productElement);
        })
 
    }catch(error){
    console.error("Error fetching products data",error);
    throw error;
}
});

function populateTable(data) {
    const tableBody = document.querySelector('#comparison-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Display only 5 entries
    data.slice(0, 5).forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.description}</td>
            <td>${product.size || 'N/A'}</td>
            <td>${product.weight || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to fetch data and populate the table
function fetchData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback(xhr.statusText, null);
        }
    };
    xhr.onerror = function() {
        callback(xhr.statusText, null);
    };
    xhr.send();
}


// Using 'call' to execute the callback with the fetched data
function fetchAndPopulateTable(url) {
    fetchData.call(this, url, function(error, data) {
        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        populateTable.call(this, data);
    });
}

// Using 'bind' to preset the URL and create a new function
const fetchAndPopulate = fetchAndPopulateTable.bind(null, 'https://fakestoreapi.com/products');

// Using 'apply' to pass arguments as an array
document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulate.apply(null, []); // Apply with no additional arguments
});

