"use client";
import Pokemon from "@/models/Pokemon";
import PokemonElement from "./PokemonElement";

export default function PokemonList({
  pokemonList,
}: {
  pokemonList: Pokemon[];
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "25px" }}
      className="pokemon-list"
    >
      {pokemonList.map((pokemon) => (
        // Using the index as a key is not a good practice in react.
        // Use something unique like an id or the name of the pokemon
        <PokemonElement key={pokemon.getName()} pokemon={pokemon} />
      ))}
    </div>
  );
}
