document.addEventListener("DOMContentLoaded", function() {

    const collage = document.querySelector('.mobile-collage');
    const collageViewport = document.querySelector('.mobile-collage__viewport');
    const collageScroll = document.querySelector('.mobile-collage__scroll');
    const collageRibbon = document.querySelector('.mobile-collage__ribbon');

    /* Init */
    let verticalScrollCut = 0;
    let horizontalScrollCut = 0;
    let normalizedVerticalScroll = 0;
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function init() {
        const collageHeight = collage.clientHeight;
        verticalScrollCut = collageHeight - collageViewport.offsetHeight; /* Нижняя точка по вертикали */
        horizontalScrollCut = collageRibbon.clientWidth - collage.clientWidth; /* Правая точка по горизонтали */
    }

    function updateScroll() {
        normalizedVerticalScroll = Math.min(1, lastKnownScrollPosition / verticalScrollCut); /* Значение от 0 до 1, насколько по вертикали прокрутили нужную область. 1 -- конец области */
        collageRibbon.style.transform = `translate3d(${-1 * normalizedVerticalScroll * horizontalScrollCut}px, 0, 0)`;
        ticking = false;
    }

    function onScroll() {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }

    /* Ensure init is called after styles are fully loaded */
    window.addEventListener('load', init);
    window.addEventListener('resize', init);

    /* Run */
    window.addEventListener('scroll', onScroll);

    /* Initial call to setup scroll positions correctly */
    init();
    onScroll();

});
