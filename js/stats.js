// --- Stats dan Fungsi Bersama -----

// -- Variabel global (dipakai pomodoro.js juga) --
let completedPomodoros = 0;
let totalFocusSeconds  = 0;

// -- Ambil elemen stats --
const statPomodoro = document.getElementById("stat-pomodoro");
const statDone     = document.getElementById("stat-done");
const statFocus    = document.getElementById("stat-focus");

// -- Update semua angka di stats bar --
function updateStats() {
  // Jumlah pomodoro selesai
  statPomodoro.textContent = completedPomodoros;

  // Jumlah todo yang sudah selesai
  const doneTodos = todos.filter((t) => t.done).length;
  statDone.textContent = doneTodos;

  // Total menit fokus
  const minutes = Math.floor(totalFocusSeconds / 60);
  statFocus.textContent = minutes + "m";
}

// =============================================
//  showToast —  Notif di bawah layar
// =============================================
const toastEl = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  // Toast timeout setelah 2.5 detik
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2500);
}
