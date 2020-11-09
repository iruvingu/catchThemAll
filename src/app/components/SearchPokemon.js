import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'

import { pokemonApi } from '../../utils/constants'

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column;
`

const Label = styled.label`
    flex: 1 ;
`

const Input = styled.input`
    padding: 1rem;
    margin-top: 0.5em;
    background-color: #E1E1E1;
    border: none;
    border-radius: 3px;
`;

const Button = styled.button`
    background-color: #3D7DCA;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    transition: background-color .3s ease;
    margin-top: 1rem;
    &:hover {
        background-color: #1F6AC3;
        color: yellow;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width:100%;
    text-align: center;
    margin-bottom: 2rem;
`;


export default function SearchPokemon({ addPokemon, setFetchLoading }) {

    // State data
    const [pokemon, setPokemon] = useState('')
    const [err, setErr] = useState(false)
    const [fetchErr, setFetchErr] = useState(false)
    
    // Internal Functions

    // get the input value
    const changePokemon = e => {
        setPokemon(e.target.value)
    }

    // AddPokemon
    const addPokemonInfo = (id, name, imgUrl, pokemonId) => {
        addPokemon({
            id,
            name,
            imgUrl,
            pokemonId
        })
    }

    // submit the form
    const onSubmitPokemon = e => {

        e.preventDefault();
        const poke = pokemon.trim()

        if (poke === '') {
            setErr(true);
            return;
        }

        setErr(false)

        // set loading
        setFetchLoading(true)

        fetch(`${pokemonApi}${pokemon}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setFetchErr(false)

                    // create new id
                    const newId = uuidv4()

                    addPokemonInfo(newId,
                        result.name,
                        result.sprites.other.dream_world.front_default,
                        result.id)

                    // stop load
                    setFetchLoading(false)
                },
                (error) => {
                    setFetchErr(true)
                    setFetchLoading(false)
                }
            )

        setPokemon('')
    }

    return(
        <form 
            onSubmit={onSubmitPokemon} 
        >
            { err ? <Error>Catch Pokémon!</Error> : null }
            { fetchErr? <Error>Catch a valid pokemon name or number</Error> : null }
            <Field>
                <Label>Pokémon to catch</Label>
                <Input 
                    name="serachPokemon"
                    placeholder="Eg: Pikachu or 25"
                    value={pokemon}
                    onChange={changePokemon}
                    type="text" />
            </Field>
            <Button type="submit">Catch!</Button>
        </form>
    )

}

SearchPokemon.propTypes = {
    addPokemon: PropTypes.func.isRequired,
    setFetchLoading: PropTypes.func.isRequired
}
