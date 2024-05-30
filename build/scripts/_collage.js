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

            /* рекурсивно запускаем следующий с задержкой в 1000ms */
            setTimeout(function() {
                playVideosSequentially(index + 1);
            }, videos[index].duration * 1000 + 1000);
        }
    }

    videos[0].addEventListener('canplaythrough', function() {
        playVideosSequentially(0);
    });


    /* Mute */

    let isCollageMuted = true;
    const unmute = document.querySelector('.collage__toggle-mute');
    unmute.addEventListener('click', function() {
        if (isCollageMuted) {
            isCollageMuted = false;
            this.classList.remove('collage__toggle-mute--muted');
            videos.forEach(video => {
                video.muted = false;
            })
        } else  {
            isCollageMuted = true;
            this.classList.add('collage__toggle-mute--muted');
            videos.forEach(video => {
                video.muted = true;
            })
        }
    });
});

