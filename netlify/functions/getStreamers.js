// netlify/functions/get-streamers.js
export async function handler(event, context) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

    const guildStreamers = ["theyadou", "mouse_hc", "kevinaso__", "yodatv"];

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

        // 2. Info de los usuarios
        const usersQuery = guildStreamers.map(u => `login=${u}`).join("&");
        const usersRes = await fetch(`https://api.twitch.tv/helix/users?${usersQuery}`, { headers });
        const usersData = await usersRes.json();

        // 3. Streams activos
        const streamsQuery = guildStreamers.map(u => `user_login=${u}`).join("&");
        const streamsRes = await fetch(`https://api.twitch.tv/helix/streams?${streamsQuery}`, { headers });
        const streamsData = await streamsRes.json();

        const online = streamsData.data;

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
                title: live ? live.title : null,
                game_name: live ? live.game_name : null
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };

    } catch (err) {
        console.error("Error en get-streamers:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
