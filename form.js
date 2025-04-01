function validateForm() {
  const pickupTime = document.getElementById("pickup-time").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!pickupTime) {
    alert("請選擇取餐時段！");
    return false;
  }
  if (!name) {
    alert("請輸入姓名！");
    return false;
  }
  if (!phone) {
    alert("請輸入手機號碼！");
    return false;
  }

  return true;
}
