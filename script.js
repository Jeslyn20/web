// 切換頁面顯示
const mainPage = document.getElementById("mainPage");
const cartPage = document.getElementById("cartPage");
const cartItems = document.getElementById("cartItems");
const closeCart = document.getElementById("closeCart");

// 商品清單
const viewMoreButtons = document.querySelectorAll(".viewMore");

viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        const image = button.getAttribute("data-image");

        // 創建新的購物車項目
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        cartItem.innerHTML = `
            <img src="${image}" alt="${name}">
            <h2>${name}</h2>
            <p>NT$${price}</p>
            <div class="quantity">
                <button class="minus">-</button>
                <span class="qty">1</span>
                <button class="plus">+</button>
            </div>
            <div class="totalPrice">小計：NT$${price}</div>
        `;

        // 將新商品加入購物車
        cartItems.appendChild(cartItem);

        // 設置數量增減按鈕的事件
        const minusButton = cartItem.querySelector(".minus");
        const plusButton = cartItem.querySelector(".plus");
        const quantitySpan = cartItem.querySelector(".qty");
        const totalPrice = cartItem.querySelector(".totalPrice");

        // 單價
        const unitPrice = parseInt(price);

        // 增加數量
        plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updatePriceAndTotal();
        });

        // 減少數量
        minusButton.addEventListener("click", () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updatePriceAndTotal();
            }
        });

        // 更新小計和總金額
        function updatePriceAndTotal() {
            const total = unitPrice * parseInt(quantitySpan.textContent);
            totalPrice.textContent = `小計：NT$${total}`;
            updateTotalAmount();
        }

        // 計算總金額
        function updateTotalAmount() {
            let total = 0;
            document.querySelectorAll(".cartItem").forEach((item) => {
                const qty = item.querySelector(".qty").textContent;
                const price = item.querySelector(".totalPrice").textContent.split("NT$")[1];
                total += parseInt(qty) * parseInt(price);
            });
            document.getElementById("totalAmount").textContent = `NT$${total}`;
        }

        updatePriceAndTotal(); // 初始化小計和總金額

        // 切換到購物車頁面
        mainPage.style.display = "none";
        cartPage.style.display = "block";
    });
});

// 關閉購物車
closeCart.addEventListener("click", () => {
    // 切換回主頁
    cartPage.style.display = "none";
    mainPage.style.display = "block";
});
