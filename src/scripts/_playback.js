const tracks = [
    {
        title: 'В. Ладимир Дешевов. Рельсы. Исполняет Антон Батагов (фортепиано)',
        src: '../audio/track01.mp3',
        backgroundColor: '#BFBBAD',
        textColor: '#000000'
    },
    {
        title: 'Вольфганг Амадей Моцарт. Концерт&nbsp;№23 ля мажор для фортепиано <span class="nobr">с оркестром, ч.1.</span> Исполняет Мария Юдина (фортепиано), Большой симфонический оркестр Всесоюзного радио. Дирижер Сергей Горчаков. 1948г.',
        src: '../audio/track02.mp3',
        backgroundColor: '#253657',
        textColor: '#FFFFFF'
    },
    {
        title: 'Макс Авельевич Кюсс. «Амурские волны»',
        src: '../audio/track03.mp3',
        backgroundColor: '#C54F35',
        textColor: '#FFFFFF'
    },
    {
        title: 'Александр Скрябин. Листок из <span class="nobr">альбома, №1.</span> Исполняет Владимир Софроницкий (фортепиано)',
        src: '../audio/track04.mp3',
        backgroundColor: '#D29A16',
        textColor: '#FFFFFF'
    },
    {
        title: 'Людвиг ван Бетховен. Симфония&nbsp;№7 <span class="nobr">ля мажор, ч.2.</span> Исполняет Берлинский филармонический оркестр. Дирижер Герберт фон&nbsp;Караян',
        src: '../audio/track05.mp3',
        backgroundColor: '#A0883B',
        textColor: '#FFFFFF'
    },
    {
        title: 'Иоганн Себастьян Бах. Концерт для клавира с&nbsp;оркестром <span class="nobr">ре минор, ч.1.</span> Исполняет Мария Юдина (фортепиано), Симфонический оркестр Всесоюзного радио. Дирижер Курт Зандерлинг. 1956г.',
        src: '../audio/track06.mp3',
        backgroundColor: '#B84934',
        textColor: '#FFFFFF'
    },
    {
        title: 'Иоганн Себастьян Бах. Хроматическая фантазия и&nbsp;фуга ре&nbsp;минор',
        src: '../audio/track07.mp3',
        backgroundColor: '#1F416A',
        textColor: '#FFFFFF'
    },
    {
        title: 'Дмитрий Шостакович. Антракт. Из оперы Нос. Исполняет Камерный оркестр Государственного академического Большого театра. Дирижер Геннадий Рождественский. 1975г.',
        src: '../audio/track08.mp3',
        backgroundColor: '#3F6171',
        textColor: '#FFFFFF'
    },
    {
        title: 'Дитрих Букстехуде. Аллилуйя',
        src: '../audio/track09.mp3',
        backgroundColor: '#7888A2',
        textColor: '#FFFFFF'
    },
];

let currentTrackIndex = 0;
let isPlaying = false;

const playIcon = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.482 18.837 2.02 1.714a.4.4 0 0 1 .6-.358L17.89 10.15a.4.4 0 0 1-.004.696l-14.809 8.33a.4.4 0 0 1-.596-.338Z"/>
</svg>`;

const pauseIcon = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.588 1.5H2.912a.4.4 0 0 0-.4.412l.477 16.2a.4.4 0 0 0 .4.388h3.723a.4.4 0 0 0 .4-.388l.476-16.2a.4.4 0 0 0-.4-.412ZM12.412 18.5h4.676a.4.4 0 0 0 .4-.412l-.477-16.2a.4.4 0 0 0-.4-.388h-3.723a.4.4 0 0 0-.4.388l-.476 16.2a.4.4 0 0 0 .4.412Z"/>
</svg>`;

let sounds = [];

// Preload the first track on page load
function preloadTrack(index) {
    if (!sounds[index]) {
        sounds[index] = new Howl({
            src: [tracks[index].src],
            html5: true,
            preload: false,
            onload: () => {
                console.log(`Track ${index + 1} loaded`);
            },
            onplay: () => {
                sounds[index].preload = 'metadata';
            },
            onend: () => {
                if (currentTrackIndex < tracks.length - 1) {
                    playTrack(currentTrackIndex + 1);
                } else {
                    resetToPristineState();
                }
            }
        });
    }
}

// Preload the first track
preloadTrack(0);
sounds[0].load();

// Function to play a specific track
function playTrack(index) {
    if (index !== currentTrackIndex) {
        sounds[currentTrackIndex].stop();
        preloadTrack(index);
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
    // Preload the next track
    if (currentTrackIndex < tracks.length - 1) {
        preloadTrack(currentTrackIndex + 1);
    }
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
    document.getElementById('current-track').innerHTML = tracks[currentTrackIndex].title;
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
    if (sounds[index] && (sounds[index].playing() || sounds[index].state() === 'loaded')) {
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

    const instanceTracks = document.querySelectorAll('.player-slot .audio-player');
    instanceTracks.forEach((track) => {
        const audioIndex = parseInt(track.closest('.player-slot').getAttribute('data-audio'), 10) - 1;
        if (audioIndex === currentTrackIndex) {
            track.classList.add('current-track');
        } else {
            track.classList.remove('current-track');
        }
    });
}

// Function to reset to pristine state
function resetToPristineState() {
    if (sounds[currentTrackIndex]) {
        sounds[currentTrackIndex].stop();
    }
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

    const instanceTracks = document.querySelectorAll('.player-slot .audio-player');
    instanceTracks.forEach(track => {
        track.classList.remove('current-track');
    });
}

// Function to update play/pause buttons
function updatePlayPauseButtons() {
    const playlistButtons = document.querySelectorAll('#playlist .play-pause-btn');
    playlistButtons.forEach((button, index) => {
        button.innerHTML = (index === currentTrackIndex && isPlaying) ? pauseIcon : playIcon;
    });

    const instanceButtons = document.querySelectorAll('.player-slot .play-pause-btn');
    instanceButtons.forEach((button) => {
        const parentDiv = button.closest('.player-slot');
        const audioIndex = parseInt(parentDiv.getAttribute('data-audio'), 10) - 1;
        button.innerHTML = (audioIndex === currentTrackIndex && isPlaying) ? pauseIcon : playIcon;
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
        preloadTrack(index);
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
    // Preload the next track
    if (currentTrackIndex < tracks.length - 1) {
        preloadTrack(currentTrackIndex + 1);
    }
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
        <div class="track track--playlist">
            <div class="track__progress">
                <div class="play-progress" id="play-progress-${index}" onclick="seekTrack(event, ${index})">
                    <div class="play-progress__value"></div>
                </div>    
            </div>
            <div class="track__body">
                <div class="track__title">
                    <div class="track__text-line">
                        ${track.title}
                    </div>
                </div>
                <div class="track__toggle-playback">
                    <button class="play-pause-btn" onclick="playTrack(${index})">${playIcon}</button>
                </div>
            </div>
        </div>
    `;
    playlistDiv.appendChild(trackElement);
});

// Create additional audio instances in player-slot divs based on data-audio attribute
const playerSlots = document.querySelectorAll('.player-slot');
playerSlots.forEach(playerSlot => {
    const audioIndex = parseInt(playerSlot.getAttribute('data-audio'), 10) - 1;
    if (audioIndex >= 0 && audioIndex < tracks.length) {
        const track = tracks[audioIndex];
        const instanceDiv = document.createElement('div');
        instanceDiv.className = 'audio-player';
        instanceDiv.innerHTML = `
            <div class="track track--instance" style="background-color: ${track.backgroundColor}; color: ${track.textColor};">
                <div class="track__progress">
                    <div class="play-progress" id="play-progress-${audioIndex}" onclick="seekTrack(event, ${audioIndex})">
                        <div class="play-progress__value"></div>
                    </div>
                </div>
                <div class="track__body">
                    <div class="track__title">
                        <div class="track__text-line">
                            ${track.title}
                        </div>
                    </div>
                    <div class="track__toggle-playback">
                        <button class="play-pause-btn" onclick="playTrack(${audioIndex})">${playIcon}</button>
                    </div>
                </div>
            </div>
        `;
        playerSlot.appendChild(instanceDiv);
    }
});

// Initial setup
resetToPristineState();
// Start updating progress bars
updateAllProgressBars();
