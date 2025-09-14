async function fetchStreamers() {
    const container = document.getElementById("streamers-container");
    container.innerHTML = `
    <div class="loading-spinner">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="mt-2">Buscando streamers en vivo...</p>
    </div>
`;

    try {
        // Llamar a la función serverless
        const res = await fetch("/.netlify/functions/get-streamers");
        const data = await res.json();

        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = `<p class="text-center">Ningún streamer de la guild está en vivo en este momento.</p>`;
            return;
        }

        data.forEach(stream => {
            const col = document.createElement("div");
            col.classList.add("col-md-6", "mb-4");

            col.innerHTML = `
        <div class="card shadow-sm">
        <div class="card-body text-center">
            <h5 class="card-title">${stream.user_name}</h5>
            <p class="card-text">${stream.title}</p>
            <div class="ratio ratio-16x9">
            <iframe
                src="https://player.twitch.tv/?channel=${stream.user_login}&parent=${window.location.hostname}"
                frameborder="0"
                allowfullscreen>
            </iframe>
            </div>
            <a href="https://twitch.tv/${stream.user_login}" target="_blank" class="btn btn-primary mt-2">
            Ver en Twitch
            </a>
        </div>
        </div>
    `;
            container.appendChild(col);
        });
    } catch (err) {
        container.innerHTML = `<p class="text-danger">Error al cargar streamers: ${err.message}</p>`;
    }
}

fetchStreamers();
