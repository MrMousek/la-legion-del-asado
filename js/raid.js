fetch('./raid.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('raid');

        const roles = {
            Tanks: [],
            Healers: [],
            Melee: [],
            Ranged: []
        };

        data.signUps.forEach(p => {
            if (roles[p.roleName]) {
                roles[p.roleName].push(p);
            }
        });

        function renderRole(title, players) {
            if (players.length === 0) return "";

            return `
        <div class="raid-role">
        <h4>${title}</h4>
        ${players.map(p => `
            <div class="raid-player ${p.className}">
            <span class="name">${p.name}</span>
            <span class="spec">${p.specName}</span>
            </div>
        `).join("")}
        </div>
    `;
        }

        container.innerHTML = `
    <div class="raid-card">
        <h2>${data.title}</h2>
        <p class="raid-desc">${data.description}</p>
                                <p> Anotate al core en nuestro Discord.
                                <a target="_blank" class="join-action" href="https://discord.com/invite/RsEyM5frhT">¡QUIERO UNIRME!</a> 
        <div class="raid-roles">
        ${renderRole("Tanks", roles.Tanks)}
        ${renderRole("Healers", roles.Healers)}
        ${renderRole("Melee", roles.Melee)}
        ${renderRole("Ranged", roles.Ranged)}
        </div>
    </div>
    `;
    });