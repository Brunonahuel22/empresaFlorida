function obtenerHoraDecimal() {
  const ahora = new Date();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  return horas + minutos / 60;
}

function pintarFila(colectivo, esProximo) {
  const clase = esProximo ? "bg-success" : "";
  return `<tr>
            <th scope="row" class="${clase}">${colectivo.nombre}</th>
            <td class="${clase}">${colectivo.recorrido.join(" ➡️ ")}</td>
          </tr>`;
}


const dia = new Date();
const diaDeHoy = dia.getDay();

let diaDeSemana;
let nombreDia;

switch (diaDeHoy) {
  case 6:
    diaDeSemana = "sabado";
    nombreDia = 'Sabado';
    break;
  case 0:
    diaDeSemana = "domingo";
    nombreDia = "Domingo";
    break;
  default:
    diaDeSemana = "lunesAViernes";
    nombreDia = "Día de semana (Lunes a Viernes)";
}

const titulo = document.getElementById('tituloHorarios');
console.log(titulo)
titulo.innerText = `Horarios dia ${nombreDia} - Ida Florida → Alderetes`

async function cargarHorarios() {
  try {
    const respuesta = await fetch("js/horarios.json");
    const datos = await respuesta.json();

    const idaAlderetes = datos[diaDeSemana].filter(
      (colectivo) =>
        colectivo.referencia == "idas florida/alderetes-alternativa"
    );

    const horaActualDecimal = obtenerHoraDecimal();

    const cuerpo = document.getElementById("cuerpo-tabla");


    const proximoColectivo = idaAlderetes.find(
      (colectivo) => colectivo.valor_salida > horaActualDecimal
    );

    console.log(proximoColectivo)

    idaAlderetes.forEach((colectivo) => {
      const esProximo = colectivo === proximoColectivo;
      const fila = pintarFila(colectivo, esProximo);
      cuerpo.innerHTML += fila;
    });


  } catch (error) {
    console.log(error);
  }
}

cargarHorarios();
