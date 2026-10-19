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

        cartItems.push({
            ...product,
            quantity: 1,
        })
        console.log(cartItems)
    })
}

