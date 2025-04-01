function submitOrder() {
    let pickupTime = document.getElementById("pickup-time").value;
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

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

    let orderData = {
        pickupTime,
        name,
        phone,
        order
    };

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        window.location.href = "confirm.html";
    })
    .catch(error => {
        console.error("送出訂單錯誤：", error);
        alert("無法提交訂單，請稍後再試");
    });
}
