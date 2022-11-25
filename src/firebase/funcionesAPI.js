import { db } from "./firebaseConfig";;

const agregarContacto = async (nombre, correo) => {
    try {
          const response = await db.collection('contactos').add({
            nombre: nombre,
            correo: correo
          });

          return response;

    } catch (e) {
      console.log(e);
    }
}

const updateContacto = async (nuevoNombre, nuevoCorreo, id) => {

  try {
        const response = await db.collection('contactos').doc(id).update({
          nombre: nuevoNombre,
          correo: nuevoCorreo
      })
    
      return response
    
  } catch (e) {
    console.log(e);
  }
}
 
export {agregarContacto, updateContacto};