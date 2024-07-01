// import { eventosServices } from "../../servicios/eventos-servicios.js";
// import { newRegister } from "./eventos-new.js";
// import { editRegister } from "./eventos-new.js";

// var dtable;

// const htmlEventos = `
// <div class="card">
//    <div class="card-header">
   
//    <h3 class="card-title"> 
//        <a class="btn bg-dark btn-sm btnAgregarEvento" href="#/newEvento">Agregar Evento</a>
//    </h3>

//    </div>

//    <!-- /.card-header -->
//    <div class="card-body">            
//    <table id="eventosTable" class="table table-bordered table-striped tableEvento" width="100%">
//        <thead>
//            <tr>
//            <th>#</th>
//            <th>Nombre</th>
//            <th>Descripcion</th>
//            <th>Fecha de inicio</th>
//            <th>Fecha de finalización</th>
//            <th>Lugar</th>
//            <th>Cupos</th>
//            <th>Categoria</th>
//            </tr>
//        </thead>
   
//    </table>
//    </div>
//    <!-- /.card-body -->
// </div> `;

// export async function Eventos() {
//     let d = document;
//     let res = '';
//     d.querySelector('.contenidoTitulo').innerHTML = 'Eventos';
//     d.querySelector('.contenidoTituloSec').innerHTML = '';
//     d.querySelector('.rutaMenu').innerHTML = "Eventos";
//     d.querySelector('.rutaMenu').setAttribute('href', "#/eventos");
//     let cP = d.getElementById('contenidoPrincipal');
    
//     try {
//         res = await eventosServices.listar();
//         console.log("Datos para la tabla:", res); // Verificar los datos

//         // Añadir el campo de acciones a cada elemento
//         res.forEach(element => {
//             element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarEvento' href='#/editEvento' data-idEvento='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarEvento'href='#/delEvento' data-idEvento='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
//         });

//         console.log("Datos con acciones añadidas:", res); // Verificar datos con acciones
//         cP.innerHTML = htmlEventos;
//         llenarTabla(res);
        
//         let btnAgregar = d.querySelector(".btnAgregarEvento");
//         btnAgregar.addEventListener("click", agregar);
//     } catch (error) {
//         console.error("Error al listar eventos:", error);
//     }
// }

// function llenarTabla(res) {
//     console.log("Datos pasados a DataTable:", res); // Verificar los datos que se pasan a DataTable
//     dtable = new DataTable('#eventosTable', {
//         responsive: true,
//         data: res,
//         columns: [
//             { data: 'id' },
//             { data: 'nombre' },
//             { data: 'descripcion' },
//             { data: 'fecha_inicio' },
//             { data: 'fecha_fin' },
//             { data: 'lugar' },
//             { data: 'cupos' },
//             { data: 'categoria_id'},
//             // { data: 'prestado', "orderable": false },
//             { data: 'action', "orderable": false } // Asegurarse de que 'action' se incluye en las columnas
//         ],
//         fnDrawCallback: function (oSettings) {
//             enlazarEventos(oSettings);
//         },
//         deferRender: true,
//         retrieve: true,
//         processing: true,
//         language: {
//             sProcessing: "Procesando...",
//             sLengthMenu: "Mostrar _MENU_ registros",
//             sZeroRecords: "No se encontraron resultados",
//             sEmptyTable: "Ningún dato disponible en esta tabla",
//             sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
//             sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
//             sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
//             sInfoPostFix: "",
//             sSearch: "Buscar:",
//             sUrl: "",
//             sInfoThousands: ",",
//             sLoadingRecords: "Cargando...",
//             oPaginate: {
//                 sFirst: "Primero",
//                 sLast: "Último",
//                 sNext: "Siguiente",
//                 sPrevious: "Anterior"
//             },
//             oAria: {
//                 sSortAscending: ": Activar para ordenar la columna de manera ascendente",
//                 sSortDescending: ": Activar para ordenar la columna de manera descendente"
//             }
//         }
//     });
// }

// function enlazarEventos() {
//     let d = document;
//     let btnEditar = d.querySelectorAll(".btnEditarEvento");
//     let btnBorrar = d.querySelectorAll(".btnBorrarEvento");
//     for(let i = 0; i < btnEditar.length; i++) {
//         btnEditar[i].addEventListener("click", editar);
//         btnBorrar[i].addEventListener("click", borrar);
//     } 
// }

// function agregar() {
//     newRegister();
// }

// function editar() {
//     let id = parseInt(this.getAttribute('data-idEvento'), 10);
//     editRegister(id);
// }

// async function borrar() {
//     let id = parseInt(this.getAttribute('data-idEvento'), 10);
//     let borrar = 0;
//     await Swal.fire({
//         title: 'Está seguro que desea eliminar el registro?',
//         showDenyButton: true,
//         confirmButtonText: 'Si',
//         denyButtonText: `Cancelar`,
//         focusDeny: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//             borrar = 1;
//         } else if (result.isDenied) {
//             borrar = 0;
//             Swal.fire('Se canceló la eliminación', '', 'info');
//         }
//     });
//     if (borrar === 1) {
//         eventosServices.borrar(id)
//             .then(() => {
//                 Swal.fire({
//                     title: 'Evento eliminado',
//                     text: 'El evento se ha eliminado exitosamente.',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     window.location.href = "#/eventos";
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//                 Swal.fire({
//                     title: 'Error',
//                     text: 'Hubo un problema al eliminar el evento.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             });
//     }
// }


import { eventosServices } from "../../servicios/eventos-servicios.js";
import { newRegister } from "./eventos-new.js";
import { editRegister } from "./eventos-new.js";

var dtable;

const htmlEventos = `
<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarEvento" href="#/newEvento">Agregar Evento</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="eventosTable" class="table table-bordered table-striped tableEvento" width="100%">
       <thead>
           <tr>
           <th>#</th>
           <th>Nombre</th>
           <th>Descripcion</th>
           <th>Fecha de inicio</th>
           <th>Fecha de finalización</th>
           <th>Lugar</th>
           <th>Cupos</th>
           <th>Categoria</th>
           <th>Acciones</th> <!-- Añadir columna de acciones -->
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `;

export async function Eventos() {
    let d = document;
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Eventos';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Eventos";
    d.querySelector('.rutaMenu').setAttribute('href', "#/eventos");
    let cP = d.getElementById('contenidoPrincipal');
    
    try {
        res = await eventosServices.listar();
        console.log("Datos para la tabla:", res); // Verificar los datos

        // Añadir el campo de acciones a cada elemento
        res.forEach(element => {
            element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarEvento' href='#/editEvento' data-idEvento='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarEvento'href='#/delEvento' data-idEvento='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
        });

        console.log("Datos con acciones añadidas:", res); // Verificar datos con acciones
        cP.innerHTML = htmlEventos;
        llenarTabla(res);
        
        let btnAgregar = d.querySelector(".btnAgregarEvento");
        btnAgregar.addEventListener("click", agregar);
    } catch (error) {
        console.error("Error al listar eventos:", error);
    }
}

function llenarTabla(res) {
    console.log("Datos pasados a DataTable:", res); // Verificar los datos que se pasan a DataTable
    if (!Array.isArray(res)) {
        console.error("La respuesta no es un array:", res);
        return;
    }

    dtable = new DataTable('#eventosTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'descripcion' },
            { data: 'fecha_inicio' },
            { data: 'fecha_fin' },
            { data: 'lugar' },
            { data: 'cupos' },
            { data: 'categoria_id'},
            { data: 'action', "orderable": false } // Asegurarse de que 'action' se incluye en las columnas
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

function enlazarEventos() {
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarEvento");
    let btnBorrar = d.querySelectorAll(".btnBorrarEvento");
    for(let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    } 
}

function agregar() {
    newRegister();
}

function editar() {
    let id = parseInt(this.getAttribute('data-idEvento'), 10);
    editRegister(id);
}

async function borrar() {
    let id = parseInt(this.getAttribute('data-idEvento'), 10);
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
        eventosServices.borrar(id)
            .then(() => {
                Swal.fire({
                    title: 'Evento eliminado',
                    text: 'El evento se ha eliminado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "#/eventos";
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el evento.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
}
