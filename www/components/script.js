(() => {
  const start = document.getElementById("start");
  const app = document.getElementById("app");
  app.style.display = "none";
  const btnStart = document.getElementById("btnStart");
  const btnBack = document.getElementById("back");
 
  btnStart.onclick = () => {
  app.style.display = "block";    
  start.style.display = "none";  
  }
  btnBack.onclick = () => {
  app.style.display = "none";    
  start.style.display = "block";  
  }
  let showMap = false;
  const vibra = document.getElementById("vibra");
  const camera = document.getElementById("camera");
  const btnMapa = document.getElementById("btnMapa");
  const btnBarcode = document.getElementById("barcode");
  const map = document.getElementById("map");
  vibra.onclick = () => {
    navigator.vibrate(3000);
  };

  camera.onclick = () => {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI
    });

    function onSuccess(imageURI) {
      var image = document.getElementById("img");
      image.src = imageURI;
    }

    function onFail(message) {
      function alertDismissed() {}
    }
  };

  btnMapa.onclick = () => {
    showMap = !showMap;
    if (showMap) {
      map.style.display = "block";
      btnMapa.innerHTML = "Aguarde...";
      var onSuccess = function(position) {
        btnMapa.innerHTML = "Esconder";
        L.mapquest.key = "R7FVoAc2JWm0iuZfs22keZSALq3mRaJk";

        var map = L.mapquest.map("map", {
          center: [position.coords.latitude, position.coords.longitude],
          layers: L.mapquest.tileLayer("map"),
          zoom: 15
        });

        L.marker([position.coords.latitude, position.coords.longitude])
          .addTo(map)
          .bindPopup("Você está aqui!");
      };

      navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
      map.style.display = "none";
      btnMapa.innerHTML = "Mapa com a localização atual";
    }
  };

  // BARCODE ============================================
  btnBarcode.onclick = () => {
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        alert('O código escaneado é: ' + result.text);
      },
      function (error) {
          alert("Falha no scan: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloce o código em frente a câmera!", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
  }
    
})();
