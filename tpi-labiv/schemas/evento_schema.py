from datetime import date
from pydantic import BaseModel, Field, EmailStr, field_validator, SecretStr, constr
from fastapi import status
from typing import Optional, List,Annotated
from fastapi.exceptions import HTTPException


# ISBN13 = Annotated[str, constr(pattern=r'^\d{13}$')] # se crea un tipo de dato string de 13 dígitos

class EventoSchema(BaseModel):
    id: int = Field(gt=0)
    nombre: str = Field(min_length=1, max_length=35)
    descripcion: str = Field(min_length=1, max_length=160)
    fecha_inicio: date 
    fecha_fin: date
    lugar: str
    cupos: int
    categoria_id:int
    # prestado: Optional[bool] = Field(default=False) 
    
    # class Config:
    #     json_scheme_extra = {
    #         "example": {
    #             "id": 1,
    #             "titulo": "Don Quijote de la Mancha",
    #             "autor": "Miguel de Cervantes",
    #             "anio": 1605,
    #             "isbn": "1234567891234",
    #             "editorial": "Random",
    #             "categoria_id": 1,
    #             "prestado" : False
    #         }
    #     }