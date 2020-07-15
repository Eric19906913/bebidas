import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) =>{

  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre:'',
    categoria:''
  });
  const [consultar, guardarConsultar] = useState(false);


  useEffect(()=>{
    if(!consultar) return;

    const consultarAPI = async () =>{
      const {nombre, categoria} = busqueda;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

      const resultado = await axios(url);
      guardarRecetas(resultado.data.drinks);
    }
    consultarAPI();
  },[busqueda,consultar]);


  return(
    <RecetasContext.Provider
      value={{
        buscarRecetas,
        guardarConsultar,
        recetas
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
}


export default RecetasProvider;
