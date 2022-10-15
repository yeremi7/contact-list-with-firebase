import React from 'react';
import './index.css';
import { Formulario } from "./componentes/formulario";
import { ListaDeContactos } from "./componentes/listaDeContacto";

const App = () => {
  return(
    <>
      <Formulario />
      <ListaDeContactos/>
    </>
  )
}

export {App};
