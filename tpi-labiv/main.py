from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from routers.usuario_router import usuario_router
from routers.evento_router import evento_router
from routers.categoria_router import categoria_router
from routers.inscripcion_router import inscripcion_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.title = "Trabajo Práctico Integrador - LAB IV"
app.version = "0.0.1"

@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')

app.add_middleware(ErrorHandler)

## Acá con los CORS (Cross-Origin Resource Sharing)
## defino todos los origenes que van a poder utitlizar/consultar el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuario_router)
app.include_router(evento_router)
app.include_router(inscripcion_router)
app.include_router(categoria_router)


Base.metadata.create_all(bind=engine)


