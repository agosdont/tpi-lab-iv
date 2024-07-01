from config.database import Base
from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

class InscripcionModel(Base):
    __tablename__ = 'inscripcion'

    id = Column(Integer, primary_key = True)
    evento_id = Column(Integer, ForeignKey("evento.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    fecha_inscripcion = Column(Date)

    # Relaciones con las tablas
    evento = relationship('EventoModel', lazy='joined')
    usuario = relationship('UsuarioModel', lazy='joined')
