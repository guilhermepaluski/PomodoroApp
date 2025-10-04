const default_time = 50 * 60; // 50 minutos em segundos
let time = default_time;
const incMinBtn = document.getElementById('minuteIncreaseButton');
const decMinBtn = document.getElementById('minuteDecreaseButton');
const incSecBtn = document.getElementById('secondIncreaseButton');
const decSecBtn = document.getElementById('secondDecreaseButton');

function showTimer() {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    var minSuffix = String(min).padStart(2, "0");
    var secSuffix = String(sec).padStart(2, "0");
    var minsecFormated = minSuffix + ":" + secSuffix;

    document.querySelector(".timer").innerText = minsecFormated;
}

// Minutes --------------------------------
incMinBtn.addEventListener('click', () => {
    time += 60;
    showTimer();
    disableMinuteButtons();
})

decMinBtn.addEventListener('click', () => {
    time -= 60;
    showTimer();
    disableMinuteButtons();
})

function disableMinuteButtons() {
    decMinBtn.disabled = time <= 60;
}

// Seconds --------------------------------
incSecBtn.addEventListener('click', () => {
    time += 1;
    showTimer();
    disableSecondButtons();
})

decSecBtn.addEventListener('click', () => {
    time -= 1;
    showTimer();
    disableSecondButtons();
})

function disableSecondButtons() {
    decSecBtn.disabled = time <= 0;
}

disableMinuteButtons();
disableSecondButtons();
showTimer();