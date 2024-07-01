from models.categoria_model import CategoriaModel
from schemas.categoria_schema import CategoriaSchema
from utils.validators import idDuplicados


class CategoriaService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_categorias(self):
        result = self.db.query(CategoriaModel).all()
        return result

    def get_categoria(self, id):
        result = self.db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
        return result

    def create_categoria(self, categoria: CategoriaSchema):
        lista = self.get_categorias()
        idDuplicados(categoria, lista)
        new_categoria = CategoriaModel(**categoria.model_dump())
        self.db.add(new_categoria)
        self.db.commit()
        return

    def update_categoria(self, id: int, data: CategoriaSchema):
        categoria = self.db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
        categoria.nombre = data.nombre
        categoria.descripcion = data.descripcion
        self.db.commit()
        return

    def delete_categoria(self, id: int):
        self.db.query(CategoriaModel).filter(CategoriaModel.id == id).delete()
        self.db.commit()
        return