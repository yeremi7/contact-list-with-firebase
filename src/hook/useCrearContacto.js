import {useContext, useEffect} from 'react';
import { ContextState } from "../contextAPI/ContextState";
import * as CRUD from "../firebase/funcionesAPI";

const useCrearContacto = () => {

    const {nombre, 
           correo, 
           alerta1,
           cambiarNombre,
           cambiarCorreo, 
           cambiarAlerta1, 
           cambiarMensaje} = useContext(ContextState);

    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    const crearContacto = () => {
       
        if (nombre === '' || correo === '' ) {
            cambiarAlerta1(true);
            cambiarMensaje({mensaje:'Rellene todos los datos*'});

        } else if (!expresionRegular.test(correo)) {
            cambiarAlerta1(true);
            cambiarMensaje({mensaje:'Coloque un correo correcto*'});
        }else{
            CRUD.agregarContacto(nombre, correo).then(() => {
                cambiarNombre('');
                cambiarCorreo('');
            }).catch((e) => {
                console.log(e);
            })
        };
    };

    useEffect(() => {
        let tiempo;

        if (alerta1 === true) {
            tiempo = setTimeout(() => {
                cambiarAlerta1(false);
            }, 3000);
        }
        return(() => clearTimeout(tiempo))
    },[alerta1, cambiarAlerta1]);

    return [crearContacto];
}
 
export {useCrearContacto};