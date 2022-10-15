import React, { useState, useEffect } from 'react';
import { db } from "../firebase/firebaseConfig";

const Contactos = ({id, nombre, correo}) => {

    const [editandoContacto, cambiarEditandoContacto] = useState(false);
    const [nuevoNombre , CambiarNuevoNombre] = useState(nombre);
    const [nuevoCorreo , CambiarNuevoCorreo] = useState(correo);
    const [alerta, cambiarAlerta] = useState(false);
    const [mensajeError, cambiarMensajeError] = useState({});

    const actualizarContacto = (e) => {
        e.preventDefault();

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
       
        if (nuevoNombre === '' || nuevoCorreo === '' ) {
            cambiarAlerta(true);
            cambiarMensajeError({mensaje:'Rellene todos los datos*'});

        } else if (!expresionRegular.test(nuevoCorreo)) {
            cambiarAlerta(true);
            cambiarMensajeError({mensaje:'Coloque un correo correcto*'});
            
        }else{
            db.collection('contactos').doc(id).update({
                nombre: nuevoNombre,
                correo: nuevoCorreo
            })
            .then(() => {
                cambiarEditandoContacto(false);
            })
            
        };
    };

    const eliminarContacto = (id) => {
        db.collection('contactos').doc(id).delete()
    };

    useEffect(() => {
        let tiempo;

        if (alerta === true) {
            tiempo = setTimeout(() => {
                cambiarAlerta(false);
            }, 3000);
        }
        return(() => clearTimeout(tiempo))
    },[alerta, cambiarAlerta]);

    return ( 
        <>
            <section className="container_contacto" >
               {editandoContacto ? 
                    <form onSubmit={actualizarContacto} >
                        <input 
                            type="text"
                            name="nombre"
                            value={nuevoNombre}
                            onChange={(e) => CambiarNuevoNombre(e.target.value)}
                            placeholder="Nombre"
                        />
                    
                        <input 
                            type="text"
                            name="correo"
                            value={nuevoCorreo}
                            onChange={(e) => CambiarNuevoCorreo(e.target.value)}
                            placeholder="Correo"
                        />

                        {alerta &&
                            <p className="mensajeAlerta" > {mensajeError.mensaje} </p>
                        }
                    
                        <button type="submit" >Actualizar</button>
                    </form>
                :
                    <div className="container_editar_contacto" >
                        <p> {nombre} </p>
                        <p> {correo} </p>
                        <div className="container_botones">
                            <button onClick={() => cambiarEditandoContacto(!editandoContacto)} className="editar" >Editar</button>
                            <button onClick={() => eliminarContacto(id)} className="borrar" >Borrar</button>
                        </div> 
                    </div>
            }
            </section>    
        </>
     );
}
 
export {Contactos};