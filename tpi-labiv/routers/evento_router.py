from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.evento_model import EventoModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.evento_service import EventoService
from schemas.evento_schema import EventoSchema
from utils.jwt_manager import create_token

evento_router = APIRouter()

@evento_router.get('/eventos', tags=['Eventos'], response_model=List[EventoSchema], status_code=200)
def get_eventos(nombre: str = None, descripcion: str = None) -> List[EventoSchema]:
    db = Session()
    result = EventoService(db).get_eventos(nombre, descripcion)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@evento_router.get("/evento/mas_inscripciones", tags=['Eventos'], response_model=List[EventoSchema], status_code=200)
def get_evento_mas_inscripciones():
    db = Session()
    result = EventoService(db).get_evento_mas_inscripciones()
    return JSONResponse(
    status_code=200,
    content=jsonable_encoder({
        'nombre': result.nombre,
        'total_inscripciones': result.total_inscripciones
        })
    )

@evento_router.get("/eventos/total", tags=['Eventos'], status_code=200)
def get_total_eventos():
    db = Session()
    total_eventos = EventoService(db).get_total_eventos()
    return JSONResponse(
        status_code=200,
        content={
            'total_eventos': total_eventos
        }
    )

@evento_router.get('/eventos/{id}', tags=['Eventos'], response_model=EventoSchema, dependencies=[Depends(JWTBearer())])
def get_evento(id: int = Path(ge=1)) -> EventoSchema:
    db = Session()
    result = EventoService(db).get_evento(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

# @evento_router.get("/libros/prestamos/{prestamo}", tags=['Eventos'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
# def get_libro_by_prestamo(prestamo: bool) -> List[Libro]:
#     db = Session()
#     result = LibroService(db).get_libro_by_prestamo(prestamo)
#     if not result:
#         return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
#     return JSONResponse(status_code=200, content=jsonable_encoder(result))

# @evento_router.get('/libros/titulo/{titulo}', tags=['Eventos'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
# def get_libro_by_titulo(titulo: str) -> List[Libro]:
#     db = Session()
#     result = LibroService(db).get_libro_by_titulo(titulo)
#     if not result:
#         return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
#     return JSONResponse(status_code=200, content=jsonable_encoder(result))

# @evento_router.get('/libros/autor/{autor}', tags=['Eventos'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
# def get_libro_by_autor(autor: str) -> List[Libro]:
#     db = Session()
#     result = LibroService(db).get_libro_by_autor(autor)
#     if not result:
#         return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
#     return JSONResponse(status_code=200, content=jsonable_encoder(result))

@evento_router.get('/eventos/categoria/{categoria_id}', tags=['Eventos'], response_model=List[EventoSchema], dependencies=[Depends(JWTBearer())])
def get_evento_categoria(categoria_id: int) -> List[EventoSchema]:
    db = Session()
    result = EventoService(db).get_evento_categoria(categoria_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "Evento no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@evento_router.post('/eventos', tags=['Eventos'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_evento(evento: EventoSchema) -> dict:
    db = Session()
    EventoService(db).create_evento(evento)
    return JSONResponse(status_code=201, content={"message": "El evento se ha registrado con éxito."})

@evento_router.put('/eventos/{id}', tags=['Eventos'], response_model=dict, status_code=200)
def update_evento(id: int, evento: EventoSchema):
    db = Session()
    result = EventoService(db).get_evento(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    EventoService(db).update_evento(id, evento)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el evento"})

@evento_router.delete('/evento/{id}', tags=['Eventos'], response_model=dict, status_code=200)
def delete_evento(id: int):
    db = Session()
    result: EventoModel = db.query(EventoModel).filter(EventoModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    EventoService(db).delete_evento(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el producto"})

