function obtenerHoraDecimal() {
  const ahora = new Date();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  return horas + minutos / 60;
}

function decimalAHora(decimal) {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

function minutosHasta(valorSalida, horaActualDecimal) {
  const diferenciaHoras = valorSalida - horaActualDecimal;
  return Math.max(0, Math.round(diferenciaHoras * 60));
}

function pintarCard(colectivo, esProximo, horaActualDecimal) {
  const clase = esProximo ? "card-proxima" : "";
  const id = esProximo ? 'id="proximo-colectivo"' : "";

  const paradas = colectivo.recorrido;
  const ultimaParada = paradas[paradas.length - 1];
  const paradasIntermedias = paradas.slice(0, -1);

  const badge = esProximo
    ? `<span class="badge-proximo">Próximo · en ${minutosHasta(
        colectivo.valor_salida,
        horaActualDecimal
      )} min</span>`
    : "";

  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card ${clase}" ${id}>
        <div class="card-body">
          <div class="card-header-horario">
            <h3 class="hora mb-0">${colectivo.nombre}</h3>
            ${badge}
          </div>
        </div>

        <ul class="list-group list-group-flush lista-paradas">
          ${paradasIntermedias
            .map((p) => `<li class="list-group-item parada">📍 ${p}</li>`)
            .join("")}
          <li class="list-group-item parada parada-final">🏁 ${ultimaParada}</li>
        </ul>
      </div>
    </div>
  `;
}

const dia = new Date();
const diaDeHoy = dia.getDay();

let diaDeSemana;
let nombreDia;

switch (diaDeHoy) {
  case 6:
    diaDeSemana = "sabados";
    nombreDia = "Sabado";
    break;
  case 0:
    diaDeSemana = "domingos";
    nombreDia = "Domingo";
    break;
  default:
    diaDeSemana = "lunesAViernes";
    nombreDia = "Día de semana (Lunes a Viernes)";
}

// El título y la referencia de cada ruta NO están escritos acá:
// se leen desde los atributos data-titulo y data-referencia
// que tiene el div#cards-container en CADA página HTML.
const contenedor = document.getElementById("cards-container");
const tituloRuta = contenedor.dataset.titulo;
const referenciaRuta = contenedor.dataset.referencia;

document.getElementById("tituloHorarios").innerText = tituloRuta;
document.getElementById("subTituloHorarios").innerText = `⏱️ ${nombreDia}`;

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.innerText = new Date().getFullYear();
}

async function cargarHorarios() {
  try {
    const respuesta = await fetch("../js/horarios.json");
    const datos = await respuesta.json();

    const colectivosRuta = datos[diaDeSemana].filter(
      (colectivo) => colectivo.referencia == referenciaRuta
    );

    const horaActualDecimal = obtenerHoraDecimal();

    contenedor.innerHTML = "";

    if (colectivosRuta.length === 0) {
      contenedor.innerHTML = `
        <p class="text-center text-light">
          No hay horarios cargados para esta ruta en este día.
        </p>
      `;
      return;
    }

    const proximoColectivo = colectivosRuta.find(
      (colectivo) => colectivo.valor_salida > horaActualDecimal
    );

    colectivosRuta.forEach((colectivo) => {
      const esProximo = colectivo === proximoColectivo;
      contenedor.innerHTML += pintarCard(
        colectivo,
        esProximo,
        horaActualDecimal
      );
    });

    const filaProxima = document.getElementById("proximo-colectivo");
    if (filaProxima) {
      filaProxima.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } catch (error) {
    console.log(error);
  }
}

cargarHorarios();
