// Lanzamiento oficial: 4 de noviembre de 2026, 20:00 (Argentina).
const launchDate = new Date("2026-11-04T20:00:00-03:00").getTime();
const countdownElement = document.querySelector(".countdown");
const countdownSection = document.querySelector(".forever-countdown");
let countdownInterval;
let launchShown = false;

function showLaunchedState() {
    if (launchShown || !countdownElement || !countdownSection) return;
    launchShown = true;
    countdownSection.classList.add("forever-launched");
    countdownElement.innerHTML = `
        <div class="forever-launch-message" role="status" aria-live="polite">
            <span class="forever-launch-kicker">LA ESPERA TERMINÓ</span>
            <strong>¡FOREVER YA ESTÁ DISPONIBLE!</strong>
            <span class="forever-launch-subtitle">¡Azeroth nos espera loco!</span>
            <span class="forever-launch-faction">Estamos jugando en Alianza servidor PvP</span>
        </div>`;
    const bottom = countdownSection.querySelector(".forever-bottom");
    if (bottom) bottom.textContent = "¡Activate ese ferne' y entrá a jugar!";
}

function updateCountdown() {
    if (!countdownElement) return;
    const distance = launchDate - Date.now();
    if (distance <= 0) {
        showLaunchedState();
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
if (!launchShown) countdownInterval = window.setInterval(updateCountdown, 1000);