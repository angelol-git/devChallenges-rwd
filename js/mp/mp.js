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
const buttonPlayPause = document.getElementById("button-play-pause");
const buttonNext = document.getElementById("button-next");
const buttonPrev = document.getElementById("button-prev");

let songIndex = 0;
let currentSong = document.createElement('audio');
let isPlaying = false;
let animationFrameId;

buttonPlayPause.addEventListener("click", () => isPlaying ? pauseSong() : playSong());
buttonPrev.addEventListener("click", prevSong);
buttonNext.addEventListener("click", nextSong);
songSeeker.addEventListener("input", handleSeekerInput);
currentSong.addEventListener("timeupdate", updateSeeker);
//currentSong.addEventListener("ended", nextSong);

function playSong() {
    isPlaying = true;
    buttonPlayPause.firstElementChild.src = "assets/Play_fill.svg";
    currentSong.play();
}

function pauseSong() {
    isPlaying = false;
    buttonPlayPause.firstElementChild.src = "assets/Play_fill.svg";
    currentSong.pause();
    cancelAnimationFrame(animationFrameId);
}

function loadSong() {
    currentSong.src = songs[songIndex].url;
    albumArt.src = songs[songIndex].albumArt;
    songTitle.innerText = songs[songIndex].title;
    artist.innerText = songs[songIndex].artist;
    songTimeCurrent.innerText = "0:00";
    songSeeker.value = 0;

    //Wait for the file to finish loading to extract info
    currentSong.addEventListener('loadedmetadata', () => {
        songTimeEnd.innerText = formatSongTime(currentSong.duration);
        songSeeker.max = Math.floor(currentSong.duration);
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

function updateSeeker() {

    let currentMinutes = Math.floor(currentSong.currentTime / 60);
    let currentSeconds = Math.floor(currentSong.currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    const completionPercentage = Math.floor((currentSong.currentTime / currentSong.duration) * 100);
    if (isNaN(completionPercentage)) {
        songSeeker.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) 1%, var(--text) 1%, var(--text) 100%)`;
    }
    else {
        songSeeker.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${completionPercentage}%, var(--text) ${completionPercentage}%, var(--text) 100%)`;
    }
    songSeeker.value = Math.floor(currentSong.currentTime);
    songTimeCurrent.innerText = `${currentMinutes}:${currentSeconds}`;

    animationFrameId = requestAnimationFrame(updateSeeker);
}

function handleSeekerInput(event) {
    const seekerInputValue = event.target.value;
    const formattedString = formatSongTime(seekerInputValue);
    songTimeCurrent.innerText = formattedString;
    currentSong.currentTime = seekerInputValue;
    updateSeeker();
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
