'use client'
import Pokemon from "@/models/Pokemon"
import PokemonElement from "./PokemonElement"

export default function PokemonList({pokemonList} : {pokemonList : Pokemon[]}) {

    return (<div style={{display : "flex", flexDirection : "column", gap : "25px"}} className="pokemon-list">
        {pokemonList.map((pokemon, key) => {
            return (<PokemonElement key={key} pokemon={pokemon}/>)
        })}
    </div>)
}

