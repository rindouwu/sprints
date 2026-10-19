import {products} from '../data/products.js';

export function initCart() {
    const productGrid = document.querySelector('.products__grid')
    if(!productGrid) return

    const cartItems = []
    productGrid.addEventListener('click', (e) => {
        const button = e.target.closest('.products__card-add-btn')
        if(!button) return

        const card = button.closest('.products__card')
        if(!card) return

        const productId = card.dataset.id
        const product = products.find((product) => product.id === productId)
        if(!product) return

        const existingProduct = cartItems.find((item) => product.id === item.id)
        if(existingProduct) {
            existingProduct.quantity++
        } else {
            cartItems.push({
                ...product,
                quantity: 1,
            })
        }

        renderCart(cartItems)
        console.log(cartItems)
    })
}

export function renderCart(cartItems) {
    const cartBody = document.querySelector('.cart__body')
    if(!cartBody) return

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
                    ${Array.from({length: item.rating}, () => {`
                        <img 
                            class="cart__rating-star" 
                            src="assets/icons/stars/cart/cart-star.svg" 
                            alt=""
                        >
                    `}).join('')}
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

