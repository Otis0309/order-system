function createMenuItem(item) {
  const container = document.createElement("div");
  container.style.marginBottom = "10px";

  const label = document.createElement("label");
  label.htmlFor = item.id;
  label.innerHTML = `${item.displayName}（<span style="color:red;">剩 ${item.stock} 份</span>）`;

  const select = document.createElement("select");
  select.id = item.id;
  select.name = item.id;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "請選擇";
  select.appendChild(defaultOption);

  for (let i = 1; i <= Math.min(MAX_QUANTITY, item.stock); i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} 份`;
    select.appendChild(option);
  }

  container.appendChild(label);
  container.appendChild(select);
  return container;
}

function loadMenuFromSheet() {
  fetch(MENU_API_URL)
    .then(res => res.json())
    .then(menuData => {
      const container = document.getElementById("menu-container");
      container.innerHTML = "";

      const grouped = {};
      menuData.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });

      for (const category in grouped) {
        const title = document.createElement("h3");
        title.textContent = category;
        container.appendChild(title);

        grouped[category].forEach(item => {
          const menuItem = createMenuItem(item);
          container.appendChild(menuItem);
        });
      }
    })
    .catch(err => {
      console.error("菜單載入失敗：", err);
    });
}
