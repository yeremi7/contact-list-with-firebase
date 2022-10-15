import React, { useState, useEffect } from 'react';
import { Contactos } from "./contacto";
import { db } from "../firebase/firebaseConfig";

const ListaDeContactos = () => {

    const [agregados, cambiarAgregados] = useState([]);

    useEffect(() => {
        db.collection('contactos').onSnapshot((snapshot) => {
            cambiarAgregados(snapshot.docs.map((documento) => {
                return{...documento.data() , id: documento.id}
            }))
        })
    },[])

    return ( 
        <>
            <section className="lista_de_contactos" >
               {agregados.length > 0 ?
                   agregados.map((agregado) => (
                        <Contactos 
                            key={agregado.id}
                            id={agregado.id}
                            nombre={agregado.nombre}
                            correo={agregado.correo}
                        />
                    ))
               :
                <h1>No hay contactos agregados</h1>
               }
            </section>
        </>
    );
}
 
export {ListaDeContactos};