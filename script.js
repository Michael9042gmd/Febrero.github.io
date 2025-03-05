document.querySelector('.heart').addEventListener('click', function() {  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '1.pdf', true); // Intenta descargar el archivo localmente
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Cartita.pdf'; // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } else {
            console.error('❌ No se pudo descargar el archivo local. Intentando Google Drive...');
            descargarDesdeDrive();
        }
    };

    xhr.onerror = function() {
        console.error('❌ Error en la solicitud AJAX. Intentando Google Drive...');
        descargarDesdeDrive();
    };

    xhr.send();
});

// Función para descargar desde Google Drive
function descargarDesdeDrive() {
    const driveLink = 'https://drive.google.com/uc?export=download&id=1z5Pk2_C365UfyNbWjdxy0UW5bixlr94E';
    window.location.href = driveLink;
}

// Configuración de la cuenta regresiva
var countDownMinutes = 1; // Tiempo en minutos
var now = new Date().getTime();
var countDownDate = now + countDownMinutes * 60 * 1000; // Sumar minutos al tiempo actual

// Guardar el nuevo tiempo en localStorage
localStorage.setItem('countDownDate', countDownDate.toString());

var x = setInterval(function() {
    var now = new Date().getTime();
    var countDownDate = parseInt(localStorage.getItem('countDownDate'), 10);
    var distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").textContent = `Nueva carta en: ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(x); // Detiene el temporizador
        document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
    }
}, 1000);

