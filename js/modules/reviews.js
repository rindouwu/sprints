import { reviews } from '../data/reviews.js';

export function renderReviews() {
    const reviewsTrack = document.querySelector('.reviews__track')
    if(!reviewsTrack) return

    reviewsTrack.innerHTML = reviews.map((review) => `
        <article class="review review--${review.id}">
            <div class="review__body">
                <img class="review__avatar" src="${review.avatar}" alt="${review.name}">
                <h3 class="review__name">${review.name}</h3>
                <span class="review__role">${review.role}</span>
                <p class="review__quote">“${review.quote}“</p>
                <div class="review__stars">
                    ${Array.from({ length: 5 }, (_, index) => `
                        <img 
                            class="review__star" 
                            src="assets/icons/stars/${index < review.rating ? 'star.svg' : 'star-empty.svg'}" 
                            alt="">
                    `).join('')}
                </div>
            </div>
        </article>
    `).join('')
}