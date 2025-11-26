import './Pokemon.css';
import { Link } from "react-router-dom";

function Pokemon({ id, name, image, types = [] }) {
  return (
    <Link to={`/pokemon/${id}`} className="pokemon">
      <img className="pokemon-image" src={image} alt={name} />
      <h3 className="pokemon-name">{name}</h3>

      <div className="pokemon-types">
        {types.map((t) => (
          <span key={t.type.name} className="type">
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default Pokemon;
