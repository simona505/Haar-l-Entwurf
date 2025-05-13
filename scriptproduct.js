const images = document.querySelectorAll('.productview img');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}



let cartopen=0;
const cartt=document.getElementById('cartcover');

function cartbutton(){
    if (cartopen===0){
        cartopen=cartopen+1;
        cartt.style.display='block';

    }else{

        cartopen=cartopen-1;
        cartt.style.display='none';
    }
}

let cart = []
function addToCart(productId) {
    // Hole das Produkt-Element (stelle sicher, dass es existiert, z. B. id="product2")
    const productElement = document.getElementById(productId);
    if (cart.includes(productId)) {
      alert("Product is already in your cart!");
      return;
    }
    
    cart.push(productId);
    
    // Hole gezielt die Daten aus dem Originalprodukt
    const productImg = productElement.querySelector('img');
    const productTitle = productElement.querySelector('.productheader');  // Klassenname ggf. anpassen
    const productPrice = productElement.querySelector('.productprice');
    const productContainer=productElement.querySelector('.products');
    const productLink=productElement.querySelector('.productlink');
    
    // Erstelle das Container-Element für die Produktdetails
    const productDetails = document.createElement('div');
    productDetails.className = "product-details";
    productDetails.id = `product-details-${productId}`;
    
    // Fülle das Container-Element (ohne Remove-Button)
    productDetails.innerHTML = `
        <a class="product-link" href="${productLink ? productLink.href:''}">
            <div class="product-products">${productContainer ? productContainer.textContent : ''}
                <img class="product-pic" src="${productImg ? productImg.src : ''}" alt="Product Image">
                <h3 class="product-title">${productTitle ? productTitle.textContent : 'No Title'}</h3>
                <p class="product-price">${productPrice ? productPrice.textContent : 'No Price'}</p>
            </div>
        </a>
    `;
    
    // Erstelle den Button
    const removeButton = document.createElement('button');
    removeButton.className = "removeFromCartButton";

    // Erstelle das img-Element für das Icon
    const iconImg = document.createElement('img');
    iconImg.src = 'remove-button.png'; // Verwende hier den relativ korrekten Pfad zu deinem Icon
    iconImg.alt = 'Remove icon';         // Alternative Beschreibung für Barrierefreiheit
    iconImg.className="removeFromCartButton-icon";

    // Hänge das img an den Button an
    removeButton.appendChild(iconImg);
    // Finde das "product-products"-Element innerhalb von productDetails
    const productProductsDiv = productDetails.querySelector('.product-products');

    // Füge den Button an das richtige Element anstatt an productDetails
    productProductsDiv.appendChild(removeButton);
    

    // Weise einen Event-Handler zu, der beim Klick das Produkt entfernt
    removeButton.onclick = () => removeFromCart(productId);
    
    // Füge die Produktdetails in ein neues Listen-Element und dann in die Warenkorb-Liste ein
    const cartList = document.getElementById('cartList');
    const listItem = document.createElement('li');
    listItem.id = `cart-item-${productId}`;
    listItem.appendChild(productDetails);
    cartList.appendChild(listItem);
    
    // Verstecke die Nachricht "Your cart is empty"
    document.getElementById('emptycart').style.display = 'none';
}

// Remove from Cart 
function removeFromCart(productId) { 
    // Remove product ID from the cart 
    cart = cart.filter(id => id !== productId);
    // Remove the corresponding cart item from the DOM
    const cartItem = document.getElementById(`cart-item-${productId}`);
    if (cartItem) {
        cartItem.remove();
    }

    // Show "Your cart is empty" message if cart is now empty
    if (cart.length === 0) {
        const emptyCartMessage = document.getElementById('emptycart');
        emptyCartMessage.style.display = 'block';
    }
}

const productinfodescriptionheader = document.querySelector('.productinfodescriptionheader');
const productinfousageheader = document.querySelector('.productinfousageheader');
const productinfoingredientsheader = document.querySelector('.productinfoingredientsheader');

function showproductinfodescription() {
    const productinfodescription = document.querySelector('.productinfodescriptiontext');
    productinfodescriptionheader.classList.toggle('activeinfoheader');
    productinfousageheader.classList.toggle('notactiveinfoheader');
    productinfoingredientsheader.classList.toggle('notactiveinfoheader');
    productinfodescription.classList.toggle('activeinfo');
}

function showproductinfousage() {
    const productinfousage = document.querySelector('.productinfousagetext');
    productinfousageheader.classList.toggle('activeinfoheader');
    productinfodescriptionheader.classList.toggle('notactiveinfoheader');
    productinfoingredientsheader.classList.toggle('notactiveinfoheader');
    productinfousage.classList.toggle('activeinfo');
}

function showproductinfoingredients() {
    const productinfoingredient = document.querySelector('.productinfoingredientstext');
    productinfoingredientsheader.classList.toggle('activeinfoheader');
    productinfousageheader.classList.toggle('notactiveinfoheader');
    productinfodescriptionheader.classList.toggle('notactiveinfoheader');
    productinfoingredient.classList.toggle('activeinfo');
}


