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
const SPEC_ICONS = {
    // WARRIOR
    Arms: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_savageblow.jpg",
    Fury: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_innerrage.jpg",
    Protection: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_defensivestance.jpg",

    // PALADIN
    HolyPaladin: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg",
    ProtectionPaladin: "https://wow.zamimg.com/images/wow/icons/medium/ability_paladin_shieldofthetemplar.jpg",
    Retribution: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_auraoflight.jpg",

    // HUNTER
    BeastMastery: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_bestialdiscipline.jpg",
    Marksmanship: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_focusedaim.jpg",
    Survival: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_camouflage.jpg",

    // ROGUE
    Assassination: "https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_deadlybrew.jpg",
    Outlaw: "https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_waylay.jpg",
    Subtlety: "https://wow.zamimg.com/images/wow/icons/medium/ability_stealth.jpg",

    // PRIEST
    Discipline: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_powerwordshield.jpg",
    Holy: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_guardianspirit.jpg",
    Shadow: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_shadowwordpain.jpg",

    // DEATH KNIGHT
    Blood: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_bloodpresence.jpg",
    FrostDK: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_frostpresence.jpg",
    Unholy: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_unholypresence.jpg",

    // SHAMAN
    Elemental: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightning.jpg",
    Enhancement: "https://wow.zamimg.com/images/wow/icons/medium/spell_shaman_improvedstormstrike.jpg",
    RestorationShaman: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_magicimmunity.jpg",

    // MAGE
    Arcane: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_magicalsentry.jpg",
    Fire: "https://wow.zamimg.com/images/wow/icons/medium/spell_fire_firebolt02.jpg",
    Frost: "https://wow.zamimg.com/images/wow/icons/medium/spell_frost_frostbolt02.jpg",

    // WARLOCK
    Affliction: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_deathcoil.jpg",
    Demonology: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_metamorphosis.jpg",
    Destruction: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_rainoffire.jpg",

    // MONK
    Brewmaster: "https://wow.zamimg.com/images/wow/icons/medium/spell_monk_brewmaster_spec.jpg",
    Mistweaver: "https://wow.zamimg.com/images/wow/icons/medium/spell_monk_mistweaver_spec.jpg",
    Windwalker: "https://wow.zamimg.com/images/wow/icons/medium/spell_monk_windwalker_spec.jpg",

    // DRUID
    Balance: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_starfall.jpg",
    Feral: "https://wow.zamimg.com/images/wow/icons/medium/ability_druid_catform.jpg",
    Guardian: "https://wow.zamimg.com/images/wow/icons/medium/ability_racial_bearform.jpg",
    RestorationDruid: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_healingtouch.jpg",

    // DEMON HUNTER
    Havoc: "https://wow.zamimg.com/images/wow/icons/medium/ability_demonhunter_specdps.jpg",
    Vengeance: "https://wow.zamimg.com/images/wow/icons/medium/ability_demonhunter_spectank.jpg",

    // EVOKER
    Devastation: "https://wow.zamimg.com/images/wow/icons/medium/classicon_evoker_devastation.jpg",
    Preservation: "https://wow.zamimg.com/images/wow/icons/medium/classicon_evoker_preservation.jpg",
    Augmentation: "https://wow.zamimg.com/images/wow/icons/medium/classicon_evoker_augmentation.jpg"
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
<section class="contenedor-iframe">
<iframe
    src="https://raider.io/widgets/boss-progress?raid=latest&name_style=logo&difficulty=latest&region=us&realm=quelthalas&guild=La+Legi%C3%B3n+del+Asado&boss=latest&period=until_kill&orientation=rect&hide=&chromargb=transparent&theme=dragonflight"
    frameborder="0">
</iframe>

</section>
                    
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
    const icon = SPEC_ICONS[p.spec] || CLASS_ICONS[p.class];

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