from models.usuario_model import UsuarioModel
from schemas.usuario_schema import UsuarioSchema
from utils.validators import idDuplicados,emailDuplicado


class UsuarioService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_usuarios(self):
        result = self.db.query(UsuarioModel).all()
        return result

    def get_usuario(self, id):
        result = self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
        return result

    def get_usuario_email(self, email):
        result = self.db.query(UsuarioModel).filter(UsuarioModel.email == email).all()
        return result

    def create_usuario(self, usuario: UsuarioSchema):
        lista = self.get_usuarios()
        idDuplicados(usuario, lista)
        emailDuplicado(usuario,lista)
        new_usuario = UsuarioModel(**usuario.model_dump())
        self.db.add(new_usuario)
        self.db.commit()
        return

    def update_usuario(self, id: int, data: UsuarioSchema):
        usuario = self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
        if usuario.email != data.email:
            lista = self.get_usuarios()
            emailDuplicado(data,lista)
            usuario.email = data.email
        usuario.nombre = data.nombre
        usuario.email = data.email
        usuario.password = data.password
        usuario.rol = data.rol
        self.db.commit()
        return
    
    """def update_usuario(self, id: int, user: UsuarioSchema):
        result = self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
        if result.email != user.email:
            lista = self.get_usuarios()
            emailDuplicado(user,lista)
            result.email = user.email
        result.nombre = user.nombre
        result.rol = user.rol
        contrasenia_hasheada = pwd_context.hash(user.password)
        result.password = contrasenia_hasheada
        self.db.commit()
        self.db.refresh(result)
        return result"""

    def delete_usuario(self, id: int):
        self.db.query(UsuarioModel).filter(UsuarioModel.id == id).delete()
        self.db.commit()
        return