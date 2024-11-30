// 切換頁面顯示
const mainPage = document.getElementById("mainPage");
const cartPage = document.getElementById("cartPage");
const cartItems = document.getElementById("cartItems");
const closeCart = document.getElementById("closeCart");
const totalAmount = document.getElementById("totalAmount");

// 商品清單
const viewMoreButtons = document.querySelectorAll(".viewMore");

// 購物車資料
let cart = []; // 購物車陣列，儲存商品及數量

viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseInt(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");

        // 檢查購物車中是否已經有此商品
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
        // 切換到購物車頁面
        mainPage.style.display = "none";
        cartPage.style.display = "block";
    });
});

// 更新購物車顯示
function updateCartDisplay() {
    cartItems.innerHTML = "";
    cart.forEach(item => {
        // 創建新的購物車項目
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>NT$${item.price}</p>
            <div class="quantity">
                <button class="minus">-</button>
                <span class="qty">${item.quantity}</span>
                <button class="plus">+</button>
            </div>
            <div class="totalPrice">小計：NT$${item.price * item.quantity}</div>
        `;

        // 將新商品加入購物車
        cartItems.appendChild(cartItem);

        // 設置數量增減按鈕的事件
        const minusButton = cartItem.querySelector(".minus");
        const plusButton = cartItem.querySelector(".plus");
        const quantitySpan = cartItem.querySelector(".qty");
        const totalPrice = cartItem.querySelector(".totalPrice");

        // 單價
        const unitPrice = item.price;

        // 增加數量
        plusButton.addEventListener("click", () => {
            item.quantity++;
            quantitySpan.textContent = item.quantity;
            updatePriceAndTotal(item, quantitySpan, totalPrice);
        });

        // 減少數量
        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                quantitySpan.textContent = item.quantity;
                updatePriceAndTotal(item, quantitySpan, totalPrice);
            }
        });

        // 更新小計和總金額
        function updatePriceAndTotal(item, quantitySpan, totalPrice) {
            totalPrice.textContent = `小計：NT$${item.price * item.quantity}`;
            updateTotalAmount();
        }
    });

    updateTotalAmount(); // 初始化總金額
}

// 計算總金額
function updateTotalAmount() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    totalAmount.textContent = `NT$${total}`;
}

// 關閉購物車
closeCart.addEventListener("click", () => {
    // 切換回主頁
    cartPage.style.display = "none";
    mainPage.style.display = "block";
});

