const tracks = [
    {title: "Track 1", src: "../audio/track01.mp3"},
    {title: "Track 2", src: "../audio/track02.mp3"},
    {title: "Track 3", src: "../audio/track03.mp3"},
    {title: "Track 4", src: "../audio/track04.mp3"},
    {title: "Track 5", src: "../audio/track05.mp3"},
    {title: "Track 6", src: "../audio/track06.mp3"},
    {title: "Track 7", src: "../audio/track07.mp3"},
    {title: "Track 8", src: "../audio/track08.mp3"},
    {title: "Track 9", src: "../audio/track09.mp3"},
];

let currentTrackIndex = 0;
let isPlaying = false;

// Initialize Howl instances
const sounds = tracks.map(track => new Howl({src: [track.src]}));

// Function to play a specific track
function playTrack(index) {
    if (isPlaying) {
        sounds[currentTrackIndex].stop();
    }
    currentTrackIndex = index;
    sounds[currentTrackIndex].play();
    isPlaying = true;
    updateMarquee();
    updateProgressBars();
}

// Function to play or pause the current track
function playPause() {
    if (isPlaying) {
        sounds[currentTrackIndex].pause();
    } else {
        sounds[currentTrackIndex].play();
    }
    isPlaying = !isPlaying;
    updateMarquee();
}

// Function to update the marquee with the current track info
function updateMarquee() {
    document.getElementById('current-track').textContent = isPlaying ? tracks[currentTrackIndex].title : "No track playing";
}

// Function to toggle the display of the marquee
function toggleMarquee() {
    const marquee = document.getElementById('marquee');
    marquee.style.display = marquee.style.display === 'none' ? 'flex' : 'none';
    sounds[currentTrackIndex].stop();
    isPlaying = false;
    updateMarquee();
}

// Function to update the progress bars of all instances
function updateProgressBars() {
    const progressBarElements = document.querySelectorAll('.progress-bar-inner');
    if (isPlaying) {
        sounds[currentTrackIndex].on('play', () => {
            requestAnimationFrame(() => {
                const seek = sounds[currentTrackIndex].seek() || 0;
                const progress = (seek / sounds[currentTrackIndex].duration()) * 100;
                progressBarElements.forEach(bar => {
                    bar.style.width = `${progress}%`;
                });
                if (isPlaying) {
                    requestAnimationFrame(arguments.callee);
                }
            });
        });
    }
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
                <div class="progress-bar">
                    <div class="progress-bar-inner"></div>
                </div>
            `;
    audioInstancesDiv.appendChild(instanceDiv);
});

// Initial marquee update
updateMarquee();
