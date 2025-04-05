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
        const productPrice = parse
