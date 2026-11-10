
const HASHTAG = "#wowxasado";
const GAME_NAME = "World of Warcraft";

// Cantidad de páginas públicas a revisar.
// Cada página contiene hasta 100 transmisiones.
const MAX_PAGES = 10;

// Canales conocidos de La Legión del Asado.
// Siempre se consultan, aunque tengan pocos espectadores.
const GUILD_STREAMERS = [
    "mouse_hc"
];

const CACHE_SECONDS = 60;

exports.handler = async function () {
    const {
        TWITCH_CLIENT_ID,
        TWITCH_CLIENT_SECRET
    } = process.env;

    function jsonResponse(statusCode, data) {
        return {
            statusCode,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": `public, max-age=${CACHE_SECONDS}`
            },
            body: JSON.stringify(data)
        };
    }

    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
        return jsonResponse(500, {
            error: "Faltan las credenciales de Twitch."
        });
    }

    try {
        // =========================================
        // 1. AUTENTICACIÓN CON TWITCH
        // =========================================

        const tokenParams = new URLSearchParams({
            client_id: TWITCH_CLIENT_ID,
            client_secret: TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials"
        });

        const tokenRes = await fetch(
            "https://id.twitch.tv/oauth2/token",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body: tokenParams.toString()
            }
        );

        if (!tokenRes.ok) {
            throw new Error(
                `Error de autenticación: ${tokenRes.status}`
            );
        }

        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            throw new Error(
                "Twitch no devolvió un access_token."
            );
        }

        const headers = {
            "Client-ID": TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${tokenData.access_token}`
        };

        async function twitchGet(endpoint) {
            const response = await fetch(
                `https://api.twitch.tv/helix/${endpoint}`,
                { headers }
            );

            if (!response.ok) {
                const details = await response.text();

                console.error(
                    "Error Twitch API:",
                    response.status,
                    details
                );

                throw new Error(
                    `Error Twitch API: ${response.status}`
                );
            }

            return response.json();
        }

        // =========================================
        // 2. BUSCAR CATEGORÍA WORLD OF WARCRAFT
        // =========================================

        const gamesData = await twitchGet(
            `games?name=${encodeURIComponent(GAME_NAME)}`
        );

        const game = gamesData.data?.find(
            g => g.name.toLowerCase() ===
                GAME_NAME.toLowerCase()
        );

        if (!game) {
            throw new Error(
                "No se encontró la categoría World of Warcraft."
            );
        }

        // =========================================
        // 3. DESCUBRIMIENTO PÚBLICO POR HASHTAG
        // =========================================

        const matches = new Map();

        let cursor = null;
        let scanned = 0;

        for (let page = 0; page < MAX_PAGES; page++) {
            const params = new URLSearchParams({
                game_id: game.id,
                first: "100",
                type: "live"
            });

            if (cursor) {
                params.set("after", cursor);
            }

            const streamsData = await twitchGet(
                `streams?${params.toString()}`
            );

            const streams = streamsData.data || [];

            scanned += streams.length;

            for (const stream of streams) {
                const title = (stream.title || "")
                    .toLowerCase();

                if (title.includes(HASHTAG.toLowerCase())) {
                    matches.set(stream.user_id, stream);
                }
            }

            cursor = streamsData.pagination?.cursor;

            if (!cursor || streams.length === 0) {
                break;
            }
        }

        console.log(
            `Descubrimiento público: ${scanned} streams revisados.`
        );

        // =========================================
        // 4. CONSULTAR CANALES DE LA GUILD
        // =========================================

        // Esto permite detectar canales pequeños,
        // aunque no aparezcan en las primeras páginas.

        if (GUILD_STREAMERS.length > 0) {
            for (
                let i = 0;
                i < GUILD_STREAMERS.length;
                i += 100
            ) {
                const batch = GUILD_STREAMERS.slice(
                    i,
                    i + 100
                );

                const params = new URLSearchParams({
                    first: "100"
                });

                batch.forEach(login => {
                    params.append("user_login", login);
                });

                const guildData = await twitchGet(
                    `streams?${params.toString()}`
                );

                for (const stream of guildData.data || []) {
                    const title = (stream.title || "")
                        .toLowerCase();

                    const hasHashtag = title.includes(
                        HASHTAG.toLowerCase()
                    );

                    const isWoW = stream.game_id === game.id;

                    if (hasHashtag && isWoW) {
                        matches.set(stream.user_id, stream);
                    }
                }
            }
        }

        // =========================================
        // 5. OBTENER AVATARES DE LOS STREAMERS
        // =========================================

        const foundStreams = [...matches.values()];

        const users = new Map();

        for (
            let i = 0;
            i < foundStreams.length;
            i += 100
        ) {
            const batch = foundStreams.slice(i, i + 100);

            const params = new URLSearchParams();

            batch.forEach(stream => {
                params.append("id", stream.user_id);
            });

            const usersData = await twitchGet(
                `users?${params.toString()}`
            );

            for (const user of usersData.data || []) {
                users.set(user.id, user);
            }
        }

        // =========================================
        // 6. PREPARAR RESULTADOS PARA EL FRONTEND
        // =========================================

        const result = foundStreams.map(stream => {
            const user = users.get(stream.user_id);

            const thumbnail = (
                stream.thumbnail_url || ""
            )
                .replace("{width}", "640")
                .replace("{height}", "360");

            return {
                id: stream.user_id,
                login: stream.user_login,
                display_name: stream.user_name,
                profile_image_url:
                    user?.profile_image_url || "",
                description: user?.description || "",
                is_live: true,
                title: stream.title,
                game_name: stream.game_name,
                viewer_count: stream.viewer_count,
                thumbnail_url: thumbnail,
                started_at: stream.started_at,
                url: `https://www.twitch.tv/${
                    encodeURIComponent(stream.user_login)
                }`
            };
        });

        // Ordenar por espectadores
        result.sort(
            (a, b) => b.viewer_count - a.viewer_count
        );

        console.log(
            `#wowxasado: ${result.length} streamers encontrados.`
        );

        return jsonResponse(200, result);

    } catch (err) {
        console.error(
            "Error en getStreamers:",
            err
        );

        return jsonResponse(500, {
            error: "No se pudieron obtener los streamers."
        });
    }
};
