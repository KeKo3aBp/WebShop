document.addEventListener('DOMContentLoaded', function() {
    const profileInfoDiv = document.getElementById('profile-info');
    const logoutButton = document.getElementById('logout-button');
    const cartCountElement = document.getElementById('cart-count');
    const orderHistoryDiv = document.getElementById('order-history');
    const userLastnameInput = document.getElementById('user-lastname');
    const userFirstnameInput = document.getElementById('user-firstname');
    const userPatronymicInput = document.getElementById('user-patronymic');
   const userPhoneInput = document.getElementById('user-phone');
    const userCityInput = document.getElementById('user-city');
    const saveUserDetailsButton = document.getElementById('save-user-details');
     const profilePhoto = document.getElementById('profile-photo');
    const uploadPhotoButton = document.getElementById('upload-photo-button');
    const photoUploadInput = document.getElementById('photo-upload-input');

    let currentUser = getUserFromLocalStorage() || null;
    let cart = getCartFromLocalStorage() || [];
    let orders = getOrdersFromLocalStorage() || []; // Получаем заказы из LocalStorage.

     updateCartCount();
     renderProfileDetails();
     renderOrderHistory();


    // Функция получения корзины из LocalStorage
    function getCartFromLocalStorage() {
        const cartData = localStorage.getItem('cart');
          return cartData ? JSON.parse(cartData) : null;
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


   function updateCartCount() {
        let totalQuantity = 0;
       cart.forEach(item => {
           totalQuantity += item.quantity;
        });
       cartCountElement.textContent = totalQuantity;
   }


     function renderProfileDetails() {
        if (currentUser) {
            userLastnameInput.value = currentUser.lastName || '';
            userFirstnameInput.value = currentUser.firstName || '';
            userPatronymicInput.value = currentUser.patronymic || '';
            userPhoneInput.value = currentUser.phone || '';
            userCityInput.value = currentUser.city || '';

           profilePhoto.src = currentUser.photo || 'placeholder.png';
            profilePhoto.alt = `${currentUser.lastName || ''} ${currentUser.firstName || ''} ${currentUser.patronymic || ''}`;

           profileInfoDiv.querySelector('#user-details').innerHTML = `<p><strong>Email:</strong> ${currentUser.email}</p>`;
        }else{
          profileInfoDiv.innerHTML = `<p>Пользователь не авторизован</p>`
       }
   }


    function renderOrderHistory() {
        orderHistoryDiv.innerHTML = '';

       if (orders.length === 0) {
          orderHistoryDiv.innerHTML = '<p>Заказов пока нет.</p>';
           return;
        }
        orders.forEach(order => {
           const orderDiv = document.createElement('div');
           orderDiv.innerHTML = `
              <p><strong>Дата:</strong> ${order.date}</p>
              <p><strong>Сумма:</strong> $${order.total.toFixed(2)}</p>
               <ul>${order.items.map(item => `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}</ul>
              <hr>`;
          orderHistoryDiv.appendChild(orderDiv);
       });
   }

    saveUserDetailsButton.addEventListener('click', function() {
         if (currentUser) {
             currentUser.lastName = userLastnameInput.value;
            currentUser.firstName = userFirstnameInput.value;
            currentUser.patronymic = userPatronymicInput.value;
            currentUser.phone = userPhoneInput.value;
            currentUser.city = userCityInput.value;
             saveUserToLocalStorage(currentUser);
            renderProfileDetails();
       }
   });

     uploadPhotoButton.addEventListener('click', function() {
          photoUploadInput.click();
     });

    photoUploadInput.addEventListener('change', function() {
         const file = photoUploadInput.files[0];

        if (file) {
           const reader = new FileReader();

            reader.onload = function(e) {
               profilePhoto.src = e.target.result;
                 if(currentUser){
                     currentUser.photo = e.target.result;
                    saveUserToLocalStorage(currentUser);
                }
           }
           reader.readAsDataURL(file);
       }
   });


   logoutButton.addEventListener('click', function() {
       localStorage.removeItem('user');
       window.location.href = 'index.html';
    });
});