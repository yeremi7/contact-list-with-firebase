import React, { useEffect, useState } from 'react';
import { db } from "../firebase/firebaseConfig";

const Formulario = () => {

    const [nombre, cambiarNombre] = useState('');
    const [correo, cambiarCorreo] = useState('');
    const [alerta, cambiarAlerta] = useState(false);
    const [mensajeError, cambiarMensajeError] = useState({});
    
    const onSubmit = (e) => {
        e.preventDefault();
        
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
       
        if (nombre === '' || correo === '' ) {
            cambiarAlerta(true);
            cambiarMensajeError({mensaje:'Rellene todos los datos*'});

        } else if (!expresionRegular.test(correo)) {
            cambiarAlerta(true);
            cambiarMensajeError({mensaje:'Coloque un correo correcto*'});
            
        }else{
            db.collection('contactos').add({
                nombre: nombre,
                correo: correo
            })
            .then(() => {
                cambiarNombre('');
                cambiarCorreo('');
            })
        };
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
            <section className="formulario" >
                
                <h1 className="title" > Lista de Contacto </h1>
                
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
                    
                        {alerta &&
                            <p className="mensajeAlerta" > {mensajeError.mensaje} </p>
                        }
                
                    <button type="submit" >Agregar</button>
                </form>

            </section>
            
        </>
    );
}
 
export {Formulario};