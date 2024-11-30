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

        // 清空購物車再新增所選商品
        cartItems.innerHTML = `
            <div class="cartItem">
                <img src="${image}" alt="${name}">
                <h2>${name}</h2>
                <p>NT$${price}</p>
            </div>
        `;

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
