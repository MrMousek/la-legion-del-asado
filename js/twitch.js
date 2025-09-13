        // Lista de streamers de la guild (reemplaza con los nombres de usuario reales de Twitch)
        const streamers = [
            "mouse", 
            "zailok", 
            "tano", 
            "hache", 
            "tonelt", 
            "kyalu", 
            "apolo", 
            "yadou", 
            "chozen"
        ];
        
        // Elemento contenedor
        const streamersContainer = document.getElementById('streamers-container');
        
        // Función para obtener información de los streamers
        async function fetchStreamers() {
            streamersContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-2">Buscando streamers en vivo...</p>
                </div>
            `;
            
            try {
                // En una implementación real, necesitarías un backend para evitar exponer el Client-ID
                // Esta es una implementación de ejemplo que requerirá configuración adicional
                
                // Simulamos una respuesta con algunos streamers en vivo
                setTimeout(() => {
                    // Datos de ejemplo (en la práctica, vendrían de la API de Twitch)
                    const exampleData = [
                        {
                            name: "Mouse",
                            login: "mouse",
                            title: "¡Raiding Mythic con la Legión! 🎮🔥",
                            viewer_count: 42,
                            thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_mouse-440x248.jpg",
                            game_name: "World of Warcraft",
                            is_live: true
                        },
                        {
                            name: "Zailok",
                            login: "zailok",
                            title: "Leveling my new character - Come hang out!",
                            viewer_count: 18,
                            thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_zailok-440x248.jpg",
                            game_name: "World of Warcraft",
                            is_live: true
                        },
                        {
                            name: "Tano",
                            login: "tano",
                            title: "Offline",
                            is_live: false
                        },
                        {
                            name: "Hache",
                            login: "hache",
                            title: "Offline",
                            is_live: false
                        }
                    ];
                    
                    displayStreamers(exampleData);
                }, 1500);
                
            } catch (error) {
                console.error("Error fetching streamers:", error);
                streamersContainer.innerHTML = `
                    <div class="no-streamers">
                        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <p>No se pudieron cargar los streamers en este momento.</p>
                    </div>
                `;
            }
        }
        
        // Función para mostrar los streamers
        function displayStreamers(streamersData) {
            if (!streamersData || streamersData.length === 0) {
                streamersContainer.innerHTML = `
                    <div class="no-streamers">
                        <i class="fas fa-tv fa-2x mb-3"></i>
                        <p>Ningún streamer está en vivo actualmente.</p>
                    </div>
                `;
                return;
            }
            
            let html = '';
            let liveStreamers = 0;
            
            streamersData.forEach(streamer => {
                if (streamer.is_live) {
                    liveStreamers++;
                    html += `
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="streamer-card">
                                <div class="stream-thumbnail">
                                    <img src="${streamer.thumbnail_url}" alt="${streamer.name} stream">
                                    <span class="live-badge">EN VIVO</span>
                                    <span class="viewer-count"><i class="fas fa-eye"></i> ${streamer.viewer_count}</span>
                                </div>
                                <div class="streamer-info d-flex">
                                    <img class="streamer-avatar" src="https://static-cdn.jtvnw.net/jtv_user_pictures/${streamer.login}-profile_image-70x70.png" alt="${streamer.name}">
                                    <div class="flex-grow-1">
                                        <div class="streamer-name">${streamer.name}</div>
                                        <div class="game-name">Jugando: ${streamer.game_name}</div>
                                        <div class="stream-title" title="${streamer.title}">${streamer.title}</div>
                                        <a href="https://www.twitch.tv/${streamer.login}" class="watch-btn" target="_blank">
                                            <i class="fas fa-play-circle"></i> Ver stream
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
            // Añadir streamers offline si no hay suficientes en vivo
            if (liveStreamers === 0) {
                html = `
                    <div class="no-streamers">
                        <i class="fas fa-tv fa-2x mb-3"></i>
                        <p>Ningún streamer está en vivo actualmente.</p>
                        <p>Visita sus canales y dales follow para saber cuándo comienzan a streamear:</p>
                        <div class="d-flex flex-wrap justify-content-center mt-3">
                `;
                
                streamersData.forEach(streamer => {
                    html += `
                        <a href="https://www.twitch.tv/${streamer.login}" class="m-2 watch-btn" target="_blank">
                            <i class="fab fa-twitch"></i> ${streamer.name}
                        </a>
                    `;
                });
                
                html += `</div></div>`;
            } else {
                // Añadir los streamers offline al final
                streamersData.forEach(streamer => {
                    if (!streamer.is_live) {
                        html += `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="streamer-card offline-streamer">
                                    <div class="stream-thumbnail" style="background-color: #2a2a2a;">
                                        <div class="offline-message">
                                            <i class="fas fa-bed fa-2x mb-2"></i>
                                            <p>Fuera de línea</p>
                                        </div>
                                    </div>
                                    <div class="streamer-info d-flex">
                                        <div class="placeholder-avatar">
                                            <i class="fas fa-user"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="streamer-name">${streamer.name}</div>
                                            <div class="game-name">Actualemente offline</div>
                                            <a href="https://www.twitch.tv/${streamer.login}" class="watch-btn" target="_blank">
                                                <i class="fab fa-twitch"></i> Visitar canal
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });
            }
            
            streamersContainer.innerHTML = html;
        }
        
        // Cargar los streamers cuando la página esté lista
        document.addEventListener('DOMContentLoaded', fetchStreamers);
