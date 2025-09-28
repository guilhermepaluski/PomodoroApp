const default_time = 50 * 60; // 50 minutos em segundos
let time = default_time;
const incBtn = document.getElementById('increaseButton');
const decBtn = document.getElementById('decreaseButton');

function showTimer() {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    var minSuffix = String(min).padStart(2, "0");
    var secSuffix = String(sec).padStart(2, "0");
    var minsecFormated = minSuffix + ":" + secSuffix;

    document.querySelector(".timer").innerText = minsecFormated;
}

incBtn.addEventListener('click', () => {
    time += 60;
    showTimer();
    disableButtons();
})

decBtn.addEventListener('click', () => {
    time -= 60;
    showTimer();
    disableButtons();
})

function disableButtons() {
    decBtn.disabled = time <= 60;
}

disableButtons();
showTimer();