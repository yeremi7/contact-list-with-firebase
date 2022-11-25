import React, { useContext } from 'react';
import { ContextState } from "../contextAPI/ContextState";
import { useCrearContacto } from "../hook/useCrearContacto";

const FormularioContacto = () => {

    const {nombre, 
           correo, 
           alerta1, 
           mensaje, 
           cambiarNombre, 
           cambiarCorreo} = useContext(ContextState);

    const [crearContacto] = useCrearContacto();


    const onSubmit = (e) => {
        e.preventDefault();
        crearContacto();
    };

    return ( 
        <>
            <section className="formulario" >
                
                <h1 className="title" > Lista de Contactos </h1>
                
                <form onSubmit={onSubmit} >
                    <input 
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(e)=> cambiarNombre(e.target.value)}
                        placeholder="Nombre"
                    />
                
                    <input 
                        type="text"
                        name="correo"
                        value={correo}
                        onChange={(e)=> cambiarCorreo(e.target.value)}
                        placeholder="Correo"
                    />
                    
                        {alerta1 &&
                            <p className="mensajeAlerta" > {mensaje.mensaje} </p>
                        }
                
                    <button type="submit" >Agregar</button>
                </form>

            </section>
            
        </>
    );
}
 
export {FormularioContacto};