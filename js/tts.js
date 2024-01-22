// ElevenLabs API request
function realizarSolicitud(texto) {
  //const fetch = require("node-fetch"); // Necesario si estás ejecutando en un entorno no navegador (por ejemplo, Node.js)

  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj";

  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "86f1cfb14ed2c0c941e3a081699f323b",
  };

  const data = {
    text: texto,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then((buffer) => {
      const uint8Array = new Uint8Array(buffer);
      const blob = new Blob([uint8Array], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      // Puedes usar la URL para reproducir el audio o realizar otras acciones
      console.log("URL del audio:", url);
      const audio = new Audio(url);
      audio.play();
    })
    .catch((error) => console.error("Error:", error));
}

//This part of the code is for the webcam

function onPlay(videoElement) {
  // Esta función se llama cuando el video está listo para reproducirse
  console.log("Video is ready:", videoElement);
  // Puedes realizar acciones adicionales aquí si es necesario
}

// Function to get the location

//Function to take a picture
function tomarFoto() {
  // Obtener el video y el canvas
  var video = document.getElementById("inputVideo");
  var canvas = document.getElementById("overlay");

  // Configurar el canvas con el mismo tamaño que el video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Dibujar el fotograma actual del video en el canvas
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  // Obtener la URL de la imagen en formato base64
  var fotoURL = canvas.toDataURL("image/png");

  // Crear un elemento de imagen y asignar la URL
  var imagen = new Image();
  imagen.src = fotoURL;

  // Establecer el tamaño de la imagen
  imagen.width = 150;
  imagen.height = 150;

  // Eliminar cualquier imagen anterior si existe
  var imagenAnterior = document.getElementById("imagenCapturada");
  if (imagenAnterior) {
    imagenAnterior.parentNode.removeChild(imagenAnterior);
  }

  // Asignar un ID a la imagen para que puedas referenciarla fácilmente si es necesario
  imagen.id = "imagenCapturada";

  // Añadir la imagen a un contenedor específico (puedes cambiar el ID según tus necesidades)
  var contenedorImagen = document.getElementById("overlay");
  contenedorImagen.appendChild(imagen);

  // Mostrar las coordenadas
  mostrarCoordenadas();
}

function mostrarCoordenadas() {
  // Obtener la ubicación actual
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Éxito: position es un objeto con la información de la ubicación
      var coordenadasDiv = document.getElementById("coordenadas");
      coordenadasDiv.innerHTML =
        "Your exact location:<br>Latitud: " +
        position.coords.latitude +
        "<br>Longitud: " +
        position.coords.longitude;
    },
    function (error) {
      // Error: manejar errores aquí
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permiso denegado para obtener la ubicación.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Información de ubicación no disponible.");
          break;
        case error.TIMEOUT:
          alert("La solicitud para obtener la ubicación ha caducado.");
          break;
        case error.UNKNOWN_ERROR:
          alert("Ocurrió un error desconocido al obtener la ubicación.");
          break;
      }
    }
  );
}
