const tracks = [
    { title: "Track 1", src: "../audio/track1.mp3" },
    { title: "Track 2", src: "../audio/track2.mp3" },
    { title: "Track 3", src: "../audio/track3.mp3" },
    { title: "Track 4", src: "../audio/track4.mp3" },
    { title: "Track 5", src: "../audio/track5.mp3" },
    { title: "Track 6", src: "../audio/track6.mp3" },
    { title: "Track 7", src: "../audio/track7.mp3" },
    { title: "Track 8", src: "../audio/track8.mp3" },
    { title: "Track 9", src: "../audio/track9.mp3" },
];

let currentTrackIndex = 0;
let player;
let progressInterval;

function playTrack(index) {
    if (player) {
        player.stop();
    }

    player = new Howl({
        src: [tracks[index].src],
        html5: true,
        onplay: function() {
            document.getElementById('play-pause-btn').innerText = 'Pause';
            document.getElementById('total-duration').innerText = formatTime(player.duration());
            updateProgressBar();
        },
        onpause: function() {
            document.getElementById('play-pause-btn').innerText = 'Play';
            clearInterval(progressInterval);
        },
        onend: function() {
            if (currentTrackIndex < tracks.length - 1) {
                currentTrackIndex++;
                playTrack(currentTrackIndex);
            } else {
                // Jump to the first track and pause it when the end of the playlist is reached
                currentTrackIndex = 0;
                playTrack(currentTrackIndex);
                player.pause();
            }
        }
    });

    player.play();
    document.getElementById('track-name').innerText = tracks[index].title;
}

document.getElementById('play-pause-btn').addEventListener('click', function() {
    if (player && player.playing()) {
        player.pause();
    } else {
        if (player && !player.playing()) {
            player.play();
        } else {
            playTrack(currentTrackIndex);
        }
    }
});

document.getElementById('progress-bar').addEventListener('input', function() {
    const progressBar = document.getElementById('progress-bar');
    const seekTime = player.duration() * (progressBar.value / 100);
    player.seek(seekTime);
});

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const currentDuration = document.getElementById('current-duration');

    // Clear any existing interval
    clearInterval(progressInterval);

    // Update progress bar only if the player is playing
    if (player && player.playing()) {
        progressInterval = setInterval(() => {
            const progress = (player.seek() / player.duration()) * 100;
            progressBar.value = progress;
            currentDuration.innerText = formatTime(player.seek());
        }, 1000); // Refresh every 1 second
    }
}
