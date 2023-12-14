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

    // Your version was not very good performance wise. You were awaiting for each pokemon to be fetched before fetching the next one.
    // If the pokemon request takes 1 second, and you have 20 pokemons, you will be waiting 20 seconds util you have all the pokemons loaded.
    // Eg.
    // Time axis --------------------------------->
    // pokemon/1/     ----
    // pokemon/2/         ----
    // pokemon/3/             ----
    // pokemon/4/                 ----
    // pokemon/5/                     ----

    // With Promise.all, you can fetch all the pokemons at the same time, and then wait for all of them to be fetched. The total time
    // will be the time it takes to fetch the slowest pokemon, around 1 second in this case.
    // E.g.
    // Time axis --------------------------------->
    // pokemon/1/     ----
    // pokemon/2/     ----
    // pokemon/3/     ----
    // pokemon/4/     ----
    // pokemon/5/     ----

    // To check this, use the waterfall in the network inspector tab of chrome dev tools.
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
