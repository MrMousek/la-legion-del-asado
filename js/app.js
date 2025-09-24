async function fetchStreamers() {
    const container = document.getElementById("streamers-container");
    container.innerHTML = `<p class="text-center">Cargando streamers...</p>`;

    try {
        const res = await fetch("/.netlify/functions/getStreamers");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        container.innerHTML = "";

        data.forEach(streamer => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "mb-4");

            // ONLINE
            if (streamer.is_live) {
                col.innerHTML = `
                    <div class="streamer-card online">
                        <img src="${streamer.profile_image_url}" class="avatar" alt="${streamer.display_name}">
                        <h5>${streamer.display_name}</h5>
                        <p class="status-online">¡En directo ahora!</p>
                        <p><strong>${streamer.game_name || ""}</strong> – ${streamer.title}</p>
                        <a href="https://twitch.tv/${streamer.login}" target="_blank" class="btn">
                            Ver stream
                        </a>
                    </div>
                `;
            } else {
                // OFFLINE
                col.innerHTML = `
                    <div class="streamer-card offline">
                        <img src="${streamer.profile_image_url}" class="avatar" alt="${streamer.display_name}">
                        <h5>${streamer.display_name}</h5>
                        <p class="status-offline">Actualmente está offline</p>
                        <a href="https://twitch.tv/${streamer.login}" target="_blank" class="btn">
                            Ver canal
                        </a>
                    </div>
                `;
            }

            container.appendChild(col);
        });
    } catch (err) {
        console.error("Error:", err);
        container.innerHTML = `
            <div class="col-12">
                <p class="text-danger text-center">Error al cargar streamers: ${err.message}</p>
                <p class="text-center"><button onclick="fetchStreamers()" class="btn btn-primary">Reintentar</button></p>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", fetchStreamers);
