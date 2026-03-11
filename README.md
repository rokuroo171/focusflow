[🇮🇩 Bahasa Indonesia](README.id.md) | 🇬🇧 English

# 🍅 FocusFlow — Pomodoro + To-Do App

A simple productivity app built with pure **HTML, CSS, and JavaScript** — no frameworks.

---

## Features

- **Pomodoro Timer** — 25 min focus, 5 min short break, 15 min long break
- **Session Tracker** — 4 dots representing one full pomodoro round
- **To-Do List** — add, check, and delete tasks; auto-saved to localStorage
- **Task Filter** — view all / active / completed tasks
- **Stats Bar** — pomodoro count, completed tasks, total focus minutes
- **Toast Notification** — small notification on every action

---

## File Structure

```
focusflow/
├── index.html        # Page structure
├── css/
│   └── style.css     # All styling
└── js/
    ├── stats.js      # Global variables & toast function (loaded first)
    ├── pomodoro.js   # Timer logic
    └── todo.js       # To-do list logic
```

> **JS load order matters!**
> `stats.js` must be loaded first as it contains variables used by other files.

---

## Getting Started

```bash
git clone https://github.com/rokuroo171/focusflow.git
```

Open `index.html` directly in a browser — no server needed.

Or visit the live version: [my-focusflow.vercel.app](https://my-focusflow.vercel.app)

---

## Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Page structure |
| CSS3 | Styling & layout (Grid, Flexbox, CSS Variables) |
| JavaScript (ES6) | App logic |
| localStorage | Persisting todo data |

---

## Concepts Practiced

- `setInterval` & `clearInterval` for the timer
- Array methods: `.find()`, `.filter()`, `.forEach()`
- `localStorage` for data persistence
- DOM manipulation: `createElement`, `innerHTML`, `classList`
- Event listeners: `click`, `keydown`

---

## Preview

![FocusFlow Preview](preview.png)

---

Made with ☕ as a learning project.
