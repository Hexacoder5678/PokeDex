import { useEffect, useState } from 'react';
import './PokemonDetails.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemon() {
    const response = await axios.get(POKEMON_DETAIL_URL + id);
    const data = response.data;

    setPokemon({
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      image: data.sprites.other.dream_world.front_default
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  if (!pokemon) return null;

  return (
    <>
      <h1>
        <Link to="/">Pokemon</Link>
      </h1>

      <div className="pokemon-details-wrapper">
        <div className="pokemon-name">{pokemon.name}</div>

        <div className="pokemon-image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="pokemon-attr">
          height: {pokemon.height} ; weight: {pokemon.weight}
        </div>

        <div className="pokemon-types">
          Type:
          {pokemon.types.map((t) => (
            <span key={t.type.name}>{t.type.name}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
