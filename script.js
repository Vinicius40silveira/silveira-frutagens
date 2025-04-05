// Variáveis
let cart = [];

// Função para abrir o carrinho
document.querySelector('.cart-icon').addEventListener('click', () => {
  document.querySelector('.cart-popup').style.display = 'flex';
  updateCart();
});

// Função para fechar o carrinho
document.querySelector('.close-cart').addEventListener('click', () => {
  document.querySelector('.cart-popup').style.display = 'none';
});

// Adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.getAttribute('data-product-id');
    const productName = productCard.querySelector('h2').textContent;
    const productPrice = productCard.querySelector('p').textContent;

    // Verificar se o produto já existe no carrinho
    let productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }

    updateCart();
  });
});

// Atualizar carrinho
function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';  // Limpar itens atuais

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <span>${item.name} (${item.price})</span>
      <div class="quantity-control">
        <button class="minus">-</button>
        <span>${item.quantity}</span>
        <button class="plus">+</button>
      </div>
    `;
    
    // Atualizar quantidade
    itemElement.querySelector('.minus').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      }
    });

    itemElement.querySelector('.plus').addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    cartItemsContainer.appendChild(itemElement);
  });

  // Atualizar notificação no carrinho
  document.querySelector('.cart-icon .notification').textContent = cart.length;
}
