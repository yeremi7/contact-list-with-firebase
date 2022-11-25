import React from 'react';
import './index.css';
import { FormularioContacto } from "./componentes/FormularioContacto";
import { ListaDeContactos } from "./componentes/ListaDeContacto";
import { ProveedorState } from "./contextAPI/ContextState";

const App = () => {
  return(
    <>
      <ProveedorState>
        <FormularioContacto />
        <ListaDeContactos />
      </ProveedorState>
    </>
  )
}

export {App};
