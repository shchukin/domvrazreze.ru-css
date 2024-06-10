(function ($) {

    const $html = $('html');

    $('.header__player-toggle').on('click', function() {
        $html.toggleClass('playlist-expanded');
    });

    $('.playlist__close').on('click', function() {
        $html.removeClass('playlist-expanded');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.playlist__body, .header__player-toggle').length) {
            $html.removeClass('playlist-expanded');
        }
    });


    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $html.removeClass('playlist-expanded');
        }
    });

})(jQuery);
