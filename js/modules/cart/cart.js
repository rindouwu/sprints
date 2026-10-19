import { products } from '../../data/products.js';
import { saveCart, loadCart } from "./cart-storage";

export function initCart() {
    const cart = document.querySelector('.cart')
    const cartOverlay = document.querySelector('.cart-overlay')
    const openButton = document.querySelector('[data-cart-open]')
    const closeButton = document.querySelector('.cart__close-btn')
    const orderButton = document.querySelector('.cart__order-btn')
    if(!cart || !cartOverlay || !openButton || !closeButton || !orderButton) return

    function openCart() {
        cart.classList.add('is-open')
        cartOverlay.classList.add('is-open')
        cart.setAttribute('aria-hidden', 'false')
    }
    function closeCart() {
        cart.classList.remove('is-open')
        cartOverlay.classList.remove('is-open')
        cart.setAttribute('aria-hidden', 'true')
    }
    openButton.addEventListener('click', openCart)
    closeButton.addEventListener('click', closeCart)
    cartOverlay.addEventListener('click', closeCart)

    const productGrid = document.querySelector('.products__grid')
    const cartBody = document.querySelector('.cart__body')
    if(!productGrid || !cartBody) return

    const cartItems = loadCart()

    function orderCart() {
        cartItems.splice(0, cartItems.length)
    }
    function updateCartCount() {
        const cartCount = document.querySelector('[data-cart-count]')
        if(!cartCount) return

        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
        cartCount.textContent = totalQuantity
    }
    function countCartTotal() {
        const totals = document.querySelectorAll('[data-cart-total]')
        const totalSum =  cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

        totals.forEach((element) => element.innerHTML = `&dollar;${totalSum}`)
    }
    renderCart(cartItems)
    updateCartCount()
    countCartTotal()

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

        saveCart(cartItems)
        renderCart(cartItems)
        updateCartCount()
        countCartTotal()
    })
    cartBody.addEventListener('click', (e) => {
        const button = e.target.closest('.quantity__btn, .cart__item-close-btn')
        if(!button) return

        const cartItem = button.closest('.cart__item')
        if(!cartItem) return

        const productId = cartItem.dataset.id
        const item = cartItems.find((item) => item.id === productId)
        if(!item) return

        if(button.classList.contains('quantity__btn--minus')) {
            item.quantity = Math.max(1, item.quantity - 1)
        } else if(button.classList.contains('quantity__btn--plus')) {
            item.quantity++
        } else if(button.classList.contains('cart__item-close-btn')) {
            cartItems.splice(cartItems.indexOf(item), 1)
        }

        saveCart(cartItems)
        renderCart(cartItems)
        updateCartCount()
        countCartTotal()
    })
    orderButton.addEventListener('click', () => {
        orderCart()
        saveCart(cartItems)
        renderCart(cartItems)
        updateCartCount()
        countCartTotal()
    })
}

function renderCart(cartItems) {
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
                        ${Array.from({length: item.rating}, () => {`
                            <img 
                                class="cart__rating-star" 
                                src="../../../assets/icons/stars/cart/cart-star.svg" 
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
}

