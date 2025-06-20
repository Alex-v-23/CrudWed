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
                <button onclick="AbrirModalEditar('${integrante.id}', '${integrante.Nombre}', ' ${integrante.Apellido}', '${integrante.Correo}')">Editar</button>
                <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
             </td>
        </tr>
        `;
    });
}

ObtenerIntegrantes();


//Procesos para agregar un nuevo integrnate
const modal = document.getElementById("mdAgregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("BtnAgregar");// botonpara agregar un registro
const btnCerrar = document.getElementById("btnCerrar"); // boton para cerar el cuadro de dialogo

btnAgregar.addEventListener("click", () => {
    modal.showModal(); // Abrir el modal al hacer clic en el boton
});

btnCerrar.addEventListener("click", () => {
    modal.close(); 
});


//Agregar nuevio integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit",async e =>{
    e.preventDefault(); // e Representa a submit. Evita que el formulario se envie solo.

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    //Validadcion basica

    if(!Nombre || !Apellido || !Correo){
        alert("Ingresar los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud
        headers: {'Content-Type':'application/json'}, //Tipo de datos enviados
        body: JSON.stringify({Nombre,Apellido,Correo})//Datos enviados
    });

    //Verificacion si la API rsponde que los datos fueron enviados correctamente
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerIntegrantes();
    }else{
        //En caso de que la API no devuelva un codigo diferente a 200-299
        alert("El registro no pudo ser agregado");
    }
});

//Funcion para borar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente quieres eliminar el restro?");

    //Validar si el usuario si escofio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //RECARGAR LA TABLA DESPUES DE ELIMINAR
        ObtenerIntegrantes();
    }
}

/*Proceso para editar un registro*/
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById ("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close(); 
});

function AbrirModalEditar(id, nombre, apellido, correo){
    //Se asignan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //Abrir el modal despues de pasar
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el formulario se envie


    //Capturamos los valores de los input
    const id = document.getElementById("txtIdEditar").value;
    const Nombre = document.getElementById("txtNombreEditar").value.trim();
    const Apellido = document.getElementById("txtApellidoEditar").value.trim();
    const Correo = document.getElementById("txtEmailEditar").value.trim();

    //Validacion de constante

    if(!id || !Nombre || !Apellido || !Correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo se siga ejecutando
    }

    //llama a la API
    const respuesta = await fetch(`${API_URL}/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, Nombre, Apellido, Correo})
    });

    if(respuesta.ok){
        alert("EL REGISTRO FUE ACTUALIZADO CON EXITO");
        modalEditar.close();
        ObtenerIntegrantes();
    }else{
        alert("El registro no pudo ser actualizado")
    }
});
