document.addEventListener('DOMContentLoaded', function () {
  const dumplingFlavors = [
    "原味爆漿湯包", "絲瓜湯包", "韭菜湯包", "麻辣湯包", "咖哩湯包",
    "臭豆腐湯包", "鮮味菌菇湯包", "翠玉湯包，全素", "牛肉湯包", "黑松露湯包"
  ];
  const tbody = document.getElementById("dumpling-table-body");
  dumplingFlavors.forEach(f => {
    const tr = document.createElement("tr");
    const tdFlavor = document.createElement("td");
    tdFlavor.textContent = f;
    tr.appendChild(tdFlavor);
    ["(要薑絲)", "(不要薑絲)"].forEach(type => {
      const td = document.createElement("td");
      const sel = document.createElement("select");
      sel.name = f + type;
      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.disabled = true;
      opt0.selected = true;
      opt0.textContent = "請選擇";
      opt0.style.color = "gray";
      sel.appendChild(opt0);
      for (let i = 0; i <= 10; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        sel.appendChild(opt);
      }
      td.appendChild(sel);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
});
