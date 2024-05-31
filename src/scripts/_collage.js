document.addEventListener("DOMContentLoaded", function() {

    /* Playback */

    const videos = document.querySelectorAll('.collage__video');

    function playVideosSequentially(index) {
        if (index < videos.length) {

            /* Скрываем предыдущий */
            if( videos[index - 1] ) {
                videos[index - 1].classList.remove('collage__video--currently-playing');
            }

            /* Показываем текущий */
            videos[index].classList.add('collage__video--currently-playing');

            /* Стартуем текущий */
            videos[index].play();

            /* рекурсивно запускаем следующий */
            setTimeout(function() {
                playVideosSequentially(index + 1);
            }, videos[index].duration * 1000); /* +1000 сюда, чтобы сделать секунду задержки между видео */
        }
    }

    videos[0].addEventListener('canplaythrough', function() {
        playVideosSequentially(0);
    });

});



/* Вариант на jQuery -- пробуем fadeIn / fadeOut на видео -- не работает в случае с видео, ровно так же как и transition на opacity в варианте выше */

// (function($) {
//
//
//     /* Playback */
//
//     const videos = $('.collage__video');
//
//     function playVideosSequentially(index) {
//         if (index < videos.length) {
//
//             /* Скрываем предыдущий */
//             if( videos.eq([index - 1]).length ) {
//                 videos.eq([index - 1]).removeClass('collage__video--currently-playing');
//             }
//
//             /* Показываем текущий */
//             videos.eq([index]).addClass('collage__video--currently-playing');
//
//             /* Стартуем текущий */
//             videos.eq([index])[0].play();
//
//             /* рекурсивно запускаем следующий */
//             setTimeout(function() {
//                 playVideosSequentially(index + 1);
//             }, videos.eq(index)[0].duration * 1000); /* +1000 сюда, чтобы сделать секунду задержки между видео */
//         }
//     }
//
//     videos.eq(0)[0].addEventListener('canplaythrough', function() {
//         playVideosSequentially(0);
//     });
//
//
// })(jQuery);
//
//
//

