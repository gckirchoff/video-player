const player = document.querySelector('.player');
const video  = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenButton = document.querySelector('.fullscreen');



function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}



// Play & Pause ----------------------------------- //
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

// Show play button on video ending
video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //


// Calculate display time format (seconds to minutes)
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}


// Update prograss bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek time in video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    video.currentTime = newTime * video.duration;
}


// Volume Controls --------------------------- //

let lastVolume = 1;


// Check volume to display proper volume icon
function adjustVolumeIcon(volume) {
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
}


// Volume bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Round volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // Change icon depending on volume
    adjustVolumeIcon(volume);
    lastVolume = volume;
}

// Mute and unmute
function toggleMute() {
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.className = '';
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        adjustVolumeIcon(lastVolume);
        volumeIcon.setAttribute('title', 'Mute');
    }
}


// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}



// Fullscreen ------------------------------- //



/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
    /* Close fullscreen */
function closeFullscreen(elem) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}



let fullscreen = false;


// Toggle fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenButton.addEventListener('click', toggleFullscreen)








const input = document.querySelector('input');
const imageContainer = document.getElementById('image-container');
const formContainer = document.getElementById('form-container');




function loadFile(event) {
    // const videoFile = input.files;
    // const image = document.createElement('img');
    // image.src = URL.createObjectURL(event.target.files[0]);
    // imageContainer.appendChild(image);
    video.src = URL.createObjectURL(event.target.files[0]);
    formContainer.hidden = true;
}


input.addEventListener('change', loadFile);