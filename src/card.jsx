import React, { useState } from 'react';
import './index.css';
import html2canvas from 'html2canvas';

export default function Card() {
  const [logoUrl, setLogoUrl] = useState(null); // Para guardar la URL de la imagen seleccionada
  const [errorMessage, setErrorMessage] = useState('');

  const generarTarjeta = () => {
    var nombre = document.getElementById("name").value;
    var correo = document.getElementById("email").value;
    var sitioWeb = document.getElementById("website").value;
    var ocupacion = document.getElementById("occupation").value;
    var logo = document.getElementById("logo").files[0];
    var color = document.getElementById("color").value;
    var textColor = document.getElementById("text-color").value;

    // Verificar si se ha seleccionado una imagen, si no, mostrar un mensaje de error
    if (!logo && !logoUrl) {
      setErrorMessage('Por favor, selecciona una imagen para el logo.');
      return;
    }

    setErrorMessage(''); // Limpiar el mensaje de error si todo está correcto

    var tarjetaGenerada = document.querySelector(".tarjeta-generada");
    
    // Si se seleccionó una imagen, leerla
    if (logo) {
      var reader = new FileReader();
      reader.onload = function (event) {
        setLogoUrl(event.target.result); // Guardar la URL de la imagen
        renderTarjeta(nombre, correo, sitioWeb, ocupacion, logoUrl, color, textColor, tarjetaGenerada);
      };
      reader.readAsDataURL(logo);
    } else {
      // Si no se seleccionó imagen, renderizar con la URL predeterminada
      renderTarjeta(nombre, correo, sitioWeb, ocupacion, logoUrl, color, textColor, tarjetaGenerada);
    }
  };

  const renderTarjeta = (nombre, correo, sitioWeb, ocupacion, logoUrl, color, textColor, tarjetaGenerada) => {
    tarjetaGenerada.innerHTML = `
      <div class="tarjeta1">
        <img class="logo" src="${logoUrl || 'default-logo.png'}" alt="Logo"><br>
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
      .tarjeta-generada h2, p {
        color: ${textColor};
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

  return (
    <div>
      <div className="contenido">
        <h3>Crea tu propia tarjeta personalizada</h3>
        <ul>
          <li><i>Para generar una tarjeta es obligatorio cargar una imagen</i></li>
          <li><i>Se puede rellenar las entradas con cualquier texto</i></li>
          <li><i>Se pueden dejar entradas vacías</i></li>
        </ul>
      </div>
      <div className="tarjeta-generada">
        <div className="tarjeta1">
          <img className="logo" src={logoUrl || ''} alt="Logo"/><br/>
          <label className="custom-file">
            <input type="file" id="logo" name="logo" onChange={(e) => setLogoUrl(URL.createObjectURL(e.target.files[0]))}/>
            <span className="custom-file-button">Seleccionar imagen</span>
          </label>
          <p id="file-name">Ningún archivo seleccionado</p>
        </div>

        <div className="tarjeta2">
          <h2 className="nombre"><input placeholder="Nombre" type="text" id="name" name="name"/></h2>
          <p className="ocupacion"><input placeholder="Ocupacion" type="text" id="occupation" name="occupation"/></p>
        </div>
        <div className="tarjeta3">
          <div className="izquierda">
            <p className="sitio-web"><input placeholder="Paginaweb" type="url" id="website" name="website"/></p>
          </div>
          <div className="derecha">
            <p className="correo"><input placeholder="Email" type="email" id="email" name="email"/></p>
          </div>
        </div>
      </div>
      <div className="color">
        <label htmlFor="color">Color de fondo:</label>
        <input placeholder="color de fondo" type="color" id="color"/>
        <label htmlFor="text-color">Color del texto:</label>
        <input placeholder="color de texto" type="color" id="text-color" name="text-color" value="#FFFFFF"/>
      </div>
      <br/><br/>
      <div className="contenido">
        <button id="generate-card" onClick={generarTarjeta} type="submit">Generar tarjeta de visita</button>
        <button id="refresh" onClick={() => window.location.reload()}>Generar otra tarjeta</button>
        <button id="download">Descargar tarjeta de visita</button>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
}
