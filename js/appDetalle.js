// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const categoria = params.get("categoria");

let archivo = "";
if (categoria === "noticia") archivo = "../data/noticias.json";
if (categoria === "guia") archivo = "../data/guias.json";
if (categoria === "weekly") archivo = "../data/weekly.json";

fetch(archivo)
    .then(res => res.json())
    .then(items => {
        const item = items.find(i => i.id === id);
        if (!item) {
            document.getElementById("details").innerHTML = "<p>Contenido no encontrado</p>";
            return;
        }

        const details = document.getElementById("details");
        // Cabecera del artículo
        details.innerHTML = `
    <h1>${item.titulo}</h1>
    <em>${item.fecha}</em>
    <img src="${item.imagen}" alt="${item.titulo}" style="max-width: 100%; height: auto;">
    <div class="like-section" data-id="${item.id}">
        <button class="like-btn">❤️</button>
        <span class="like-count">${localStorage.getItem(`likes_${item.id}`) || 0}</span>
    </div>
`;

        // Renderizado específico para weekly
        if (categoria === "weekly") {
            let weeklyContent = `<p><strong>${item.texto}</strong></p>`;

            // Mostrar afijos
            if (item.afijos && item.afijos.length > 0) {
                weeklyContent += `<h2>Afijos de la semana</h2>`;
                weeklyContent += `<div class="afijos-container">`;
                item.afijos.forEach(afijo => {
                    weeklyContent += `
                        <div class="afijo-item">
                            <img src="${afijo.icono}" alt="${afijo.nombre}" style="width: 50px; height: 50px;">
                            <h3>${afijo.nombre}</h3>
                            <p>${afijo.descripcion}</p>
                        </div>
                    `;
                });
                weeklyContent += `</div>`;
            }

            // Mostrar mapas
            if (item.mapas && item.mapas.length > 0) {
                weeklyContent += `<h2>Mazmorras de esta season</h2>`;
                weeklyContent += `<ul class="mapas-list">`;
                item.mapas.forEach(mapa => {
                    weeklyContent += `<li>${mapa}</li>`;
                });
                weeklyContent += `</ul>`;
            }

            details.innerHTML += weeklyContent;
        }
        // Renderizado para noticias y guías (contenido extendido)
        else if (item.contenido && Array.isArray(item.contenido)) {
            item.contenido.forEach(bloque => {
                let html = "";
                switch (bloque.tipo) {
                    case "parrafo":
                        html = `<p>${bloque.texto}</p>`;
                        break;
                    case "subtitulo":
                        html = `<h2>${bloque.texto}</h2>`;
                        break;
                    case "lista":
                        html = `<ul>${bloque.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
                        break;
                    case "blockquote":
                        html = `<blockquote>${bloque.texto}</blockquote>`;
                        break;
                    case "link":
                        html = `<p><a href="${bloque.url}" target="_blank">${bloque.texto}</a></p>`;
                        break;
                }
                details.innerHTML += html;
            });
        } else {
            // Fallback si no hay bloques extendidos
            details.innerHTML += `<p>${item.texto}</p>`;
        }
    })
    .catch(err => {
        console.error("Error cargando details:", err);
        document.getElementById("details").innerHTML =
            "<p>Error al cargar el contenido. Intenta más tarde.</p>";
    });
// Evento like en detalle
details.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        const section = e.target.closest('.like-section');
        const itemId = section.getAttribute('data-id');
        const likeKey = `likes_${itemId}`;
        let current = parseInt(localStorage.getItem(likeKey)) || 0;

        const userLikedKey = `userLiked_${itemId}`;
        if (localStorage.getItem(userLikedKey)) return;

        current++;
        localStorage.setItem(likeKey, current);
        localStorage.setItem(userLikedKey, 'true');
        section.querySelector('.like-count').textContent = current;
    }
});

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
    setTimeout(inicializarLikes, 500);
}
