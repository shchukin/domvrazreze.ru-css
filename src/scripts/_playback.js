const tracks = [
    { title: "Иоган Себастьян Бах. Концерт для клавира с оркестром", src: "../audio/track01.mp3" },
    { title: "Иоган Себастьян Бах. Хроматическая фантазия и фуга ре минор", src: "../audio/track02.mp3" },
    { title: "Фредерик Шопен. Ноктюрн №1", src: "../audio/track03.mp3" },
    { title: "Иоган Себастьян Бах. Концерт для клавира с оркестром", src: "../audio/track04.mp3" },
    { title: "Иоган Себастьян Бах. Хроматическая фантазия и фуга ре минор", src: "../audio/track05.mp3" },
    { title: "Фредерик Шопен. Ноктюрн №1", src: "../audio/track06.mp3" },
    { title: "Иоган Себастьян Бах. Концерт для клавира с оркестром", src: "../audio/track07.mp3" },
    { title: "Иоган Себастьян Бах. Хроматическая фантазия и фуга ре минор", src: "../audio/track08.mp3" },
    { title: "Фредерик Шопен. Ноктюрн №1", src: "../audio/track09.mp3" },
];

let currentTrackIndex = 0;
let isPlaying = false;

const playIcon = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.482 18.837 2.02 1.714a.4.4 0 0 1 .6-.358L17.89 10.15a.4.4 0 0 1-.004.696l-14.809 8.33a.4.4 0 0 1-.596-.338Z"/>
</svg>`;

const pauseIcon = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.588 1.5H2.912a.4.4 0 0 0-.4.412l.477 16.2a.4.4 0 0 0 .4.388h3.723a.4.4 0 0 0 .4-.388l.476-16.2a.4.4 0 0 0-.4-.412ZM12.412 18.5h4.676a.4.4 0 0 0 .4-.412l-.477-16.2a.4.4 0 0 0-.4-.388h-3.723a.4.4 0 0 0-.4.388l-.476 16.2a.4.4 0 0 0 .4.412Z"/>
</svg>`;

// Initialize Howl instances
const sounds = tracks.map((track, index) => {
    const sound = new Howl({
        src: [track.src],
        onend: () => {
            if (currentTrackIndex < tracks.length - 1) {
                playTrack(currentTrackIndex + 1);
            } else {
                resetToPristineState();
            }
        }
    });
    return sound;
});

// Function to play a specific track
function playTrack(index) {
    if (index !== currentTrackIndex) {
        sounds[currentTrackIndex].stop();
        currentTrackIndex = index;
        sounds[currentTrackIndex].play();
        isPlaying = true;
    } else {
        togglePlayPause();
    }
    updateMarquee();
    highlightCurrentTrack();
    updatePlayPauseButtons();
    showMarqueeIfHidden();
}

// Function to play or pause the current track
function togglePlayPause() {
    if (isPlaying) {
        sounds[currentTrackIndex].pause();
    } else {
        sounds[currentTrackIndex].play();
        showMarqueeIfHidden();
    }
    isPlaying = !isPlaying;
    updateMarquee();
    updatePlayPauseButtons();
}

// Function to play or pause the current track from marquee
function playPause() {
    togglePlayPause();
}

// Function to update the marquee with the current track info
function updateMarquee() {
    document.getElementById('current-track').textContent = tracks[currentTrackIndex].title;
}

// Function to toggle the display of the marquee
function toggleMarquee() {
    const marquee = document.getElementById('marquee');
    if (marquee.style.display === 'none') {
        marquee.style.display = 'block';
    } else {
        resetToPristineState();
    }
}

// Function to show the marquee if it is currently hidden
function showMarqueeIfHidden() {
    const marquee = document.getElementById('marquee');
    if (marquee.style.display === 'none') {
        marquee.style.display = 'block';
    }
}

// Function to update the progress bar of a specific track
function updateProgressBar(index) {
    const progressBars = document.querySelectorAll(`#play-progress-${index} .play-progress__value`);
    const globalProgressBar = document.getElementById('global-progress-bar-inner');
    if (sounds[index].playing() || sounds[index].state() === 'loaded') {
        const seek = sounds[index].seek() || 0;
        const progress = (seek / sounds[index].duration()) * 100;
        progressBars.forEach(progressBar => {
            progressBar.style.width = `${progress}%`;
        });
        if (index === currentTrackIndex) {
            globalProgressBar.style.width = `${progress}%`;
        }
    }
}

// Function to highlight the current track in the playlist
function highlightCurrentTrack() {
    const playlistTracks = document.querySelectorAll('#playlist .playlist-track');
    playlistTracks.forEach((track, index) => {
        if (index === currentTrackIndex) {
            track.classList.add('current-track');
        } else {
            track.classList.remove('current-track');
        }
    });
}

// Function to reset to pristine state
function resetToPristineState() {
    sounds[currentTrackIndex].stop();
    currentTrackIndex = 0;
    isPlaying = false;
    updateMarquee();
    clearCurrentTrackHighlight();
    const marquee = document.getElementById('marquee');
    marquee.style.display = 'none';
    updatePlayPauseButtons();
    document.getElementById('global-progress-bar-inner').style.width = '0%';
}

// Function to clear current track highlight
function clearCurrentTrackHighlight() {
    const playlistTracks = document.querySelectorAll('#playlist .playlist-track');
    playlistTracks.forEach(track => {
        track.classList.remove('current-track');
    });
}

// Function to update play/pause buttons
function updatePlayPauseButtons() {
    const playlistButtons = document.querySelectorAll('#playlist .play-pause-btn');
    playlistButtons.forEach((button, index) => {
        button.innerHTML = (index === currentTrackIndex && isPlaying) ? pauseIcon : playIcon;
    });

    const instanceButtons = document.querySelectorAll('.fragment__player .play-pause-btn');
    instanceButtons.forEach((button, index) => {
        button.innerHTML = (index === currentTrackIndex && isPlaying) ? pauseIcon : playIcon;
    });

    const marqueeButton = document.getElementById('marquee-play-pause');
    marqueeButton.innerHTML = isPlaying ? pauseIcon : playIcon;
}

// Function to seek track position based on click
function seekTrack(event, index) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    const seekTime = sounds[index].duration() * percentage;

    if (index !== currentTrackIndex) {
        sounds[currentTrackIndex].stop();
        currentTrackIndex = index;
        sounds[currentTrackIndex].seek(seekTime);
        sounds[currentTrackIndex].play();
        isPlaying = true;
    } else {
        sounds[currentTrackIndex].seek(seekTime);
        if (!isPlaying) {
            togglePlayPause();
        }
    }

    updateMarquee();
    highlightCurrentTrack();
    updatePlayPauseButtons();
    showMarqueeIfHidden();
}

// Update progress bars periodically
function updateAllProgressBars() {
    tracks.forEach((track, index) => {
        updateProgressBar(index);
    });
    requestAnimationFrame(updateAllProgressBars);
}

// Populate playlist
const playlistDiv = document.getElementById('playlist');
tracks.forEach((track, index) => {
    const trackElement = document.createElement('div');
    trackElement.className = 'playlist-track';
    trackElement.innerHTML = `
        <div class="track">
            <div class="track__progress">
                <div class="play-progress" id="play-progress-${index}" onclick="seekTrack(event, ${index})">
                    <div class="play-progress__value"></div>
                </div>    
            </div>
            <div class="track__body">
                <div class="track__title">
                    ${track.title}
                </div>
                <div class="track__toggle-playback">
                    <button class="play-pause-btn" onclick="playTrack(${index})">${playIcon}</button>
                </div>
            </div>
        </div>
    `;
    playlistDiv.appendChild(trackElement);
});

// Create additional audio instances in fragment__player divs based on data-audio attribute
const fragmentPlayers = document.querySelectorAll('.fragment__player');
fragmentPlayers.forEach(fragmentPlayer => {
    const audioIndex = parseInt(fragmentPlayer.getAttribute('data-audio'), 10) - 1;
    if (audioIndex >= 0 && audioIndex < tracks.length) {
        const track = tracks[audioIndex];
        const instanceDiv = document.createElement('div');
        instanceDiv.className = 'audio-player';
        instanceDiv.innerHTML = `
            <button class="play-pause-btn" onclick="playTrack(${audioIndex})">${playIcon}</button>
            <span>${track.title}</span>
            <div class="play-progress" id="play-progress-${audioIndex}" onclick="seekTrack(event, ${audioIndex})">
                <div class="play-progress__value"></div>
            </div>
        `;
        fragmentPlayer.appendChild(instanceDiv);
    }
});

// Initial setup
resetToPristineState();
// Start updating progress bars
updateAllProgressBars();
