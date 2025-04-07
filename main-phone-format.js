document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('userPhone');
  const startBtn = document.getElementById('start-btn');

  // 手機輸入自動加破折號
  input.addEventListener('input', function (e) {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (raw.length > 6) {
      raw = raw.replace(/(\d{4})(\d{3})(\d{0,3})/, (_, a, b, c) => c ? `${a}-${b}-${c}` : `${a}-${b}`);
    } else if (raw.length > 4) {
      raw = raw.replace(/(\d{4})(\d{0,3})/, (_, a, b) => `${a}-${b}`);
    }
    e.target.value = raw;
  });

  // 點擊開始填寫
  startBtn.addEventListener('click', async function () {
    const phone = input.value.replace(/\D/g, '');
    if (!/^09\d{8}$/.test(phone)) {
      alert("請輸入正確的手機號碼（10碼數字，09開頭）");
      return;
    }

    document.getElementById('phone').value = phone;
    document.getElementById('phonePrompt').style.display = 'none';
    document.getElementById('order-form').style.display = 'block';

    // ✅ 改為 POST 查詢資料
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxJv2ZEEXdEIQSLhL3z6H3uVXtKBqVWEKWO1hNs1QXSSg8fH2fvykTioBhmkGEV_T-nJA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();

      if (data["取餐時間"]) {
        const confirmEdit = confirm("您已填過訂單，是否要修改？");
        if (!confirmEdit) {
          document.getElementById('order-form').innerHTML = "<h3 style='color:red;'>您取消了修改。</h3>";
          return;
        }
        for (const [key, value] of Object.entries(data)) {
          const el = document.querySelector(`[name="${key}"]`);
          if (el) el.value = value;
        }
      }
    } catch (err) {
      console.warn("查詢資料失敗", err);
    }
  });
});
