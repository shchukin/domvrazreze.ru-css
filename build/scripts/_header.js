(function ($) {

    const $html = $('html');

    $('.header__player-toggle').on('click', function() {
        $html.removeClass('menu-expanded');
        $html.toggleClass('playlist-expanded');
    });

    $('.playlist__close').on('click', function() {
        $html.removeClass('playlist-expanded');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.playlist__body, .header__player-toggle, .header__marquee').length) {
            $html.removeClass('playlist-expanded');
        }
    });

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $html.removeClass('playlist-expanded');
        }
    });



    $('.header__burger').on('click', function() {
        $html.removeClass('playlist-expanded');
        $html.toggleClass('menu-expanded');
    });

    // $('.playlist__close').on('click', function() {
    //     $html.removeClass('menu-expanded');
    // });

    // $(document).on('click', function(event) {
    //     if (!$(event.target).closest('.playlist__body, .header__player-toggle').length) {
    //         $html.removeClass('menu-expanded');
    //     }
    // });

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $html.removeClass('menu-expanded');
        }
    });


})(jQuery);
