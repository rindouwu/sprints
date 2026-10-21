export function initCartPanel() {
    const cart = document.querySelector('.cart')
    const cartOverlay = document.querySelector('.cart-overlay')
    const openButton = document.querySelector('[data-cart-open]')
    const closeButton = document.querySelector('.cart__close-btn')
    if(!cart || !cartOverlay || !openButton || !closeButton) return

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
}