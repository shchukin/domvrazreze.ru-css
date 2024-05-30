document.addEventListener("DOMContentLoaded", function() {

    const collage = document.querySelector('.mobile-collage');
    const collageViewport = document.querySelector('.mobile-collage__viewport');
    const collageBackground = document.querySelector('.mobile-collage__background');


    /* Init */
    const collageHeight = collage.clientHeight;
    let collageViewportHeight = 0;
    let endScroll = 0;

    function init() {
        collageViewportHeight = collageViewport.offsetHeight;
        endScroll = collageHeight - collageViewportHeight;
    }

    init();
    window.addEventListener('resize', init);


    /* Run */

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        console.log(scrolled, endScroll)

        /* 0 - начало 1080 -- конец */

        if (scrolled > 2000 ) {

        }


        // const parallax = document.querySelector('.parallax');
        // Adjust the background position based on scroll position
        // parallax.style.backgroundPosition = `${100 - (scrolled * 0.1)}% 50%`;
    });


});

