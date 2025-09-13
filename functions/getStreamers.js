import fetch from "node-fetch";

export async function handler(event, context) {
    try {
        const clientId = process.env.TWITCH_CLIENT_ID;
        const clientSecret = process.env.TWITCH_CLIENT_SECRET;

        // 1. Obtener access_token desde Twitch
        const tokenResponse = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
            { method: "POST" }
        );

        if (!tokenResponse.ok) {
            throw new Error("Error al obtener token de Twitch");
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. Lista de streamers de tu guild
        const streamers = [
            "mouse_hc",
            "kevinaso",
            "theyadou",
            "kovuferal",
        ];

        // 3. Pedir info a Twitch API
        const query = streamers.map((s) => `user_login=${s}`).join("&");

        const streamsResponse = await fetch(
            `https://api.twitch.tv/helix/streams?${query}`,
            {
                headers: {
                    "Client-ID": clientId,
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!streamsResponse.ok) {
            throw new Error("Error al consultar streams en Twitch");
        }

        const streamsData = await streamsResponse.json();

        // 4. Responder a tu frontend
        return {
            statusCode: 200,
            body: JSON.stringify(streamsData.data),
        };
    } catch (error) {
        console.error("Error en getStreamers:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
