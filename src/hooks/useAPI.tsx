import Pokemon from "@/models/Pokemon";

export default function useAPI() {
  const getPokemonList = async (
    offset: number = 0,
    limit: number = 20
  ): Promise<Pokemon[]> => {
    var pokemonList: Pokemon[] = [];

    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    )
      .then((result) => {
        return result.json();
      })
      .catch((e) => {
        console.log(e);
      });

    // Never use != in js. Always use !== or just use the truthy or falsy value of the variable
    if (result) pokemonList = await getPokemonsInfo(result);

    return pokemonList;
  };

  // Any is not a good type. Try to use the type that the API returns
  const getPokemonsInfo = async (pokemonAPIResult: any): Promise<Pokemon[]> => {
    const pokemonsData = pokemonAPIResult.results;

    const pokemonList = await Promise.all(
      pokemonsData.map(async (pokemonData) => {
        // Calling an empty constructor and then having to set the values is not a good practice.
        // Why not just pass the values to the constructor?
        // Or build if from the API response?
        const pokemon = new Pokemon();
        pokemon.setName(pokemonData.name);
        const pokemonDetails = await fetch(pokemonData.url).then(
          (pokemonInfo) => {
            return pokemonInfo.json();
          }
        );
        pokemon.setSprite(pokemonDetails.sprites.front_default);
        pokemon.setTypes(
          pokemonDetails.types.map((type: any) => {
            return type.type.name;
          })
        );
        return pokemon;
      })
    );

    return pokemonList;
  };

  return { getPokemonList };
}
