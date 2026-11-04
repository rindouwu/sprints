import products from '../data/products.js'

export function initProducts() {
    const productsGrid = document.querySelector('.products__grid')
    const filters = document.querySelector('[data-product-filters]')
    if(!productsGrid || !filters) return

    function renderProducts(category = 'chair') {
        const filteredProducts = products.filter(product => {
            return product.category === category
        })

        productsGrid.innerHTML = filteredProducts.map(product => `
            <article class="products__card is-visible" data-id="${product.id}" data-category="${product.category}" data-animate>
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
                            data-add-btn
                            data-state="default"
                        >
                            <img class="products__card-add-icon products__card-add-icon--plus" src="assets/icons/button/plus.svg" alt="">
                            <img class="products__card-add-icon products__card-add-icon--spinner" src="assets/icons/button/spinner.svg" alt="">
                            <img class="products__card-add-icon products__card-add-icon--ready" src="assets/icons/button/ready.svg" alt="">
                        </button>
                    </div>
                </div>
            </article>
        `).join('')
    }

    const updateFilterBg = () => {
        const activeBtn = filters.querySelector('.product-filters__btn--active')
        if (!activeBtn) return

        const x = activeBtn.offsetLeft
        const width = activeBtn.offsetWidth
        filters.style.setProperty('--active-x', `${x}px`)
        filters.style.setProperty('--active-width', `${width}px`)
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
        updateFilterBg()
        renderProducts(category)
    })

    renderProducts()
    updateFilterBg()

    window.addEventListener('resize', updateFilterBg)
}