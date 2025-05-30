//Url del EndPoint de los integrantes - API
const API_URL = "https://retoolapi.dev/osOd8l/Integrantes";

//Funcion que manda a taraer el JSON con get

async function ObtenerIntegrantes() {
    //Respuesta del servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a json la respuesta del servidor
    const data = await respuesta.json();//Esto es un json
    //Enviamos el json a la funcion que genera las filas en la tabla
    MostrarDatos(data);
}

//Funcion para crear las filas de las tablas en la base a un Json
//DATOS REPRESENTARA EL json donde viene la informacion
function MostrarDatos(datos){

    //Se llamara  a la tabla con el evento id y despues al tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo html usamos "innerhtml"
    tabla.innerHTML = "";//Esto es para vaciar el contenido de la tabla

    datos.forEach(integrante => {
        tabla.innerHTML += `
        <tr>
             <td> ${integrante.id} </td>
             <td> ${integrante.Nombre} </td>
             <td> ${integrante.Apellido} </td>
             <td> ${integrante.Correo} </td>

             <td>
                <button>Editar</button>
                <button>Eliminar</button>
             </td>
        </tr>
        `;
    });
}

ObtenerIntegrantes();
