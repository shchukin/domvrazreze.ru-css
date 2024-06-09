(function ($) {

    const $html = $('html');

    $('.header__player-toggle').on('click', function() {
        $html.toggleClass('playlist-expanded');
    });

})(jQuery);
