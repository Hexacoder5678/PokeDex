import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import React from "react";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  //const [pokemonList, setPokemonList] = useState([]);
  //const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
  //const [nextUrl, setNextUrl] = useState(null);
  //const [prevUrl, setPrevUrl] = useState(null);

  const [pokemonListState,setPokemonListState]=useState({
    pokemonList:[],
    pokedexUrl:DEFAULT_URL,
    nextUrl:null,
    prevUrl:null
  });

  async function downloadPokemon() {
    const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl:DEFAULT_URL);

    const pokemonResults = response.data.results;

   // setNextUrl(response.data.next);
  //setPrevUrl(response.data.previous);

    setPokemonListState((state)=>({
      ...state,
      nextUrl:response.data.next,
      prevUrl:response.data.previous
   }));

    const promises = pokemonResults.map((p) => axios.get(p.url));
    const pokemonData = await axios.all(promises);

    const finalData = pokemonData.map((p) => {
      const info = p.data;
      return {
        id: info.id,  
        name: info.name,
        image: info.sprites.other.dream_world.front_default,
        types: info.types,
      };
    });

    setPokemonListState((state)=>({
      ...state,
      pokemonList:finalData
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemon List</h1>

      <div className="page-controls">
        <button  onClick={() => setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl})}>
          Prev
        </button>

        <button onClick={() => setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}>
          Next
        </button>
      </div>

      <div className="pokemon-list">
        {pokemonListState.pokemonList.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}      
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
