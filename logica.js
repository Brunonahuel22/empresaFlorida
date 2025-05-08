async function cargarHorarios() {
    try {
        const respuesta = await fetch('LunesAViernes.json');
        const datos = await respuesta.json();
       
        const parrafo = document.getElementById('horarios');
        
        const alternativa = datos.lunesAViernes.filter(elemento => elemento.referencia == 'idas florida/alderetes-alternativa');

    

        const colectivosiguiente = datos.lunesAViernes.find(colectivo => colectivo.nombre == '20:55');

        console.log(colectivosiguiente);

        



    
        
    } catch (error) {
        console.log(error);
    }
}


cargarHorarios()
