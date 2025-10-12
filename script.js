const default_time = 50 * 60; // 50 minutos em segundos
let time = default_time;
let timerDisplay = document.getElementById('timerDisplay')
const editTime = document.getElementById('editTimeButton');
const playBtn = document.getElementById('playButton');
const pauseBtn = document.getElementById('pauseButton');
const stopBtn = document.getElementById('stopButton');
let countdown = null;

function showTimer() {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    var minSuffix = String(min).padStart(2, "0");
    var secSuffix = String(sec).padStart(2, "0");
    timerDisplay.innerText = minSuffix + ":" + secSuffix;

    disabledButtons();
}

function disabledButtons() {
    playBtn.disabled = false;
    playBtn.hidden = false;
    pauseBtn.disabled = true;
    pauseBtn.hidden = true;
    stopBtn.disabled = true;
    stopBtn.hidden = true;
}

function enabledButtons() {
    playBtn.disabled = true;
    playBtn.hidden = true;
    pauseBtn.disabled = false;
    pauseBtn.hidden = false;
    stopBtn.disabled = false;
    stopBtn.hidden = false;
}

// ▶
function startCountdownTimer() {
    if (countdown) return;

    countdown = setInterval(() => {
        if (time > 0) {
            time--;
            showTimer();
            enabledButtons();
        } else {
            clearInterval(countdown);
            countdown = null;
            alert("⏰ Time's up!");
        }
    }, 1000);
}

playBtn.addEventListener('click', () => {
    startCountdownTimer();
    enabledButtons();
});

// ❚❚
function pauseCountdownTimer() {
    clearInterval(countdown);
    countdown = null;
    playBtn.disabled = false;
    playBtn.hidden = false;
    pauseBtn.disabled = true;
    pauseBtn.hidden = true;
};

pauseBtn.addEventListener('click', () => {
    pauseCountdownTimer();
});

// ⏹
function stopCountdownTimer() {
    clearInterval(countdown);
    countdown = null;
    time = default_time;
    showTimer();
    saveInput();
};

stopBtn.addEventListener('click', () => {
    stopCountdownTimer();
});

editTime.addEventListener('click', () => {
    input = document.createElement("input");
    input.type = "text";
    input.maxLength = 5;
    input.value = timerDisplay.innerText;
    input.style.fontSize = "3rem";
    input.style.fontWeight = "bold";
    input.style.width = "120px";
    input.style.textAlign = "center";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.background = "transparent";
    input.style.color = "#333";
    input.classList.add("blinking");

    timerDisplay.replaceWith(input);
    input.focus();

    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9:]/g, "");

        if (!input.value.includes(":") && input.value.length > 2) {
            input.value = input.value.slice(0, 2) + ":" + input.value.slice(2);
        }
    });
    input.addEventListener("blur", () => saveInput(input));
    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter" || e.key === "Tab") {
            saveInput(input);
        };
    });
});

function saveInput(input) {
    const value = input.value.trim();
    const regex = /^(\d{1,2}):(\d{2})$/;
    const match = value.match(regex);

    if (match) {
        min = parseInt(match[1]);
        sec = parseInt(match[2]);
    }

    if (sec >= 60) {
        sec = 59;
    }

    if (sec < 0) {
        sec = 0;
    }

    if (min < 0) {
        min = 0;
    }

    if (min == 0 && sec == 0) {
        playBtn.disabled = true;
        playBtn.enabled = false;
    } else {
        playBtn.enabled = true;
        playBtn.disabled = false;
    }

    time = min * 60 + sec;

    const newSpan = document.createElement("span");
    newSpan.id = "timerDisplay";
    newSpan.className = "timer";
    newSpan.innerText = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;
    input.replaceWith(newSpan);

    timerDisplay = newSpan;
}

showTimer();