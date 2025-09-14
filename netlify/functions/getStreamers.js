exports.handler = async function(event, context) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

    // Verificar que las variables de entorno existen
    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Faltan variables de entorno TWITCH_CLIENT_ID o TWITCH_CLIENT_SECRET" })
        };
    }

    const guildStreamers = ["theyadou", "mouse_hc", "kevinaso__", "nowenys", "yodatv",];

    try {
        // 1. Obtener OAuth token
        const tokenRes = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
            { method: "POST" }
        );

        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) {
            throw new Error("No se pudo obtener access_token: " + JSON.stringify(tokenData));
        }

        const accessToken = tokenData.access_token;

        const headers = {
            "Client-ID": TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`
        };

        // 2. Info de los usuarios (corregido el query)
        const usersQuery = guildStreamers.map(u => `login=${u}`).join("&");
        const usersRes = await fetch(`https://api.twitch.tv/helix/users?${usersQuery}`, { headers });
        
        if (!usersRes.ok) {
            throw new Error(`Error en users API: ${usersRes.status}`);
        }
        
        const usersData = await usersRes.json();

        // 3. Streams activos (corregido el query)
        const streamsQuery = guildStreamers.map(u => `user_login=${u}`).join("&");
        const streamsRes = await fetch(`https://api.twitch.tv/helix/streams?${streamsQuery}`, { headers });
        
        if (!streamsRes.ok) {
            throw new Error(`Error en streams API: ${streamsRes.status}`);
        }
        
        const streamsData = await streamsRes.json();

        const online = streamsData.data || [];

        // 4. Combinar online/offline
        const result = usersData.data.map(user => {
            const live = online.find(s => s.user_id === user.id);
            return {
                id: user.id,
                login: user.login,
                display_name: user.display_name,
                profile_image_url: user.profile_image_url,
                description: user.description,
                is_live: !!live,
                title: live ? live.title : "Offline",
                game_name: live ? live.game_name : null
            };
        });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Importante para CORS
            },
            body: JSON.stringify(result)
        };

    } catch (err) {
        console.error("Error en getStreamers:", err);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: err.message })
        };
    }
}