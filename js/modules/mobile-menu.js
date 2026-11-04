export const initMobileMenu = () => {
    const openBtn = document.querySelector('[data-menu-open]');
    const closeBtn = document.querySelector('[data-menu-close]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const links = document.querySelectorAll('.mobile-menu__link');
    if(!openBtn || !closeBtn || !mobileMenu) return

    const openMenu = () => {
        mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
    const closeMenu = () => {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    })

}