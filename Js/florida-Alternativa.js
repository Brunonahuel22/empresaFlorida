function dibujarFila(objeto) {
  const filaCreada = `
     <tr>
              <th scope="row"> ${objeto.nombre} </th>
              
              <td> ${objeto.recorrido.join(" ➡️ ")}</td>
            </tr>
      `;

  return filaCreada;
}

const dia = new Date();
const diaDeHoy = dia.getDay();

let diaDeSemana;
let nombreDia ;

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

    const cuerpo = document.getElementById("cuerpo-tabla");

    idaAlderetes.forEach((colectivo) => {

      const fila = dibujarFila(colectivo);
      
      
      cuerpo.innerHTML += fila;
    });

    console.log(cuerpo);
  } catch (error) {
    console.log(error);
  }
}

cargarHorarios();
