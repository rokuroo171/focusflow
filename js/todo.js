// --- Logic To-Do List ---

// -- State --
let todos         = JSON.parse(localStorage.getItem("ff_todos") || "[]");
let currentFilter = "all";

// -- Ambil elemen dari HTML --
const todoInput  = document.getElementById("todo-input");
const btnAdd     = document.getElementById("btn-add");
const todoList   = document.getElementById("todo-list");
const todoCount  = document.getElementById("todo-count");
const btnClear   = document.getElementById("btn-clear");

// -- Simpan todos ke localStorage --
function saveTodos() {
  localStorage.setItem("ff_todos", JSON.stringify(todos));
}

// -- Tambah todo baru --
function addTodo() {
  const text = todoInput.value.trim();

  // jgn tambah kalau input kosong
  if (!text) return;

  const newTodo = {
    id:   Date.now(),   // pakai timestamp sbg ID unik
    text: text,
    done: false,
  };

  todos.unshift(newTodo); // tambah ke paling atas
  todoInput.value = "";

  saveTodos();
  renderTodos();
  updateStats();
  showToast("📝 Tugas ditambahkan!");
}

// -- Check / uncheck todo --
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.done = !todo.done;
  saveTodos();
  renderTodos();
  updateStats();

  if (todo.done) {
    showToast("✅ Bagus! Tugas selesai.");
  }
}

// -- Hapus satu todo --
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
  updateStats();
}

// -- Hapus semua todo yang udah --
function clearDoneTodos() {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  renderTodos();
  updateStats();
  showToast("🗑 Tugas selesai dihapus.");
}

// -- Ganti filter (all / active / done) --
function setFilter(filter) {
  currentFilter = filter;

  // Tandai tombol filter yang aktif
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  renderTodos();
}

// -- Render ulang seluruh daftar todo --
function renderTodos() {
  // Filter sesuai pilihan
  const filtered = todos.filter((t) => {
    if (currentFilter === "all")    return true;
    if (currentFilter === "done")   return t.done;
    if (currentFilter === "active") return !t.done;
  });

  // Kosongkan list dulu
  todoList.innerHTML = "";

  // Menampilkan pesan kalau tdk ada item
  if (filtered.length === 0) {
    todoList.innerHTML = `
      <li style="text-align:center; color:var(--muted); font-size:0.85rem; padding:20px 0;">
        ${currentFilter === "done" ? "Belum ada tugas selesai 😅" : "Tidak ada tugas 🎉"}
      </li>`;
    updateCount();
    return;
  }

  // Buat elemen <li> untuk tiap todo
  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.done) li.classList.add("done");

    li.innerHTML = `
      <div class="todo-check" data-id="${todo.id}">
        ${todo.done ? "✓" : ""}
      </div>
      <span class="todo-text">${escapeHTML(todo.text)}</span>
      <button class="todo-del" data-id="${todo.id}">✕</button>
    `;

    todoList.appendChild(li);
  });

  // Pasang event di tiap checkbox dan tombol hapus
  document.querySelectorAll(".todo-check").forEach((el) => {
    el.addEventListener("click", () => toggleTodo(Number(el.dataset.id)));
  });

  document.querySelectorAll(".todo-del").forEach((el) => {
    el.addEventListener("click", () => deleteTodo(Number(el.dataset.id)));
  });

  updateCount();
}

// -- Update teks "X tugas tersisa" --
function updateCount() {
  const activeCount = todos.filter((t) => !t.done).length;
  todoCount.textContent = `${activeCount} tugas tersisa`;
}

// -- Escape chr HTML --
function escapeHTML(str) {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;");
}

// =============================================
//  Event Listeners
// =============================================

// Tombol "+"
btnAdd.addEventListener("click", addTodo);

// Enter di input jg tambah todo
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// Tombol hapus yg sudah
btnClear.addEventListener("click", clearDoneTodos);

// Tombol filter
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// -- Render pertama kali --
renderTodos();
