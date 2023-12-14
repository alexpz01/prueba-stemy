"use client";

import Pokemon from "@/models/Pokemon";

export default function PokemonElement({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div
      style={{
        backgroundColor: "#5A5A5A",
        color: "white",
        padding: "10px",
        textAlign: "center",
        width: "fit-content",
      }}
      className="pokemon-element"
    >
      <p>{pokemon.getName()}</p>
      {/* Always add alt description to images */}
      <img src={pokemon.getSprite()} alt={`${pokemon.getName()} image`} />
      <div className="pokemon-types">
        {/* Again, you are using the index of the element you are mapping over
        as a key. This is a bad practice. In this case, you cannot use just
        the type, as there are pokemons with the same type.  */}
        {pokemon.getTypes().map((type: string) => (
          <div
            key={`pokemon-${pokemon.getName()}-type-${type}`}
            className="pokemon-type"
          >
            <p>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
