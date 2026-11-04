export const initAnimations = () => {
    const elements = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target
                if(el.hasAttribute('data-animate-stagger')) {
                    const children = el.children
                    Array.from(children).forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.1}s`
                        child.classList.add('is-visible');
                    })
                } else {
                    el.classList.add('is-visible');
                }
                observer.unobserve(el);
            }
        })
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
}