import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import React from "react";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonList, setPokemonList] = useState([]);

  const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  async function downloadPokemon() {
    const response = await axios.get(pokedexUrl);

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    const pokemonResults = response.data.results;

    const promises = pokemonResults.map((p) => axios.get(p.url));
    const pokemonData = await axios.all(promises);

    const finalData = pokemonData.map((p) => {
      const info = p.data;
      return {
        id: info.id,  // ✔ FIXED
        name: info.name,
        image: info.sprites.other.dream_world.front_default,
        types: info.types,
      };
    });

    setPokemonList(finalData);
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemon List</h1>

      <div className="page-controls">
        <button disabled={!prevUrl} onClick={() => setPokedexUrl(prevUrl)}>
          Prev
        </button>

        <button disabled={!nextUrl} onClick={() => setPokedexUrl(nextUrl)}>
          Next
        </button>
      </div>

      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}          // ✔ FIXED
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
