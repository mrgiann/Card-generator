function generarTarjeta() {
  var nombre = document.getElementById("name").value;
  var correo = document.getElementById("email").value;
  var sitioWeb = document.getElementById("website").value;
  var ocupacion = document.getElementById("occupation").value;
  var logo = document.getElementById("logo").files[0]; 
  var color = document.getElementById("color").value; 
  var textColor = document.getElementById("text-color").value;

  var tarjetaGenerada = document.querySelector(".tarjeta-generada");

  var reader = new FileReader();

  reader.onload = function (event) {
    var logoUrl = event.target.result;
    tarjetaGenerada.innerHTML = `
    <div class="tarjeta1">
      <img class="logo" src="${logoUrl}" alt="Logo"><br>
    </div>
    <div class="tarjeta2">
      <h2 class="nombre">${nombre}</h2>
      <p class="ocupacion">${ocupacion}</p>
    </div>
    <div class="tarjeta3">
      <div class="izquierda">
        <p class="sitio-web">${sitioWeb}</p>
      </div>
      <div class="derecha">
        <p class="correo">${correo}</p>
      </div>
    </div>
  </div>
  <style>     
    .tarjeta-generada {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      margin: auto;
      width: 500px;
      height: 210px;
      background-color: ${color};
      border: 1px solid black;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .tarjeta-generada h2, p{
      color: ${textColor}
    }
    .tarjeta1 {
      width: 30%;
      height: 50%;
    }
    .tarjeta2 {
      width: 70%;
    }
    .tarjeta3 {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .tarjeta3 .izquierda {
      margin-top: 70px;
      display: flex;
      justify-content: flex-start;
    }
    .tarjeta3 .derecha {
      margin-top: 70px;
      display: flex;
      justify-content: flex-end;
    }
    .logo {
      border-radius: 10px;
      width: 100px;
      height: 100px;
      object-fit: contain;
      margin-bottom: 5px;
    }
  </style>
  `;

    var botonDescarga = document.getElementById("download");
    botonDescarga.addEventListener("click", function () {
      // Ocultar los bordes de la tarjeta generada
      tarjetaGenerada.style.border = "none";
      html2canvas(tarjetaGenerada, { backgroundColor: null }).then(function (canvas) {
        var enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = canvas.toDataURL("image/png");
        enlaceDescarga.download = "tarjeta-generada.png";
        enlaceDescarga.click();
      });
    });
  };

  // Leer el contenido del archivo de imagen y convertirlo en una URL de objeto de datos
  reader.readAsDataURL(logo);
}
