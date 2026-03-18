document.querySelectorAll(".fecha").forEach(el => {

const fecha = new Date(el.dataset.date);
const ahora = new Date();

const diff = ahora - fecha;

const minutos = Math.floor(diff / 60000);
const horas = Math.floor(diff / 3600000);
const dias = Math.floor(diff / 86400000);
const meses = Math.floor(diff / 2592000000);

let texto = "";

if (minutos < 1) {
texto = "Recién";
}

else if (minutos < 60) {
texto = `Hace ${minutos} min`;
}

else if (horas < 24) {
texto = `Hace ${horas} horas`;
}

else if (dias < 30) {
texto = `Hace ${dias} días`;
}

else {
texto = `Hace ${meses} meses`;
}

el.textContent = texto;

});