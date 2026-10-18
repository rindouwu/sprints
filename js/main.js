import { initSlider } from './modules/slider.js'
import { initProducts } from "./modules/products";

initSlider({
    sliderSelector: '.reviews__slider',
    trackSelector: '.reviews__track',
    cardSelector: '.review',
    prevButtonSelector: '.reviews__slider-btn--prev',
    nextButtonSelector: '.reviews__slider-btn--next',
})

initProducts()