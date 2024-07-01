import { Categorias } from "./categorias/categorias.js";
import { Home } from "./home/home.js";
import { Eventos} from "../controladores/productos/eventos-interfaz.js";
import { Usuarios } from "./usuarios/usuarios.js";
import { Inscripciones, Inscripciones } from "./ventas/interfaz-inscripciones.js";

export function Router(){
    let hash = location.hash;
    //CAMBIAR MENU ACTIVO
    let origen = document.querySelector("a[href^='" + hash + "']");
    if (origen ){
        if ( origen.className.indexOf('nav-link') >= 0 ) {
            document.querySelector('.nav-item .active').classList.remove('active');
            document.querySelector("a[href^='" + hash + "']").classList.add('active');
         }
    }


    if (hash === '#/usuarios'){
        Usuarios();
    }else if(hash==='#/categorias'){
        Categorias();
    }else if(( hash==='#/home') || (hash==='') || (hash==='#')){
        Home();
    }else if(hash==='#/eventos'){
        Eventos();
    }else if(hash==='#/inscripciones'){
        Inscripciones();
    }     
    console.log(hash);
}