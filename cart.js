document.addEventListener("DOMContentLoaded", () => {
    const cartTab = document.querySelector(".cartTab");
    const closeButton = document.querySelector(".close");
    const totalAmount = document.getElementById("totalAmount"); // 總金額顯示區域
    const cartItems = document.querySelector(".listCart");
    const basePrices = [580, 799, 680, 340, 360]; // 各商品單價
    let cart = []; // 購物車陣列，儲存商品及數量

    // 綁定「查看更多」按鈕事件
    const viewMoreButtons = document.querySelectorAll(".viewMore");

    viewMoreButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));
            const image = button.getAttribute("data-image");

            // 檢查購物車中是否已有此商品
            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                // 如果已經有，則只增加數量
                existingItem.quantity++;
            } else {
                // 否則新增商品到購物車
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            // 更新購物車顯示
            updateCartDisplay();
            // 顯示購物車頁面
            cartTab.style.display = "block";
            // 初始化總金額
            updateTotalAmount();
        });
    });

    // 更新購物車顯示
    function updateCartDisplay() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            cartItems.innerHTML += `
                <div class="item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="details">
                        <div class="name">${item.name}</div>
                        <div class="unitPrice">單價：NT$${item.price}</div>
                        <div class="quantity">
                            <button class="minus">-</button>
                            <span class="qty">${item.quantity}</span>
                            <button class="plus">+</button>
                        </div>
                        <div class="totalPrice">小計：NT$${item.price * item.quantity}</div>
                    </div>
                </div>
            `;
        });

        // 綁定增減數量按鈕
        bindQuantityButtons();
    }

    // 綁定數量增減按鈕
    function bindQuantityButtons() {
        const minusButtons = document.querySelectorAll(".minus");
        const plusButtons = document.querySelectorAll(".plus");
        const quantities = document.querySelectorAll(".quantity span");
        const prices = document.querySelectorAll(".totalPrice");

        minusButtons.forEach((btn, index) => {
            btn.onclick = () => {
                let quantity = parseInt(quantities[index].textContent);
                if (quantity > 0) {
                    quantity--;  // 減少數量
                    quantities[index].textContent = quantity;
                    cart[index].quantity = quantity;  // 更新購物車數量
                    updatePriceAndTotal(index, quantity, prices);
                }
            };
        });

        plusButtons.forEach((btn, index) => {
            btn.onclick = () => {
                let quantity = parseInt(quantities[index].textContent);
                quantity++;  // 增加數量
                quantities[index].textContent = quantity;
                cart[index].quantity = quantity;  // 更新購物車數量
                updatePriceAndTotal(index, quantity, prices);
            };
        });
    }

    // 更新單個商品價格和總金額
    function updatePriceAndTotal(index, quantity, prices) {
        prices[index].textContent = `小計：NT$${cart[index].price * quantity}`;
        updateTotalAmount();
    }

    // 計算並更新購物車總金額
    function updateTotalAmount() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        totalAmount.textContent = `NT$${total}`;
    }

    // 關閉購物車
    closeButton.addEventListener("click", () => {
        cartTab.style.display = "none"; // 隱藏購物車
    });
});
