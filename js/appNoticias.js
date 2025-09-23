function renderItems(jsonFile, containerId) {
    fetch(jsonFile)
        .then(res => res.json())
        .then(items => {
            const container = document.getElementById(containerId);
            items.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-item';
                article.innerHTML = `
        <img src="${item.imagen}" alt="${item.titulo}">
        <div class="news-content">
            <h3 class="news-title">
            <a href="./pages/detalle.html?id=${item.id}&categoria=${item.categoria}">
                ${item.titulo}
            </a>
            </h3>
            <p class="news-meta">${item.fecha}</p>
            <p class="news-text">${item.texto}</p>
        </div>
        `;
                container.appendChild(article);
            });
        });
}

// Cargar bloques
renderItems('./data/noticias.json', 'news-container');
renderItems('./data/guias.json', 'guides-container');
renderItems('./data/weekly.json', 'weekly-container');
