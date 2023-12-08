'use client'
import PokemonElement from "@/components/PokemonElement";
import PokemonList from "@/components/PokemonList";
import useAPI from "@/hooks/useAPI";
import Pokemon from "@/models/Pokemon";
import { useEffect, useState } from "react";

export default function Home() {

  const {getPokemonList} = useAPI()
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [pokemonListShow, setPokemonListShow] = useState<Pokemon[]>([])


  useEffect(() => {
    getPokemonList().then(function(list) {
      setPokemonList(list)
      setPokemonListShow(list)
    })
  }, [])

  const orderAlphabetical = () : void => {

    const sortedList = pokemonList.sort((a, b) => {
      if (a.getName() < b.getName()) {
        return -1
      }
      if (a.getName() > b.getName()) {
        return 1
      }
      return 0
    })
    setPokemonList([...sortedList])

    const sortedListShow = pokemonListShow.sort((a, b) => {
      if (a.getName() < b.getName()) {
        return -1
      }
      if (a.getName() > b.getName()) {
        return 1
      }
      return 0
    })
    setPokemonListShow([...sortedListShow])

  }

  const filterByName = (value : string) : void => {

    const filteredList = pokemonList.filter((pokemon) => {
      const searchValue = value.toUpperCase()
      const name = pokemon.getName().toUpperCase()
      if (name.includes(searchValue)) {
        return true
      }
      return false
    })


    setPokemonListShow([...filteredList])

  }

  return (
    <main>
      <button onClick={() => {orderAlphabetical()}}>Ordenar alfabeticamente</button>
      <input onChange={(e) => {filterByName(e.target.value)}} type="text" />
      <PokemonList pokemonList={pokemonListShow}></PokemonList>
    </main>
  )
}
