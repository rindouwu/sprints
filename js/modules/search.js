import products from '../data/products.js'

const input = document.querySelector('[data-search-input]')
const wrapper = document.querySelector('[data-suggestions-wrapper]')
const list = document.querySelector('[data-suggestions-list]')
const overlay = document.querySelector('[data-search-overlay]')

const categories = ['Sofa', 'Chair', 'Beds', 'Lamp']
let currentItems = []
let activeIndex = -1

const openSearch = () => {
    input.classList.add('wide')
    wrapper.classList.add('is-active')
    overlay.classList.add('is-visible')

    animateHeight(true)
}
const closeSearch = () => {
    input.classList.remove('wide')
    wrapper.classList.remove('is-active')
    overlay.classList.remove('is-visible')
    list.innerHTML = ''
    input.value = ''
    currentItems = []
    activeIndex = -1

    wrapper.style.height = '0px'
}
const animateHeight = (open) => {
    const inner = list
    const targetHeight = open ? inner.scrollHeight : 0

    wrapper.style.height = `${targetHeight}px`
}

const highlightItem = (index) => {
    const links = list.querySelectorAll('a[data-index]')
    links.forEach((link, i) => {
        link.classList.toggle('is-highlighted', i === index)
    })

    if(index > -1 && links[index]) {
        links[index].scrollIntoView({ block: 'nearest'})
    }
}
const clearList = () => {
    list.innerHTML = ''
    currentItems = []
}
const renderEmpty = () => {
    list.innerHTML = `<a href="#">Ничего не найдено</a>`
}
const renderItems = (items) => {
    list.innerHTML = items.map((item, i) => `
        <a href="#" data-index="${i}">${item.label}</a>
    `).join('')
    activeIndex = -1
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
const selectItem = (item) => {
    input.value = ''
    closeSearch()

    const productsSection = document.getElementById('products')
    if(!productsSection) return

    productsSection.scrollIntoView({ behavior: 'smooth' })

    const catBtn = productsSection.querySelector(`[data-cat="${item.category}"]`)
    if(catBtn) catBtn.click()
    input.blur()
}
const updateSuggestions = (query) => {
    clearList()
    if(!query.trim()) {
        wrapper.style.height = '0px'
        return
    }

    currentItems = findMatches(query)
    currentItems.length ? renderItems(currentItems) : renderEmpty()

    requestAnimationFrame(() => {
        wrapper.style.height = `${list.scrollHeight}px`
    })
}
export function initSearch() {
    input.addEventListener('focus', () => {
        openSearch()
    })
    input.addEventListener('keydown', e => {
        const links = list.querySelectorAll('a[data-index]')

        if (e.key === 'Escape') {
            closeSearch()
            input.blur()
        }

        if(!links) return
        if(e.key === 'ArrowDown') {
            e.preventDefault()
            activeIndex = (activeIndex + 1) % links.length
            highlightItem(activeIndex)
        }
        if(e.key === 'ArrowUp') {
            e.preventDefault()
            activeIndex = (activeIndex - 1 + links.length) % links.length
            highlightItem(activeIndex)
        }
        if(e.key === 'Enter') {
            if(activeIndex > 1 && currentItems[activeIndex]) {
                e.preventDefault()
                selectItem(currentItems[activeIndex])
            }
        }
    })
    input.addEventListener('input', e => {
        updateSuggestions(e.currentTarget.value)
    })
    list.addEventListener('click', e => {
        const link = e.target.closest('a[data-index]')
        if(!link) return

        e.preventDefault()
        const item = currentItems[Number(link.dataset.index)]
        if(item) selectItem(item)
    })
    document.addEventListener('click', e => {
        if(!e.target.closest('.hero__search-wrap')) closeSearch()
    })
}