document.addEventListener('DOMContentLoaded', function () {
  const pickupSelect = document.getElementById('pickup');
  for (let h = 16; h <= 21; h++) {
    for (let m of [0, 15, 30, 45]) {
      if (h === 21 && m > 0) continue;
      const label = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      pickupSelect.appendChild(option);
    }
  }
});
