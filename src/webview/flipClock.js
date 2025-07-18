// Pomodoro settings
const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;
let isWorkSession = true;
let timer = null;
let remainingSeconds = WORK_MINUTES * 60;

const minutesTens = document.getElementById('minutes-tens');
const minutesOnes = document.getElementById('minutes-ones');
const secondsTens = document.getElementById('seconds-tens');
const secondsOnes = document.getElementById('seconds-ones');
const sessionLabel = document.getElementById('session-label');

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateClockDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const [mT, mO] = pad(mins);
    const [sT, sO] = pad(secs);
    setFlip(minutesTens, mT);
    setFlip(minutesOnes, mO);
    setFlip(secondsTens, sT);
    setFlip(secondsOnes, sO);
}

function setFlip(element, value) {
    if (element.textContent !== value) {
        element.classList.remove('flip');
        void element.offsetWidth; // trigger reflow for animation
        element.textContent = value;
        element.classList.add('flip');
        setTimeout(() => element.classList.remove('flip'), 500);
    }
}

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateClockDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            isWorkSession = !isWorkSession;
            sessionLabel.textContent = isWorkSession ? 'Work' : 'Break';
            remainingSeconds = (isWorkSession ? WORK_MINUTES : BREAK_MINUTES) * 60;
            updateClockDisplay();
            // Optionally: add sound or notification here
        }
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetTimer() {
    pauseTimer();
    remainingSeconds = (isWorkSession ? WORK_MINUTES : BREAK_MINUTES) * 60;
    updateClockDisplay();
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// Initial render
updateClockDisplay();
