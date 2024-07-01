from models.inscripcion_model import InscripcionModel
from schemas.inscripcion_schema import InscripcionSchema
from sqlalchemy.orm import Session
from datetime import date,datetime
from utils.validators import idDuplicados
from models.evento_model import EventoModel

class InscripcionService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_inscripciones(self):
        result = self.db.query(InscripcionModel).all()
        return result
    
    def get_inscripcion(self, id):
        result = self.db.query(InscripcionModel).filter(InscripcionModel.id == id).first()
        return result

    def get_inscripcion_usuario(self, usuario_id: int):
        result = self.db.query(InscripcionModel).filter(InscripcionModel.usuario_id == usuario_id).all()
        return result
    
    def get_inscripcion_usuario_activa(self, usuario_id: int):
        today = date.today()
        result = self.db.query(InscripcionModel).join(EventoModel, InscripcionModel.evento_id == EventoModel.id).filter(
            InscripcionModel.usuario_id == usuario_id,
            EventoModel.fecha_inicio >= today
        ).all()
        return result

# EN VEZ DE ESTA DEBERÍAMOS HACER EVENTO DISPONIBLE SEGUN CUPO
    # def is_libro_disponible(self, libro_id: int, fecha_prestamo: date, fecha_devolucion: date):
    #     existing_prestamos = self.db.query(InscripcionModel).filter(
    #         InscripcionModel.libro_id == libro_id,
    #         InscripcionModel.fecha_prestamo < fecha_devolucion,
    #         InscripcionModel.fecha_devolucion > fecha_prestamo
    #     ).all()
    #     return len(existing_prestamos) == 0 # si existe el libro o no

    # def create_inscripcion(self, inscripcion: InscripcionSchema):
    #     if not self.is_libro_disponible(inscripcion.libro_id, inscripcion.fecha_prestamo, inscripcion.fecha_devolucion):
    #         raise ValueError("El libro no está disponible para las fechas seleccionadas.")
    #     new_prestamo = InscripcionModel(**inscripcion.model_dump())
    #     self.db.add(new_prestamo)
    #     self.db.commit()
    #     return new_prestamo

    def create_inscripcion(self, inscripcion: InscripcionSchema):
        lista = self.get_inscripciones()
        idDuplicados(inscripcion, lista)
        new_inscripcion = InscripcionModel(**inscripcion.model_dump())
        self.db.add(new_inscripcion)
        self.db.commit()
        return new_inscripcion    

    # def update_prestamo(self, id: int, data: Prestamo):
    #     prestamo = self.db.query(InscripcionModel).filter(InscripcionModel.id == id).first()
    #     if prestamo:
    #         if not self.is_prestamo_disponible(data.prestamo_id, data.fecha_prestamo, data.fecha_devolucion):
    #             raise ValueError("El libro no está disponible para las fechas seleccionadas.")
    #         prestamo.libro_id = data.libro_id
    #         prestamo.usuario_id = data.usuario_id
    #         prestamo.fecha_prestamo = data.fecha_prestamo
    #         prestamo.fecha_devolucion = data.fecha_devolucion
    #         self.db.commit()
    #     return prestamo

    def update_inscripcion(self, id: int, inscripcion: InscripcionSchema):
        result = self.db.query(InscripcionModel).filter(InscripcionModel.id == id).first()
        result.evento_id = inscripcion.evento_id
        result.usuario_id = inscripcion.usuario_id
        result.fecha_inscripción = inscripcion.fecha_inscripción
        self.db.commit()
        return result

    def delete_inscripcion(self, id: int):
        self.db.query(InscripcionModel).filter(InscripcionModel.id == id).delete()
        self.db.commit()
        return
