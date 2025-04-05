// Variáveis
const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cart-popup');
const closePopupBtn = document.getElementById('close-popup');
const cartItemsContainer = document.getElementById('cart-items');
const addButtons = document.querySelectorAll('.add-to-cart');

// Array para armazenar os itens no carrinho
let cartItems = [];

// Função para abrir o popup do carrinho
function openCartPopup() {
  cartPopup.style.display = 'flex';
}

// Função para fechar o popup do carrinho
function closeCartPopup() {
  cartPopup.style.display = 'none';
}

// Adicionar um produto ao carrinho
function addToCart(productId, productName, productPrice, productImage) {
  // Verifica se o produto já foi adicionado ao carrinho
  const existingItem = cartItems.find(item => item.id === productId);

  if (!existingItem) {
    // Se não existir, adiciona o item ao carrinho
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  } else {
    // Se o produto já existir, apenas aumenta a quantidade
    existingItem.quantity++;
  }

  renderCartItems();
}

// Renderizar os itens do carrinho
function renderCartItems() {
  cartItemsContainer.innerHTML = ''; // Limpa o carrinho

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button class="quantity-decrease" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-increase" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);
  });
}

// Função para alterar a quantidade de um item no carrinho
function changeQuantity(productId, change) {
  const item = cartItems.find(item => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      // Remover item do carrinho caso a quantidade seja 0 ou negativa
      cartItems = cartItems.filter(item => item.id !== productId);
    }

    renderCartItems();
  }
}

// Adicionar eventos aos botões de "adicionar ao carrinho"
addButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productId = event.target.dataset.id;
    const productName = event.target.dataset.name;
    const productPrice = parseFloat(event.target.dataset.price);
    const productImage = event.target.dataset.image;

    addToCart(productId, productName, productPrice, productImage);
  });
});

// Abrir o carrinho ao clicar no ícone do carrinho
cartIcon.addEventListener('click', openCartPopup);

// Fechar o carrinho ao clicar no botão de fechar
closePopupBtn.addEventListener('click', closeCartPopup);
