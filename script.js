document.addEventListener("DOMContentLoaded", () => {
    const cart = {}; // Objeto para armazenar os itens do carrinho
    const cartIcon = document.getElementById("cart-icon");
    const cartNotification = document.getElementById("cart-notification-icon");
    const cartPopup = document.getElementById("cart-popup");
    const cartItemsContainer = document.getElementById("cart-items");
    const closeCartButton = document.getElementById("close-cart");

    // Evento para adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productName = event.target.dataset.product;
            const productPrice = parseFloat(event.target.dataset.price);
            const productImage = event.target.dataset.image;

            // Se o produto já estiver no carrinho, aumentar a quantidade
            if (cart[productName]) {
                cart[productName].quantity += 1;
            } else {
                cart[productName] = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
            }

            // Atualiza o carrinho na interface
            updateCart();
        });
    });

    // Função para atualizar o carrinho
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Limpa o carrinho
        let total = 0;
        let totalItems = 0;

        for (const productName in cart) {
            const item = cart[productName];
            total += item.price * item.quantity;
            totalItems += item.quantity;

            // Cria o item de carrinho
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-control">
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        // Atualiza a notificação do carrinho
        cartNotification.textContent = totalItems;
        document.getElementById("cart-total-value").textContent = `R$ ${total.toFixed(2)}`;
    }

    // Função para alterar a quantidade do produto
    window.changeQuantity = (productName, delta) => {
        if (cart[productName]) {
            cart[productName].quantity += delta;

            if (cart[productName].quantity <= 0) {
                delete cart[productName]; // Remove o produto do carrinho se a quantidade for zero ou negativa
            }

            // Atualiza o carrinho na interface
            updateCart();
        }
    };

    // Evento para abrir o carrinho
    cartIcon.addEventListener("click", () => {
        cartPopup.style.display = "flex"; // Abre o popup do carrinho
    });

    // Evento para fechar o carrinho
    closeCartButton.addEventListener("click", () => {
        cartPopup.style.display = "none"; // Fecha o popup do carrinho
    });

    // Funcionalidade para finalizar a compra
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", () => {
        if (Object.keys(cart).length === 0) {
            alert("Seu carrinho está vazio!");
        } else {
            alert("Compra finalizada com sucesso!");
            // Limpar o carrinho após a finalização
            for (const product in cart) {
                delete cart[product];
            }
            updateCart(); // Atualiza o carrinho
        }
    });
});
