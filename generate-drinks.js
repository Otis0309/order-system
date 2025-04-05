document.addEventListener('DOMContentLoaded', function () {
  const drinkOptions = document.querySelectorAll('#soup, #tea');
  drinkOptions.forEach(select => {
    for (let i = 0; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
  });
});
