const API_URL = "https://script.google.com/macros/s/AKfycby2aVDY8IuVkTj8SploPsSHaqCIgVDyKP5vz5eg_Ip-B8BDfXXi3qyny-YDfSz6McFvjw/exec";

// **動態載入品項**
function loadMenuItems() {
    fetch(`${API_URL}?action=getMenu`)
        .then(response => response.json())
        .then(data => {
            let dumplingTable = document.getElementById("dumpling-table");
            let drinksSoupsContainer = document.getElementById("drinks-soups");

            dumplingTable.innerHTML = ""; // 清空湯包表格
            drinksSoupsContainer.innerHTML = ""; // 清空湯品與飲品區

            let dumplingMap = {}; // 存放湯包品項（要薑絲 / 不要薑絲）

            data.forEach(item => {
                let { name, category, stock } = item;
                let maxQuantity = Math.min(stock, 10); // 最大選擇數量為 10，若庫存不足則調整

                // 產生下拉選單
                let selectHTML = `<select id="item-${name}">`;
                for (let i = 0; i <= maxQuantity; i++) {
                    selectHTML += `<option value="${i}">${i}</option>`;
                }
                selectHTML += `</select>`;

                if (category === "湯包") {
                    // 分開處理「要薑絲」與「不要薑絲」
                    let baseName = name.replace(" (要薑絲)", "").replace(" (不要薑絲)", "");
                    let isGinger = name.includes("要薑絲");

                    if (!dumplingMap[baseName]) {
                        dumplingMap[baseName] = { name: baseName, withGinger: "-", withoutGinger: "-" };
                    }

                    if (isGinger) {
                        dumplingMap[baseName].withGinger = selectHTML;
                    } else {
                        dumplingMap[baseName].withoutGinger = selectHTML;
                    }
                } 
                else {
                    // 加入湯品與飲品區
                    let div = document.createElement("div");
                    div.innerHTML = `<label>${name}：</label> ${selectHTML} <br>`;
                    drinksSoupsContainer.appendChild(div);
                }
            });

            // **建立湯包表格**
            Object.values(dumplingMap).forEach(item => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.withGinger}</td>
                    <td>${item.withoutGinger}</td>
                `;
                dumplingTable.appendChild(row);
            });
        })
        .catch(error => console.error("載入品項錯誤：", error));
}

// **送出訂單**
function submitOrder() {
    let pickupTime = document.getElementById("pickup-time").value;
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;

    let order = {};
    document.querySelectorAll("select[id^='item-']").forEach(select => {
        let itemName = select.id.replace("item-", "");
        let quantity = parseInt(select.value) || 0;
        if (quantity > 0) order[itemName] = quantity;
    });

    if (!pickupTime || !name || !phone || Object.keys(order).length === 0) {
        alert("請選擇取餐時間、填寫姓名和電話，並至少選擇一項餐點！");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ pickupTime, name, phone, order }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}

// **初始化**
window.onload = () => {
    loadMenuItems();
};
