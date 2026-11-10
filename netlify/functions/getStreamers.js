
const HASHTAG = "#wowxasado";
const GAME_NAME = "World of Warcraft";

// Cantidad de páginas de transmisiones que revisamos.
// Cada página contiene hasta 100 directos.
const MAX_PAGES = 5;

const CACHE_SECONDS = 180;

exports.handler = async function () {
    const {
        TWITCH_CLIENT_ID,
        TWITCH_CLIENT_SECRET
    } = process.env;

    const jsonResponse = (statusCode, data) => ({
        statusCode,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": `public, max-age=${CACHE_SECONDS}`
        },
        body: JSON.stringify(data)
    });

    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
        return jsonResponse(500, {
            error: "Faltan las credenciales de Twitch."
        });
    }

    try {
        // 1. Obtener token OAuth
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
                `Error de autenticación Twitch: ${tokenRes.status}`
            );
        }

        const tokenData = await tokenRes.json();

        const headers = {
            "Client-ID": TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${tokenData.access_token}`
        };

        // Función auxiliar para consultar Twitch
        async function twitchGet(endpoint) {
            const response = await fetch(
                `https://api.twitch.tv/helix/${endpoint}`,
                { headers }
            );

            if (!response.ok) {
                throw new Error(
                    `Error Twitch API: ${response.status}`
                );
            }

            return response.json();
        }

        // 2. Buscar la categoría World of Warcraft
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

        // 3. Recorrer las transmisiones de WoW
        let cursor = null;
        let scanned = 0;
        const matches = [];

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

            // 4. Filtrar por hashtag
            for (const stream of streams) {
                const title = stream.title || "";

                if (
                    title.toLowerCase().includes(
                        HASHTAG.toLowerCase()
                    )
                ) {
                    matches.push(stream);
                }
            }

            cursor = streamsData.pagination?.cursor;

            if (!cursor || streams.length === 0) {
                break;
            }
        }

        // 5. Obtener avatares de los canales encontrados
        const users = new Map();

        for (let i = 0; i < matches.length; i += 100) {
            const batch = matches.slice(i, i + 100);

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

        // 6. Preparar los resultados
        const result = matches.map(stream => {
            const user = users.get(stream.user_id);

            return {
                id: stream.user_id,
                login: stream.user_login,
                display_name: stream.user_name,
                profile_image_url:
                    user?.profile_image_url || "",
                is_live: true,
                title: stream.title,
                game_name: stream.game_name,
                viewer_count: stream.viewer_count,
                thumbnail_url: stream.thumbnail_url
                    .replace("{width}", "640")
                    .replace("{height}", "360"),
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

        return jsonResponse(200, result);

    } catch (err) {
        console.error("Error en getStreamers:", err);

        return jsonResponse(500, {
            error: "No se pudieron obtener los streamers."
        });
    }
};
