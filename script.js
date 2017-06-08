const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progressTime = player.querySelector('.progress__time');


function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handlerRangeUpdate() {
    video[this.name] = this.value;
}
function handlerProgress() {
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    var time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}

function showWindow() {
    var status = getComputedStyle(progressTime).opacity;
    if (status == '0'){
        progressTime.style.opacity = '1';
    } else{
        progressTime.style.opacity = '0';
    }
}

function showtText(e) {
    var left = e.offsetX;
    var time = ((left * video.duration) / parseInt(getComputedStyle(progress).width)).toFixed(1);
    var progressWidth = parseInt(getComputedStyle(progressTime).width);
    progressTime.style.left = (left - progressWidth / 2) + 'px';
    progressTime.textContent = time + 's';
}
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handlerProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handlerRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handlerRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mouseover', showWindow);
progress.addEventListener('mouseout', showWindow);
progress.addEventListener('mousemove', showtText);

