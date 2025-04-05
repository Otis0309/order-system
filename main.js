document.getElementById('order-form').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((v, k) => data[k] = v);

  const hasItem = Object.keys(data).some(k =>
    (k.includes("湯包") || k.includes("酸辣湯") || k.includes("紅茶")) &&
    data[k] && data[k] !== ""
  );

  if (!hasItem) {
    alert("請至少選擇一項餐點！");
    return;
  }

  // ✅ 顯示確認視窗
  const summary = Object.entries(data)
    .filter(([k, v]) => v && v !== "" && k !== "手機號碼") // 避免重複顯示
    .map(([k, v]) => `<div><strong>${k}</strong>：${v}</div>`)
    .join("");

  document.getElementById("orderSummary").innerHTML =
    `<div><strong>手機號碼</strong>：${data["手機號碼"]}</div>` + summary;

  document.getElementById("orderConfirmModal").style.display = "flex";

  // 儲存目前資料，供按下「送出」時使用
  window.__orderData = data;
});

document.getElementById('confirmSubmit').addEventListener('click', async () => {
  const data = window.__orderData;
  await fetch("https://script.google.com/macros/s/AKfycbxJv2ZEEXdEIQSLhL3z6H3uVXtKBqVWEKWO1hNs1QXSSg8fH2fvykTioBhmkGEV_T-nJA/exec", {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  // ✅ 顯示感謝區塊
  document.getElementById("orderConfirmModal").style.display = "none";
  document.getElementById("order-form").style.display = "none";
  document.getElementById("thankyouScreen").style.display = "block";
});

document.getElementById('cancelSubmit').addEventListener('click', () => {
  document.getElementById("orderConfirmModal").style.display = "none";
});
