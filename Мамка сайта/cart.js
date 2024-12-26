document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = getCartFromLocalStorage() || [];
    let currentUser = getUserFromLocalStorage() || null;
    let orders = getOrdersFromLocalStorage() || [];


    updateCartDisplay();
    updateCartCount();


     // Функция получения корзины из LocalStorage
      function getCartFromLocalStorage() {
        const cartData = localStorage.getItem('cart');
          return cartData ? JSON.parse(cartData) : null;
      }

   // Функция сохранения корзины в LocalStorage
     function saveCartToLocalStorage() {
          localStorage.setItem('cart', JSON.stringify(cart));
     }

    // Функция получения пользователя из Local Storage
    function getUserFromLocalStorage() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    // Функция получения заказов из LocalStorage
    function getOrdersFromLocalStorage() {
        const orderData = localStorage.getItem('orders');
        return orderData ? JSON.parse(orderData) : [];
   }


  // Функция сохранения заказов в Local Storage
    function saveOrdersToLocalStorage() {
         localStorage.setItem('orders', JSON.stringify(orders));
   }



    // Функция обновления корзины на странице.
     function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
             cartTotalElement.textContent = 'Итого: $0.00';
             checkoutButton.disabled = true;
            return;
        }

        let total = 0;
       cart.forEach(item => {
           const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');


            const itemInfo = document.createElement('div');
           itemInfo.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
          cartItemDiv.appendChild(itemInfo);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
           removeButton.addEventListener('click', () => removeItemFromCart(item.id));
           cartItemDiv.appendChild(removeButton);

           cartItemsContainer.appendChild(cartItemDiv);
           total += item.price * item.quantity;
       });

       cartTotalElement.textContent = `Итого: $${total.toFixed(2)}`;
      checkoutButton.disabled = false;
  }

  function removeItemFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
       saveCartToLocalStorage();
      updateCartDisplay();
       updateCartCount();
  }


   function updateCartCount() {
        let totalQuantity = 0;
       cart.forEach(item => {
           totalQuantity += item.quantity;
        });
       cartCountElement.textContent = totalQuantity;
    }


    checkoutButton.addEventListener('click', function() {
       if(currentUser) {
           const order = {
                date: new Date().toLocaleDateString(),
               total: parseFloat(cartTotalElement.textContent.replace('Итого: $', '')),
               items: cart
            }
            orders.push(order);
            saveOrdersToLocalStorage();
            cart = [];
            saveCartToLocalStorage();
            updateCartDisplay();
           updateCartCount();
           alert("Заказ успешно оформлен");
           window.location.href = 'profile.html';
         }else {
           alert("Для оформления заказа необходимо войти в аккаунт");
       }

    });

});