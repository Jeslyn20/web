document.addEventListener("DOMContentLoaded", () => {
    const cartTab = document.querySelector(".cartTab");
    const closeButton = document.querySelector(".close");
    const totalAmount = document.getElementById("totalAmount"); // 總金額顯示區域
    const basePrices = [580, 990, 720, 350, 420]; // 各商品單價

    // 綁定按鈕事件 (包括動態新增商品)
    function bindDynamicButtons() {
        const minusButtons = document.querySelectorAll(".minus");
        const plusButtons = document.querySelectorAll(".plus");
        const quantities = document.querySelectorAll(".quantity span");
        const prices = document.querySelectorAll(".totalPrice");

        // Minus 按鈕功能
        minusButtons.forEach((btn, index) => {
            btn.onclick = () => {
                let quantity = parseInt(quantities[index].textContent);
                if (quantity > 1) {
                    quantity--;
                    quantities[index].textContent = quantity;
                    updatePriceAndTotal(index, quantity, prices);
                }
            };
        });

        // Plus 按鈕功能
        plusButtons.forEach((btn, index) => {
            btn.onclick = () => {
                let quantity = parseInt(quantities[index].textContent);
                quantity++;
                quantities[index].textContent = quantity;
                updatePriceAndTotal(index, quantity, prices);
            };
        });
    }

    // 更新單個商品價格和總金額
    function updatePriceAndTotal(index, quantity, prices) {
        const price = index < basePrices.length ? basePrices[index] : 500; // 新商品單價預設 500
        prices[index].textContent = `NT$${price * quantity}`;
        updateTotalAmount();
    }

    // 計算並更新購物車總金額
    function updateTotalAmount() {
        const quantities = document.querySelectorAll(".quantity span");
        const prices = document.querySelectorAll(".totalPrice");
        let total = 0;

        quantities.forEach((quantity, index) => {
            const price = index < basePrices.length ? basePrices[index] : 500; // 預設新商品價格
            total += parseInt(quantity.textContent) * price;
        });

        totalAmount.textContent = `NT$${total}`;
    }

    // 初始化功能
    closeButton.addEventListener("click", () => {
        cartTab.style.display = "none"; // 隱藏購物車
    });

    // 綁定現有商品的按鈕功能
    bindDynamicButtons();

    // 初始化總金額
    updateTotalAmount();
});

