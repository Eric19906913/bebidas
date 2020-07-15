import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) =>{

  //busca el ID de la receta
  const [idReceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  //consulta la API segun el id
  useEffect(()=>{
    if(idReceta === null) return;

    const consultarReceta = async () =>{
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios(url);
      guardarReceta(resultado.data.drinks[0]);
    }
    consultarReceta();
  },[idReceta])

  return(
    <ModalContext.Provider
      value={{
        informacion,
        guardarIdReceta,
        guardarReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
