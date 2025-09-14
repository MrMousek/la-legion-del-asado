async function fetchStreamers() {
    const container = document.getElementById("streamers-container");
    container.innerHTML = `<p class="text-center">Cargando streamers...</p>`;

    try {
        // CORRECCIÓN 1: La ruta del endpoint está mal
        // Debe apuntar a la función Netlify, no al archivo .js
        const res = await fetch("/.netlify/functions/getStreamers");
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();

        container.innerHTML = "";

        // CORRECCIÓN 2: Verificar que data es un array
        if (!Array.isArray(data)) {
            throw new Error("La respuesta no es un array válido");
        }

        data.forEach(streamer => {
            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-4");

            // CORRECCIÓN 3: Validar propiedades del streamer
            const profileImage = streamer.profile_image_url || "https://via.placeholder.com/80";
            const displayName = streamer.display_name || "Streamer";
            const login = streamer.login || "";
            const title = streamer.title || "Sin título";
            const isLive = streamer.is_live || false;

            if (isLive) {
                // ONLINE
                col.innerHTML = `
                    <div class="card shadow-sm border-success">
                        <div class="card-body text-center">
                            <img src="${profileImage}" class="rounded-circle mb-2" width="80" height="80" alt="${displayName}">
                            <h5 class="card-title text-success">🔴 ${displayName}</h5>
                            <p class="card-text">${title}</p>
                            <div class="ratio ratio-16x9">
                                <iframe
                                    src="https://player.twitch.tv/?channel=${login}&parent=${window.location.hostname}"
                                    frameborder="0"
                                    allowfullscreen
                                    scrolling="no"
                                    allow="autoplay; fullscreen">
                                </iframe>
                            </div>
                            <a href="https://twitch.tv/${login}" target="_blank" class="btn btn-success mt-2">
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
                            <img src="${profileImage}" class="rounded-circle mb-2" width="80" height="80" alt="${displayName}">
                            <h5 class="card-title">${displayName}</h5>
                            <p class="card-text">Actualmente está offline</p>
                            <a href="https://twitch.tv/${login}" target="_blank" class="btn btn-outline-secondary mt-2">
                                Ver canal
                            </a>
                        </div>
                    </div>
                `;
            }

            container.appendChild(col);
        });

    } catch (err) {
        console.error("Error fetching streamers:", err);
        container.innerHTML = `
            <div class="col-12">
                <p class="text-danger text-center">Error al cargar streamers: ${err.message}</p>
                <p class="text-center"><button onclick="fetchStreamers()" class="btn btn-primary">Reintentar</button></p>
            </div>
        `;
    }
}

// CORRECCIÓN 4: Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    fetchStreamers();
    
    // Opcional: Actualizar automáticamente cada 5 minutos
    setInterval(fetchStreamers, 300000);
});