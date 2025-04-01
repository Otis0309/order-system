function collectOrderData() {
  const order = {};
  document.querySelectorAll("select[id^='item-']").forEach(select => {
    const val = parseInt(select.value);
    if (val > 0) {
      order[select.id.replace("item-", "")] = val;
    }
  });
  return order;
}

function submitOrder() {
  if (!validateForm()) return;

  const pickupTime = document.getElementById("pickup-time").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const order = collectOrderData();

  if (Object.keys(order).length === 0) {
    alert("請至少選擇一項餐點！");
    return;
  }

  const orderData = { pickupTime, name, phone, order };

  fetch(SUBMIT_API_URL, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("orderData", JSON.stringify(orderData));
    window.location.href = "confirm.html";
  })
  .catch(err => {
    console.error("提交錯誤：", err);
    alert("訂單送出失敗，請稍後再試");
  });
}
