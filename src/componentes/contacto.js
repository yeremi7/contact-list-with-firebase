import React, { useContext} from 'react';
import { db } from "../firebase/firebaseConfig";
import { ContextState } from "../contextAPI/ContextState";
import { useActualizarContacto } from "../hook/useActualizarContacto";

const Contacto = ({id, nombre, correo}) => {

    const {nuevoNombre,
           nuevoCorreo,
           editarContacto, 
           alerta2, 
           mensaje, 
           cambiarEditarContacto,
           cambiarNuevoNombre, 
           cambiarNuevoCorreo} = useContext(ContextState);
         
    const [actualizarContacto] = useActualizarContacto();

    const actualizarContactos = (e) => {
        e.preventDefault();
        actualizarContacto(id);
    };

    const eliminarContacto = (id) => {
        db.collection('contactos').doc(id).delete();
    };

    return ( 
        <>
            <section className="container_contacto" >
               {editarContacto ? 
                    <form onSubmit={actualizarContactos} >
                        <input 
                            type="text"
                            name="nombre"
                            value={nuevoNombre}
                            onChange={(e) => cambiarNuevoNombre(e.target.value)}
                            placeholder="Nombre"
                        />
                    
                        <input 
                            type="text"
                            name="correo"
                            value={nuevoCorreo}
                            onChange={(e) => cambiarNuevoCorreo(e.target.value)}
                            placeholder="Correo"
                        />

                        {alerta2 &&
                            <p className="mensajeAlerta" > {mensaje.mensaje} </p>
                        }
                        
                            <button type="submit" >Actualizar</button>
                        
                    </form>
                :
                    <div className="container_editar_contacto" >
                        <p> {nombre} </p>
                        <p> {correo} </p>
                        <div className="container_botones">
                            <button onClick={() => cambiarEditarContacto(!editarContacto)} className="editar" >Editar</button>
                            <button onClick={() => eliminarContacto(id)} className="borrar" >Borrar</button>
                        </div> 
                    </div>
            }
            </section>    
        </>
    );
}
 
export {Contacto} ;