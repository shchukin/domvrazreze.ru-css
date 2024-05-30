(function ($) {

        const videoCount = 4;
        const videosToLoad = 3;
        let videosLoaded = 0;
        let currentVideoIndex = 0;
        let loadedVideos = [];

        // Function to start playing videos once the specified number are preloaded
        function startPlaying() {
            playNextVideo();
        }

        // Function to play the next video
        function playNextVideo() {
            if (currentVideoIndex < videoCount) {
                let $video = $(`#video-${currentVideoIndex + 1}`);
                $video.show();
                $video[0].play();

                $video.on('ended', function() {
                    $video.hide();
                    currentVideoIndex++;
                    setTimeout(playNextVideo, 1000); // Delay of 1 second
                });
            }
        }

        // Function to check if the specified number of videos are preloaded
        function checkVideosLoaded() {
            if (videosLoaded === videosToLoad) {
                startPlaying();
            }
        }

        // Add video elements to the page and set up preload handling
        for (let i = 1; i <= videoCount; i++) {
            let videoElement = `<video id="video-${i}" src="../videos/collage-0${i}.mp4" preload="auto" muted></video>`;
            $('#video-container').append(videoElement);

            let video = document.getElementById(`video-${i}`);
            video.addEventListener('canplaythrough', function() {
                videosLoaded++;
                loadedVideos.push(i);
                checkVideosLoaded();
            });
        }

})(jQuery);
