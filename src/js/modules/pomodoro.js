const startBtn = document.querySelector('.pomodoro__start');
const startBtnText = document.querySelector('.start-pomodoro__text');
const pomodoroTimer = document.querySelector('.pomodoro__timer');
const stopBtn = document.querySelector('#stop');
const pauseBtn = document.querySelector('#pause');
const breakBtn = document.querySelector('#break');
const minuteCounter = document.querySelector('.pomodoro__minutes');
const secondCounter = document.querySelector('.pomodoro__seconds');
const progressBar = document.querySelector('#bar');
const bigBreakAfter = +document.querySelector('.settings__break-after').innerHTML;
const worksDoneText = document.querySelector('.pomodoro__works-done');

let isRunning = false;
let interval;
let minute;
let second;
let percent;
let finishedWorkTimers = 0;
let action = 'work';
const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3');

function start() {
    isRunning = true;
    let nextMinutes = 0;
    progressBar.style.strokeDashoffset = 0;
    if (action === 'work') {
        nextMinutes = +document.querySelector('.settings__minute').innerHTML;
    } else if (finishedWorkTimers % bigBreakAfter === 0) {
        nextMinutes = +document.querySelector('.settings__big-break').innerHTML;
    } else {
        nextMinutes = +document.querySelector('.settings__small-break').innerHTML;
    }

    startBtn.classList.add('active');
    clearInterval(interval);
    if (nextMinutes < 10) {
        minuteCounter.innerText = '0' + nextMinutes;
    } else {
        minuteCounter.innerText = nextMinutes;
    }
    secondCounter.innerText = '00';

    minute = nextMinutes;
    percent = 100 / (minute * 60);
    minute--;
    second = 60;
    interval = setInterval(startTimer, 100);
}

function pause() {
    if (!isRunning) return;
    clearInterval(interval);

    if (second != 60 && pauseBtn.innerHTML != 'resume') {
        pauseBtn.innerText = 'resume';
    } else {
        interval = setInterval(startTimer, 1000);
        pauseBtn.innerText = 'pause';
    }
}

function stop() {
    isRunning = false;
    clearInterval(interval);
    finishedWorkTimers = 0;
    worksDoneText.innerText = 0;
    action = 'work';
    progressBar.style.strokeDashoffset = 0;
    startBtnText.innerText = 'start work';
    startBtn.classList.remove('active');

    if (pauseBtn.innerText.toLowerCase() === 'resume') {
        pauseBtn.innerText = 'pause';
    }
}

function breakFunc() {
    if (action === 'break') {
        alert('Already on break');
        return;
    }
    isRunning = false;
    clearInterval(interval);
    finishedWorkTimers++;
    worksDoneText.innerText = finishedWorkTimers;
    action = 'break';
    startBtn.classList.remove('active');

    if (finishedWorkTimers % bigBreakAfter === 0) {
        startBtnText.innerText = 'start big break';
    } else {
        startBtnText.innerText = 'start break';
    }

    if (pauseBtn.innerText.toLowerCase() === 'resume') {
        pauseBtn.innerText = 'pause';
    }
}

function startTimer() {
    let currentPercent = +getComputedStyle(progressBar)
        .strokeDashoffset.split('')
        .filter((item) => item >= 0 || item == '.')
        .join('');

    progressBar.style.strokeDashoffset = currentPercent + percent;

    second--;

    if (second < 10) {
        secondCounter.innerText = '0' + second;
    } else {
        secondCounter.innerText = second;
    }

    if (second == 0) {
        if (minute == 0) {
            second == 0;
        } else {
            minute--;
            second = 60;
        }
    }

    if (minute < 10) {
        minuteCounter.innerText = '0' + minute;
    } else {
        minuteCounter.innerText = minute;
    }

    if (minute < 0) {
        clearInterval(interval);
        minuteCounter.innerText = '00';
    }

    if (minute == 0 && second == 0) {
        startBtn.classList.remove('active');
        if (action === 'work') {
            finishedWorkTimers++;
            worksDoneText.innerText = finishedWorkTimers;
            action = 'break';

            if (finishedWorkTimers % bigBreakAfter === 0) {
                startBtnText.innerText = 'start big break';
            } else {
                startBtnText.innerText = 'start break';
            }
        } else {
            action = 'work';
            startBtnText.innerText = 'start work';
        }
        clearInterval(interval);
        
        audio.play()
    }
}

startBtn.addEventListener('click', () => {
    start();
});

startBtn.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        start();
    }
});

pauseBtn.addEventListener('click', () => {
    pause();
});

pauseBtn.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        pause();
    }
});

stopBtn.addEventListener('click', () => {
    stop();
});

stopBtn.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        stop();
    }
});

breakBtn.addEventListener('click', () => {
    breakFunc();
});

breakBtn.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        breakFunc();
    }
});
