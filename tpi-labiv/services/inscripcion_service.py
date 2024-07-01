from sqlalchemy import func
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

    def create_inscripcion(self, inscripcion: InscripcionSchema):
        lista = self.get_inscripciones()
        idDuplicados(inscripcion, lista)
        new_inscripcion = InscripcionModel(**inscripcion.model_dump())
        self.db.add(new_inscripcion)
        self.db.commit()
        return new_inscripcion    


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

    def get_promedio_inscripciones(self):
        promedio_inscripciones = self.db.query(func.avg(
            self.db.query(func.count(InscripcionModel.id))
            .join(EventoModel, InscripcionModel.evento_id == EventoModel.id)
            .group_by(EventoModel.id)
        )).scalar()
        return promedio_inscripciones

    def get_total_inscripciones_activas(self):
        today = date.today()
        total_inscripciones_activas = (
            self.db.query(func.count(InscripcionModel.id))
            .join(EventoModel, InscripcionModel.evento_id == EventoModel.id)
            .filter(EventoModel.fecha_inicio >= today)
            .scalar()
        )
        return total_inscripciones_activas