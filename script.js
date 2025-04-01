const API_URL = "https://script.google.com/macros/s/AKfycbyAwIuZOeFREAtspq00R5IktbyQfE2qN4c8oUAihIBh/dev"; 

// **填充下拉選單**
function populateSelectOptions() {
    let selectElements = document.querySelectorAll("select[id^='item-']");
    
    selectElements.forEach(select => {
        select.innerHTML = ""; // 先清空選單
        let maxQuantity = 10;  // 預設最大 10 份，未來可根據庫存調整

        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "請選擇";
        select.appendChild(defaultOption);

        for (let i = 1; i <= maxQuantity; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i + " 份";
            select.appendChild(option);
        }
    });
}

// **提交訂單**
function submitOrder() {
    let pickupTime = document.getElementById("pickup-time").value;
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // **驗證輸入**
    if (pickupTime === "") {
        alert("請選擇取餐時段！");
        return;
    }
    if (name === "" || name === "例如 王先生") {
        alert("請輸入您的姓名！");
        return;
    }
    if (phone === "" || phone === "例如 0912345678") {
        alert("請輸入您的手機號碼！");
        return;
    }

    // **收集訂單**
    let order = {};
    let hasSelected = false;

    document.querySelectorAll("select[id^='item-']").forEach(select => {
        let itemName = select.id.replace("item-", "");
        let quantity = parseInt(select.value) || 0;
        if (quantity > 0) {
            order[itemName] = quantity;
            hasSelected = true;
        }
    });

    if (!hasSelected) {
        alert("請至少選擇一項餐點！");
        return;
    }

    // **準備送出訂單**
    let orderData = {
        pickupTime: pickupTime,
        name: name,
        phone: phone,
        order: order
    };
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        // 儲存訂單資料到 localStorage
        localStorage.setItem("orderData", JSON.stringify(orderData));
    
        // 跳轉到確認頁
        window.location.href = "confirm.html";
    });
    .catch(error => {
        console.error("送出訂單錯誤：", error);
        alert("無法提交訂單，請稍後再試");
    });
}

// **頁面載入時填充選單**
window.onload = () => {
    populateSelectOptions();
    document.getElementById("submit-btn").addEventListener("click", submitOrder);
};
