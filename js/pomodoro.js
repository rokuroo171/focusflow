// --- Logic Timer Pomodoro ---

// -- Durasi tiap mode (dalam detik) --
const MODES = {
  focus: { label: "Focus Time",   seconds: 25 * 60 },
  short: { label: "Short Break",  seconds:  5 * 60 },
  long:  { label: "Long Break",   seconds: 15 * 60 },
};

// -- State (kondisi timer saat ini) --
let currentMode    = "focus";
let timeLeft       = MODES.focus.seconds;
let isRunning      = false;
let intervalId     = null;
let sessionCount   = 0;   // berapa sesi selesai (max 4, lalu reset)

// -- Ambil elemen dari HTML --
const timerDisplay  = document.getElementById("timer-display");
const modeLabel     = document.getElementById("mode-label");
const btnStart      = document.getElementById("btn-start");
const btnReset      = document.getElementById("btn-reset");
const btnSkip       = document.getElementById("btn-skip");
const sessionDots   = document.getElementById("session-dots");

// -- Render 4 dot di bawah timer --
function renderDots() {
  sessionDots.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    // Warnai dot yang sudah selesai
    if (i < sessionCount) {
      dot.classList.add("done");
    }

    sessionDots.appendChild(dot);
  }
}

// -- Format detik jadi "MM:SS" --
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// -- Update tampilan timer di layar --
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  document.title = `${formatTime(timeLeft)} — FocusFlow`;
}

// -- Ganti mode (focus / short / long) --
function setMode(mode) {
  currentMode = mode;
  timeLeft    = MODES[mode].seconds;

  // Update label
  modeLabel.textContent = MODES[mode].label;
  updateDisplay();

  // Tandai tab yang aktif
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  // Hentikan timer kalau sedang jalan
  stopTimer();
}

// -- Mulai timer --
function startTimer() {
  isRunning = true;
  btnStart.textContent = "Pause";

  intervalId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // Tambah data fokus ke stats (hanya saat mode focus)
    if (currentMode === "focus") {
      totalFocusSeconds++;
      updateStats();
    }

    // Timer habis
    if (timeLeft <= 0) {
      finishSession();
    }
  }, 1000);
}

// -- Pause timer --
function pauseTimer() {
  isRunning = false;
  btnStart.textContent = "Resume";
  clearInterval(intervalId);
}

// -- Reset timer ke awal mode ini --
function stopTimer() {
  isRunning = false;
  btnStart.textContent = "Start";
  clearInterval(intervalId);
}

// -- Tombol Start / Pause --
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

// -- Tombol Reset --
function resetTimer() {
  stopTimer();
  timeLeft = MODES[currentMode].seconds;
  updateDisplay();
}

// -- Tombol Skip (langsung selesaikan sesi) --
function skipSession() {
  stopTimer();
  finishSession();
}

// -- Dipanggil saat timer habis atau di-skip --
function finishSession() {
  stopTimer();

  if (currentMode === "focus") {
    // Catat sesi & update dot
    sessionCount = (sessionCount + 1) % 4;
    completedPomodoros++;
    renderDots();
    updateStats();
    showToast("🍅 Pomodoro selesai! Waktunya istirahat.");

    // Setiap 4 sesi = long break
    if (sessionCount === 0) {
      setMode("long");
    } else {
      setMode("short");
    }

  } else {
    // Istirahat selesai, balik ke fokus
    showToast("⏱ Istirahat selesai! Yuk fokus lagi.");
    setMode("focus");
  }
}

// =============================================
//  Event Listeners
// =============================================

btnStart.addEventListener("click", toggleTimer);
btnReset.addEventListener("click", resetTimer);
btnSkip.addEventListener("click",  skipSession);

// Mode tab diklik
document.querySelectorAll(".mode-btn").forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

// -- Inisialisasi awal --
renderDots();
updateDisplay();
