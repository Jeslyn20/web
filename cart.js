document.addEventListener("DOMContentLoaded", () => {
    const cartTab = document.querySelector(".cartTab");
    const closeButton = document.querySelector(".close");
    const totalAmount = document.getElementById("totalAmount"); // 總金額顯示區域
    const basePrices = [580, 799, 680, 340, 360]; // 各商品單價
    const cartItems = document.querySelector(".listCart"); // 購物車商品區域

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

    // 動態新增商品到購物車
    function addProductToCart(name, price, image) {
        const productHTML = `
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
        cartItems.insertAdjacentHTML("beforeend", productHTML); // 插入新商品到購物車

        // 綁定新增商品的按鈕事件
        bindDynamicButtons();
    }

    // 初始化功能
    closeButton.addEventListener("click", () => {
        cartTab.style.display = "none"; // 隱藏購物車
    });

    // 假設這是您新增商品的方式
    // 示例：新增一個商品
    addProductToCart("迷彩運動風上衣", 580, "images/p1.png");
    addProductToCart("低腰闊腿褲", 799, "images/p2.png");
    addProductToCart("百褶超迷你短裙", 680, "images/p3.png");
    addProductToCart("酷帥黑色冷帽", 340, "images/p4.png");
    addProductToCart("街頭風銀色短項鍊", 360, "images/p5.png");
  

    // 初始化總金額
    updateTotalAmount();
});
