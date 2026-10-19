import { products } from '../data/products.js'

export function initProducts() {
    const productsGrid = document.querySelector('.products__grid')
    const filters = document.querySelector('[data-product-filters]')
    if(!productsGrid || !filters) return

    function renderProducts(category = 'chair') {
        const filteredProducts = products.filter(product => {
            return product.category === category
        })

        productsGrid.innerHTML = filteredProducts.map(product => `
            <article class="products__card" data-id="${product.id}" data-category="${product.category}">
                <div class="products__card-top">
                    <img
                            class="products__card-image"
                            src="${product.image}"
                            alt="${product.title}"
                    >
                </div>
                <div class="products__card-body">
                    <span class="products__card-category">${product.categoryName}</span>
                    <h3 class="products__card-title">${product.title}</h3>
                    <div class="products__card-stars">
                        ${Array.from({length: 5}, (_, index) => `
                            <img 
                                class="products__card-star" 
                                src="assets/icons/stars/${index < product.rating ? 'star.svg' : 'star-empty.svg'}" 
                                alt=""
                            >
                        `).join('')}
                    </div>
                    <div class="products__card-bottom">
                    <span class="products__card-price">
                        <sup>&dollar;</sup>
                        ${product.price}
                    </span>
                        <button
                            class="products__card-add-btn"
                            type="button"
                            aria-label="Добавить ${product.title} в корзину"
                        >
                            <img class="products__card-add-icon" src="assets/icons/button/plus.svg" alt="add-to-cart">
                        </button>
                    </div>
                </div>
            </article>
        `).join('')
    }

    filters.addEventListener('click', (event) => {
        const button = event.target.closest('[data-cat]')
        if(!button) return

        const category = button.dataset.cat
        filters.querySelectorAll('[data-cat]').forEach(filter => {
            const isActive = filter === button

            filter.classList.toggle(
                'product-filters__btn--active',
                isActive
            )
            filter.setAttribute('aria-pressed', String(isActive))
        })
        renderProducts(category)
    })

    renderProducts()
}