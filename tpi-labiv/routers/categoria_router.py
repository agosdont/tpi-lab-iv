from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.categoria_model import CategoriaModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.categoria_service import CategoriaService
from schemas.categoria_schema import CategoriaSchema
from utils.jwt_manager import create_token

categoria_router = APIRouter()

@categoria_router.get('/categorias', tags=['Categorias'], response_model=List[CategoriaSchema], status_code=200, dependencies=[Depends(JWTBearer())])
def get_categorias() -> List[CategoriaSchema]:
    db = Session()
    result = CategoriaService(db).get_categorias()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categoria_router.get('/categorias/{id}', tags=['Categorias'], response_model=CategoriaSchema, dependencies=[Depends(JWTBearer())])
def get_categoria(id: int = Path(ge=1)) -> CategoriaSchema:
    db = Session()
    result = CategoriaService(db).get_categoria(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "La categoría no se ha encontrado."})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categoria_router.post('/categorias', tags=['Categorias'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_categoria(categoria: CategoriaSchema) -> dict:
    db = Session()
    CategoriaService(db).create_categoria(categoria)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la categoría con éxito."})


@categoria_router.put('/categorias/{id}', tags=['Categorias'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_categoria(id: int, categoria: CategoriaSchema)-> dict:
    db = Session()
    result = CategoriaService(db).get_categoria(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No se ha encontrado la categoría."})
    
    CategoriaService(db).update_categoria(id, categoria)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la categoría con éxito."})


@categoria_router.delete('/categorias/{id}', tags=['Categorias'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def delete_categoria(id: int)-> dict:
    db = Session()
    result: CategoriaModel = db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se ha encontrado la categoría."})
    CategoriaService(db).delete_categoria(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la categoría con éxito."})
