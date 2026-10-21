import products from '../../data/products.js';
import { saveCart, loadCart } from "./cart-storage.js";
import { renderCart, updateCartCount, countCartTotal } from "./cart-render.js";

export function initCart() {
    const orderButton = document.querySelector('.cart__order-btn')
    const productGrid = document.querySelector('.products__grid')
    const cartBody = document.querySelector('.cart__body')
    if(!productGrid || !cartBody || !orderButton) return

    const cartItems = loadCart()

    function updateCart() {
        saveCart(cartItems)
        renderCart(cartItems)
        updateCartCount(cartItems)
        countCartTotal(cartItems)
    }

    function orderCart() {
        cartItems.splice(0, cartItems.length)
    }

    renderCart(cartItems)
    updateCartCount(cartItems)
    countCartTotal(cartItems)

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

        updateCart()
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

        updateCart()
    })
    orderButton.addEventListener('click', () => {
        orderCart()
        updateCart()
    })
}