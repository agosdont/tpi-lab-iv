from models.evento_model import EventoModel
from schemas.evento_schema import EventoSchema
from services.categoria_service import CategoriaService
from utils.validators import idDuplicados

class EventoService():
    
    def __init__(self, db) -> None:
        self.db = db

    # def get_eventos(self):
    #     result = self.db.query(EventoModel).all()
    #     return result

    def get_eventos(self, nombre: str = None, descripcion: str = None):
        query = self.db.query(EventoModel)
        if nombre:
            query = query.filter(EventoModel.nombre.ilike(f"%{nombre}%"))
        if descripcion:
            query = query.filter(EventoModel.descripcion.ilike(f"%{descripcion}%"))
        return query.all()

    def get_evento(self, id):
        result = self.db.query(EventoModel).filter(EventoModel.id == id).first()
        return result

    def get_evento_categoria(self, categoria_id: int):
        result = self.db.query(EventoModel).filter(EventoModel.categoria_id == categoria_id).all()
        return result


    # def get_libro_by_titulo(self, titulo: str):
    #     result = self.db.query(EventoModel).filter(LibroModel.titulo == titulo).all()
    #     return result
    
    # def get_libro_by_autor(self, autor: str):
    #     result = self.db.query(LibroModel).filter(LibroModel.autor == autor).all()
    #     return result
    
    # def get_libro_by_categoria(self, categoria_id: int):
    #     result = self.db.query(LibroModel).filter(LibroModel.categoria_id == categoria_id).all()
    #     return result

    def create_evento(self, evento: EventoSchema):
        print("Datos recibidos para crear Evento:", evento)
        categoria_service = CategoriaService(self.db)
        categoria_existente = categoria_service.get_categoria(evento.categoria_id)
        
        if not categoria_existente:
            raise ValueError("La categoría especificada no existe")
        
        lista = self.get_eventos()
        idDuplicados(evento, lista)
        new_evento = EventoModel(**evento.model_dump())
        self.db.add(new_evento)
        self.db.commit()
        return new_evento

    def update_evento(self, id: int, evento: EventoSchema):
        result = self.db.query(EventoModel).filter(EventoModel.id == id).first()
        result.nombre = evento.nombre
        result.descripcion = evento.descripcion
        result.fecha_inicio = evento.fecha_inicio
        result.fecha_fin = evento.fecha_fin
        result.lugar=evento.lugar
        result.cupos=evento.cupos
        result.categoria_id=evento.categoria_id
        self.db.commit()
        return result

    def delete_evento(self, id:int):
        self.db.query(EventoModel).filter(EventoModel.id == id).delete()
        self.db.commit()
        return True
    
    # def get_libro_by_prestamo(self, prestamo: bool):
    #     result = self.db.query(LibroModel).filter(LibroModel.prestamo == prestamo).all()
    #     return result