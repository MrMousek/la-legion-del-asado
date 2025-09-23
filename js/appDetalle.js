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
        if (!item) return;

        const detalle = document.getElementById("detalle");

        // Cabecera del artículo
        detalle.innerHTML = `
    <h1>${item.titulo}</h1>
    <em>${item.fecha}</em>
    <img src="${item.imagen}" alt="${item.titulo}">
    `;

        // Renderizado dinámico del contenido
        if (item.contenido && Array.isArray(item.contenido)) {
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
                detalle.innerHTML += html;
            });
        } else {
            // Fallback si no hay bloques extendidos
            detalle.innerHTML += `<p>${item.texto}</p>`;
        }
    })
    .catch(err => {
        console.error("Error cargando detalle:", err);
        document.getElementById("detalle").innerHTML =
            "<p>Error al cargar el contenido. Intenta más tarde.</p>";
    });
