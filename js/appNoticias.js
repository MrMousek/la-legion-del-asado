function renderItems(jsonFile, containerId) {
    fetch(jsonFile)
        .then(res => res.json())
        .then(items => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';

            items.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-item';

                // Generar ID único para likes
                const likeKey = `likes_${item.id}`;
                let likeCount = parseInt(localStorage.getItem(likeKey)) || 0;

                article.innerHTML = `
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="news-content">
                        <h3 class="news-title">
                            <a href="./pages/details.html?id=${item.id}&categoria=${item.categoria}">
                                ${item.titulo}
                            </a>
                        </h3>
                        <span class="fecha">
                            ${tiempoRelativo(item.fecha)}
                        </span>
                        <p class="news-text">${item.texto}</p>
                    </div>
                `;
                container.appendChild(article);
            });
            function tiempoRelativo(fecha) {

                const ahora = new Date();
                const fechaNoticia = new Date(fecha);

                const diff = ahora - fechaNoticia;

                const minutos = Math.floor(diff / 60000);
                const horas = Math.floor(diff / 3600000);
                const dias = Math.floor(diff / 86400000);
                const meses = Math.floor(diff / 2592000000);

                if (minutos < 1) return "Recién";
                if (minutos < 60) return `Hace ${minutos} min`;
                if (horas < 24) return `Hace ${horas} horas`;
                if (dias === 0) return "Hoy";
                if (dias === 1) return "Ayer";
                if (dias < 30) return `Hace ${dias} días`;

                return `Hace ${meses} meses`;

            }

            // Delegar evento de likes
            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('like-btn')) {
                    const section = e.target.closest('.like-section');
                    const itemId = section.getAttribute('data-id');
                    const likeKey = `likes_${itemId}`;
                    let current = parseInt(localStorage.getItem(likeKey)) || 0;

                    // Evitar múltiples likes del mismo usuario
                    const userLikedKey = `userLiked_${itemId}`;
                    if (localStorage.getItem(userLikedKey)) return;

                    current++;
                    localStorage.setItem(likeKey, current);
                    localStorage.setItem(userLikedKey, 'true');
                    section.querySelector('.like-count').textContent = current;
                }
            });
        })
        .catch(error => {
            console.error('Error loading', jsonFile, error);
            document.getElementById(containerId).innerHTML = '<p>Error cargando contenido</p>';
        });
}
function inicializarLikes() {
    document.querySelectorAll('.like-section').forEach(section => {
        const slug = section.dataset.id;
        const countEl = section.querySelector('.like-count');
        const btn = section.querySelector('.like-btn');

        // Obtener likes actuales desde Netlify
        fetch(`/.netlify/functions/getLikes?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                countEl.textContent = data.likes;
            });

        btn.addEventListener('click', () => {
            if (localStorage.getItem(`liked_${slug}`)) return;

            fetch('/.netlify/functions/like', {
                method: 'POST',
                body: JSON.stringify({ slug }),
            })
                .then(res => res.json())
                .then(data => {
                    countEl.textContent = data.likes;
                    localStorage.setItem(`liked_${slug}`, true);
                });
        });
    });
}

// Cargar bloques - CORREGIR RUTAS
renderItems('./data/noticias.json', 'news-container');
renderItems('./data/weekly.json', 'weekly-container');
renderItems('./data/guias.json', 'guides-container');

// 👇 Esto va al final del render
setTimeout(inicializarLikes, 500);
