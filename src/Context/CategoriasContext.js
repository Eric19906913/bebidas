import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//context
export const CategoriasContext = createContext();

//crear provider, es donde se ecnuetran las funciones y states
const CategoriasProvider = (props) =>{


  const [categorias, guardarCategorias] = useState([]);

  useEffect(()=>{
    const obtenerCategorias = async () =>{
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

      const resultado = await axios(url);
      guardarCategorias(resultado.data.drinks);
    }
    obtenerCategorias();
  },[]);

  return(
    //todo lo que pase como valueva a estar disponible en los demas comp
    <CategoriasContext.Provider
      value={{
        categorias
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  )
}

export default CategoriasProvider;
