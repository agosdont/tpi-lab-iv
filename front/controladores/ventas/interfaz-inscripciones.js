import { inscripcionesServices } from "../../servicios/inscripciones-servicios.js";
import { newRegister as newInscripcion } from "./inscripciones-new.js";
import { editRegister as editInscripcion } from "./inscripciones-new.js";

const htmlInscripciones = `
<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarInscripcion" href="#/newInscripcion">Agregar Inscripción</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="inscripcionesTable" class="table table-bordered table-striped tableInscripcion" width="100%">
       <thead>
           <tr>
           <th>#</th>
           <th>Evento</th>
           <th>Usuario</th>
           <th>Fecha Inscripcion</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `;

export async function Inscripciones() {
    let d = document;
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Inscripciones';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Inscripciones";
    d.querySelector('.rutaMenu').setAttribute('href', "#/inscripciones");
    let cP = d.getElementById('contenidoPrincipal');

    try {
        res = await inscripcionesServices.listar();
        res.forEach(element => {
            element.evento_nombre = element.evento.nombre; // Asumiendo que el título del libro está en el campo `titulo` de `libro`
            element.usuario_nombre = element.usuario.nombre; // Usar solo el campo `nombre` de `usuario`
            element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarInscripcion' href='#/editInscripcion' data-idInscripcion='" + element.id + "'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarInscripcion' href='#/delInscripcion' data-idInscripcion='" + element.id + "'><i class='fas fa-trash'></i></a></div>";
        });
        cP.innerHTML = htmlInscripciones;
        llenarTabla(res);

        let btnAgregar = d.querySelector(".btnAgregarInscripcion");
        btnAgregar.addEventListener("click", agregar);
    } catch (error) {
        console.error("Error al listar inscripciones:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al listar las inscripciones.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function enlazarEventos(oSettings){
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarInscripcion");
    let btnBorrar = d.querySelectorAll(".btnBorrarInscripcion");
    for(let i = 0; i < btnEditar.length; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    } 
}

function agregar(){
    newInscripcion();
}

function editar(){
    let id = parseInt(this.getAttribute('data-idInscripcion'), 10);
    editInscripcion(id);
}

async function borrar(){
    let id = parseInt(this.getAttribute('data-idInscripcion'), 10);
    let borrar = 0;
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        if (result.isConfirmed) {
            borrar = 1;
        } else if (result.isDenied) {
            borrar = 0;
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });
    if (borrar === 1) {
        try {
            await inscripcionesServices.borrar(id);
            Swal.fire({
                title: 'Inscripción eliminado',
                text: 'El préstamo se ha eliminado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/inscripciones";
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el préstamo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function llenarTabla(res){ 
    let dtable = new DataTable('#inscripcionesTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'evento_nombre' }, // Mostrar el nombre del libro
            { data: 'usuario_nombre' }, // Mostrar el nombre completo del usuario
            { data: 'fecha_inscripcion' },
            { data: 'action', "orderable": false }
        ],
        fnDrawCallback: function (oSettings) {
            enlazarEventos(oSettings);
        },
        deferRender: true,
        retrieve: true,
        processing: true,
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}
