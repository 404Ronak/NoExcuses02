/* ============================================================
   NO EXCUSES — CORE LOGIC ENGINE
   ============================================================ */

/* ------------------ CUSTOM CURSOR ------------------ */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});

/* ------------------ REVEAL ON SCROLL ------------------ */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ------------------ MODAL ------------------ */
const modal = document.getElementById("modal");

function openModal() {
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

/* ------------------ USER DATA ------------------ */
function startJourney() {
  const name = document.getElementById("user-name").value;
  const goal = document.getElementById("user-goal").value;

  if (!name || !goal) {
    showNotification("ENTER DATA", "You can't build without clarity.");
    return;
  }

  localStorage.setItem("userName", name);
  localStorage.setItem("userGoal", goal);
  localStorage.setItem("startDate", new Date());

  closeModal();

  showNotification("LOCKED IN", `${name}, no excuses now.`);
}

/* ------------------ NOTIFICATION ------------------ */
const notif = document.getElementById("notif");
const notifText = document.getElementById("notif-text");

function showNotification(title, text) {
  notif.querySelector(".notif-title").innerText = title;
  notifText.innerText = text;

  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}

/* ------------------ TASK SYSTEM ------------------ */
function toggleTask(el) {
  const done = el.getAttribute("data-done") === "true";

  if (done) {
    el.setAttribute("data-done", "false");
    el.classList.remove("done");
  } else {
    el.setAttribute("data-done", "true");
    el.classList.add("done");
  }

  updateProgress();
}

/* ------------------ TIMER ------------------ */
let time = 1500; // 25 min
let running = false;
let interval;
let session = 1;

const display = document.getElementById("timer-display");
const sessionLabel = document.getElementById("timer-session");
const startBtn = document.getElementById("btn-start");
const pomoDots = document.getElementById("pomo-dots");

for (let i = 0; i < 8; i++) {
  const dot = document.createElement("div");
  dot.classList.add("pomo-dot");
  pomoDots.appendChild(dot);
}

function updateDisplay() {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  display.innerText =
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function toggleTimer() {
  running = !running;

  if (running) {
    startBtn.innerText = "PAUSE";
    display.classList.add("running");

    interval = setInterval(() => {
      time--;

      if (time <= 0) {
        clearInterval(interval);
        completeSession();
      }

      updateDisplay();
    }, 1000);

  } else {
    startBtn.innerText = "START";
    display.classList.remove("running");
    clearInterval(interval);
  }
}

function resetTimer() {
  clearInterval(interval);
  time = 1500;
  running = false;
  startBtn.innerText = "START";
  display.classList.remove("running");
  updateDisplay();
}

function completeSession() {
  showNotification("SESSION COMPLETE", "You did what others didn’t.");

  const dots = document.querySelectorAll(".pomo-dot");
  if (dots[session - 1]) {
    dots[session - 1].classList.add("done");
  }

  session++;
  time = 1500;
  updateDisplay();
  updateProgress();
}

/* ------------------ PROGRESS SYSTEM ------------------ */
function updateProgress() {
  const tasks = document.querySelectorAll("#task-list li");
  const done = document.querySelectorAll("#task-list li.done").length;

  const pct = Math.floor((done / tasks.length) * 100);

  document.getElementById("focus-pct").innerText = pct + "%";
  document.getElementById("focus-bar").style.width = pct + "%";
}

/* ------------------ TIME PSYCHOLOGY ------------------ */
function updateTimeStats() {
  const now = new Date();

  // Days left in year
  const end = new Date(now.getFullYear(), 11, 31);
  const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  document.getElementById("days-counter").innerHTML = daysLeft + "<span>d</span>";

  // Year %
  const start = new Date(now.getFullYear(), 0, 1);
  const pct = Math.floor(((now - start) / (end - start)) * 100);
  document.getElementById("year-pct").innerText = pct;

  // Fake "wasted hours today"
  const hours = Math.floor(Math.random() * 8);
  document.getElementById("wasted-hours").innerText = hours;

  // Year wasted
  const wastedYear = Math.floor(pct * 24 * 3);
  document.getElementById("wasted-year").innerText = wastedYear;
}

updateTimeStats();

/* ------------------ QUOTE TICKER ------------------ */
const quotes = [
  "NO ONE IS COMING TO SAVE YOU",
  "DISCIPLINE CREATES FREEDOM",
  "YOU WASTE TIME OR YOU BUILD",
  "PAIN OF REGRET > PAIN OF WORK",
  "EVERY DAY COUNTS"
];

const ticker = document.getElementById("ticker-track");

quotes.forEach(q => {
  const el = document.createElement("div");
  el.className = "ticker-item";
  el.innerHTML = `${q} <span class="ticker-sep">•</span>`;
  ticker.appendChild(el);
});

/* ------------------ LOOP PSYCHOLOGY ------------------ */
setInterval(() => {
  showNotification("REMINDER", "Still scrolling or still building?");
}, 45000);
