'use client'

import Pokemon from "@/models/Pokemon";

export default function PokemonElement({pokemon} : {pokemon : Pokemon}) {

    return (<div style={{backgroundColor : "#5A5A5A", color : "white", padding : "10px", textAlign : "center", width : "fit-content"}} className="pokemon-element">
        <p>{pokemon.getName()}</p>
        <img src={pokemon.getSprite()} alt="" />
        <div className="pokemon-types">
            {pokemon.getTypes().map((type : string, key) => {
                return <div key={key} className="pokemon-type">
                    <p>{type}</p>
                </div> 
            })}
        </div>

    </div>)
}