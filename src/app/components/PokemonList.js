import React from 'react';
import PropTypes from 'prop-types'
import Pokemon from './Pokemon'

export default function PokemonList({ subtitle, pokemonList, deletePokemon }) {

    return(
        <div>
            <h2>{subtitle}</h2>
            <div>
                {
                pokemonList.map(pokemon => {
                    return(
                        <Pokemon 
                        key={pokemon.id}
                        pokemon={pokemon}
                        deletePokemon={deletePokemon} />
                    )
                })
            }
            </div>
        </div>
    )

}

PokemonList.propTypes = {
    subtitle: PropTypes.string.isRequired, 
    pokemonList: PropTypes.array.isRequired, 
    deletePokemon: PropTypes.func.isRequired
}
