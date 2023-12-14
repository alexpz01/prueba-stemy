"use client";
import PokemonElement from "@/components/PokemonElement";
import PokemonList from "@/components/PokemonList";
import useAPI from "@/hooks/useAPI";
import Pokemon from "@/models/Pokemon";
import { useEffect, useState } from "react";

export default function Home() {
  const { getPokemonList } = useAPI();
  // Having two states for pokemonList, one filtered and one unfiltered is a bad practice. Whenever you have "derived" states
  // from another state, it's best to calculate them at the time of use, not to have them duplicated in the state.
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPokemonList().then(function (list) {
      setPokemonList(list);
    });
  }, []);

  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.getName().toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (isSorted) return a.getName().localeCompare(b.getName());
      return 0; // Not sorted
    });
  return (
    <main>
      <button onClick={() => setIsSorted(!isSorted)}>
        Ordenar alfabeticamente
      </button>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
      />
      <PokemonList pokemonList={filteredPokemonList}></PokemonList>
    </main>
  );
}
