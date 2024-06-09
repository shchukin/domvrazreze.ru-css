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
    if (sounds[index].playing() || sounds[index].state() === 'loaded') {
        const seek = sounds[index].seek() || 0;
        const progress = (seek / sounds[index].duration()) * 100;
        progressBars.forEach(progressBar => {
            progressBar.style.width = `${progress}%`;
        });
    }
}

// Function to update the global progress bar
function updateGlobalProgressBar() {
    const progressBar = document.getElementById('global-progress-bar-inner');
    if (sounds[currentTrackIndex].playing() || sounds[currentTrackIndex].state() === 'loaded') {
        const seek = sounds[currentTrackIndex].seek() || 0;
        const progress = (seek / sounds[currentTrackIndex].duration()) * 100;
        progressBar.style.width = `${progress}%`;
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

    const instanceButtons = document.querySelectorAll('#audio-instances .play-pause-btn');
    instanceButtons.forEach((button, index) => {
        button.innerHTML = (index === currentTrackIndex && isPlaying) ? pauseIcon : playIcon;
    });

    const marqueeButton = document.getElementById('marquee-play-pause');
    marqueeButton.innerHTML = isPlaying ? pauseIcon : playIcon;
}

// Update progress bars periodically
function updateAllProgressBars() {
    tracks.forEach((track, index) => {
        updateProgressBar(index);
    });
    updateGlobalProgressBar();
    requestAnimationFrame(updateAllProgressBars);
}

// Populate playlist
const playlistDiv = document.getElementById('playlist');
tracks.forEach((track, index) => {
    const trackElement = document.createElement('div');
    trackElement.className = 'playlist-track';
    trackElement.innerHTML = `
        <button class="play-pause-btn" onclick="playTrack(${index})">${playIcon}</button>
        ${track.title}
        <div class="play-progress" id="play-progress-${index}">
            <div class="play-progress__value"></div>
        </div>
    `;
    playlistDiv.appendChild(trackElement);
});

// Create additional audio instances
const audioInstancesDiv = document.getElementById('audio-instances');
tracks.forEach((track, index) => {
    const instanceDiv = document.createElement('div');
    instanceDiv.className = 'audio-player';
    instanceDiv.innerHTML = `
        <button class="play-pause-btn" onclick="playTrack(${index})">${playIcon}</button>
        <span>${track.title}</span>
        <div class="play-progress" id="play-progress-${index}">
            <div class="play-progress__value"></div>
        </div>
    `;
    audioInstancesDiv.appendChild(instanceDiv);
});

// Initial setup
resetToPristineState();
// Start updating progress bars
updateAllProgressBars();
