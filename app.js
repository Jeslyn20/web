let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// 添加產品資料到HTML
const addDataToHTML = () => {
    // 清空原本的產品列表
    listProductHTML.innerHTML = '';

    // 新增產品資料
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">NT$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// 監聽產品列表點擊事件，添加產品到購物車
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

// 添加商品到購物車
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);

    if (cart.length <= 0 || positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }

    addCartToHTML();
    addCartToMemory();
};

// 儲存購物車到 localStorage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// 更新購物車HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;

            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];

            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">NT$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newItem);

            // 計算總金額
            totalPrice += info.price * item.quantity;
        });
    }

    // 更新購物車數量和總金額
    iconCartSpan.innerText = totalQuantity;

    // 顯示總金額
    let totalAmountElement = document.createElement('div');
    totalAmountElement.classList.add('totalAmount');
    totalAmountElement.innerHTML = `Total: NT$${totalPrice}`;
    listCartHTML.appendChild(totalAmountElement);
};

// 監聽購物車點擊事件，修改商品數量
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

// 改變購物車中商品的數量
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);

    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            case 'minus':
                let newQuantity = cart[positionItemInCart].quantity - 1;
                if (newQuantity > 0) {
                    cart[positionItemInCart].quantity = newQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }

    addCartToHTML();
    addCartToMemory();
};

// 初始化應用
const initApp = () => {
    // 取得產品資料
    fetch('products.json')
        .then(response => response.json()) // 將 response 轉換為 JSON 格式
        .then(data => {
            products = data; // 賦值產品資料
            addDataToHTML();

            // 取得購物車資料
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => console.error('Error fetching products:', error)); // 捕捉並顯示錯誤
};

// 初始化應用
initApp();
