const tracks = [
    { title: "Track 1", src: "../audio/track01.mp3" },
    { title: "Track 2", src: "../audio/track02.mp3" },
    { title: "Track 3", src: "../audio/track03.mp3" },
    { title: "Track 4", src: "../audio/track04.mp3" },
    { title: "Track 5", src: "../audio/track05.mp3" },
    { title: "Track 6", src: "../audio/track06.mp3" },
    { title: "Track 7", src: "../audio/track07.mp3" },
    { title: "Track 8", src: "../audio/track08.mp3" },
    { title: "Track 9", src: "../audio/track09.mp3" },
];

let currentTrackIndex = 0;
let isPlaying = false;

// Initialize Howl instances
const sounds = tracks.map((track, index) => {
    const sound = new Howl({
        src: [track.src],
        onend: () => {
            if (currentTrackIndex < tracks.length - 1) {
                playTrack(currentTrackIndex + 1);
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
}

// Function to play or pause the current track
function togglePlayPause() {
    if (isPlaying) {
        sounds[currentTrackIndex].pause();
    } else {
        sounds[currentTrackIndex].play();
    }
    isPlaying = !isPlaying;
    updateMarquee();
}

// Function to play or pause the current track from marquee
function playPause() {
    togglePlayPause();
}

// Function to update the marquee with the current track info
function updateMarquee() {
    document.getElementById('current-track').textContent = isPlaying ? tracks[currentTrackIndex].title : "Paused";
}

// Function to toggle the display of the marquee
function toggleMarquee() {
    const marquee = document.getElementById('marquee');
    marquee.style.display = marquee.style.display === 'none' ? 'flex' : 'none';
}

// Function to update the progress bar of a specific track
function updateProgressBar(index) {
    const progressBar = document.querySelector(`#progress-bar-${index} .progress-bar-inner`);
    if (sounds[index].playing() || sounds[index].state() === 'loaded') {
        const seek = sounds[index].seek() || 0;
        const progress = (seek / sounds[index].duration()) * 100;
        progressBar.style.width = `${progress}%`;
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
    const playlistTracks = document.querySelectorAll('#playlist div');
    playlistTracks.forEach((track, index) => {
        if (index === currentTrackIndex) {
            track.classList.add('current-track');
        } else {
            track.classList.remove('current-track');
        }
    });
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
    trackElement.textContent = track.title;
    trackElement.onclick = () => playTrack(index);
    playlistDiv.appendChild(trackElement);
});

// Create additional audio instances
const audioInstancesDiv = document.getElementById('audio-instances');
tracks.forEach((track, index) => {
    const instanceDiv = document.createElement('div');
    instanceDiv.className = 'audio-player';
    instanceDiv.innerHTML = `
                <button onclick="playTrack(${index})">Play/Pause</button>
                <div class="progress-bar" id="progress-bar-${index}">
                    <div class="progress-bar-inner"></div>
                </div>
            `;
    audioInstancesDiv.appendChild(instanceDiv);
});

// Initial marquee update
updateMarquee();
// Start updating progress bars
updateAllProgressBars();
