const clases = [
    {
        nombre: "Guerrero",
        roles: ["DPS", "Tanque"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Tauren", "Elfo de Sangre", "Goblin", "Pandaren", "Vulpera", "Draenei Templeluz",
            "Elfo del Vacío", "Enano Hierro Negro", "Orco Mag'har", "Tauren Altamontaña", "Trol Zandalari", "Mecagnomo", "Terráneo", "Dracthyr",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_warrior.jpg"
    },
    {
        nombre: "Paladín",
        roles: ["DPS", "Tanque", "Healer"],
        razas: [
            "Humano", "Enano", "Draenei", "Elfo de Sangre", "Tauren", "Draenei Templeluz",
            "Enano Hierro Negro", "Trol Zandalari", "Terráneo",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_paladin.jpg"
    },
    {
        nombre: "Cazador",
        roles: ["DPS"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Tauren", "Elfo de Sangre", "Goblin", "Pandaren", "Vulpera", "Elfo del Vacío", "Enano Hierro Negro",
            "Orco Mag'har", "Tauren Altamontaña", "Trol Zandalari", "Kultirano", "Mecagnomo", "Terráneo", "Dracthyr", 
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_hunter.jpg"
    },
    {
        nombre: "Pícaro",
        roles: ["DPS"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Huargen", "Orco", "Trol", "No-Muerto", "Elfo de Sangre",
            "Goblin", "Pandaren", "Vulpera", "Elfo del Vacío", "Enano Hierro Negro", "Orco Mag'har",
            "Kultirano", "Mecagnomo", "Terráneo", "Dracthyr",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_rogue.jpg"
    },
    {
        nombre: "Sacerdote",
        roles: ["DPS", "Healer"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Elfo de Sangre", "Goblin", "Pandaren", "Elfo del Vacío", "Draenei Templeluz",
            "Enano Hierro Negro", "Kultirano", "Trol Zandalari", "Mecagnomo", "Terráneo",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_priest.jpg"
    },
    {
        nombre: "Chamán",
        roles: ["DPS", "Healer"],
        razas: [
            "Orco", "Trol", "Tauren", "Elfo de Sangre", "Goblin", "Pandaren", "Enano", "Draenei",
            "Enano Hierro Negro", "Orco Mag'har", "Tauren Altamontaña", "Trol Zandalari", "Vulpera", "Kultirano", "Terráneo",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_shaman.jpg"
    },
    {
        nombre: "Mago",
        roles: ["DPS"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Elfo de Sangre", "Goblin", "Pandaren", "Elfo del Vacío", "Enano Hierro Negro",
            "Vulpera", "Kultirano", "Mecagnomo", "Terráneo", "Dracthyr", 
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_mage.jpg"
    },
    {
        nombre: "Brujo",
        roles: ["DPS"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Orco", "Trol", "No-Muerto", "Elfo de Sangre",
            "Goblin", "Pandaren", "Elfo del Vacío", "Enano Hierro Negro", "Kultirano", "Mecagnomo", "Terráneo", "Dracthyr", 
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_warlock.jpg"
    },
    {
        nombre: "Monje",
        roles: ["DPS", "Tanque", "Healer"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Elfo de Sangre", "Goblin", "Pandaren", "Elfo del Vacío", "Enano Hierro Negro",
            "Orco Mag'har", "Tauren Altamontaña", "Trol Zandalari", "Kultirano", "Vulpera", "Mecagnomo", "Terráneo",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_monk.jpg"
    },
    {
        nombre: "Druida",
        roles: ["DPS", "Tanque", "Healer"],
        razas: [
            "Elfo de la Noche", "Tauren", "Trol", "Huargen", "Elfo de Sangre", "Tauren Altamontaña",
            "Trol Zandalari", "Kultirano"
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_druid.jpg"
    },
    {
        nombre: "Cazador de Demonios",
        roles: ["DPS", "Tanque"],
        razas: ["Elfo de la Noche", "Elfo de Sangre"],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_demonhunter.jpg"
    },
    {
        nombre: "Caballero de la Muerte",
        roles: ["DPS", "Tanque"],
        razas: [
            "Humano", "Enano", "Elfo de la Noche", "Gnomo", "Draenei", "Huargen", "Orco", "Trol", "No-Muerto",
            "Tauren", "Elfo de Sangre", "Goblin", "Pandaren", "Elfo del Vacío", "Draenei Templeluz",
            "Enano Hierro Negro", "Orco Mag'har", "Tauren Altamontaña", "Trol Zandalari", "Kultirano", "Vulpera", "Mecagnomo",
        ],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_deathknight.jpg"
    },
    {
        nombre: "Evocador",
        roles: ["DPS", "Healer"],
        razas: ["Dracthyr"],
        icon: "https://wow.zamimg.com/images/wow/icons/large/class_evoker.jpg"
    }
];

// Iconos de roles
const rolesIcons = {
    "DPS": "../img/dps.png",
    "Tanque": "../img/tank.png",
    "Healer": "../img/healer.png"
};

// Iconos de razas (versión corregida)
const razaIcons = {
    "Humano": "https://wow.zamimg.com/images/wow/icons/large/race_human_male.jpg",
    "Enano": "https://wow.zamimg.com/images/wow/icons/large/race_dwarf_male.jpg",
    "Elfo de la Noche": "https://wow.zamimg.com/images/wow/icons/large/race_nightelf_male.jpg",
    "Gnomo": "https://wow.zamimg.com/images/wow/icons/large/race_gnome_male.jpg",
    "Draenei": "https://wow.zamimg.com/images/wow/icons/large/race_draenei_male.jpg",
    "Huargen": "https://wow.zamimg.com/images/wow/icons/large/race_worgen_male.jpg",
    "Orco": "https://wow.zamimg.com/images/wow/icons/large/race_orc_male.jpg",
    "Trol": "https://wow.zamimg.com/images/wow/icons/large/race_troll_male.jpg",
    "No-Muerto": "https://wow.zamimg.com/images/wow/icons/large/race_scourge_male.jpg",
    "Tauren": "https://wow.zamimg.com/images/wow/icons/large/race_tauren_male.jpg",
    "Elfo de Sangre": "https://wow.zamimg.com/images/wow/icons/large/race_bloodelf_male.jpg",
    "Goblin": "https://wow.zamimg.com/images/wow/icons/large/race_goblin_male.jpg",
    "Pandaren": "https://wow.zamimg.com/images/wow/icons/large/race_pandaren_male.jpg",
    "Vulpera": "https://wow.zamimg.com/images/wow/icons/large/race_vulpera_male.jpg",
    "Draenei Templeluz": "https://wow.zamimg.com/images/wow/icons/large/race_lightforgeddraenei_male.jpg",
    "Elfo del Vacío": "https://wow.zamimg.com/images/wow/icons/large/race_voidelf_male.jpg",
    "Enano Hierro Negro": "https://wow.zamimg.com/images/wow/icons/large/race_darkirondwarf_male.jpg",
    "Orco Mag'har": "https://wow.zamimg.com/images/wow/icons/large/race_magharorc_male.jpg",
    "Tauren Altamontaña": "https://wow.zamimg.com/images/wow/icons/large/race_highmountaintauren_male.jpg",
    "Trol Zandalari": "https://wow.zamimg.com/images/wow/icons/large/race_zandalaritroll_male.jpg",
    "Kultirano": "https://wow.zamimg.com/images/wow/icons/large/race_kultiran_male.jpg",
    "Dracthyr": "https://wow.zamimg.com/images/wow/icons/large/race_dracthyr_male.jpg",
    "Mecagnomo": "https://wow.zamimg.com/images/wow/icons/large/race_mechagnome_male.jpg",
    "Terráneo": "https://wow.zamimg.com/images/wow/icons/large/race_earthendwarf_male.jpg",    
};

// Función para generar un personaje aleatorio
function generarPersonaje() {
    const clase = clases[Math.floor(Math.random() * clases.length)];
    const rol = clase.roles[Math.floor(Math.random() * clase.roles.length)];
    const raza = clase.razas[Math.floor(Math.random() * clase.razas.length)];

    document.getElementById("personaje").innerHTML = `
                <div class="wow-card mx-auto p-4 mt-3" style="max-width: 600px;">
                    <h4 class="mb-4 text-center">¡Tu personaje generado!</h4>
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${rolesIcons[rol]}" alt="${rol}" class="wow-icon">
                            <p class="wow-role"><strong>${rol}</strong></p>
                        </div>
                        <div class="col-md-4">
                            <img src="${clase.icon}" alt="${clase.nombre}" class="wow-icon">
                            <p class="wow-class"><strong>${clase.nombre}</strong></p>
                        </div>
                        <div class="col-md-4">
                            <img src="${razaIcons[raza] || 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg'}" 
                                alt="${raza}" class="wow-icon">
                            <p class="wow-race"><strong>${raza}</strong></p>
                        </div>
                    </div>
                    <p class="mt-3 text-center">👉 Este es tu PJ para que levees adicto a los alters.</p>
                </div>
            `;
}

// Función para mostrar las clases en la cuadrícula
function renderClasses(roleFilter = 'all') {
    const classGrid = document.getElementById('classGrid');
    classGrid.innerHTML = '';

    clases.forEach(clase => {
        if (roleFilter === 'all' || clase.roles.includes(roleFilter)) {
            const classItem = document.createElement('div');
            classItem.className = 'class-item';
            classItem.innerHTML = `
                        <img src="${clase.icon}" alt="${clase.nombre}" class="class-icon">
                        <div class="class-name">${clase.nombre}</div>
                    `;
            classItem.addEventListener('click', () => showClassInfo(clase));
            classGrid.appendChild(classItem);
        }
    });
}

// Función para mostrar información de la clase seleccionada
function showClassInfo(clase) {
    const classInfo = document.getElementById('classInfo');
    classInfo.innerHTML = `
                <div class="text-center">
                    <img src="${clase.icon}" alt="${clase.nombre}" class="wow-icon mb-2">
                    <h4 class="wow-class">${clase.nombre}</h4>
                </div>
                <p><strong>Roles:</strong> ${clase.roles.join(', ')}</p>
                <p><strong>Razas disponibles:</strong></p>
                <div class="d-flex flex-wrap">
                    ${clase.razas.map(raza => `
                        <div class="text-center me-3 mb-2">
                            <img src="${razaIcons[raza] || 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg'}" 
                                alt="${raza}" class="wow-icon" style="width: 50px; height: 50px;">
                            <div>${raza}</div>
                        </div>
                    `).join('')}
                </div>
            `;
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    // Renderizar clases
    renderClasses();

    // Configurar el botón de generación
    document.getElementById('generateBtn').addEventListener('click', generarPersonaje);

    // Configurar filtros
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderClasses(this.getAttribute('data-role'));
        });
    });
});