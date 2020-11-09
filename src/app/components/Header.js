import React from 'react';
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const HeaderContainer = styled.header`
    padding: 20px;
    font-weight: bold;
    color: #000;   
`
const TextHeader = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: 'Slabo 27px', serif;
    text-align: center;
`

export default function Header({ title }) {

    return(
        <HeaderContainer>
            <TextHeader>
                {title}
            </TextHeader>
        </HeaderContainer>
    )

}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
