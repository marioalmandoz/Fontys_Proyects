const cacheName = "StolpersteineFinal";
const appFiles = [
  "./",
  "manifest.webmanifest",
  "js/tts.js",
  "js/scripts.js",
  "css/home.css",
  "css/map.css",
  "index.html",
  "map.html",
  "tts.html",
  "camera.html",
  "history.html",
  "eduard.html",
  "helmut.html",
  "images/Auschwitz.png",
  "images/background text.png",
  "images/Captura de pantalla 2024-01-14 134257.png",
  "images/Demer.png",
  "images/Eduard Hornemann.png",
  "images/eindhoven-philips-hd.jpg",
  "images/finallogo.png",
  "images/Helmut Loewenstein.png",
  "images/http___collectie.atlasvanstolk.nl_img_AVS_700px_06_AVS065170.jpg.jpg",
  "images/https___images.memorix.nl_niod_thumb_1000x1000_7d211b84-2075-02b7-4ee3-a0597a1871ee.jpg.jpg",
  "images/https___images.memorix.nl_niod_thumb_1000x1000_43f54f2e-656c-7860-2088-0a996f3b1835.jpg.jpg",
  "images/IMG_5461.jpg",
  "images/small_stolpersteine_newlogo.png",
  "images/stolpersteinestone.png",
];

self.addEventListener("install", (installing) => {
  console.log("Service Worker: I am being installed, hello world!");
  //Put important offline files in cache on installation of the service worker
  installing.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Service Worker: Caching important offline files");
      return cache.addAll(appFiles);
    })
  );
});

self.addEventListener("activate", (activating) => {
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch", (fetching) => {
  console.log("Service Worker: User threw a ball, I need to fetch it!");
  fetching.respondWith(
    caches.match(fetching.request.url).then((response) => {
      console.log("Service Worker: Fetching resource " + fetching.request.url);
      console.log(response);
      return (
        response ||
        fetch(fetching.request)
          .then((response) => {
            console.log(
              "Service Worker: Resource " +
                fetching.request.url +
                " not available in cache"
            );
            return caches.open(cacheName).then((cache) => {
              console.log(
                "Service Worker: Caching (new) resource " + fetching.request.url
              );
              // cache.put(fetching.request,response.clone(images/yes.gif));
              return response;
            });
          })
          .catch(function () {
            //hier thimo
            console.log("Service Worker: Fetching online failed, HAALLPPPP!!!");
            //Do something else with the request (for example: respond with a different cached file)
          })
      );
    })
  );
});

self.addEventListener("push", (pushing) => {
  console.log(
    "Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :("
  );
});
