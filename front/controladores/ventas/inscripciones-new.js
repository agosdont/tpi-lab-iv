import { inscripcionesServices } from "../../servicios/inscripciones-servicios.js";

const htmlAmInscripciones = `
<div class="card card-dark card-outline">
    <form class="needs-validation frmAmInscripcion" novalidate>
        <div class="card-header">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-5">
                    <label>Evento ID</label>
                    <input type="number" class="form-control" name="evento_id" id="inscripcionEventoId" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="form-group mt-2">
                    <label>Usuario ID</label>
                    <input type="number" class="form-control" name="usuario_id" id="inscripcionUsuarioId" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="form-group mt-2">
                    <label>Fecha Inscripción</label>
                    <input type="date" class="form-control" name="fecha_inscripcion" id="inscripcionFechaInscripcion" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                // <div class="form-group mt-2">
                //     <label>Fecha Devolución</label>
                //     <input type="date" class="form-control" name="fecha_devolucion" id="inscripcionFechaDevolucion" required>
                //     <div class="valid-feedback">Valid.</div>
                //     <div class="invalid-feedback">Please fill out this field.</div>
                // </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-3">
                    <a href="#/inscripciones" class="btn btn-light border text-left">Cancelar</a>
                    <button type="submit" class="btn bg-dark float-right">Guardar</button>
                </div>
            </div>
        </div>
    </form>
</div> `;

var formulario = '';
var txtEventoId = '';
var txtUsuarioId = '';
var txtFechaInscripcion = '';
let inscripcionId = 0;

export async function newRegister() {
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Nuevo Inscripción';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Nuevo Inscripción";
    d.querySelector('.rutaMenu').setAttribute('href', "#/newInscripcion");
    let cP = d.getElementById('contenidoPrincipal');

    cP.innerHTML = htmlAmInscripciones;

    formulario = d.querySelector('.frmAmInscripcion');
    txtEventoId = d.querySelector('#inscripcionEventoId');
    txtUsuarioId = d.querySelector('#inscripcionUsuarioId');
    txtFechaInscripcion = d.querySelector('#inscripcionFechaInscripcion');
    // txtFechaDevolucion = d.querySelector('#inscripcionFechaDevolucion');

    formulario.addEventListener('submit', guardar);
}

export async function editRegister(id) {
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Inscripción';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Editar Inscripción";
    d.querySelector('.rutaMenu').setAttribute('href', "#/editInscripcion");
    let cP = d.getElementById('contenidoPrincipal');

    cP.innerHTML = htmlAmInscripciones;

    formulario = d.querySelector('.frmAmInscripcion');
    txtEventoId = d.querySelector('#inscripcionEventoId');
    txtUsuarioId = d.querySelector('#inscripcionUsuarioId');
    txtFechaInscripcion = d.querySelector('#inscripcionFechaInscripcion');
    // txtFechaDevolucion = d.querySelector('#inscripcionFechaDevolucion');

    inscripcionId = id;
    let inscripcion = await inscripcionesServices.listar(id);

    txtEventoId.value = inscripcion.evento_id;
    txtUsuarioId.value = inscripcion.usuario_id;
    txtFechaInscripcion.value = inscripcion.fecha_inscripcion;
    // txtFechaDevolucion.value = inscripcion.fecha_devolucion;

    formulario.addEventListener('submit', guardar);
}

async function guardar(e) {
    e.preventDefault();
    let inscripcion = {
        evento_id: parseInt(txtEventoId.value, 10),
        usuario_id: parseInt(txtUsuarioId.value, 10),
        fecha_inscripcion: txtFechaInscripcion.value,
        // fecha_devolucion: txtFechaDevolucion.value
    };

    try {
        if (inscripcionId === 0) {
            await inscripcionesServices.crear(inscripcion);
            Swal.fire({
                title: 'Inscripción creado',
                text: 'La inscripción se ha creado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/inscripciones";
            });
        } else {
            await inscripcionesServices.editar(inscripcionId, inscripcion);
            Swal.fire({
                title: 'Inscripción actualizado',
                text: 'La inscripción se ha actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/inscripciones";
            });
        }
    } catch (error) {
        console.error('Error al guardar el inscripción:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar el inscripción.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
