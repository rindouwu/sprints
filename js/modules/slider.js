export function initSlider({sliderSelector, trackSelector, cardSelector, prevButtonSelector, nextButtonSelector}) {
    const slider = document.querySelector(sliderSelector)
    if(!slider) return

    const track = document.querySelector(trackSelector)
    const prevButton = document.querySelector(prevButtonSelector)
    const nextButton = document.querySelector(nextButtonSelector)
    if(!track || !prevButton || !nextButton) return

    const getCards = () => Array.from(track.querySelectorAll(cardSelector))
    let currentIndex = 0

    function updateSlider() {
        const cards = getCards()
        if(cards.length === 0) return

        const gap = parseFloat(getComputedStyle(track).gap) || 0
        const cardWidth = cards[0].getBoundingClientRect().width
        const step = cardWidth + gap
        const maxOffset = Math.max(0, track.scrollWidth - track.parentElement.clientWidth)
        const maxIndex = step > 0 ? Math.round(maxOffset / step) : 0

        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex))
        track.style.transform = `translateX(-${currentIndex * step}px)`

        prevButton.disabled = currentIndex === 0
        nextButton.disabled = currentIndex >= maxIndex
    }

    prevButton.addEventListener('click', () => {
        currentIndex--
        updateSlider()
    })
    nextButton.addEventListener('click', () => {
        currentIndex++
        updateSlider()
    })
    const observer = new MutationObserver(() => {
        currentIndex = 0
        updateSlider()
    })
    observer.observe(track, {childList: true})

    window.addEventListener('resize', updateSlider)
    updateSlider()
}