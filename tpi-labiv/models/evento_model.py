from sqlalchemy import Column, Date, Integer, String, ForeignKey
from config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class EventoModel(Base):
    __tablename__ = 'evento'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(30))
    descripcion = Column(String(160))
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    lugar = Column(String(160))
    cupos = Column(Integer)
    categoria_id = Column(Integer, ForeignKey('categoria.id'), nullable=False)
    # prestado = Column(Boolean)
    
    categoria = relationship('CategoriaModel', lazy='joined')
    inscripcion = relationship('InscripcionModel', lazy='joined')
