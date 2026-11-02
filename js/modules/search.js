import products from '../data/products.js'

const input = document.querySelector('[data-search-input]')
const wrapper = document.querySelector('[data-suggestions-wrapper]')
const list = document.querySelector('[data-suggestions-list]')
const overlay = document.querySelector('[data-search-overlay]')

const categories = ['Sofa', 'Chair', 'Beds', 'Lamp']
let currentItems = []

const openSearch = () => {
    input.classList.add('wide')
    wrapper.classList.add('is-active')
    overlay.classList.add('is-visible')
}
const closeSearch = () => {
    input.classList.remove('wide')
    wrapper.classList.remove('is-active')
    overlay.classList.remove('is-visible')
    currentItems = []
}

const clearList = () => {
    list.innerHTML = ''
    currentItems = []
}
const renderEmpty = () => {
    list.innerHTML = `<a href="#">Ничего не найдено</a>`
}
const renderItems = (items) => {
    list.innerHTML = items.map(item => `
        <a href="#">${item.label}</a>
    `).join('')
}
const findMatches = (query) => {
    const q = query.toLowerCase().trim()
    if(!q) return []

    const found = []

    categories.forEach(category => {
        if(category.toLowerCase().includes(q)) {
            found.push({ label: category, category: category.toLowerCase() })
        }
    })
    products.forEach(product => {
        if(product.title.toLowerCase().includes(q)) {
            found.push({ label: product.title, category: product.category })
        }
    })

    return found
}
const updateSuggestions = (query) => {
    clearList()
    if(!query.trim()) return

    currentItems = findMatches(query)
    currentItems.length ? renderItems(currentItems) : renderEmpty()
}
export function initSearch() {
    input.addEventListener('focus', () => {
        openSearch()
    })
    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeSearch()
        }
    })
    input.addEventListener('input', e => {
        updateSuggestions(e.currentTarget.value)
    })
    document.addEventListener('click', e => {
        if(!e.target.closest('.hero__search-wrap')) closeSearch()
    })
}