// URL directa al canal/mensaje de la encuesta en Discord
const URL_ENCUESTA_DISCORD = 'https://discord.com/channels/709858220746866828/1551315393988001983';

async function cargarDiscordWidget() {
    try {
        const response = await fetch('https://discord.com/api/guilds/709858220746866828/widget.json');
        const data = await response.json();

        const nameEl = document.getElementById('discord-name');
        const onlineEl = document.getElementById('discord-online');
        const inviteEl = document.getElementById('discord-invite');

        if (nameEl) nameEl.textContent = data.name;
        if (onlineEl) onlineEl.textContent = data.presence_count;

        // Asignar la URL directa al botón de la encuesta
        if (inviteEl) {
            inviteEl.href = URL_ENCUESTA_DISCORD;
        }
    } catch (error) {
        console.error('Error al cargar widget de Discord:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDiscordWidget);