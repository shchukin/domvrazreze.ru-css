document.addEventListener("DOMContentLoaded", function() {

    const collage = document.querySelector('.mobile-collage');
    const collageViewport = document.querySelector('.mobile-collage__viewport');

    const collageScroll = document.querySelector('.mobile-collage__scroll');
    const collageRibbon = document.querySelector('.mobile-collage__ribbon');




    /* Init */
    const collageHeight = collage.clientHeight;
    let verticalScrollCut = 0;
    let horizontalScrollCut = 0;
    let normalizedVerticalScroll = 0;

    function init() {
        verticalScrollCut = collageHeight - collageViewport.offsetHeight; /* Нижняя точка по вертикали */
        horizontalScrollCut = collageRibbon.clientWidth - collage.clientWidth; /* Правая точка по горизонтали */
    }

    init();
    window.addEventListener('resize', init);


    /* Run */

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        normalizedVerticalScroll = Math.min(1, window.scrollY / verticalScrollCut); /* Значение от 0 до 1, насколько по вертикали прокрутили нужную область. 1 -- конец области */
        collageScroll.scrollLeft = normalizedVerticalScroll * horizontalScrollCut
    });








    collageScroll.addEventListener('scroll', function () {
        console.log(this.scrollLeft)


    });


    /* Horizontal Init */

});

