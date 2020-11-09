import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

import Header from './components/Header'
import SearchPokemon from './components/SearchPokemon'
import PokemonList from './components/PokemonList'
import Spinner from './styles/Spinner'

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
`

const FormContainer = styled.div`
    background-color: #fff;
    opacity: 0.7;
    padding: 3rem;
    border-radius: 5px;
    margin-bottom: 30px;
`

export default function App() {

    // pokemons on local storage
    let initialPokemons = JSON.parse(localStorage.getItem('pokemons'))
    if (!initialPokemons) {
        initialPokemons = []
    }

    // pokemon state list
    const [pokemonList, setPokemonList] = useState(initialPokemons)
    const [fetchLoading, setFetchLoading] = useState(false)

    useEffect(() => {
        if (initialPokemons) {
            // save in storage
            localStorage.setItem('pokemons', JSON.stringify(pokemonList))
        } else {
            localStorage.setItem('pokemons', JSON.stringify([]))
        }
    }, [pokemonList, initialPokemons])


    const addPokemon = pokemon => {
        setPokemonList([
            ...pokemonList,
            pokemon
        ])
    }

    const deletePokemon = id => {
        const newPokemons = pokemonList.filter(pokemon => pokemon.id !== id)
        setPokemonList(newPokemons)
    }


    const subtitle = pokemonList.length === 0 ? "No pokemon captured yet!" : "Pokémon List"

    return (
        <Container>
            <Header title={'Catch them all!'} />
            <FormContainer>
                <SearchPokemon
                    addPokemon={addPokemon}
                    setFetchLoading={setFetchLoading} />
                { fetchLoading ? <Spinner /> : null}
                <PokemonList 
                    subtitle={subtitle} 
                    pokemonList={pokemonList}
                    deletePokemon={deletePokemon} />
            </FormContainer>
        </Container>
    )
}