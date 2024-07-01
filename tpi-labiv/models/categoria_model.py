from config.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class CategoriaModel(Base):
    __tablename__ = 'categoria'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(30))
    descripcion = Column(String(100))
    
    eventos = relationship('EventoModel', lazy='joined')
