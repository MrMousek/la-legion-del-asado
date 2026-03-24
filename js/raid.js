async function loadRaid() {
    try {
        const res = await fetch('./raid.json');
        const data = await res.json();

        renderRaid(data);

    } catch (err) {
        console.error("Error cargando raid:", err);
    }
}

const CLASS_ICONS = {
    Warrior: "https://wow.zamimg.com/images/wow/icons/medium/classicon_warrior.jpg",
    DK: "https://wow.zamimg.com/images/wow/icons/medium/classicon_deathknight.jpg",
    Paladin: "https://wow.zamimg.com/images/wow/icons/medium/classicon_paladin.jpg",
    Mage: "https://wow.zamimg.com/images/wow/icons/medium/classicon_mage.jpg",
    Druid: "https://wow.zamimg.com/images/wow/icons/medium/classicon_druid.jpg",
    Hunter: "https://wow.zamimg.com/images/wow/icons/medium/classicon_hunter.jpg",
    Rogue: "https://wow.zamimg.com/images/wow/icons/medium/classicon_rogue.jpg",
    Priest: "https://wow.zamimg.com/images/wow/icons/medium/classicon_priest.jpg",
    Warlock: "https://wow.zamimg.com/images/wow/icons/medium/classicon_warlock.jpg",
    Shaman: "https://wow.zamimg.com/images/wow/icons/medium/classicon_shaman.jpg",
    Monk: "https://wow.zamimg.com/images/wow/icons/medium/classicon_monk.jpg",
    DH: "https://wow.zamimg.com/images/wow/icons/medium/classicon_demonhunter.jpg",
    Evoker: "https://wow.zamimg.com/images/wow/icons/medium/classicon_evoker.jpg"
};
function renderRaid(data) {
    const container = document.getElementById('raid');

    const { event, roster, bench } = data;

    container.innerHTML = `
    <div class="raid-card">

    ${renderHeader(event)}

    <div class="raid-grid">
        ${renderRole("Tanks", roster.tanks)}
        ${renderRole("Healers", roster.healers)}
        ${renderRole("Melee", roster.melee)}
        ${renderRole("Ranged", roster.ranged)}
    </div>

    ${renderBench(bench)}

    </div>
`;
}

function renderHeader(event) {
    return `
    <div class="raid-header">
    <h2>${event.title}</h2>

    <div class="raid-meta">
        <span>📅 ${event.days.join(" / ")}</span>
        <span>🕘 ${event.timeST} ST (${event.timeAR} AR)</span>
        <span>🎯 ilvl ${event.ilvlRequired}+</span>
    </div>

    <p class="raid-desc">${event.description}</p>
    <a href="https://discord.gg/wtXmtEvSXJ" class="cta-button-core">¡ME QUIERO UNIR AL CORE!</a>
    </div>
`;
}

function renderRole(title, players) {
    if (!players || players.length === 0) return "";

    return `
    <div class="raid-role">
    <h3>${title} (${players.length})</h3>

    ${players.map(p => renderPlayer(p)).join("")}
    </div>
`;
}

function renderPlayer(p) {
    const icon = CLASS_ICONS[p.class] || "";

    return `
    <div class="raid-player ${p.class || 'Unknown'}">

    <div class="player-left">
        <img src="${icon}" class="class-icon" alt="${p.class}">
        
        <div class="player-info">
        <span class="player-name">${p.name}</span>
        <span class="player-spec">${p.spec || ""}</span>
        </div>
    </div>

    <div class="player-right">
        ${p.ilvl ? `<span class="player-ilvl">${p.ilvl}</span>` : ""}
        ${p.note ? `<span class="player-note">${p.note}</span>` : ""}
    </div>

    </div>
`;
}

function renderBench(bench) {
    if (!bench || bench.length === 0) return "";

    return `
    <div class="raid-bench">
    <h3>Bench (${bench.length})</h3>
    ${bench.map(p => renderPlayer(p)).join("")}
    </div>
`;
}

// INIT
loadRaid();