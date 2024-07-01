import { eventosServices } from "../../servicios/eventos-servicios.js";

const htmlAmEventos = `
<div class="card card-dark card-outline">
	<form class="needs-validation frmAmEvento" enctype="multipart/form-data">
		<div class="card-header">
			<div class="col-md-8 offset-md-2">
				<div class="form-group mt-5">
					<label>Nombre</label>
					<input type="text" class="form-control" pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 ]{1,}" name="nombre" id="eventoNombre" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Descripcion</label>
					<input type="text" class="form-control" name="descripcion" id="eventoDescripcion" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>FechaInicio</label>
					<input type="number" class="form-control" name="fechaInicio" id="eventoFechaInicio" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>FechaFin</label>
					<input type="text" class="form-control" name="fechaFin" id="eventoFechaFin" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Lugar</label>
					<input type="text" class="form-control" name="lugar" id="eventoLugar" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
        <div class="form-group mt-2">
					<label>Cupos</label>
					<input type="text" class="form-control" name="cupos" id="eventoCupos" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Categoria_id</label>
					<input type="number" class="form-control" name="categoria_id" id="eventoCategoria_id" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				// <div class="form-group mt-2">
				// 	<label>Prestado</label>
				// 	<input type="checkbox" class="form-control" name="prestado" id="eventoPrestado">
				// 	<div class="valid-feedback">Valid.</div>
				// 	<div class="invalid-feedback">Please fill out this field.</div>
				// </div>
			</div>
		</div>
		<div class="card-footer">
			<div class="col-md-8 offset-md-2">
				<div class="form-group mt-3">
					<a href="#/eventos" class="btn btn-light border text-left">Cancelar</a>
					<button type="submit" class="btn bg-dark float-right">Guardar</button>
				</div>
			</div>
		</div>
	</form>
</div> `;

var formulario = '';
var txtNombre = '';
var txtDescripcion = '';
var txtFechaInicio = '';
var txtFechaFin = '';
var txtLugar = '';
var txtCupos = '';
var txtCategoria_id = '';
// var txtPrestado = '';
let eventoId = 0;

export async function newRegister() {
	let d = document;

	d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Evento';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';

	crearFormulario();

	formulario = d.querySelector(".frmAmEvento");
	formulario.addEventListener("submit", guardar);
	// d.getElementById('eventoIsbn').addEventListener('change', validateISBN); // Añadir el evento de cambio
}

export async function editRegister(id) {
	let d = document;
	eventoId = id;
	d.querySelector('.contenidoTitulo').innerHTML = 'Editar Evento';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
	crearFormulario();

	formulario = d.querySelector(".frmAmEvento");
	formulario.addEventListener("submit", modificar);
	// d.getElementById('eventoIsbn').addEventListener('change', validateISBN); // Añadir el evento de cambio
	let evento = await eventosServices.listar(id);

	txtNombre.value = evento.nombre;
	txtDescripcion.value = evento.descripcion;
	txtFechaInicio.value = evento.fechaInicio;
	txtFechaFin.value = evento.fechaFin;
	txtLugar.value = evento.lugar;
	txtCupos.value = evento.cupos;
	txtCategoria_id.value = evento.categoria_id;
	// txtPrestado.checked = evento.prestado;
}

function crearFormulario() {
	let d = document;
	d.querySelector('.rutaMenu').innerHTML = "Eventos";
	d.querySelector('.rutaMenu').setAttribute('href', "#/eventos");

	let cP = d.getElementById('contenidoPrincipal');
	cP.innerHTML = htmlAmEventos;

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = '../controladores/validaciones.js';
	cP.appendChild(script);

	txtNombre = d.getElementById('eventoNombre');
	txtDescripcion = d.getElementById('eventoDescripcion');
	txtFechaInicio = d.getElementById('eventoFechaInicio');
	txtFechaFin = d.getElementById('eventoFechaFin');
	txtLugar = d.getElementById('eventoLugar');
	txtCupos = d.getElementById('eventoCupos');
	txtCategoria_id = d.getElementById('eventoCategoria_id');
}

// function validateISBN(event) {
// 	const input = event.target;
// 	const isbn = input.value;
// 	if (!/^\d{13}$/.test(isbn)) {
// 		input.setCustomValidity("El ISBN debe tener exactamente 13 dígitos.");
// 	} else {
// 		input.setCustomValidity("");
// 	}
// 	input.reportValidity();
// }

async function guardar(e) {
	e.preventDefault();
	const formData = new FormData(e?.target);
	const values = Object.fromEntries(formData.entries());
	// values.prestado = formData.has('prestado'); // Convertir el valor del checkbox a booleano
	console.log("Datos enviados:", values); // Verificar los datos enviados

	eventosServices.crear(values.nombre, values.descripcion, values.fechaInicio, values.fechaFin, values.lugar, values.cupos, values.categoria_id)
		.then(respuesta => {
			formulario.reset();
			Swal.fire({
				title: 'Evento guardado',
				text: 'El evento se ha guardado exitosamente.',
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
				text: 'Hubo un problema al guardar el evento.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		});
}

async function modificar(e) {
	e.preventDefault();
	const formData = new FormData(e?.target);
	const values = Object.fromEntries(formData.entries());
	// values.prestado = formData.has('prestado'); // Convertir el valor del checkbox a booleano

	eventosServices.editar(eventoId, values.nombre, values.descripcion, values.fechaInicio, values.fechaFin, values.lugar, values.cupos, values.categoria_id)
		.then(respuesta => {
			formulario.reset();
			Swal.fire({
				title: 'Evento actualizado',
				text: 'El evento se ha actualizado exitosamente.',
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
				text: 'Hubo un problema al actualizar el evento.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		});
}
