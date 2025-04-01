function loadMenuFromSheet() {
  fetch(MENU_API_URL)
    .then(res => res.json())
    .then(menuData => {
      console.log("菜單資料：", menuData);
      const tbody = document.getElementById("menu-body");
      tbody.innerHTML = "";

      // 依照主品項分組
      const groupedItems = {};

      menuData.forEach(item => {
        if (item.category !== "湯包") return; // 只針對湯包產表格，其他分類另處理

        const baseName = item.displayName.split("(")[0].trim(); // 例如「原味爆漿湯包」
        const isWithGinger = item.displayName.includes("要薑絲");
        const isWithoutGinger = item.displayName.includes("不要薑絲");

        if (!groupedItems[baseName]) {
          groupedItems[baseName] = {
            price: item.price,
            withGinger: null,
            withoutGinger: null,
          };
        }

        if (isWithGinger) groupedItems[baseName].withGinger = item;
        if (isWithoutGinger) groupedItems[baseName].withoutGinger = item;
      });

      // 產出每一列
      Object.entries(groupedItems).forEach(([name, group]) => {
        const tr = document.createElement("tr");

        // 品項名稱欄位
        const tdName = document.createElement("td");
        tdName.textContent = `${name} - $${group.price}`;
        tr.appendChild(tdName);

        // 要薑絲欄位
        const tdWith = document.createElement("td");
        tdWith.appendChild(createSelect(group.withGinger));
        tr.appendChild(tdWith);

        // 不要薑絲欄位
        const tdWithout = document.createElement("td");
        tdWithout.appendChild(createSelect(group.withoutGinger));
        tr.appendChild(tdWithout);

        tbody.appendChild(tr);
      });

      // 處理其他品項（湯品／飲品）
      loadOthers(menuData);
    })
    .catch(err => {
      console.error("載入菜單失敗：", err);
    });
}

// 建立選單元件
function createSelect(item) {
  console.log("建立選單：", item);
  const select = document.createElement("select");

  if (!item) {
    const opt = document.createElement("option");
    opt.textContent = "－";
    select.appendChild(opt);
    return select;
  }

  select.id = item.id;

  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.textContent = "請選擇";
  select.appendChild(defaultOpt);

  for (let i = 1; i <= Math.min(10, item.stock); i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i} 份`;
    select.appendChild(opt);
  }

  return select;
}

// 額外餐點（湯品與飲品）
function loadOthers(menuData) {
  const container = document.getElementById("others-container");
  if (!container) return;

  container.innerHTML = ""; // 清空原內容

  const otherTypes = ["湯品", "飲品"];
  const grouped = {};

  menuData.forEach(item => {
    if (otherTypes.includes(item.category)) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    }
  });

  for (const category in grouped) {
    const title = document.createElement("h3");
    title.textContent = category;
    container.appendChild(title);

    grouped[category].forEach(item => {
      const label = document.createElement("label");
      label.textContent = `${item.displayName} - $${item.price}`;

      const select = createSelect(item);

      container.appendChild(label);
      container.appendChild(select);
      container.appendChild(document.createElement("br"));
    });
  }
}
