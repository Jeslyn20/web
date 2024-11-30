document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close");
    const cartTab = document.querySelector(".cartTab");
    const minusButtons = document.querySelectorAll(".minus");
    const plusButtons = document.querySelectorAll(".plus");
    const quantities = document.querySelectorAll(".quantity span");
    const prices = document.querySelectorAll(".totalPrice");

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
                updatePrice(index, quantity);
            }
        });
    });

    // Plus button functionality
    plusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let quantity = parseInt(quantities[index].textContent);
            quantity++;
            quantities[index].textContent = quantity;
            updatePrice(index, quantity);
        });
    });

    // Update price based on quantity
    function updatePrice(index, quantity) {
        const basePrices = [580, 990, 720, 350, 420]; // 各商品單價
        prices[index].textContent = `NT$${basePrices[index] * quantity}`;
    }
});
