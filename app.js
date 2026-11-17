const STORAGE_KEY = "prumo_app_state_v3";

const DEFAULT_EXAMPLE_STATE = {
  isExample: true,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  settings: {
    name: "",
    waterGoal: 2500,
    kcalGoal: 2000,
    theme: "dark"
  },
  water: 0,
  focusSessions: 0,
  quickNotes: "",
  sleep: { bed: "", wake: "", mood: null },
  blocks: [
    { id: "b1", start: "06:30", end: "07:15", title: "Exercício e alongamento", category: "Saúde", done: false },
    { id: "b2", start: "07:15", end: "08:00", title: "Higiene e arrumar a casa", category: "Casa", done: false },
    { id: "b3", start: "08:00", end: "12:00", title: "Aulas ou trabalho", category: "Estudo e trabalho", done: false },
    { id: "b4", start: "13:30", end: "15:30", title: "Estudo focado", category: "Estudo e trabalho", done: false },
    { id: "b5", start: "15:30", end: "16:00", title: "Pausa e caminhada", category: "Saúde", done: false },
    { id: "b6", start: "18:00", end: "19:00", title: "Tarefas da casa", category: "Casa", done: false },
    { id: "b7", start: "20:00", end: "21:30", title: "Lazer livre", category: "Lazer", done: false },
    { id: "b8", start: "22:30", end: "23:00", title: "Preparar para dormir", category: "Descanso", done: false }
  ],
  meals: [
    { id: "m1", time: "07:30", name: "Pão integral, ovo mexido e fruta", type: "Café da manhã", kcal: 380, protein: 22, carbs: 42, fat: 13, done: false, recipeId: "rec-1" },
    { id: "m2", time: "12:15", name: "Arroz, feijão, frango grelhado e salada", type: "Almoço", kcal: 650, protein: 48, carbs: 68, fat: 16, done: false, recipeId: "rec-2" },
    { id: "m3", time: "16:00", name: "Iogurte natural com frutas e aveia", type: "Lanche da tarde", kcal: 210, protein: 11, carbs: 28, fat: 6, done: false, recipeId: "rec-3" },
    { id: "m4", time: "19:30", name: "Sopa de legumes com omelete leve", type: "Jantar", kcal: 450, protein: 28, carbs: 36, fat: 19, done: false, recipeId: "rec-4" }
  ],
  customRecipes: [],
  shopping: [
    { id: "s1", name: "Ovos", done: false },
    { id: "s2", name: "Frutas da semana", done: false },
    { id: "s3", name: "Iogurte natural", done: false },
    { id: "s4", name: "Peito de frango", done: false }
  ],
  habits: [
    { id: "h1", name: "Ler 20 minutos", days: [false, false, false, false, false, false, false] },
    { id: "h2", name: "Alongar 5 minutos", days: [false, false, false, false, false, false, false] },
    { id: "h3", name: "Revisar o dia", days: [false, false, false, false, false, false, false] }
  ],
  tasks: [
    { id: "t1", title: "Pagar conta de internet", priority: "Alta", due: "18 de nov", done: false },
    { id: "t2", title: "Separar roupas da semana", priority: "Média", due: "", done: false }
  ],
  history: [45, 62, 70, 55, 80, 72, 0]
};

let state = loadState();
let selectedDayIndex = 0;
let taskFilter = "pendentes";
let guideCategory = "todos";
let recipeTagFilter = "todos";
let timerInterval = null;
let timerSeconds = 25 * 60;
let timerTotalSeconds = 25 * 60;
let timerRunning = false;
let deferredInstallPrompt = null;

// Guided Exercise Player state
let activeGuide = null;
let guideStepIndex = 0;
let guideStepRemaining = 0;
let guidePlayerInterval = null;

function getAllRecipes() {
  return [...DEFAULT_RECIPES_DB, ...(state.customRecipes || [])];
}

function playGentleChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...JSON.parse(JSON.stringify(DEFAULT_EXAMPLE_STATE)), ...parsed };
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_EXAMPLE_STATE));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
  updateStreak();
  applyTheme(state.settings.theme);
  setupNavigation();
  setupDateHeader();
  setupEventListeners();
  registerServiceWorker();
  renderAll();
});

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate !== today) {
    state.streak = (state.streak || 1) + 1;
    state.lastActiveDate = today;
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btn = document.getElementById("installBtn");
    if (btn) btn.style.display = "inline-flex";
  });
}

function setupDateHeader() {
  const now = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const dateStr = now.toLocaleDateString("pt-BR", options);
  const formatted = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  document.getElementById("pageSubtitle").textContent = formatted;
  document.getElementById("agendaDayTitle").textContent = formatted;
  document.getElementById("mealsDayTitle").textContent = `Refeições de ${formatted}`;

  const hour = now.getHours();
  let greeting = "BOM DIA";
  if (hour >= 12 && hour < 18) greeting = "BOA TARDE";
  else if (hour >= 18) greeting = "BOA NOITE";
  if (state.settings.name) greeting += `, ${state.settings.name.toUpperCase()}`;
  document.getElementById("greetingLabel").textContent = greeting;
}

function setupNavigation() {
  const titles = {
    hoje: "Hoje",
    agenda: "Agenda",
    refeicoes: "Refeições",
    guias: "Guias & Treino",
    habitos: "Hábitos",
    tarefas: "Tarefas",
    semana: "Semana",
    ajustes: "Ajustes"
  };

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      switchView(view);
      document.getElementById("pageTitle").textContent = titles[view] || "Prumo";
    });
  });
}

function switchView(viewName) {
  document.querySelectorAll(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.view === viewName));
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${viewName}`));
}

function setupEventListeners() {
  document.getElementById("keepExampleBtn").addEventListener("click", () => {
    state.isExample = false;
    saveState();
  });

  document.getElementById("startZeroBtn").addEventListener("click", () => {
    state.isExample = false;
    state.blocks = [];
    state.meals = [];
    state.habits = [];
    state.tasks = [];
    state.shopping = [];
    state.water = 0;
    saveState();
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
    applyTheme(state.settings.theme);
    saveState();
  });

  document.getElementById("installBtn").addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      document.getElementById("installBtn").style.display = "none";
    }
  });

  document.getElementById("timerStartBtn").addEventListener("click", toggleTimer);
  document.getElementById("timerResetBtn").addEventListener("click", () => setTimer(Math.round(timerTotalSeconds / 60)));

  document.getElementById("sleepTime").addEventListener("change", (e) => {
    state.sleep.bed = e.target.value;
    saveState();
  });
  document.getElementById("wakeTime").addEventListener("change", (e) => {
    state.sleep.wake = e.target.value;
    saveState();
  });

  document.getElementById("quickNotesArea").addEventListener("input", (e) => {
    state.quickNotes = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });

  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.sleep.mood = Number(btn.dataset.mood);
      saveState();
    });
  });

  document.getElementById("inlineRecipeSearch").addEventListener("input", renderRecipesCatalog);
  document.getElementById("recipeCategoryFilter").addEventListener("change", renderRecipesCatalog);
  document.querySelectorAll("#recipeTagPills .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#recipeTagPills .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      recipeTagFilter = btn.dataset.tag;
      renderRecipesCatalog();
    });
  });

  document.querySelectorAll("#guideCategoryPills .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#guideCategoryPills .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      guideCategory = btn.dataset.cat;
      renderGuides();
    });
  });

  document.querySelectorAll("#taskFilterPills .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#taskFilterPills .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      taskFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  document.getElementById("waterReminderBtn").addEventListener("click", () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("Prumo — Hora de beber água 💧", {
            body: "Mantenha sua meta de hidratação em dia!"
          });
        } else {
          alert("Ative as notificações do navegador para receber lembretes de água.");
        }
      });
    }
  });
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  const select = document.getElementById("themeSelect");
  if (select) select.value = theme;
}

function renderAll() {
  document.getElementById("exampleBanner").style.display = state.isExample ? "flex" : "none";
  document.getElementById("streakBadge").textContent = `🔥 ${state.streak || 1} ${state.streak === 1 ? "dia" : "dias"}`;
  document.getElementById("quickNotesArea").value = state.quickNotes || "";
  renderHeroStatus();
  renderWater();
  renderSleep();
  renderTodayHabits();
  renderTodayMeals();
  renderTodayTasks();
  renderWeekStrips();
  renderAgenda();
  renderMealsView();
  renderRecipesCatalog();
  renderGuides();
  renderHabitsMatrix();
  renderTasks();
  renderWeeklyStats();
  renderSettingsFields();
}

function renderHeroStatus() {
  const blocksDone = state.blocks.filter((b) => b.done).length;
  const blocksTotal = state.blocks.length;
  const mealsDone = state.meals.filter((m) => m.done).length;
  const mealsTotal = state.meals.length;
  const habitsDone = state.habits.filter((h) => h.days[selectedDayIndex]).length;
  const habitsTotal = state.habits.length;
  const waterPct = Math.min(100, Math.round((state.water / state.settings.waterGoal) * 100));
  const doneKcal = state.meals.filter((m) => m.done).reduce((acc, m) => acc + Number(m.kcal || 0), 0);

  const totalItems = blocksTotal + mealsTotal + habitsTotal + 1;
  const completedScore = blocksDone + mealsDone + habitsDone + waterPct / 100;
  const overallPct = totalItems > 0 ? Math.round((completedScore / totalItems) * 100) : 0;

  document.getElementById("dailyPercent").textContent = `${overallPct}%`;
  const offset = 251.2 - (251.2 * overallPct) / 100;
  document.getElementById("dailyRing").style.strokeDashoffset = offset;

  document.getElementById("pillBlocos").textContent = `Blocos ${blocksDone}/${blocksTotal}`;
  document.getElementById("pillRefeicoes").textContent = `Refeições ${mealsDone}/${mealsTotal}`;
  document.getElementById("pillHabitos").textContent = `Hábitos ${habitsDone}/${habitsTotal}`;
  document.getElementById("pillAgua").textContent = `Água ${waterPct}%`;
  document.getElementById("pillKcal").textContent = `${doneKcal} / ${state.settings.kcalGoal || 2000} kcal`;

  const nextBlock = state.blocks.find((b) => !b.done) || state.blocks[0];
  if (nextBlock) {
    document.getElementById("currentBlockTitle").textContent = `Foco atual: ${nextBlock.title}`;
    document.getElementById("currentBlockSub").textContent = `${nextBlock.start} às ${nextBlock.end} • Categoria: ${nextBlock.category}`;
  } else {
    document.getElementById("currentBlockTitle").textContent = "Nenhum bloco agendado";
    document.getElementById("currentBlockSub").textContent = "Adicione horários na aba Agenda para organizar seu dia.";
  }

  state.history[6] = overallPct;
}

// Water
function addWater(amount) {
  state.water = Math.max(0, state.water + amount);
  if (amount > 0 && state.water >= state.settings.waterGoal) playGentleChime();
  saveState();
}

function renderWater() {
  document.getElementById("waterCurrent").textContent = state.water;
  document.getElementById("waterGoalDisplay").textContent = state.settings.waterGoal;
  const pct = Math.min(100, (state.water / state.settings.waterGoal) * 100);
  document.getElementById("waterBar").style.width = `${pct}%`;
}

// Timer
function setTimer(mins) {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTotalSeconds = mins * 60;
  timerSeconds = timerTotalSeconds;
  document.getElementById("timerStartBtn").textContent = "▶ Iniciar";
  updateTimerUI();
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timerStartBtn").textContent = "▶ Retomar";
  } else {
    timerRunning = true;
    document.getElementById("timerStartBtn").textContent = "⏸ Pausar";
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerUI();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        state.focusSessions++;
        document.getElementById("timerStartBtn").textContent = "▶ Iniciar";
        playGentleChime();
        alert("Sessão concluída! Excelente trabalho.");
        saveState();
      }
    }, 1000);
  }
}

function updateTimerUI() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const s = String(timerSeconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${m}:${s}`;
  const pct = timerTotalSeconds > 0 ? (timerSeconds / timerTotalSeconds) * 100 : 100;
  document.getElementById("timerBar").style.width = `${pct}%`;
  document.getElementById("focusSessionsCount").textContent = `${state.focusSessions} sessões hoje`;
}

// Sleep & Mood
function renderSleep() {
  document.getElementById("sleepTime").value = state.sleep.bed || "";
  document.getElementById("wakeTime").value = state.sleep.wake || "";
  if (state.sleep.bed && state.sleep.wake) {
    const [bh, bm] = state.sleep.bed.split(":").map(Number);
    const [wh, wm] = state.sleep.wake.split(":").map(Number);
    let diff = wh * 60 + wm - (bh * 60 + bm);
    if (diff < 0) diff += 24 * 60;
    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;
    document.getElementById("sleepSummary").textContent = `Total dormido: ${hrs}h ${mins}min`;
  }
  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.classList.toggle("selected", Number(btn.dataset.mood) === state.sleep.mood);
  });
}

// Habits
function renderTodayHabits() {
  const container = document.getElementById("todayHabitsList");
  container.innerHTML = state.habits
    .map(
      (h) => `
    <button class="habit-chip ${h.days[selectedDayIndex] ? "done" : ""}" onclick="toggleHabitDay('${h.id}', ${selectedDayIndex})">
      ${h.days[selectedDayIndex] ? "✓ " : ""}${h.name}
    </button>
  `
    )
    .join("");
}

function toggleHabitDay(id, dayIdx) {
  const habit = state.habits.find((h) => h.id === id);
  if (habit) {
    habit.days[dayIdx] = !habit.days[dayIdx];
    saveState();
  }
}

function renderHabitsMatrix() {
  const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];
  const container = document.getElementById("habitsMatrix");
  if (!state.habits.length) {
    container.innerHTML = `<p class="muted small">Nenhum hábito cadastrado ainda.</p>`;
    return;
  }
  container.innerHTML = state.habits
    .map((h) => {
      const count = h.days.filter(Boolean).length;
      const pct = Math.round((count / 7) * 100);
      return `
      <div class="check-item">
        <div>
          <div class="item-title">${h.name}</div>
          <div class="item-meta">${pct}% na semana (${count}/7 dias)</div>
        </div>
        <div class="btn-row">
          ${days
            .map(
              (d, idx) => `
            <button class="btn-outline-sm ${h.days[idx] ? "btn-primary" : ""}" onclick="toggleHabitDay('${h.id}', ${idx})">${d}</button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    })
    .join("");
}

// Meals & Recipe Search
function renderTodayMeals() {
  const container = document.getElementById("todayMealsList");
  const totalKcal = state.meals.reduce((acc, m) => acc + Number(m.kcal || 0), 0);
  const doneKcal = state.meals.filter((m) => m.done).reduce((acc, m) => acc + Number(m.kcal || 0), 0);
  document.getElementById("todayKcalSummary").textContent = `${doneKcal} / ${totalKcal} kcal`;

  container.innerHTML = state.meals
    .map(
      (m) => `
    <div class="check-item">
      <div class="check-left">
        <div class="checkbox-box ${m.done ? "checked" : ""}" onclick="toggleMeal('${m.id}')">${m.done ? "✓" : ""}</div>
        <div>
          <div class="item-title ${m.done ? "done" : ""}">${m.name}</div>
          <div class="item-meta">${m.type} • ${m.time} • ${m.kcal} kcal</div>
        </div>
      </div>
      ${m.recipeId ? `<button class="btn-ghost-sm" onclick="openRecipeDetail('${m.recipeId}')">Como fazer</button>` : ""}
    </div>
  `
    )
    .join("");
}

function toggleMeal(id) {
  const meal = state.meals.find((m) => m.id === id);
  if (meal) {
    meal.done = !meal.done;
    saveState();
  }
}

function renderMealsView() {
  const totalKcal = state.meals.reduce((acc, m) => acc + Number(m.kcal || 0), 0);
  const doneKcal = state.meals.filter((m) => m.done).reduce((acc, m) => acc + Number(m.kcal || 0), 0);
  const pct = totalKcal > 0 ? Math.min(100, Math.round((doneKcal / totalKcal) * 100)) : 0;

  document.getElementById("mealsKcalProgressText").textContent = `${doneKcal} de ${totalKcal} kcal planejadas já consumidas (Meta: ${state.settings.kcalGoal || 2000} kcal)`;
  document.getElementById("mealsKcalBar").style.width = `${pct}%`;

  const totalProt = state.meals.reduce((acc, m) => acc + Number(m.protein || 0), 0);
  const totalCarb = state.meals.reduce((acc, m) => acc + Number(m.carbs || 0), 0);
  const totalFat = state.meals.reduce((acc, m) => acc + Number(m.fat || 0), 0);

  document.getElementById("macrosSummaryBar").innerHTML = `
    <div class="macro-pill-box"><span class="muted">Proteínas</span><strong>${totalProt}g</strong></div>
    <div class="macro-pill-box"><span class="muted">Carboidratos</span><strong>${totalCarb}g</strong></div>
    <div class="macro-pill-box"><span class="muted">Gorduras</span><strong>${totalFat}g</strong></div>
  `;

  const planList = document.getElementById("mealsPlanList");
  planList.innerHTML = state.meals
    .map(
      (m) => `
    <div class="check-item">
      <div class="check-left">
        <div class="checkbox-box ${m.done ? "checked" : ""}" onclick="toggleMeal('${m.id}')">${m.done ? "✓" : ""}</div>
        <div>
          <div class="item-title ${m.done ? "done" : ""}">${m.name}</div>
          <div class="item-meta">${m.time} • ${m.type} • <strong>${m.kcal} kcal</strong> (${m.protein || 0}g P / ${m.carbs || 0}g C / ${m.fat || 0}g G)</div>
        </div>
      </div>
      <div class="btn-row">
        ${m.recipeId ? `<button class="btn-outline-sm" onclick="openRecipeDetail('${m.recipeId}')">📖 Preparo</button>` : ""}
        <button class="btn-ghost-sm" onclick="deleteMeal('${m.id}')">🗑</button>
      </div>
    </div>
  `
    )
    .join("");

  const shopList = document.getElementById("shoppingList");
  shopList.innerHTML = state.shopping
    .map(
      (s) => `
    <div class="check-item">
      <div class="check-left">
        <div class="checkbox-box ${s.done ? "checked" : ""}" onclick="toggleShopping('${s.id}')">${s.done ? "✓" : ""}</div>
        <span class="item-title ${s.done ? "done" : ""}">${s.name}</span>
      </div>
      <button class="btn-ghost-sm" onclick="deleteShopping('${s.id}')">🗑</button>
    </div>
  `
    )
    .join("");
}

function renderRecipesCatalog() {
  const query = (document.getElementById("inlineRecipeSearch").value || "").toLowerCase().trim();
  const cat = document.getElementById("recipeCategoryFilter").value;
  const container = document.getElementById("inlineRecipeResults");
  const all = getAllRecipes();

  const filtered = all.filter((r) => {
    const matchesCat = cat === "todos" || r.category === cat;
    const matchesTag = recipeTagFilter === "todos" || (r.tags && r.tags.includes(recipeTagFilter));
    const matchesText =
      !query ||
      r.name.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      (r.tags && r.tags.some((t) => t.toLowerCase().includes(query))) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query));
    return matchesCat && matchesTag && matchesText;
  });

  const badge = document.getElementById("recipeCountBadge");
  if (badge) badge.textContent = `${filtered.length} de ${all.length} pratos`;

  if (!filtered.length) {
    container.innerHTML = `<p class="muted small">Nenhuma receita encontrada com os filtros selecionados.</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (r) => `
    <div class="recipe-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="muted small">${r.category} • ⏱ ${r.prepTime || "15 min"}</span>
          <span class="kcal-badge">${r.kcal} kcal</span>
        </div>
        <h4 style="font-size:0.95rem; margin-bottom:6px;">${r.name}</h4>
        <p class="muted small">${r.description}</p>
        ${r.tags ? `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">${r.tags.map((t) => `<span class="stat-pill" style="font-size:0.68rem; padding:2px 7px;">${t}</span>`).join("")}</div>` : ""}
      </div>
      <div>
        <div class="muted small" style="margin-bottom:8px;">Prot: ${r.protein}g | Carb: ${r.carbs}g | Gord: ${r.fat}g</div>
        <div class="btn-row">
          <button class="btn-outline-sm" onclick="openRecipeDetail('${r.id}')">Descrição e como fazer</button>
          <button class="btn-primary" style="padding:4px 10px; font-size:0.78rem;" onclick="addRecipeToToday('${r.id}')">+ Plano</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function suggestRandomMenu() {
  if (!confirm("Deseja substituir o plano alimentar de hoje por uma combinação variada (Café, Almoço, Lanche e Jantar)?")) return;
  const pick = (cat) => {
    const list = getAllRecipes().filter((r) => r.category === cat);
    return list[Math.floor(Math.random() * list.length)];
  };
  const cafe = pick("Café da manhã");
  const almoco = pick("Almoço");
  const lanche = pick("Lanche");
  const jantar = pick("Jantar");
  const chosen = [
    { item: cafe, time: "07:30" },
    { item: almoco, time: "12:15" },
    { item: lanche, time: "16:00" },
    { item: jantar, time: "19:30" }
  ].filter((x) => x.item);

  state.meals = chosen.map((c, idx) => ({
    id: "m" + Date.now() + idx,
    time: c.time,
    name: c.item.name,
    type: c.item.category,
    kcal: c.item.kcal,
    protein: c.item.protein,
    carbs: c.item.carbs,
    fat: c.item.fat,
    done: false,
    recipeId: c.item.id
  }));
  saveState();
}

function openRecipeDetail(recipeId) {
  const r = getAllRecipes().find((item) => item.id === recipeId);
  if (!r) return;
  document.getElementById("modalRecipeTitle").textContent = r.name;
  document.getElementById("modalRecipeBody").innerHTML = `
    <div class="pill-stats" style="margin-top:0; margin-bottom:12px;">
      <span class="kcal-badge">${r.kcal} kcal</span>
      <span class="stat-pill">Proteína: ${r.protein}g</span>
      <span class="stat-pill">Carboidratos: ${r.carbs}g</span>
      <span class="stat-pill">Gorduras: ${r.fat}g</span>
    </div>
    <p class="muted" style="font-size:0.9rem; margin-bottom:6px;">${r.description}</p><p class="muted small" style="margin-bottom:14px;">📚 <em>Referência nutricional: ${r.source || "Tabela TACO / TBCA"}</em></p>
    <h4>Ingredientes</h4>
    <ul class="step-list">
      ${r.ingredients.map((i) => `<li>${i}</li>`).join("")}
    </ul>
    <h4 class="mt-2">Modo de Preparo (Como fazer)</h4>
    <ol class="step-list">
      ${r.steps.map((s) => `<li>${s}</li>`).join("")}
    </ol>
  `;
  document.getElementById("addRecipeToDayBtn").onclick = () => {
    addRecipeToToday(r.id);
    closeModal("recipeDetailModal");
  };
  document.getElementById("sendIngredientsToShopBtn").onclick = () => {
    r.ingredients.forEach((ing) => {
      state.shopping.push({ id: "s" + Date.now() + Math.random(), name: ing, done: false });
    });
    saveState();
    alert(`${r.ingredients.length} ingredientes enviados para sua Lista de Compras!`);
  };
  document.getElementById("recipeDetailModal").classList.add("open");
}

function openNewRecipeCatalogModal() {
  document.getElementById("newRecipeCatalogModal").classList.add("open");
}

function saveCustomRecipeToCatalog() {
  const name = document.getElementById("newRecName").value.trim();
  if (!name) return;
  const ingredients = document.getElementById("newRecIng").value.split("\n").map((s) => s.trim()).filter(Boolean);
  const steps = document.getElementById("newRecSteps").value.split("\n").map((s) => s.trim()).filter(Boolean);

  state.customRecipes = state.customRecipes || [];
  state.customRecipes.push({
    id: "custom-" + Date.now(),
    name,
    category: document.getElementById("newRecCat").value,
    kcal: Number(document.getElementById("newRecKcal").value) || 300,
    protein: parseInt(document.getElementById("newRecProt").value) || 15,
    carbs: parseInt(document.getElementById("newRecCarb").value) || 30,
    fat: parseInt(document.getElementById("newRecFat").value) || 10,
    prepTime: "15 min",
    description: document.getElementById("newRecDesc").value.trim() || "Receita personalizada cadastrada por você.",
    ingredients: ingredients.length ? ingredients : ["Ingredientes a gosto"],
    steps: steps.length ? steps : ["Preparar conforme preferência."]
  });

  document.getElementById("newRecName").value = "";
  closeModal("newRecipeCatalogModal");
  saveState();
}

function addRecipeToToday(recipeId) {
  const r = getAllRecipes().find((item) => item.id === recipeId);
  if (!r) return;
  state.meals.push({
    id: "m" + Date.now(),
    time: "12:00",
    name: r.name,
    type: r.category,
    kcal: r.kcal,
    protein: r.protein,
    carbs: r.carbs,
    fat: r.fat,
    done: false,
    recipeId: r.id
  });
  saveState();
  alert(`"${r.name}" (${r.kcal} kcal) adicionado às refeições de hoje!`);
}

// Guides & Interactive Step-by-Step Guided Player
function renderGuides() {
  const grid = document.getElementById("guidesGrid");
  const filtered = GUIDES_DB.filter((g) => guideCategory === "todos" || g.category === guideCategory);

  grid.innerHTML = filtered
    .map(
      (g) => `
    <div class="guide-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="kcal-badge">${g.category}</span>
          <span class="muted small">⏱ ${g.durationLabel} (${g.guidedSteps.length} etapas)</span>
        </div>
        <h3 style="margin-bottom:6px;">${g.title}</h3>
        <p class="guide-steps-preview">${g.summary}</p>
        <p class="muted small mt-2"><strong>Foco:</strong> ${g.target}</p>
      </div>
      <div class="btn-row">
        <button class="btn-primary" onclick="openGuideDetail('${g.id}', true)">▶ Iniciar Sessão Guiada</button>
        <button class="btn-outline" onclick="openGuideDetail('${g.id}', false)">Ver instruções</button>
      </div>
    </div>
  `
    )
    .join("");
}

function openGuideDetail(guideId, autoStart = false) {
  const g = GUIDES_DB.find((item) => item.id === guideId);
  if (!g) return;
  activeGuide = g;
  guideStepIndex = 0;
  guideStepRemaining = g.guidedSteps[0].seconds;
  clearInterval(guidePlayerInterval);

  document.getElementById("modalGuideTitle").textContent = g.title;
  renderGuideModalContent(autoStart);
  document.getElementById("guideDetailModal").classList.add("open");

  if (autoStart) startGuidedSequence();
}

function renderGuideModalContent(isRunning = false) {
  if (!activeGuide) return;
  const currentStep = activeGuide.guidedSteps[guideStepIndex];

  document.getElementById("modalGuideBody").innerHTML = `
    <div class="guided-player-box">
      <span class="kcal-badge">Etapa ${guideStepIndex + 1} de ${activeGuide.guidedSteps.length}</span>
      <h4 style="margin:8px 0 4px; font-size:1.05rem;">${currentStep.title}</h4>
      <div class="timer-display" id="guidedStepTimer" style="font-size:2rem; margin:6px 0;">${guideStepRemaining}s</div>
      <p class="muted small" style="margin-bottom:12px;">${currentStep.desc}</p>
      <div class="btn-row" style="justify-content:center;">
        <button class="btn-outline-sm" onclick="prevGuideStep()">⏮ Anterior</button>
        <button class="btn-primary" onclick="startGuidedSequence()">${isRunning ? "⏳ Em andamento..." : "▶ Iniciar Etapa"}</button>
        <button class="btn-outline-sm" onclick="nextGuideStep()">Próxima ⏭</button>
      </div>
    </div>
    <h4>Todas as Etapas do Guia</h4>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
      ${activeGuide.guidedSteps
        .map(
          (s, idx) => `
        <div class="check-item" style="display:block; border-color:${idx === guideStepIndex ? "var(--accent)" : "var(--border)"};">
          <div style="display:flex; justify-content:space-between;">
            <strong>${s.title}</strong>
            <span class="muted small">${s.seconds}s</span>
          </div>
          <p class="muted small mt-2">${s.desc}</p>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="example-banner mt-2" style="margin-bottom:0;">
      <span>💡 <strong>Dica:</strong> ${activeGuide.tips}</span>
    </div>
  `;

  document.getElementById("startGuidedPlayerBtn").onclick = startGuidedSequence;
}

function startGuidedSequence() {
  clearInterval(guidePlayerInterval);
  renderGuideModalContent(true);
  guidePlayerInterval = setInterval(() => {
    if (guideStepRemaining > 1) {
      guideStepRemaining--;
      const el = document.getElementById("guidedStepTimer");
      if (el) el.textContent = `${guideStepRemaining}s`;
    } else {
      playGentleChime();
      if (guideStepIndex < activeGuide.guidedSteps.length - 1) {
        guideStepIndex++;
        guideStepRemaining = activeGuide.guidedSteps[guideStepIndex].seconds;
        renderGuideModalContent(true);
      } else {
        clearInterval(guidePlayerInterval);
        alert("Parabéns! Você concluiu toda a sequência guiada.");
        closeModal("guideDetailModal");
      }
    }
  }, 1000);
}

function nextGuideStep() {
  if (!activeGuide) return;
  clearInterval(guidePlayerInterval);
  if (guideStepIndex < activeGuide.guidedSteps.length - 1) {
    guideStepIndex++;
    guideStepRemaining = activeGuide.guidedSteps[guideStepIndex].seconds;
    renderGuideModalContent(false);
  }
}

function prevGuideStep() {
  if (!activeGuide) return;
  clearInterval(guidePlayerInterval);
  if (guideStepIndex > 0) {
    guideStepIndex--;
    guideStepRemaining = activeGuide.guidedSteps[guideStepIndex].seconds;
    renderGuideModalContent(false);
  }
}

// Agenda
function applyRoutineTemplate() {
  if (!confirm("Deseja preencher a agenda de hoje com uma rotina equilibrada de horários?")) return;
  state.blocks = JSON.parse(JSON.stringify(DEFAULT_EXAMPLE_STATE.blocks));
  saveState();
}

function renderWeekStrips() {
  const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];
  const now = new Date();
  const html = days
    .map((d, i) => {
      const dateNum = now.getDate() + i;
      return `
      <button class="day-tab ${selectedDayIndex === i ? "active" : ""}" onclick="selectDay(${i})">
        <span style="font-size:0.7rem;">${d}</span>
        <strong>${dateNum}</strong>
      </button>
    `;
    })
    .join("");
  document.getElementById("agendaWeekStrip").innerHTML = html;
  document.getElementById("mealsWeekStrip").innerHTML = html;
}

function selectDay(idx) {
  selectedDayIndex = idx;
  saveState();
}

function renderAgenda() {
  const catColors = {
    "Saúde": "var(--cat-saude)",
    "Casa": "var(--cat-casa)",
    "Estudo e trabalho": "var(--cat-estudo)",
    "Lazer": "var(--cat-lazer)",
    "Descanso": "var(--cat-descanso)"
  };

  const sorted = [...state.blocks].sort((a, b) => a.start.localeCompare(b.start));
  const bar = document.getElementById("timelineVisualBar");
  bar.innerHTML = sorted
    .map((b) => `<div style="flex:1; background:${catColors[b.category] || "var(--accent)"};" title="${b.title}"></div>`)
    .join("");

  document.getElementById("timelineLegend").innerHTML = Object.entries(catColors)
    .map(([name, color]) => `<span><span class="cat-dot" style="background:${color}"></span>${name}</span>`)
    .join("");

  const list = document.getElementById("scheduleList");
  list.innerHTML = sorted
    .map(
      (b) => `
    <div class="check-item" style="margin-bottom:8px;">
      <div class="check-left">
        <div class="checkbox-box ${b.done ? "checked" : ""}" onclick="toggleBlock('${b.id}')">${b.done ? "✓" : ""}</div>
        <div style="min-width:52px; font-size:0.82rem;">
          <strong>${b.start}</strong><br><span class="muted">${b.end}</span>
        </div>
        <div>
          <div class="item-title ${b.done ? "done" : ""}">${b.title}</div>
          <div class="item-meta"><span class="cat-dot" style="background:${catColors[b.category] || "var(--accent)"}"></span>${b.category}</div>
        </div>
      </div>
      <button class="btn-ghost-sm" onclick="deleteBlock('${b.id}')">🗑</button>
    </div>
  `
    )
    .join("");
}

function toggleBlock(id) {
  const b = state.blocks.find((item) => item.id === id);
  if (b) {
    b.done = !b.done;
    saveState();
  }
}

function deleteBlock(id) {
  state.blocks = state.blocks.filter((b) => b.id !== id);
  saveState();
}

// Tasks
function addTask() {
  const input = document.getElementById("newTaskInput");
  const title = input.value.trim();
  if (!title) return;
  state.tasks.push({
    id: "t" + Date.now(),
    title,
    priority: document.getElementById("newTaskPriority").value,
    due: document.getElementById("newTaskDate").value,
    done: false
  });
  input.value = "";
  saveState();
}

function toggleTask(id) {
  const t = state.tasks.find((item) => item.id === id);
  if (t) {
    t.done = !t.done;
    saveState();
  }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  saveState();
}

function renderTodayTasks() {
  const pending = state.tasks.filter((t) => !t.done).slice(0, 4);
  document.getElementById("todayTasksList").innerHTML = pending.length
    ? pending
        .map(
          (t) => `
      <div class="check-item">
        <div class="check-left">
          <div class="checkbox-box" onclick="toggleTask('${t.id}')"></div>
          <span class="item-title">${t.title}</span>
        </div>
        <button class="btn-ghost-sm" onclick="deleteTask('${t.id}')">🗑</button>
      </div>
    `
        )
        .join("")
    : `<p class="muted small">Nenhuma tarefa pendente!</p>`;
}

function renderTasks() {
  const filtered = state.tasks.filter((t) => {
    if (taskFilter === "pendentes") return !t.done;
    if (taskFilter === "concluidas") return t.done;
    return true;
  });

  document.getElementById("fullTasksList").innerHTML = filtered
    .map(
      (t) => `
    <div class="check-item">
      <div class="check-left">
        <div class="checkbox-box ${t.done ? "checked" : ""}" onclick="toggleTask('${t.id}')">${t.done ? "✓" : ""}</div>
        <div>
          <div class="item-title ${t.done ? "done" : ""}">${t.title}</div>
          <div class="item-meta">Prioridade: ${t.priority} ${t.due ? "• Prazo: " + t.due : ""}</div>
        </div>
      </div>
      <button class="btn-ghost-sm" onclick="deleteTask('${t.id}')">🗑</button>
    </div>
  `
    )
    .join("");
}

// Shopping list
function addShoppingItem() {
  const input = document.getElementById("newShoppingItem");
  if (!input.value.trim()) return;
  state.shopping.push({ id: "s" + Date.now(), name: input.value.trim(), done: false });
  input.value = "";
  saveState();
}

function toggleShopping(id) {
  const s = state.shopping.find((item) => item.id === id);
  if (s) {
    s.done = !s.done;
    saveState();
  }
}

function deleteShopping(id) {
  state.shopping = state.shopping.filter((s) => s.id !== id);
  saveState();
}

function clearDoneShopping() {
  state.shopping = state.shopping.filter((s) => !s.done);
  saveState();
}

function deleteMeal(id) {
  state.meals = state.meals.filter((m) => m.id !== id);
  saveState();
}

// Weekly Stats
function renderWeeklyStats() {
  const labels = ["ter", "qua", "qui", "sex", "sáb", "dom", "hoje"];
  document.getElementById("weeklyChart").innerHTML = state.history
    .map(
      (val, i) => `
    <div class="chart-bar-col">
      <span class="small muted">${val}%</span>
      <div class="chart-bar" style="height:${Math.max(4, val)}%"></div>
      <span class="small muted">${labels[i]}</span>
    </div>
  `
    )
    .join("");

  const blocksPct = state.blocks.length ? Math.round((state.blocks.filter((b) => b.done).length / state.blocks.length) * 100) : 0;
  const habitsPct = state.habits.length ? Math.round((state.habits.filter((h) => h.days[0]).length / state.habits.length) * 100) : 0;

  document.getElementById("weeklySummaryGrid").innerHTML = `
    <div class="summary-box"><div class="big-num">${blocksPct}%</div><div class="muted small">Blocos concluídos</div></div>
    <div class="summary-box"><div class="big-num">${habitsPct}%</div><div class="muted small">Hábitos cumpridos</div></div>
    <div class="summary-box"><div class="big-num">${state.water} ml</div><div class="muted small">Água hoje</div></div>
    <div class="summary-box"><div class="big-num">${state.focusSessions}</div><div class="muted small">Sessões de foco</div></div>
  `;
}

// Modals & Creation
function openBlockModal() { document.getElementById("blockModal").classList.add("open"); }
function openMealModal() { document.getElementById("mealModal").classList.add("open"); }
function openHabitModal() { document.getElementById("habitModal").classList.add("open"); }
function closeModal(id) {
  if (id === "guideDetailModal") clearInterval(guidePlayerInterval);
  document.getElementById(id).classList.remove("open");
}

function saveNewBlock() {
  const title = document.getElementById("blockTitle").value.trim();
  if (!title) return;
  state.blocks.push({
    id: "b" + Date.now(),
    title,
    start: document.getElementById("blockStart").value,
    end: document.getElementById("blockEnd").value,
    category: document.getElementById("blockCategory").value,
    done: false
  });
  document.getElementById("blockTitle").value = "";
  closeModal("blockModal");
  saveState();
}

function saveNewMeal() {
  const name = document.getElementById("mealName").value.trim();
  if (!name) return;
  state.meals.push({
    id: "m" + Date.now(),
    name,
    time: document.getElementById("mealTime").value,
    kcal: Number(document.getElementById("mealKcal").value) || 0,
    protein: Number(document.getElementById("mealProt").value) || 0,
    carbs: Number(document.getElementById("mealCarb").value) || 0,
    fat: Number(document.getElementById("mealFat").value) || 0,
    type: document.getElementById("mealType").value,
    done: false
  });
  document.getElementById("mealName").value = "";
  closeModal("mealModal");
  saveState();
}

function saveNewHabit() {
  const name = document.getElementById("habitName").value.trim();
  if (!name) return;
  state.habits.push({
    id: "h" + Date.now(),
    name,
    days: [false, false, false, false, false, false, false]
  });
  document.getElementById("habitName").value = "";
  closeModal("habitModal");
  saveState();
}

// Settings, Mobile Sync Code & Backups
function renderSettingsFields() {
  document.getElementById("userNameInput").value = state.settings.name || "";
  document.getElementById("waterGoalInput").value = state.settings.waterGoal || 2500;
  document.getElementById("kcalGoalInput").value = state.settings.kcalGoal || 2000;
}

function saveSettings() {
  state.settings.name = document.getElementById("userNameInput").value.trim();
  state.settings.waterGoal = Number(document.getElementById("waterGoalInput").value) || 2500;
  state.settings.kcalGoal = Number(document.getElementById("kcalGoalInput").value) || 2000;
  state.settings.theme = document.getElementById("themeSelect").value;
  applyTheme(state.settings.theme);
  setupDateHeader();
  saveState();
  alert("Preferências salvas!");
}

function generateSyncCode() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  const box = document.getElementById("syncCodeBox");
  box.value = encoded;
  box.select();
  navigator.clipboard?.writeText(encoded);
  alert("Código gerado e copiado! Cole no celular em Ajustes > Colar Código de Sync.");
}

function importSyncCode() {
  const code = prompt("Cole aqui o código de sincronização gerado no outro dispositivo:");
  if (!code) return;
  try {
    const decoded = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    state = decoded;
    saveState();
    alert("Dados sincronizados com sucesso!");
  } catch (e) {
    alert("Código inválido.");
  }
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prumo-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      state = JSON.parse(e.target.result);
      saveState();
      alert("Backup restaurado com sucesso!");
    } catch (err) {
      alert("Arquivo de backup inválido.");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (confirm("Tem certeza que deseja apagar todos os dados e restaurar o padrão?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(DEFAULT_EXAMPLE_STATE));
    saveState();
  }
}
