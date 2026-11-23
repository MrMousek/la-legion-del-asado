   document.addEventListener("DOMContentLoaded", function () {
        // Verifica si ya se mostró en esta sesión para no ser invasivo
        if (!sessionStorage.getItem("cafecitoModalVisto")) {
            setTimeout(function () {
                const modalElement = document.getElementById("cafecitoDwarfModal");
                if (modalElement) {
                    const cafecitoModal = new bootstrap.Modal(modalElement);
                    cafecitoModal.show();
                    sessionStorage.setItem("cafecitoModalVisto", "true");
                }
            }, 1200); // Demora de 1.2 segundos para que cargue bien la página antes de saltar
        }
    });
