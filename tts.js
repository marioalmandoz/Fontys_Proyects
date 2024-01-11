function leerTexto() {
  // Obtener el elemento que contiene el texto a leer
  var elementoTexto = document.getElementById("textoAVoz");

  // Crear un objeto SpeechSynthesisUtterance con el texto
  var mensaje = new SpeechSynthesisUtterance(elementoTexto.innerText);

  // Usar la API de Text-to-Speech para leer el mensaje
  window.speechSynthesis.speak(mensaje);
}

// ElevenLabs API request
function realizarSolicitud() {
  //const fetch = require("node-fetch"); // Necesario si estás ejecutando en un entorno no navegador (por ejemplo, Node.js)

  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj";

  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "86f1cfb14ed2c0c941e3a081699f323b",
  };

  const data = {
    text: "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
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
const video = document.getElementById("inputVideo");
const canvas = document.getElementById("overlay");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  const constraints = { video: true };
  //This is for the smartphone
  //const constraints = { video: { facingMode: 'user'/'enviroment' } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error("Error al acceder a la cámara:", error);
    });
} else {
  console.error("La API getUserMedia no está disponible en este navegador.");
}

function onPlay(videoElement) {
  // Esta función se llama cuando el video está listo para reproducirse
  console.log("Video is ready:", videoElement);
  // Puedes realizar acciones adicionales aquí si es necesario
}

//Codigo para el mapa
function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: coord,
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map,
  });
}
