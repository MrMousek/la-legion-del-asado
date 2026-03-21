fetch('raid.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('raid');

        let html = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <h3>Inscritos:</h3>
    `;

        data.signUps.forEach(p => {
            html += `
        <div>
        ${p.name} - ${p.className} (${p.specName})
        </div>
    `;
        });

        container.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));