function renderItems(jsonFile, containerId) {
    fetch(jsonFile)
        .then(res => res.json())
        .then(items => {
            const container = document.getElementById(containerId);
            // Limpiar contenedor primero
            container.innerHTML = '';
            
            items.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-item';
                article.innerHTML = `
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="news-content">
                        <h3 class="news-title">
                            <a href="./pages/details.html?id=${item.id}&categoria=${item.categoria}">
                                ${item.titulo}
                            </a>
                        </h3>
                        <p class="news-meta">${item.fecha}</p>
                        <p class="news-text">${item.texto}</p>
                    </div>
                `;
                container.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error loading', jsonFile, error);
            const container = document.getElementById(containerId);
            container.innerHTML = '<p>Error cargando contenido</p>';
        });
}

// Cargar bloques - CORREGIR RUTAS
renderItems('./data/noticias.json', 'news-container');
renderItems('./data/weekly.json', 'weekly-container');
renderItems('./data/guias.json', 'guides-container');