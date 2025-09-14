// netlify/functions/get-streamers.js
import fetch from "node-fetch";

export async function handler(event, context) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

    // Listado de streamers de tu guild
    const guildStreamers = ["theyadou", "mouse_hc", "kevinaso__", "yodatv"];

    try {
        // 1. Obtener OAuth token de Twitch
        const tokenRes = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
            { method: "POST" }
        );

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // 2. Consultar streams de la guild
        const query = guildStreamers.map(u => `user_login=${u}`).join("&");
        const streamsRes = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
            headers: {
                "Client-ID": TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const streamsData = await streamsRes.json();

        return {
            statusCode: 200,
            body: JSON.stringify(streamsData.data)
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
