import { initSlider } from './modules/slider'
import { initProducts } from "./modules/products";
import { renderReviews } from './modules/reviews'
import { initCart } from './modules/cart/cart'
import { initCartPanel } from './modules/cart/cart-panel'

initProducts()
renderReviews()
initCartPanel()

initSlider({
    sliderSelector: '.reviews__slider',
    trackSelector: '.reviews__track',
    cardSelector: '.review',
    prevButtonSelector: '.reviews__slider-btn--prev',
    nextButtonSelector: '.reviews__slider-btn--next',
})
initSlider({
    sliderSelector: '.products__slider',
    trackSelector: '.products__grid',
    cardSelector: '.products__card',
    prevButtonSelector: '.products__slider-btn--prev',
    nextButtonSelector: '.products__slider-btn--next'
})

initCart()