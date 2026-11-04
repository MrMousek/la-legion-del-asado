// Lanzamiento oficial: 4 de noviembre de 2026, 20:00 (Argentina).
const launchDate = new Date("2026-11-04T20:00:00-03:00").getTime();
const countdownElement = document.querySelector(".countdown");
const countdownSection = document.querySelector(".forever-countdown");
let countdownInterval;
let celebrationStarted = false;

function celebrateForever() {
    if (celebrationStarted || !countdownElement || !countdownSection) return;
    celebrationStarted = true;
    countdownSection.classList.add("forever-launched");
    countdownElement.innerHTML = `
        <div class="forever-launch-message" role="status" aria-live="polite">
            <span class="forever-launch-kicker">LA ESPERA TERMINÓ</span>
            <strong>¡FOREVER YA ESTÁ DISPONIBLE!</strong>
            <span class="forever-launch-subtitle">¡Azeroth nos espera loco!</span>
            <span class="forever-launch-faction">🛡️ Alianza · ⚔️ PvP · 🇦🇷 La Legión del Asado</span>
        </div>`;
    const bottom = countdownSection.querySelector(".forever-bottom");
    if (bottom) bottom.textContent = "¡Activate ese ferne' y entrá a jugar!";

    // Una única celebración por navegador, sin rastreadores ni dependencias.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
        if (sessionStorage.getItem("lla-forever-celebrated")) return;
        sessionStorage.setItem("lla-forever-celebrated", "1");
    } catch (_) { /* Si se bloquea sessionStorage, la animación igual funciona. */ }

    const layer = document.createElement("div");
    layer.className = "forever-party-layer";
    layer.setAttribute("aria-hidden", "true");
    countdownSection.appendChild(layer);
    const items = ["🍻", "🥩", "🍖", "🔥", "🍻", "🥩", "🍖", "🍻", "🥩", "🍖", "🍻", "🔥"];
    items.forEach((emoji, index) => {
        const item = document.createElement("span");
        item.className = "forever-party-item" + (index % 2 ? " reverse" : "");
        item.textContent = emoji;
        item.style.setProperty("--top", `${12 + (index * 29) % 76}%`);
        item.style.setProperty("--delay", `${index * 0.36}s`);
        item.style.setProperty("--duration", `${4 + (index % 3)}s`);
        layer.appendChild(item);
    });
    for (let i = 0; i < 28; i++) {
        const confetti = document.createElement("i");
        confetti.className = "forever-confetti";
        confetti.style.setProperty("--left", `${(i * 37.17) % 100}%`);
        confetti.style.setProperty("--delay", `${(i % 10) * 0.24}s`);
        confetti.style.setProperty("--duration", `${3 + (i % 4)}s`);
        layer.appendChild(confetti);
    }
    window.setTimeout(() => layer.remove(), 9000);
}

function updateCountdown() {
    if (!countdownElement) return;
    const distance = launchDate - Date.now();
    if (distance <= 0) {
        celebrateForever();
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }
    const values = {
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance / 3600000) % 24),
        minutes: Math.floor((distance / 60000) % 60),
        seconds: Math.floor((distance / 1000) % 60)
    };
    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = String(value).padStart(2, "0");
    });
}
updateCountdown();
if (!celebrationStarted) countdownInterval = window.setInterval(updateCountdown, 1000);
