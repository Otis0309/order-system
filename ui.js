function populateSelectOptions() {
    let selectElements = document.querySelectorAll("select[id^='item-']");

    selectElements.forEach(select => {
        select.innerHTML = "";
        let maxQuantity = 10;

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
