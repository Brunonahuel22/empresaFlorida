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

function pintarRecorrido(recorrido) {
  if (!recorrido || !recorrido.length) return "";

  return `
    <ul class="list-unstyled mb-0">
      ${recorrido.map((p) => `<li>📍 ${p}</li>`).join("")}
    </ul>
  `;
}

function pintarCard(colectivo, esProximo) {
  const clase = esProximo ? "border-success bg-success-subtle" : "";
  const id = esProximo ? 'id="proximo-colectivo"' : "";

  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card ${clase}" ${id}>
        <div class="card-body">
          <h3 class="card-title">🕒 ${colectivo.nombre}</h3>

          ${
            esProximo
              ? '<span class="badge bg-success">Próximo Colectivo</span>'
              : ""
          }
        </div>

        <ul class="list-group list-group-flush ">
          ${colectivo.recorrido
            .map((p) => `<li class="list-group-item ">📍 ${p}</li>`)
            .join("")}
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

const titulo = document.getElementById("tituloHorarios");

titulo.innerText = `Horarios dia ${nombreDia} - Alderetes/Alternativa -> Florida`;

async function cargarHorarios() {
  try {
    const respuesta = await fetch("../js/horarios.json");
    const datos = await respuesta.json();

    const idaAlderetes = datos[diaDeSemana].filter(
      (colectivo) =>
         colectivo.referencia == "vueltas florida/alderetes-alternativa"
    );

    const horaActualDecimal = obtenerHoraDecimal();

    const contenedor = document.getElementById("cards-container");
    contenedor.innerHTML = "";

    const proximoColectivo = idaAlderetes.find(
      (colectivo) => colectivo.valor_salida > horaActualDecimal
    );

    idaAlderetes.forEach((colectivo) => {
      const esProximo = colectivo === proximoColectivo;
      contenedor.innerHTML += pintarCard(colectivo, esProximo);
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

