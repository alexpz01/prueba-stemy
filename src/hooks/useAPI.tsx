import Pokemon from "@/models/Pokemon"

export default function useAPI() {
    const getPokemonList = async (offset: number = 0, limit: number = 20): Promise<Pokemon[]> => {

        var pokemonList: Pokemon[] = []

        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
            .then((result) => {
                return result.json()
            }).catch((e) => { console.log(e) })

        if (result != undefined) {
            pokemonList = await getPokemonsInfo(result)
            return pokemonList
        }

        return pokemonList
    }

    const getPokemonsInfo = async (pokemonAPIResult: any): Promise<Pokemon[]> => {

        const pokemonList: Pokemon[] = []

        const results = pokemonAPIResult.results

        for (var i: number = 0; i < results.length; i++) {
            const pokemonData = results[i]
            const pokemon = new Pokemon()
            pokemon.setName(pokemonData.name)

            const pokemonDetails = await fetch(pokemonData.url).then((pokemonInfo) => {
                return pokemonInfo.json()
            })

            pokemon.setSprite(pokemonDetails.sprites.front_default)
            pokemon.setTypes(pokemonDetails.types.map((type: any) => { return type.type.name }))

            pokemonList.push(pokemon)
        }
        
        return pokemonList
    }

    return { getPokemonList }
}