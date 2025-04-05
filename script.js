let cart = {}; // Carrinho de compras (objeto)
let cartCount = 0; // Contador de itens no carrinho

// Atualizar o ícone do carrinho e a notificação
function updateCartNotification() {
    const notification = document.getElementById('cart-notification-icon');
    notification.textContent = cartCount;
    if (cartCount > 0) {
        notification.style.display = 'block';
    } else {
        notification.style.display = 'none';
    }
}

// Adicionar produto ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Adicionar o produto ao carrinho
        if (!cart[productName]) {
            cart[productName] = { quantity: 0, price: productPrice };
        }
        cart[productName].quantity++;

        cartCount++;
        updateCartNotification();

        // Atualizar o carrinho popup
        updateCartPopup();
    });
});

// Atualizar o conteúdo do popup do carrinho
function updateCartPopup() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Limpar antes de adicionar os novos itens

    let total = 0;
    for (let product in cart) {
        const item = cart[product];
        total += item.quantity * item.price;

        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${product} x ${item.quantity} - R$ ${item.price.toFixed(2)}`;
        cartItemsDiv.appendChild(itemDiv);
    }

    document.getElementById('cart-total-value').textContent = `R$ ${total.toFixed(2)}`;
}

// Mostrar/fechar o carrinho
const cartPopup = document.getElementById('cart-popup');
const cartIcon = document.getElementById('cart-icon');
const closeCartButton = document.getElementById('close-cart');

cartIcon.addEventListener('click', function () {
    cartPopup.style.display = 'flex';
});

closeCartButton.addEventListener('click', function () {
    cartPopup.style.display = 'none';
});
