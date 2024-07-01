from fastapi import APIRouter, Depends, Path, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from models.inscripcion_model import InscripcionModel
from schemas.inscripcion_schema import InscripcionSchema
from services.inscripcion_service import InscripcionService
from middlewares.jwt_bearer import JWTBearer
from fastapi.encoders import jsonable_encoder
from utils.validators import validar_cupos_disponibles

inscripcion_router = APIRouter()

@inscripcion_router.get('/inscripciones', tags=['Inscripciones'], response_model=List[InscripcionSchema], status_code=200)
def get_inscripciones():
    db = Session()
    result = InscripcionService(db).get_inscripciones()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@inscripcion_router.get('/inscripciones/{id}', tags=['Inscripciones'], response_model=dict)
def get_inscripcion(id: int):
    db = Session()
    result = InscripcionService(db).get_inscripcion(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No se ha encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@inscripcion_router.get('/inscripciones/usuario/{usuario_id}', tags=['Inscripciones'], response_model=List[InscripcionSchema], dependencies=[Depends(JWTBearer())])
def get_inscripcion_usuario(usuario_id: int) -> List[InscripcionSchema]:
    db = Session()
    result = InscripcionService(db).get_inscripcion_usuario(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "Inscripciones no encontradas para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@inscripcion_router.get('/inscripciones/usuario/activas/{usuario_id}', tags=['Inscripciones'], response_model=List[InscripcionSchema], dependencies=[Depends(JWTBearer())])
def get_inscripcion_usuario_activa(usuario_id: int) -> List[InscripcionSchema]:
    db = Session()
    result = InscripcionService(db).get_inscripcion_usuario_activa(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No hay inscripciones activas para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@inscripcion_router.post('/inscripciones', tags=['Inscripciones'], response_model=dict, status_code=201)
def create_inscripcion(inscripcion: InscripcionSchema):
    db = Session()
    validar_cupos_disponibles(db, inscripcion.evento_id)
    InscripcionService(db).create_inscripcion(inscripcion)
    return JSONResponse(status_code=201, content={"message": "La inscripción ha sido registrada exitosamente"})

@inscripcion_router.put('/inscripciones/{id}', tags=['Inscripciones'], response_model=dict, status_code=200)
def update_inscripcion(id: int, inscripcion: InscripcionSchema):
    db = Session()
    result = InscripcionService(db).get_inscripcion(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    InscripcionService(db).update_inscripcion(id, inscripcion)
    return JSONResponse(status_code=200, content={"message": "La inscripción se ha modificado"})

@inscripcion_router.delete('/inscripciones/{id}', tags=['Inscripciones'], response_model=dict, status_code=200)
def delete_inscripcion(id: int):
    db = Session()
    result: InscripcionModel = db.query(InscripcionModel).filter(InscripcionModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    InscripcionService(db).delete_inscripcion(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la inscripcion"})

@inscripcion_router.get("/inscripciones/promedio", tags=['Inscripciones'], status_code=200)
def get_promedio_inscripciones():
    db = Session()
    promedio_inscripciones = InscripcionService(db).get_promedio_inscripciones()
    return JSONResponse(
        status_code=200,
        content={
            'promedio_inscripciones': promedio_inscripciones
        }
    )

@inscripcion_router.get("/inscripciones/activas", tags=['Inscripciones'], status_code=200)
def get_total_inscripciones_activas():
    db = Session()
    total_inscripciones_activas = InscripcionService(db).get_total_inscripciones_activas()
    return JSONResponse(
        status_code=200,
        content={
            'total_inscripciones_activas': total_inscripciones_activas
        }
    )