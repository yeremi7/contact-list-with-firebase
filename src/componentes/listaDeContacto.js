import React, {useEffect, useContext} from 'react';
import { db } from "../firebase/firebaseConfig";
import { Contacto } from "../componentes/Contacto";
import { ContextState } from "../contextAPI/ContextState";

const ListaDeContactos = () => {

    const {docsFirebase, setDocsFirebase} = useContext(ContextState);

    useEffect(() => {
        
        db.collection('contactos').onSnapshot((snapshot) => {
            setDocsFirebase(snapshot.docs.map((docs) => {
                return{...docs.data() , id: docs.id}
            }))
        });

    },[]);

    return ( 
        <>
            <section className="lista_de_contactos" >
               {docsFirebase.length > 0 ?
                   docsFirebase.map((docs) => (
                        <Contacto 
                            id={docs.id}
                            key={docs.id}
                            nombre={docs.nombre}
                            correo={docs.correo}
                        />
                    ))
               :
                <h1>No hay contactos agregados</h1>
               }
            </section>
        </>
    );
    
    return ( 
        <>
           
        </>
     );
}
 
export {ListaDeContactos};