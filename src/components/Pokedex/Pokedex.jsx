import './Pokedex.css';
import React, { useState } from 'react';
import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';

function Pokedex() {

  const [searchTerm ,setSearchTerm]=useState('');
  return (
    <div className="pokedex-wrapper">
      <h1>Pokedex</h1>
      <Search updateSearchTerm={setSearchTerm}/>
      {searchTerm ? <div>{searchTerm}</div> : <PokemonList/>}
    </div>
  );
}

export default Pokedex;
