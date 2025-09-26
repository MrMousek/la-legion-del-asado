// weekly-affixes.js - Versión Ultra Simple
document.addEventListener('DOMContentLoaded', function() {
    // Cargar y mostrar los aflijos
    fetch('../data/weekly.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(weekData => {
            const week = weekData[0]; // Tomamos el primer (y único) elemento del array
            displayWeeklyAffixes(week);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weekly-affixes-container').innerHTML = `
                <div class="weekly-error">
                    <p>⚠️ Error al cargar los aflijos semanales</p>
                </div>
            `;
        });

    function displayWeeklyAffixes(week) {
        const container = document.getElementById('weekly-affixes-container');
        
        // Generar HTML para los aflijos
        const affixesHTML = week.afijos.map(affix => `
            <div class="affix-card">
                <div class="affix-header">
                    <img src="${affix.icono}" alt="${affix.nombre}" class="affix-icon">
                    <h4>${affix.nombre}</h4>
                </div>
                <p class="affix-desc">${affix.descripcion}</p>
            </div>
        `).join('');

        // Generar HTML para los mapas
        const mapsHTML = week.mapas.map(map => `<li>${map}</li>`).join('');

        // Insertar todo en el contenedor
        container.innerHTML = `
            <div class="weekly-section">
                <div class="weekly-header">
                    <h2>${week.titulo}</h2>
                    <span class="weekly-date">${week.fecha}</span>
                    <p class="weekly-text">${week.texto}</p>
                </div>
                
                <div class="affixes-container">
                    <h3>Aflijos activos esta semana:</h3>
                    <div class="affixes-grid">
                        ${affixesHTML}
                    </div>
                </div>
                
                <div class="maps-container">
                    <h3>Mapas en rotación (M+10 y superior):</h3>
                    <ul class="maps-list">
                        ${mapsHTML}
                    </ul>
                </div>
            </div>
        `;
    }
});