// client.js (frontend - JavaScript)
fetch('/users')
  .then(response => response.json())
  .then(data => {
    // Обработка данных и отображение их на странице
    console.log(data);
    // ...
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });