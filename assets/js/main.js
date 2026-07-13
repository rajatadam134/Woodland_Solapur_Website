document.addEventListener('DOMContentLoaded', () => {
    console.log('Woodland website initialized');
    initNavigation();
});

function initNavigation() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
