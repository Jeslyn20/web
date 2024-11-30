document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close");
    const cartTab = document.querySelector(".cartTab");
    const minusButtons = document.querySelectorAll(".minus");
    const plusButtons = document.querySelectorAll(".plus");
    const quantities = document.querySelectorAll(".quantity span");
    const prices = document.querySelectorAll(".totalPrice");
    const totalAmount = document.getElementById("totalAmount"); // 總金額顯示區域

    // 各商品單價 (按順序對應 HTML 商品)
    const basePrices = [580, 990, 720, 350, 420];

    // Close button functionality
    closeButton.addEventListener("click", () => {
        cartTab.style.display = "none"; // 隱藏購物車區域
    });

    // Minus button functionality
    minusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let quantity = parseInt(quantities[index].textContent);
            if (quantity > 1) {
                quantity--;
                quantities[index].textContent = quantity;
                updatePriceAndTotal(index, quantity);
            }
        });
    });

    // Plus button functionality
    plusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let quantity = parseInt(quantities[index].textContent);
            quantity++;
            quantities[index].textContent = quantity;
            updatePriceAndTotal(index, quantity);
        });
    });

    // 更新單個商品價格和總金額
    function updatePriceAndTotal(index, quantity) {
        // 更新商品小計
        prices[index].textContent = `NT$${basePrices[index] * quantity}`;

        // 更新總金額
        updateTotalAmount();
    }

    // 計算並更新購物車總金額
    function updateTotalAmount() {
        let total = 0;
        quantities.forEach((quantity, index) => {
            total += parseInt(quantity.textContent) * basePrices[index];
        });
        totalAmount.textContent = `NT$${total}`;
    }

    // 初始化總金額
    updateTotalAmount();
});
