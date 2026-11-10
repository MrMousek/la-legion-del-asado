
const STREAMERS_REFRESH_MS = 180000;

let streamersLoading = false;

function escapeHTML(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]
    );
}

async function fetchStreamers() {
    const container = document.getElementById(
        "streamers-container"
    );

    if (!container || streamersLoading) return;

    streamersLoading = true;

    // Mostrar carga solamente si todavía no hay tarjetas
    if (!container.querySelector(".streamer-card")) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p>Buscando streamers de la Legión...</p>
            </div>
        `;
    }

    try {
        const res = await fetch(
            "/.netlify/functions/getStreamers"
        );

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        if (!Array.isArray(data)) {
            throw new Error("Respuesta inesperada del servidor.");
        }

        container.innerHTML = "";

        // No se encontraron streamers
        if (data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="streamers-empty">
                        <h4>No hay asadores en vivo</h4>
                        <p>
                            ¿Vas a transmitir World of Warcraft?
                            Agregá <strong>#wowxasado</strong>
                            al título de tu directo en Twitch
                            para intentar aparecer acá.
                        </p>
                    </div>
                </div>
            `;
            return;
        }

        // Crear tarjetas
        data.forEach(streamer => {
            const col = document.createElement("div");

            col.classList.add(
                "col-md-4",
                "mb-4"
            );

            const name = escapeHTML(
                streamer.display_name || streamer.login
            );

            const title = escapeHTML(streamer.title);
            const game = escapeHTML(streamer.game_name);

            const viewers = Number(
                streamer.viewer_count || 0
            ).toLocaleString("es-AR");

            // URL del canal construida con el login
            const login = encodeURIComponent(
                streamer.login || ""
            );

            const channelURL =
                `https://www.twitch.tv/${login}`;

            // Miniatura provista por Twitch
            const thumbnail = streamer.thumbnail_url || "";

            const avatar = streamer.profile_image_url || "";

            col.innerHTML = `
                <div class="streamer-card online">

                    <div class="streamer-preview">
                        ${
                            thumbnail
                                ? `<img
                                    class="streamer-thumbnail"
                                    alt="Directo de ${name}"
                                >`
                                : ""
                        }

                        <span class="streamer-live-badge">
                            EN VIVO
                        </span>

                        <span class="streamer-viewers">
                            ${viewers} espectadores
                        </span>
                    </div>

                    <div class="streamer-info">

                        <div class="streamer-user">
                            ${
                                avatar
                                    ? `<img
                                        class="avatar"
                                        alt="${name}"
                                    >`
                                    : ""
                            }

                            <h5>${name}</h5>
                        </div>

                        <p class="streamer-title">
                            ${title}
                        </p>

                        <p class="streamer-game">
                            ${game}
                        </p>

                        <a
                            href="${channelURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn"
                        >
                            Ver stream
                        </a>

                    </div>
                </div>
            `;

            // Asignar imágenes mediante propiedades DOM
            // en lugar de interpolarlas como HTML
            const previewImg = col.querySelector(
                ".streamer-thumbnail"
            );

            if (previewImg) {
                previewImg.src = thumbnail;
                previewImg.loading = "lazy";
            }

            const avatarImg = col.querySelector(
                ".streamer-user .avatar"
            );

            if (avatarImg) {
                avatarImg.src = avatar;
                avatarImg.loading = "lazy";
            }

            container.appendChild(col);
        });

    } catch (err) {
        console.error("Error al cargar streamers:", err);

        // Mantener tarjetas anteriores si falla una actualización
        if (!container.querySelector(".streamer-card")) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-danger">
                        No se pudieron cargar los streamers.
                    </p>
                    <button
                        id="retry-streamers"
                        class="btn btn-primary"
                    >
                        Reintentar
                    </button>
                </div>
            `;

            document.getElementById(
                "retry-streamers"
            )?.addEventListener("click", fetchStreamers);
        }

    } finally {
        streamersLoading = false;
    }
}

// Primera carga y actualizaciones automáticas
function initStreamers() {
    fetchStreamers();

    setInterval(
        fetchStreamers,
        STREAMERS_REFRESH_MS
    );
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initStreamers,
        { once: true }
    );
} else {
    initStreamers();
}
