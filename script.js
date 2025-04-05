document.addEventListener('DOMContentLoaded', () => {
  const cartPopup = document.getElementById('cart-popup');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  let cart = [];

  // Função para abrir o carrinho
  openCartBtn.addEventListener('click', () => {
    cartPopup.style.display = 'flex';
    displayCartItems();
  });

  // Função para fechar o carrinho
  closeCartBtn.addEventListener('click', () => {
    cartPopup.style.display = 'none';
  });

  // Adicionar itens ao carrinho
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      const productImage = button.getAttribute('data-image');

      const productIndex = cart.findIndex(item => item.name === productName);

      if (productIndex === -1) {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
      } else {
        cart[productIndex].quantity++;
      }

      displayCartItems();
    });
  });

  // Exibir itens do carrinho no popup
  function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Carrinho vazio</p>';
    } else {
      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="50">
          <span>${item.name}</span>
          <span>R$ ${item.price.toFixed(2)}</span>
          <span>Quantidade: ${item.quantity}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
      });
    }
  }
});
