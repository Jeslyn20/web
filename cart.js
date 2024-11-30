document.addEventListener("DOMContentLoaded", () => {
    const cartTab = document.querySelector(".cartTab");
    const closeButton = document.querySelector(".close");
    const totalAmount = document.getElementById("totalAmount"); // 總金額顯示區域
    const cartItems = document.querySelector(".listCart");
    const basePrices = [580, 799, 680, 340, 360]; // 各商品單價

    // 綁定「查看更多」按鈕事件
    const viewMoreButtons = document.querySelectorAll(".viewMore");

    viewMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = button.getAttribute("data-price");
            const image = button.getAttribute("data-image");

            // 清空購物車並新增所選商品
            cartItems.innerHTML = `
                <div class="item">
                    <img src="${image}" alt="${name}">
                    <div class="details">
                        <div class="name">${name}</div>
                        <div class="unitPrice">單價：NT$${price}</div>
                        <div class="quantity">
                            <button class="minus">-</button>
                            <span class="qty">1</span>
                            <button class="plus">+</button>
                        </div>
                        <div class="totalPrice">小計：NT$${price}</div>
                    </div>
                </div>
            `;

            // 更新總金額
            updateTotalAmount();

            // 顯示購物車頁面
            cartTab.style.display = "block";
        });
    });

    // 更新總金額
    function updateTotalAmount() {
        const quantities = document.querySelectorAll(".quantity span");
        const prices = document.querySelectorAll(".totalPrice");
        let total = 0;

        quantities.forEach((quantity, index) => {
            const price = basePrices[index];
            total += parseInt(quantity.textContent) * price;
        });

        totalAmount.textContent = `NT$${total}`;
    }

    // 關閉購物車
    closeButton.addEventListener("click", () => {
        cartTab.style.display = "none"; // 隱藏購物車
    });
});
