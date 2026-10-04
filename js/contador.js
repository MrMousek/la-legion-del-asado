const launchDate = new Date("2026-11-04T20:00:00-03:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {
        document.querySelector(".countdown").innerHTML =
            "<strong>¡FOREVER YA ESTÁ ACÁ!</strong>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
