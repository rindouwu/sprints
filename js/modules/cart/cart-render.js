export function renderCart(cartItems) {
    const cartBody = document.querySelector('.cart__body')
    if(!cartBody) return

    if(cartItems.length === 0) {
        cartBody.innerHTML = `<h2 class="cart__item">Корзина пуста.</h2>`
    } else {
        cartBody.innerHTML = cartItems.map(item => `
            <article class="cart__item" data-id="${item.id}">
                <img class="cart__item-img" src="${item.image}" alt="">
                <div class="cart__item-info">
                    <div class="cart__item-info-top">
                        <h3 class="cart__item-title">${item.title}</h3>
                        <button class="cart__item-close-btn" type="button"><img src="assets/icons/cart/cross-secondary.svg" alt=""></button>
                    </div>
                    <p class="cart__item-category">${item.categoryName}</p>
                    <div class="cart__rating">
                        ${Array.from({length: 5}, (_, index) => `
                            <img 
                                class="cart__rating-star" 
                                src="assets/icons/stars/cart/${index < item.rating ? 'cart-star.svg' : 'cart-star-empty.svg'}"
                                alt=""
                            >
                        `).join('')}
                        <span class="cart__rating-total">${item.rating}</span>
                    </div>
                    <div class="cart__item-info-bottom">
                        <span class="cart__item-price">&dollar;${item.price}</span>
    
                        <div class="quantity">
                            <button class="quantity__btn quantity__btn--minus" type="button" aria-label="Уменьшить количество">-</button>
                            <input class="quantity__field" type="text" value="${item.quantity}" readonly aria-label="Количество товара">
                            <button class="quantity__btn quantity__btn--plus" type="button" aria-label="Увеличить количество">+</button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('')
    }
}

export function updateCartCount(cartItems) {
    const cartCount = document.querySelector('[data-cart-count]')
    if(!cartCount) return

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalQuantity
}

export function countCartTotal(cartItems) {
    const totals = document.querySelectorAll('[data-cart-total]')
    const totalSum =  cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    totals.forEach((element) => element.innerHTML = `&dollar;${totalSum}`)
}