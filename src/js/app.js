document.addEventListener('DOMContentLoaded', function() {
  caer();
  crearTuberias();
  
  crearContenedorTuberias();

  
});

const jugador = document.querySelector('.jugador');
let jugadorTop = 50; // Posición vertical inicial
const gravedad = 1; // Valor de la gravedad
const pantallaPerdiste = document.querySelector(".pantallaPerdiste");
const btnJugarOtraVez = document.querySelector(".btnJugarOtraVez");

btnJugarOtraVez.addEventListener('click', function () {
  btnJugarOtraVez.classList.add("oculto");
  console.log("Reiniciando el juego");
  
  pantallaPerdiste.classList.toggle('oculto');
  spawnTuberias = setInterval(crearContenedorTuberias, 1500);
   
  jugadorTop = 50; 
  
  jugadorActual.classList.toggle("oculto");

});

function caer() {
  jugadorTop += gravedad;
  jugador.style.top = jugadorTop + 'px';

  // Verifica colisiones con el suelo u otros elementos aquí

  requestAnimationFrame(caer);
}
const jugadorActual = document.querySelector(".jugador");
setInterval(detectarColision, 10); 
function detectarColision() { //detecta la colision
  const jugadorRect = jugador.getBoundingClientRect();
  const tuberiasSuperiores = document.querySelectorAll('.tuberiaSuperior');
  const tuberiasInferiores = document.querySelectorAll('.tuberiaInferior');
  
  // Comprobar si la altura del jugador es menor a 110
  if (jugadorRect.bottom > 545) {
    // Colisión detectada, el juego termina
    clearInterval(spawnTuberias);
    juegoTerminado = true;
    setTimeout(function() {
      var btnJugarOtraVez = document.querySelector('.btnJugarOtraVez');
      btnJugarOtraVez.classList.remove('oculto');
  }, 1500);
    pantallaPerdiste.classList.remove('oculto');
    jugadorActual.classList.add("oculto");
    return; // Salir de la función, ya que no es necesario comprobar las colisiones con las tuberías
  }

  // Comprobar colisiones con las tuberiasSuperiores
  tuberiasSuperiores.forEach((tuberiaSuperior) => {
    const tuberiaRectSuperior = tuberiaSuperior.getBoundingClientRect();

    if (
      jugadorRect.right > tuberiaRectSuperior.left &&
      jugadorRect.left < tuberiaRectSuperior.right &&
      jugadorRect.top < tuberiaRectSuperior.bottom &&
      jugadorRect.bottom > tuberiaRectSuperior.top
    ) {
      // Colisión detectada con tuberiaSuperior, el juego termina
      clearInterval(spawnTuberias);
      juegoTerminado = true;
      setTimeout(function() {
        var btnJugarOtraVez = document.querySelector('.btnJugarOtraVez');
        btnJugarOtraVez.classList.remove('oculto');
    }, 1700);
      pantallaPerdiste.classList.remove('oculto');
      jugadorActual.classList.add("oculto");
    }
  });

  // Comprobar colisiones con las tuberiasInferiores
  tuberiasInferiores.forEach((tuberiaInferior) => {
    const tuberiaRectInferior = tuberiaInferior.getBoundingClientRect();

    if (
      jugadorRect.right > tuberiaRectInferior.left &&
      jugadorRect.left < tuberiaRectInferior.right &&
      jugadorRect.top < tuberiaRectInferior.bottom &&
      jugadorRect.bottom > tuberiaRectInferior.top
    ) {
      // Colisión detectada con tuberiaInferior, el juego termina
      clearInterval(spawnTuberias);
      juegoTerminado = true;
      pantallaPerdiste.classList.remove('oculto');
      setTimeout(function() {
        var btnJugarOtraVez = document.querySelector('.btnJugarOtraVez');
        btnJugarOtraVez.classList.remove('oculto');
    }, 1500);
      jugadorActual.classList.add("oculto");
    }
  });
}







function crearContenedorTuberias() {
  const contenedorTuberias = document.createElement('div');
  contenedorTuberias.className = 'contenedorTuberias';
  
  const topAleatorio = Math.floor(Math.random() * (15 - (-15) + 1)) + (-15);
  contenedorTuberias.style.top = topAleatorio + 'rem';

  const tuberiaSuperior = document.createElement('div');
  tuberiaSuperior.className = 'tuberiaSuperior';
  
  const tuberiaInferior = document.createElement('div');
  tuberiaInferior.className = 'tuberiaInferior';
  
  // Agrega las tuberías al contenedor
  contenedorTuberias.appendChild(tuberiaSuperior);
  contenedorTuberias.appendChild(tuberiaInferior);
  
  // Agrega el contenedor al escenario
  const escenario = document.querySelector('.escenario');
  escenario.appendChild(contenedorTuberias);
  
  // Establece un temporizador para eliminar el contenedor después de 3 segundos
  setTimeout(function() {
    escenario.removeChild(contenedorTuberias);
  }, 3000);
}

// Crea un nuevo contenedor de tuberías cada 3 segundos
spawnTuberias = setInterval(crearContenedorTuberias, 1500);


const juegoEnMarcha = true;
