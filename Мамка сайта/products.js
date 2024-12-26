document.addEventListener('DOMContentLoaded', function() {
    const productListContainer = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const cartCountElement = document.getElementById('cart-count');

    let products = getProductsFromLocalStorage() || []; // Получаем товары из LocalStorage или создаем пустой массив
     let cart = getCartFromLocalStorage() || []; // Получаем корзину из Local Storage или создаем новую.

    updateProductDisplay();
    updateCartCount();

  // Функция получения товаров из Local Storage
    function getProductsFromLocalStorage() {
       const productData = localStorage.getItem('products');
       return productData ? JSON.parse(productData) : null;
    }

   // Функция сохранения товаров в Local Storage
    function saveProductsToLocalStorage() {
       localStorage.setItem('products', JSON.stringify(products));
    }

   // Функция получения корзины из LocalStorage
    function getCartFromLocalStorage() {
      const cartData = localStorage.getItem('cart');
       return cartData ? JSON.parse(cartData) : null;
    }


    function updateCartCount() {
          let totalQuantity = 0;
        cart.forEach(item => {
           totalQuantity += item.quantity;
        });
        cartCountElement.textContent = totalQuantity;
    }

   // Обновление отображения списка товаров.
    function updateProductDisplay() {
        productListContainer.innerHTML = ''; // Очищаем контейнер
          if (products.length === 0) {
             productListContainer.innerHTML = '<p>Список товаров пуст</p>';
              return;
           }


        products.forEach(product => {
           const productDiv = document.createElement('div');
            productDiv.classList.add('product');

              const img = document.createElement('img');
               img.src = product.image;
             img.alt = product.name;
            productDiv.appendChild(img);

             const h3 = document.createElement('h3');
             h3.textContent = product.name;
             productDiv.appendChild(h3);

             const p = document.createElement('p');
            p.textContent = product.description;
            productDiv.appendChild(p);

            const priceSpan = document.createElement('span');
             priceSpan.classList.add('price');
            priceSpan.textContent = `$${product.price.toFixed(2)}`;
           productDiv.appendChild(priceSpan);


           productListContainer.appendChild(productDiv);
      });

    }


    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
       const productImage = document.getElementById('product-image').value;

        // Создаем новый объект товара.
         const newProduct = {
            id: Date.now().toString(), // генерируем ID
            name: productName,
            description: productDescription,
            price: productPrice,
           image: productImage,
        };

        products.push(newProduct); // Добавляем товар в массив.
        saveProductsToLocalStorage();
        updateProductDisplay(); // Обновляем отображение
       addProductForm.reset(); // Очищаем форму.
    });

});