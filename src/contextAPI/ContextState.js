import React, {useState} from 'react';

const ContextState = React.createContext();

const ProveedorState = ({children}) => {

    //Crear
    const [nombre ,  cambiarNombre]  = useState('');
    const [correo ,  cambiarCorreo]  = useState('');

    //editar
    const [nuevoNombre, cambiarNuevoNombre] = useState('');
    const [nuevoCorreo, cambiarNuevoCorreo] = useState('');
    const [editarContacto, cambiarEditarContacto] = useState(false);

    //docs de firebase
    const [docsFirebase, setDocsFirebase] = useState([]);

    //mensaje
    const [mensaje, cambiarMensaje]  = useState({});
    const [alerta1 ,  cambiarAlerta1]  = useState(false);
    const [alerta2 ,  cambiarAlerta2]  = useState(false);

    return ( 
        <ContextState.Provider value={{
            //crear
            nombre,
            cambiarNombre,
            correo,
            cambiarCorreo,

            //editar
            nuevoNombre,
            cambiarNuevoNombre,
            nuevoCorreo,
            cambiarNuevoCorreo,
            editarContacto,
            cambiarEditarContacto,

            //docs firebase
            docsFirebase,
            setDocsFirebase,
            
            //mensaje
            alerta1,
            cambiarAlerta1,
            alerta2,
            cambiarAlerta2,
            mensaje,
            cambiarMensaje,
        }}>
            {children}
        </ContextState.Provider>
    );
}
 
export { ContextState, ProveedorState };