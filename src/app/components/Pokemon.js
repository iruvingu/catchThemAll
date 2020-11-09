import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, Button} from '@material-ui/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types';

const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
`

const Id = styled.p`
    color: gray;
    text-align: center;
`

const Name = styled.h2`
    text-align: center;
    color: black;
`

export default function Pokemon({ pokemon, deletePokemon }) {

    return(
        <Card style={{ maxWidth: 200, margin: 20 }} >
            <CardActionArea>
                <CardContent>
                     <ImageDiv>
                        <img alt={pokemon.name} src={pokemon.imgUrl} style={{ width: 100, height: 100}} />
                    </ImageDiv>
                    <Id># {pokemon.pokemonId}</Id>
                    <Name>{pokemon.name}</Name>
                </CardContent>
            </CardActionArea>
            <CardActions>
                    <Button color="secondary" style={{ fontWeight: "bold" }}
                     onClick={() => deletePokemon(pokemon.id) } >Delete</Button>
                </CardActions>
        </Card>
    )
}

Pokemon.propTypes = {
    pokemon: PropTypes.object.isRequired,
    deletePokemon: PropTypes.func.isRequired
}