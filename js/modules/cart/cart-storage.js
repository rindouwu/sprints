const CART_STORAGE_KEY = 'cart'

export function loadCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    return savedCart ? JSON.parse(savedCart) : []
}
export function saveCart(cartItems) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
}