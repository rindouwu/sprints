import { initSlider } from './modules/slider'
import { initProducts } from "./modules/products";
import { initCart } from './modules/cart'

initProducts()

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