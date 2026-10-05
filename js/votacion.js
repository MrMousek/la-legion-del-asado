// Configuración de Supabase - Reemplaza con tus datos reales
const SUPABASE_URL = 'https://rvdhhgkmdiorgdsihndl.supabase.co';
const SUPABASE_ANON_KEY = 'SUPA_ANON_KEY';

const supabaseClient = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

let pollChartInstance = null;

// Obtener IP pública del usuario
async function obtenerIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// Cargar y renderizar gráfico con conteo de votos
async function cargarResultadosGrafico() {
    if (!supabaseClient) return;

    try {
        const { data: votos, error } = await supabaseClient
            .from('votos')
            .select('opcion');

        if (error) throw error;

        // Contabilizar votos por opción
        const conteo = {
            'Alianza - PvP': 0,
            'Alianza - PvE': 0,
            'Horda - PvP': 0,
            'Horda - PvE': 0
        };

        votos.forEach(v => {
            if (conteo[v.opcion] !== undefined) {
                conteo[v.opcion]++;
            }
        });

        const ctx = document.getElementById('pollChart').getContext('2d');

        // Destruir instancia previa si existe para evitar solapamientos
        if (pollChartInstance) {
            pollChartInstance.destroy();
        }

        pollChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Alianza PvP', 'Alianza PvE', 'Horda PvP', 'Horda PvE'],
                datasets: [{
                    label: 'Votos',
                    data: [
                        conteo['Alianza - PvP'],
                        conteo['Alianza - PvE'],
                        conteo['Horda - PvP'],
                        conteo['Horda - PvE']
                    ],
                    backgroundColor: [
                        'rgba(0, 120, 212, 0.85)',
                        'rgba(0, 180, 216, 0.85)',
                        'rgba(179, 0, 0, 0.85)',
                        'rgba(230, 57, 70, 0.85)'
                    ],
                    borderColor: [
                        '#0078d4',
                        '#00b4d8',
                        '#b30000',
                        '#e63946'
                    ],
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0, color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#ffffff', font: { weight: 'bold' } },
                        grid: { display: false }
                    }
                }
            }
        });
    } catch (err) {
        console.error('Error al cargar resultados del gráfico:', err);
    }
}

// Emisión de voto
async function votarGuild(opcion) {
    const statusEl = document.getElementById('poll-status');
    statusEl.style.color = '#ffc107';
    statusEl.textContent = 'Procesando voto...';

    if (localStorage.getItem('llan_voted') === 'true') {
        statusEl.style.color = '#dc3545';
        statusEl.textContent = '❌ Ya has registrado un voto desde este navegador.';
        return;
    }

    try {
        const userIP = await obtenerIP();

        const { data: votosExistentes, error: checkError } = await supabaseClient
            .from('votos')
            .select('ip')
            .eq('ip', userIP);

        if (checkError) throw checkError;

        if (votosExistentes && votosExistentes.length > 0) {
            localStorage.setItem('llan_voted', 'true');
            statusEl.style.color = '#dc3545';
            statusEl.textContent = '❌ Ya se ha registrado un voto desde esta dirección IP.';
            return;
        }

        const { error: insertError } = await supabaseClient
            .from('votos')
            .insert([{ ip: userIP, opcion: opcion }]);

        if (insertError) throw insertError;

        localStorage.setItem('llan_voted', 'true');

        statusEl.style.color = '#28a745';
        statusEl.textContent = `✅ ¡Voto registrado con éxito para: ${opcion}!`;

        // Actualizar gráfico inmediatamente
        cargarResultadosGrafico();
    } catch (err) {
        console.error('Error al votar:', err);
        statusEl.style.color = '#dc3545';
        statusEl.textContent = '⚠️ Hubo un error al guardar tu voto.';
    }
}

// Inicializar el gráfico cuando la página carga
document.addEventListener('DOMContentLoaded', cargarResultadosGrafico);