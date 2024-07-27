const songs = [
    { title: 'Lost in the City Lights', artist: 'Cosmo Sheldrake', albumArt: './assets/cover-1.png', url: './assets/lost-in-city-lights-145038.mp3' },
    { title: 'Forest Lullaby', artist: 'Lesfm', albumArt: './assets/cover-2.png', url: './assets/forest-lullaby-110624.mp3' },
];
//Info
const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const songTimeCurrent = document.getElementById("song-time-current");
const songTimeEnd = document.getElementById("song-time-end");
//Input
const songSeeker = document.getElementById("song-seeker");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const buttonPlayPause = document.getElementById("button-play-pause");
const buttonNext = document.getElementById("button-next");
const buttonPrev = document.getElementById("button-prev");

let songIndex = 0;
let currentSong = new Audio();
let isPlaying = false;
let isDragging = false;

// Event listeners
currentSong.addEventListener("timeupdate", updateProgressBarAndTime);
currentSong.addEventListener("ended", nextSong);
buttonPlayPause.addEventListener("click", () => isPlaying ? pauseSong() : playSong());
buttonPrev.addEventListener("click", prevSong);
buttonNext.addEventListener("click", nextSong);
progressBarContainer.addEventListener("click", handleProgressBarClick);
progressBarContainer.addEventListener('mousedown', startDragging);
progressBarContainer.addEventListener('touchstart', startDragging);
document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('touchend', () => isDragging = false);
// songSeeker.addEventListener("input", handleSeekerInput);
// currentSong.addEventListener("timeupdate", updateSeeker);

function playSong() {
    isPlaying = true;
    buttonPlayPause.firstElementChild.src = "./assets/Pause_fill.svg";
    buttonPlayPause.firstElementChild.alt = "Pause Song";
    currentSong.play();
}

function pauseSong() {
    isPlaying = false;
    buttonPlayPause.firstElementChild.src = "./assets/Play_fill.svg";
    buttonPlayPause.firstElementChild.alt = "Play Song";
    currentSong.pause();
}

function loadSong() {
    currentSong.src = songs[songIndex].url;
    albumArt.src = songs[songIndex].albumArt;
    songTitle.innerText = songs[songIndex].title;
    artist.innerText = songs[songIndex].artist;
    songTimeCurrent.innerText = "0:00";
    //songSeeker.value = 0;

    currentSong.addEventListener('loadedmetadata', () => {
        songTimeEnd.innerText = formatSongTime(currentSong.duration);
        //songSeeker.max = Math.floor(currentSong.duration);
    });
}

function prevSong() {
    if (songIndex < 1) {
        return;
    }
    songIndex--;

    loadSong();
    playSong();
}
function nextSong() {
    if (songIndex > 0) {
        return;
    }
    songIndex++;

    loadSong();
    playSong();
}

function startDragging(event) {
    if (event.target === progressBar) {
        isDragging = true;
        handleDrag(event);
    }
}
function handleMove(event) {
    if (isDragging) {
        handleDrag(event);
    }
}

function updateProgressBarAndTime() {
    const progressBarPercent = (currentSong.currentTime / currentSong.duration) * 100;
    progressBar.style.width = `${progressBarPercent}%`;
    songTimeCurrent.innerText = formatSongTime(currentSong.currentTime);
}

function handleProgressBarClick(event) {
    const width = this.clientWidth;
    const clickedX = event.offsetX;
    const duration = currentSong.duration;
    currentSong.currentTime = (clickedX / width) * duration;
}

function handleDrag(event) {
    let clientX;
    if (event.type === "touchmove" || event.type === "touchstart") {
        clientX = event.touches[0].clientX;
    }
    else {
        clientX = event.clientX;
    }

    const rect = progressBarContainer.getBoundingClientRect();
    let newX = clientX - rect.left;
    newX = Math.max(0, Math.min(newX, rect.width));
    const newTime = (newX / rect.width) * currentSong.duration;
    currentSong.currentTime = newTime;
}

function formatSongTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return `${minutes}:${remainingSeconds}`;
}

loadSong();

// function updateSeeker() {

//     let currentMinutes = Math.floor(currentSong.currentTime / 60);
//     let currentSeconds = Math.floor(currentSong.currentTime % 60);
//     if (currentSeconds < 10) {
//         currentSeconds = "0" + currentSeconds;
//     }

//     const completionPercentage = Math.floor((currentSong.currentTime / currentSong.duration) * 100);
//     if (isNaN(completionPercentage)) {
//         songSeeker.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) 1%, var(--text) 1%, var(--text) 100%)`;
//     }
//     else {
//         songSeeker.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${completionPercentage}%, var(--text) ${completionPercentage}%, var(--text) 100%)`;
//     }
//     songSeeker.value = Math.floor(currentSong.currentTime);
//     songTimeCurrent.innerText = `${currentMinutes}:${currentSeconds}`;

// }

// function handleSeekerInput(event) {
//     const seekerInputValue = event.target.value;
//     const formattedString = formatSongTime(seekerInputValue);
//     songTimeCurrent.innerText = formattedString;
//     currentSong.currentTime = seekerInputValue;
//     updateSeeker();
// }

