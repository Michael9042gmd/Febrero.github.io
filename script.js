document.querySelector('.heart').addEventListener('click', function() { 
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '1.pdf', true); // Asegúrate de que el archivo esté en la misma carpeta del HTML
  xhr.responseType = 'blob'; 
  xhr.onload = function() {
      if (xhr.status === 200) {
          const blob = xhr.response;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Cartita.pdf'; // Nombre con el que se guardará el archivo
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
      } else {
          console.error('No se pudo descargar el archivo.');
      }
  };
  xhr.onerror = function() {
      console.error('Error en la solicitud AJAX');
  };
  xhr.send();
});

// Configuración de la cuenta regresiva
var countDownMinutes = 1; // Tiempo en minutos
var now = new Date().getTime();
var countDownDate = now + countDownMinutes * 60 * 1000; // Sumar 3 minutos al tiempo actual

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
