async function fetchStreamers() {
    const container = document.getElementById("streamers-container");
    container.innerHTML = `<p class="text-center">Cargando streamers...</p>`;

    try {
        const res = await fetch("./netlify/functions/getStreamers.js");
        const data = await res.json();

        container.innerHTML = "";

        data.forEach(streamer => {
            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-4");

            if (streamer.is_live) {
                // ONLINE
                col.innerHTML = `
        <div class="card shadow-sm border-success">
            <div class="card-body text-center">
            <img src="${streamer.profile_image_url}" class="rounded-circle mb-2" width="80">
            <h5 class="card-title text-success">🔴 ${streamer.display_name}</h5>
            <p class="card-text">${streamer.title}</p>
            <div class="ratio ratio-16x9">
                <iframe
                src="https://player.twitch.tv/?channel=${streamer.login}&parent=${window.location.hostname}"
                frameborder="0"
                allowfullscreen>
                </iframe>
            </div>
            <a href="https://twitch.tv/${streamer.login}" target="_blank" class="btn btn-success mt-2">
                Ver en Twitch
            </a>
            </div>
        </div>
        `;
            } else {
                // OFFLINE
                col.innerHTML = `
        <div class="card shadow-sm border-secondary">
            <div class="card-body text-center text-muted">
            <img src="${streamer.profile_image_url}" class="rounded-circle mb-2" width="80">
            <h5 class="card-title">${streamer.display_name}</h5>
            <p class="card-text">Actualmente está offline</p>
            <a href="https://twitch.tv/${streamer.login}" target="_blank" class="btn btn-outline-secondary mt-2">
                Ver canal
            </a>
            </div>
        </div>
        `;
            }

            container.appendChild(col);
        });
    } catch (err) {
        container.innerHTML = `<p class="text-danger">Error al cargar streamers: ${err.message}</p>`;
    }
}

fetchStreamers();
