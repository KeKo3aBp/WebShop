document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    const cartLink = document.querySelector('header nav a[href="cart.html"]');
    const heroButton = document.getElementById('hero-button');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const profileLink = document.getElementById('profile-link');

    let cart = getCartFromLocalStorage() || [];
    let currentUser = getUserFromLocalStorage() || null;
    let orders = getOrdersFromLocalStorage() || [];


    updateCartCount();
     updateProfileLink();


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


      // Функция сохранения пользователя в Local Storage
    function saveUserToLocalStorage(user) {
         localStorage.setItem('user', JSON.stringify(user));
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


     // Функция добавления товара в корзину.
    function addProductToCart(productId, productName, productPrice) {
       const existingCartItem = cart.find(item => item.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity++;
       } else {
            cart.push({
                id: productId,
               name: productName,
               price: productPrice,
                quantity: 1,
           });
       }
       saveCartToLocalStorage();
      updateCartDisplay();
       updateCartCount();
    }

    // Обработчик добавления в корзину.
    addToCartButtons.forEach(button => {
       button.addEventListener('click', function() {
          const productId = this.getAttribute('data-product-id');
           const productElement = this.closest('.product');
          const productName = productElement.querySelector('h3').textContent;
          const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));
          addProductToCart(productId, productName, productPrice);
      });
   });

      // Функция обновления корзины в модальном окне.
     function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Очищаем содержимое

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


    // Обработчик открытия модального окна при клике на ссылку "Корзина".
   cartLink.addEventListener('click', function(event) {
        event.preventDefault();

         if (cart.length > 0) {
             updateCartDisplay();
           cartModal.style.display = 'block';
        }

   });


  // Закрытие модального окна по клику на крестик.
    closeButton.addEventListener('click', function() {
        cartModal.style.display = 'none';
  });

    // Закрытие модального окна по клику вне окна.
    window.addEventListener('click', function(event) {
      if (event.target === cartModal) {
           cartModal.style.display = 'none';
       }
    });

    // Обработчик открытия модального окна для входа/регистрации.
    heroButton.addEventListener('click', function(event) {
        event.preventDefault();
       if (currentUser) {
            window.location.href = 'profile.html';
            return;
       }

      loginModal.style.display = 'block';
   });

     // Закрытие модального окна для входа/регистрации по клику на крестик.
    loginModal.querySelector('.close-button').addEventListener('click', function() {
       loginModal.style.display = 'none';
    });

    // Закрытие модального окна для входа/регистрации по клику вне окна.
    window.addEventListener('click', function(event) {
       if (event.target === loginModal) {
           loginModal.style.display = 'none';
       }
  });

  // Обработчик для входа
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;


        const user = {
            email: email,
            lastName: loginForm.querySelector('#name').value || '',
           firstName: loginForm.querySelector('#name').value || '',
          patronymic: loginForm.querySelector('#name').value || '',

      };
        loginModal.style.display = 'none';
        currentUser = user;
        saveUserToLocalStorage(currentUser);
       updateProfileLink();
       window.location.href = 'profile.html';
   });

   // Обработчик для регистрации
    registerButton.addEventListener('click', function(event) {
        event.preventDefault();
        const email = loginForm.querySelector('#email').value;
       const password = loginForm.querySelector('#password').value;

        const user = {
             email: email,
             lastName: loginForm.querySelector('#name').value || '',
            firstName: loginForm.querySelector('#name').value || '',
            patronymic: loginForm.querySelector('#name').value || '',

         };
        loginModal.style.display = 'none';
        currentUser = user;
       saveUserToLocalStorage(currentUser);
        updateProfileLink();
       window.location.href = 'profile.html';
    });

   function updateProfileLink(){
        if (currentUser) {
             profileLink.textContent = 'Личный кабинет';
           } else {
             profileLink.textContent = 'Личный кабинет';
        }
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