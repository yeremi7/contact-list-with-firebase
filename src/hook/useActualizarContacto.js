import {useContext, useEffect} from 'react';
import { ContextState } from "../contextAPI/ContextState";
import * as CRUD from "../firebase/funcionesAPI";

const useActualizarContacto = () => {
    
    const {nuevoNombre, 
           nuevoCorreo, 
           alerta2, 
           cambiarEditarContacto,
           cambiarAlerta2, 
           cambiarMensaje,
           cambiarNuevoNombre,
           cambiarNuevoCorreo} = useContext(ContextState);

    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    const actualizarContacto = (id) => {
       
        if (nuevoNombre === '' || nuevoCorreo === '' ) {
            cambiarAlerta2(true);
            cambiarMensaje({mensaje:'Rellene todos los datos*'});

        } else if (!expresionRegular.test(nuevoCorreo)) {
            cambiarAlerta2(true);
            cambiarMensaje({mensaje:'Coloque un correo correcto*'});

        }else{
            CRUD.updateContacto(nuevoNombre, nuevoCorreo, id).then(() => {
                cambiarEditarContacto(false);
                cambiarNuevoNombre('');
                cambiarNuevoCorreo('');
                
            }).catch((e) => {
                console.log(e);
            })
        };
    };

    useEffect(() => {
        let tiempo;

        if (alerta2 === true) {
            tiempo = setTimeout(() => {
                cambiarAlerta2(false);
            }, 3000);
        }
        return(() => clearTimeout(tiempo))
    },[alerta2, cambiarAlerta2]);

    return [actualizarContacto];
}
 
export {useActualizarContacto};